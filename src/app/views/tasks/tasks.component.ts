import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { AccountState } from '../../models/account/store/account.state';
import { isGroupId } from '../../models/group/group.utils';
import { GroupState } from '../../models/group/store/group.state';
import { ShowMenu } from '../../models/menu/store/menu.actions';
import { SettingsState } from '../../models/settings/store/settings.state';
import { ClearTasks, DisplayCompleted, RemoveTask, SortTasks, UpdateTask } from '../../models/task/store/task.actions';
import { TaskState } from '../../models/task/store/task.state';
import { TaskFilter, TaskPriority, TaskSort } from '../../models/task/task.enum';
import { GroupDetailsComponent } from '../groups/components/group-details/group-details.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';


interface SortMenuItem {
  title: string;
  sort: TaskSort;
  icon: string;
}


@Component({
  templateUrl: './tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})
export class TasksComponent implements OnInit, OnDestroy {

  @Select(TaskState.sort)
  public sort$!: Observable<TaskSort>;

  @Select(SettingsState.pinnedGroups)
  public pinnedGroups$!: Observable<number[]>;

  public groupOrFilterId!: string;
  public tasks!: Task[];
  public editableTask!: Task | null;

  public filter!: typeof TaskFilter;
  public sort!: typeof TaskSort;
  public sortMenuItems!: SortMenuItem[];

  public shownEmpty!: boolean;
  public isGroup!: boolean;
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

    this.sortMenuItems = [
      { title: 'None', sort: TaskSort.None, icon: 'icon icon-checkmark-circle-off' },
      { title: 'Name', sort: TaskSort.Name, icon: 'icon icon-sort-alpha-asc' },
      { title: 'Priority', sort: TaskSort.Priority, icon: 'icon icon-sort-amount-asc' },
      { title: 'Created', sort: TaskSort.Created, icon: 'icon icon-calendar-today' }
    ];

    this.route.url.pipe(
      /** Init groupOrFilterId */
      filter(segments => segments.length !== 0),
      map(segments => segments[0].path),
      tap(groupOrFilterId => this.groupOrFilterId = groupOrFilterId),
      tap(groupOrFilterId => this.isGroup = isGroupId(groupOrFilterId)),
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
          if (this.store.selectSnapshot(TaskState.shownCompleted)) {
            return true;
          }
          return !i.completed;
        }).length;
        this.shownEmpty = !length;
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(tasks => this.tasks = tasks);

    this.store.select(TaskState.shownCompleted).pipe(
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
      .subscribe(() => listItem.sent = false);
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
    if (this.isGroup) {
      this.bottomSheet.open(GroupDetailsComponent, {
        data: Number(this.groupOrFilterId)
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
    const group = this.store.selectSnapshot(GroupState.group)(parseInt(this.groupOrFilterId));

    const columns = {
      Task: 'task',
      Priority: 'priority',
      Note: 'note'
    };

    const workbook = new ExcelJS.Workbook();
    workbook.creator = user?.fullName!;

    const worksheet = workbook.addWorksheet(group?.title);

    worksheet.columns = [
      { header: 'Task', key: columns.Task },
      { header: 'Priority', key: columns.Priority },
      { header: 'Note', key: columns.Note }
    ];
    worksheet.getColumn(1).width = 80;

    this.tasks.forEach(task => {
      worksheet.addRow({ task: task.title, priority: priorityName(task.priority), note: task.note });
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([ data ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `Tasks - ${ group?.title }.xlsx`);
    });
  }
}

function priorityName(priority: TaskPriority | null): string {
  switch (priority) {
    case TaskPriority.Low:
      return 'Low'
    case TaskPriority.Middle:
      return 'Middle'
    case TaskPriority.High:
      return 'High'
    case TaskPriority.VeryHigh:
      return 'VeryHigh'
    default:
      return 'Middle'
  }
}
