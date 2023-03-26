import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ExcelSheetColumns } from '../../config/download.config';
import { taskSortList } from '../../config/task-sort.config';
import { Group } from '../../interfaces/group.interface';
import { SortMenuItem } from '../../interfaces/sort.interface';
import { Task } from '../../interfaces/task.interface';
import { AccountState } from '../../models/account/store/account.state';
import { isGroupId } from '../../models/group/group.utils';
import { GroupState } from '../../models/group/store/group.state';
import { ShowMenu } from '../../models/menu/store/menu.actions';
import { SettingsState } from '../../models/settings/store/settings.state';
import { ClearTasks, DisplayCompleted, RemoveTask, SortTasks, UpdateTask } from '../../models/task/store/task.actions';
import { TaskState } from '../../models/task/store/task.state';
import { TaskFilter, TaskSort } from '../../models/task/task.enum';
import { priorityName } from '../../utils/task.utils';
import { GroupDetailsComponent } from '../groups/components/group-details/group-details.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';


@Component({
  templateUrl: './tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})
export class TasksComponent implements OnInit, OnDestroy {

  @Select(TaskState.selectSort)
  public sort$!: Observable<TaskSort>;

  @Select(SettingsState.pinnedGroups)
  public pinnedGroups$!: Observable<number[]>;

  public groupOrFilterId!: string;
  public tasks!: Task[];
  public editableTask!: Task | null;

  public filter!: typeof TaskFilter;
  public sort!: typeof TaskSort;
  public sortMenuItems: SortMenuItem[] = taskSortList;

  public shownEmpty!: boolean;
  public group!: Group | null;
  public shownCompleted!: boolean;
  public pinned!: boolean;

  private destroy$ = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private bottomSheet: MatBottomSheet) {

    this.filter = TaskFilter;
    this.sort = TaskSort;

    this.route.url.pipe(
      /** Init groupOrFilterId */
      filter(segments => segments.length !== 0),
      map(segments => segments[0].path),
      tap(groupOrFilterId => this.groupOrFilterId = groupOrFilterId),
      tap(groupOrFilterId => {
        if (isGroupId(groupOrFilterId)) {
          this.group = this.store.selectSnapshot(GroupState.selectGroup)(parseInt(groupOrFilterId));
        } else {
          this.group = null;
        }
      }),
      tap(groupOrFilterId =>
        this.pinned = this.store.selectSnapshot(SettingsState.pinnedGroups)
          .includes(Number(groupOrFilterId))
      ),

      /** Filter Task List by Group / Filter */
      switchMap(groupOrFilterId => this.store.select(TaskState.filterTasks).pipe(
        map(filterFn => filterFn(groupOrFilterId))
      )),
      tap(tasks => {
        const length = tasks.filter(i => {
          if (this.store.selectSnapshot(TaskState.selectDisplayCompleted)) {
            return true;
          }
          return !i.completed;
        }).length;
        this.shownEmpty = !length;
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(tasks => this.tasks = tasks);

    this.store.select(TaskState.selectDisplayCompleted).pipe(
      takeUntil(this.destroy$)
    ).subscribe(shown => this.shownCompleted = shown);
  }


  @HostListener('document:keydown', [ '$event' ])
  public onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.editableTask) {
      this.store.dispatch(new RemoveTask(this.editableTask.id));
    }
  }


  public ngOnInit(): void { }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onCheck(task: Task, listItem: TaskListItemComponent): void {
    listItem.sent = true;
    this.store.dispatch(new UpdateTask(task.id, { completed: !task.completed }))
      .subscribe(() => {
        listItem.sent = false;
        this.updateRenewable();
      });
  }


  public onEditTask(task: Task): void {
    this.bottomSheet.open(TaskDetailsComponent, {
      data: task.id,
      panelClass: 'bottom-sheet-container'
    });
  }


  public onSwipeRight(): void {
    this.store.dispatch(new ShowMenu(true));
  }


  public editGroup(): void {
    if (this.group) {
      this.bottomSheet.open(GroupDetailsComponent, {
        data: this.group.id
      });
    }
  }


  public showCompleted(shown: boolean): void {
    this.store.dispatch(new DisplayCompleted(shown));
  }


  public onSort(sort: TaskSort): void {
    this.store.dispatch(new SortTasks(sort));
  }


  public onClearList(): void {
    this.store.dispatch(new ClearTasks(this.tasks.map(i => i.id)));
  }


  public onDownload(): void {
    const user = this.store.selectSnapshot(AccountState.user);
    const group = this.store.selectSnapshot(GroupState.selectGroup)(parseInt(this.groupOrFilterId));

    const workbook = new ExcelJS.Workbook();
    workbook.creator = user?.fullName!;

    const worksheet = workbook.addWorksheet(group?.title);

    worksheet.columns = [
      { header: ExcelSheetColumns.task.title, key: ExcelSheetColumns.task.field },
      { header: ExcelSheetColumns.priority.title, key: ExcelSheetColumns.priority.field },
      { header: ExcelSheetColumns.tag.title, key: ExcelSheetColumns.tag.field },
      { header: ExcelSheetColumns.storypoint.title, key: ExcelSheetColumns.storypoint.field },
      { header: ExcelSheetColumns.estimate.title, key: ExcelSheetColumns.estimate.field },
      { header: ExcelSheetColumns.note.title, key: ExcelSheetColumns.note.field }
    ];
    worksheet.getColumn(1).width = ExcelSheetColumns.task.width;

    this.tasks.forEach(task => worksheet.addRow({
      [ExcelSheetColumns.task.field]: task.title,
      [ExcelSheetColumns.priority.field]: priorityName(task.priority),
      [ExcelSheetColumns.tag.field]: task.tag?.title,
      [ExcelSheetColumns.storypoint.field]: task.estStp,
      [ExcelSheetColumns.estimate.field]: task.estTime,
      [ExcelSheetColumns.note.field]: task.note
    }));

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([ data ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `Tasks - ${ group?.title }.xlsx`);
    });
  }


  private updateRenewable(): void {
    if (this.group?.renewable && !this.tasks.some(i => !i.completed)) {
      this.tasks.forEach(task => this.store.dispatch(new UpdateTask(task.id, { completed: false })));
    }
  }
}

