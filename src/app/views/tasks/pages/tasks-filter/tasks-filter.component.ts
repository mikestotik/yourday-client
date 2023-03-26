import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { taskSortList } from '../../../../config/task-sort.config';
import { NavItem } from '../../../../interfaces/navigation.interface';
import { SortMenuItem } from '../../../../interfaces/sort.interface';
import { Task } from '../../../../interfaces/task.interface';
import { AccountState } from '../../../../models/account/store/account.state';
import { ShowMenu } from '../../../../models/menu/store/menu.actions';
import { NavigationState } from '../../../../models/navigation/store/navigation.state';
import {
  ClearTasks,
  RemoveTask,
  SortTasks,
  ToggleDisplayCompleted,
  UpdateTask
} from '../../../../models/task/store/task.actions';
import { TaskState } from '../../../../models/task/store/task.state';
import { TaskFilter, TaskSort } from '../../../../models/task/task.enum';
import { downloadTasksAsExcel } from '../../../../utils/download.utils';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { TaskListItemComponent } from '../../components/task-list-item/task-list-item.component';


@Component({
  templateUrl: './tasks-filter.component.html',
  styleUrls: [ './tasks-filter.component.scss' ]
})
export class TasksFilterComponent implements OnInit, OnDestroy {

  @Select(TaskState.selectSort)
  public sort$!: Observable<TaskSort>;

  @Select(TaskState.selectDisplayCompleted)
  public displayCompleted$!: Observable<boolean>;

  public tasks!: Task[];
  public editableTask!: Task | null;

  public sortMenuItems: SortMenuItem[] = taskSortList;
  public sort!: typeof TaskSort;
  public shownEmpty!: boolean;
  public filter!: typeof TaskFilter;
  public filterNavItem!: NavItem;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly bottomSheet: MatBottomSheet) {

    this.filter = TaskFilter;
    this.sort = TaskSort;

    this.route.url.pipe(
      filter(segments => segments.length !== 0),
      map(segments => segments[1].path as TaskFilter),
      map(filterId => this.store.selectSnapshot(NavigationState.pageNavTasksItem)(filterId)),
      tap(filterNavItem => this.filterNavItem = filterNavItem),
      switchMap(filterNavItem => this.store.select(TaskState.selectFilterTasks).pipe(
        map(filterFn => filterFn(filterNavItem.routerLink as TaskFilter))
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


  public ngOnInit(): void { }


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
    downloadTasksAsExcel(this.filterNavItem.title, user?.fullName!, this.tasks);
  }


  public onCheck(task: Task, listItem: TaskListItemComponent): void {
    listItem.sent = true;
    this.store.dispatch(new UpdateTask(task.id, { completed: !task.completed }))
      .subscribe(() => listItem.sent = false);
  }


  public onEditTask(task: Task): void {
    this.bottomSheet.open(TaskDetailsComponent, {
      data: task.id,
      panelClass: 'bottom-sheet-container'
    });
  }

}
