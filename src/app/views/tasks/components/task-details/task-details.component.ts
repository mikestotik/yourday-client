import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDatepicker } from '@angular/material/datepicker';
import { Store } from '@ngxs/store';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TaskConfig } from '../../../../config/task.config';
import { DictItem } from '../../../../interfaces/dict.interface';
import { Group } from '../../../../interfaces/group.interface';
import { SubTaskPayload } from '../../../../interfaces/sub-task.interface';
import { Task, TaskPriorityItem, TaskUpdate } from '../../../../interfaces/task.interface';
import { GroupState } from '../../../../models/group/store/group.state';
import { AddSubTask, DeleteSubTask, RemoveTask, UpdateTask } from '../../../../models/task/store/task.actions';
import { TaskState } from '../../../../models/task/store/task.state';
import { TaskPriority } from '../../../../models/task/task.enum';
import { isEqual } from '../../../../utils/obj.utils';


interface TaskDetailsForm {
  title: FormControl<string>;
  note: FormControl<string | null>;
  priority: FormControl<TaskPriority | null>;
  datetime: FormControl<Date | null>;
  reminder: FormControl<number | null>;
  tag: FormControl<number | null>;
}


interface CheckListForm {
  title: FormControl<string>;
}


@Component({
  templateUrl: './task-details.component.html',
  styleUrls: [ './task-details.component.scss' ]
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('appendedToInput', { static: true })
  public appendedToInput!: NgxMaterialTimepickerComponent;

  public groups!: Group[];

  public taskForm!: FormGroup<TaskDetailsForm>;
  public checkListForm!: FormGroup<CheckListForm>;
  public group!: Group | null;

  public priorityList: TaskPriorityItem[] = TaskConfig.priorityList;
  public reminderOptions: DictItem[] = TaskConfig.reminderOptions;

  public sentDelete!: boolean;
  public sentSave!: boolean;
  public task!: Task;
  public time!: string;

  public darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#28292d',
      buttonColor: '#007bfc'
    },
    dial: {
      dialBackgroundColor: '#313235'
    },
    clockFace: {
      clockFaceBackgroundColor: '#313235',
      clockHandColor: '#007bfc',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  public valueChanged!: boolean;

  private taskFormStartValue: unknown;
  private destroy$ = new Subject<void>();


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private taskId: number,
    private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>,
    private fb: FormBuilder,
    private store: Store) {
  }


  public ngOnInit(): void {
    this.store.select(TaskState.task).pipe(
      map(filterFn => filterFn(this.taskId)),
      filter(value => !!value),
      switchMap(task => {
        this.groups = this.store.selectSnapshot(GroupState.groups);
        this.group = this.store.selectSnapshot(GroupState.group)(task!.group!);
        this.taskForm = this.createForm(task!);
        this.taskFormStartValue = JSON.parse(JSON.stringify(this.taskForm.value));
        this.task = task!;
        this.time = this.getTime(task!.datetime);
        this.checkListForm = this.createCheckListForm();
        return this.taskForm.valueChanges;
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(value => this.valueChanged = !isEqual(this.taskFormStartValue, value));
  }


  public ngOnDestroy(): void {
    if (this.appendedToInput) {
      this.appendedToInput.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onClose(): void {
    this.bottomSheetRef.dismiss();
  }


  public onSubmit(): void {
    this.saveValue(this.taskForm.value);
    this.onClose();
  }


  public onTitleChanged(): void {
    this.saveValue(this.taskForm.value);
  }


  public onChangeTag(tagId: number | null): void {
    this.saveValue({ tag: tagId });
  }


  public onChangeGroup(groupId: number | null): void {
    this.saveValue({ group: groupId });
  }


  public onDelete(): void {
    this.sentDelete = true;
    this.store.dispatch(new RemoveTask(this.task.id)).subscribe(() => {
      this.sentDelete = true;
      this.onClose();
    });
  }


  public onPriority(id: number): void {
    const control = this.taskForm.controls.priority;
    if (control.value === id) {
      control.patchValue(null);
    } else {
      control.patchValue(id);
    }
    this.saveValue(this.taskForm.value);
  }


  public onPriorityReset(): void {
    this.taskForm.controls.priority.patchValue(null);
    this.saveValue(this.taskForm.value);
  }


  public onAddSubTask(): void {
    this.store.dispatch(new AddSubTask(this.task.id, this.checkListForm.value as SubTaskPayload)).pipe(
      tap(() => this.checkListForm.controls.title.patchValue(''))
    );
  }


  public onDeleteSubTask(id: number): void {
    this.store.dispatch(new DeleteSubTask(this.task.id, id));
  }


  public onDate(picker: MatDatepicker<any>): void {
    const now = new Date();
    now.setHours(now.getHours() + 1)

    this.time = this.getTime(now);
    this.taskForm.controls.datetime.patchValue(now);
    picker.open();
    this.saveValue(this.taskForm.value);
  }


  public onResetDate(dateInput: HTMLInputElement): void {
    this.taskForm.controls.datetime.patchValue(null);
    this.saveValue(this.taskForm.value);
    setTimeout(() => dateInput.blur(), 0);
  }


  public onChangeTime($event: string, timeInput: HTMLInputElement): void {
    const datetime: Date | null = this.taskForm.controls.datetime.value;

    if (datetime) {
      const time = $event.split(':');
      datetime.setHours(Number(time[0]));
      datetime.setMinutes(Number(time[1]));

      this.taskForm.patchValue({ datetime });
      this.saveValue(this.taskForm.value);
      setTimeout(() => timeInput.blur(), 0);
    }
  }


  public onNoteChanged(): void {
    this.saveValue(this.taskForm.value);
  }


  private saveValue(value: Partial<TaskUpdate>): void {
    if (this.taskForm.valid && this.valueChanged) {
      this.sentSave = true;
      this.store.dispatch(new UpdateTask(this.task.id, value)).subscribe(() => {
        this.sentSave = false;
      });
    }
  }


  private createForm(task: Task): FormGroup<TaskDetailsForm> {
    return this.fb.nonNullable.group({
      title: [ task.title, [ Validators.required ] ],
      note: [ task.note ],
      priority: [ task.priority ],
      datetime: [ task.datetime ? new Date(task.datetime) : null ],
      reminder: [ task.reminder ],
      tag: [ task.tag ? task.tag.id : null ]
    });
  }


  private createCheckListForm(): FormGroup<CheckListForm> {
    return this.fb.nonNullable.group({
      title: [ '', [ Validators.minLength(2) ] ]
    });
  }


  private getTime(datetime?: Date | null): string {
    if (datetime) {
      const date = new Date(datetime);
      return `${ date.getHours() }:${ date.getMinutes() }`;
    }
    return '';
  }
}
