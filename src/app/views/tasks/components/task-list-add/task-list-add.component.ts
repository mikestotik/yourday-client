import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTask } from '../../../../models/task/store/task.actions';
import { TaskFilter } from '../../../../models/task/task.enum';


interface TaskForm {
  title: FormControl<string>;
}


@Component({
  selector: 'app-task-list-add',
  templateUrl: './task-list-add.component.html',
  styleUrls: [ './task-list-add.component.scss' ]
})
export class TaskListAddComponent implements OnInit {

  @Input()
  public groupOrFilterId!: string;

  @Input()
  public isFirst!: boolean;

  @Output()
  public blurEvent = new EventEmitter<void>();

  @ViewChild('taskInput', { static: true })
  public taskInputRef!: ElementRef<HTMLInputElement>;

  public form!: FormGroup<TaskForm>;
  public sent!: boolean;
  public focused!: boolean;


  constructor(
    private fb: FormBuilder,
    private store: Store) {
  }


  public ngOnInit(): void {
    this.form = this.createForm();

    if (this.isFirst) {
      this.taskInputRef.nativeElement.focus();
    }
  }


  public onSubmit(): void {
    if (this.form.valid) {
      this.sent = true;

      this.store.dispatch(new AddTask({
        title: this.form.value.title as string,
        group: !isNaN(Number(this.groupOrFilterId)) ? Number(this.groupOrFilterId) : null,
        datetime: this.groupOrFilterId === TaskFilter.Today ? new Date() : null
      }))
        .subscribe(() => {
          this.form.reset();
          this.sent = false;
        });
    }
  }


  public onBlur(): void {
    if (this.form.value.title?.length! >= 3) {
      this.onSubmit();
    }
    this.blurEvent.emit();
  }


  private createForm(): FormGroup<TaskForm> {
    return this.fb.nonNullable.group({
      title: [ '', [ Validators.required ] ]
    });
  }
}
