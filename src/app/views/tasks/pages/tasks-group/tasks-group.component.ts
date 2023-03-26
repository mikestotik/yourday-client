import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { taskSortList } from '../../../../config/task-sort.config';
import { Group } from '../../../../interfaces/group.interface';
import { SortMenuItem } from '../../../../interfaces/sort.interface';
import { Task } from '../../../../interfaces/task.interface';
import { AccountState } from '../../../../models/account/store/account.state';
import { GroupState } from '../../../../models/group/store/group.state';
import { ShowMenu } from '../../../../models/menu/store/menu.actions';
import {
  ClearTasks,
  DownloadExcel,
  RemoveTask,
  SortTasks,
  ToggleDisplayCompleted,
  UpdateTask
} from '../../../../models/task/store/task.actions';
import { TaskState } from '../../../../models/task/store/task.state';
import { TaskSort } from '../../../../models/task/task.enum';
import { GroupDetailsComponent } from '../../../groups/components/group-details/group-details.component';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { TaskListItemComponent } from '../../components/task-list-item/task-list-item.component';


@Component({
  templateUrl: './tasks-group.component.html',
  styleUrls: [ './tasks-group.component.scss' ]
})
export class TasksGroupComponent implements OnInit, OnDestroy {

  @Select(TaskState.selectSort)
  public sort$!: Observable<TaskSort>;

  @Select(TaskState.selectDisplayCompleted)
  public displayCompleted$!: Observable<boolean>;

  public group!: Group;
  public tasks!: Task[];
  public editableTask!: Task | null;
  public sortMenuItems: SortMenuItem[] = taskSortList;
  public sort!: typeof TaskSort;
  public shownEmpty!: boolean;
  public groupId!: number;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly bottomSheet: MatBottomSheet) {

    this.sort = TaskSort;

    this.route.url.pipe(
      filter(segments => segments.length !== 0),
      map(segments => parseInt(segments[1].path)),
      switchMap(groupId => this.store.select(GroupState.selectGroup).pipe(
        map(filterFn => filterFn(groupId))
      )),
      filter(value => !!value),
      map(value => value as Group),
      tap(group => this.group = group),
      switchMap(group => this.store.select(TaskState.selectGroupTasks).pipe(
        map(filterFn => filterFn(group.id))
      )),
      takeUntil(this.destroy$)
    )
      .subscribe(value => this.tasks = value);
  }


  @HostListener('document:keydown', [ '$event' ])
  public onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.editableTask) {
      this.store.dispatch(new RemoveTask(this.editableTask.id));
    }
  }


  public ngOnInit(): void {}


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onSwipeRight(): void {
    this.store.dispatch(new ShowMenu(true));
  }


  public toggleDisplayCompleted(): void {
    this.store.dispatch(new ToggleDisplayCompleted());
  }


  public onSort(sort: TaskSort): void {
    this.store.dispatch(new SortTasks(sort));
  }


  public onClearList(): void {
    this.store.dispatch(new ClearTasks(this.tasks.map(i => i.id)));
  }


  public onDownload(): void {
    const user = this.store.selectSnapshot(AccountState.user);

    this.store.dispatch(new DownloadExcel(this.group.title, user?.fullName!, this.tasks));
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


  public editGroup(): void {
    if (this.group) {
      this.bottomSheet.open(GroupDetailsComponent, {
        data: this.group.id
      });
    }
  }


  private updateRenewable(): void {
    if (this.group?.renewable && !this.tasks.some(i => !i.completed)) {
      this.tasks.forEach(task => this.store.dispatch(new UpdateTask(task.id, { completed: false })));
    }
  }
}
