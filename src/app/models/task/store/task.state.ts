import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { isGroupId } from '../../group/group.utils';
import { SubTaskService } from '../services/sub-task.service';
import { TaskService } from '../services/task.service';
import { TaskFilter, TaskSort } from '../task.enum';
import {
  AddSubTask,
  AddTask,
  AddTaskToStore, DeleteSubTask,
  DisplayCompleted,
  GetTask,
  GetTasks,
  GetTasksByGroup,
  RemoveTask,
  RemoveTaskFromStore,
  RemoveTasksByGroup,
  SortTasks,
  UpdateTask,
  UpdateTaskInStore
} from './task.actions';


export interface TaskModel {
  tasks: Task[];
  sort: TaskSort;
  shownCompleted?: boolean;
}


@State<TaskModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    sort: TaskSort.None,
    shownCompleted: false
  }
})
@Injectable({
  providedIn: 'root'
})
export class TaskState {

  @Selector()
  public static tasks(state: TaskModel): Task[] {
    return state.tasks;
  }


  @Selector()
  public static sort(state: TaskModel): TaskSort {
    return state.sort;
  }


  @Selector()
  public static task(state: TaskModel) {
    return (id: number): Task | undefined => {
      return state.tasks.find(i => i.id === id);
    };
  }


  @Selector()
  public static filterTasks(state: TaskModel) {
    return (groupOrFilterId: string | number): Task[] => {
      if (isGroupId(groupOrFilterId)) {
        return filterByGroup(Number(groupOrFilterId), state);
      } else {
        return filterByFilter(groupOrFilterId as string, state);
      }
    };
  }


  @Selector()
  public static shownCompleted(state: TaskModel): boolean {
    return state.shownCompleted!;
  }


  constructor(
    private taskService: TaskService,
    private subTaskService: SubTaskService) {
  }


  @Action(GetTasks)
  public getAll(ctx: StateContext<TaskModel>): Observable<Task[]> {
    return this.taskService.getAll().pipe(
      tap(all => ctx.patchState({ tasks: all }))
    );
  }


  @Action(GetTasksByGroup)
  public getByGroup(ctx: StateContext<TaskModel>, { groupId }: GetTasksByGroup): Observable<Task[]> {
    const state = ctx.getState();
    return this.taskService.getByGroup(groupId).pipe(
      tap(value => ctx.patchState({
        tasks: [ ...state.tasks, ...value ]
      }))
    );
  }


  @Action(RemoveTasksByGroup)
  public removeByGroup(ctx: StateContext<TaskModel>, { groupId }: RemoveTasksByGroup): TaskModel {
    const state = ctx.getState();
    return ctx.patchState({
      tasks: state.tasks.filter(i => {
        if (i.group) {
          return i.group !== groupId;
        }
        return true;
      })
    });
  }


  @Action(GetTask)
  public getOne(ctx: StateContext<TaskModel>, { id }: GetTask): Observable<TaskModel> {
    const state = ctx.getState();

    return this.taskService.getOne(id).pipe(
      map(value => {
        const exists = state.tasks.find(i => i.id === value.id);
        if (exists) {
          return update(ctx, value);
        } else {
          return add(ctx, value);
        }
      })
    );
  }


  @Action(AddTask)
  public add(ctx: StateContext<TaskModel>, { task }: AddTask): Observable<TaskModel> | TaskModel {
    return this.taskService.create(task).pipe(
      map(value => add(ctx, value))
    );
  }


  @Action(UpdateTask)
  public update(ctx: StateContext<TaskModel>, { id, task }: UpdateTask): Observable<TaskModel> {
    return this.taskService.update(id, task).pipe(
      map(value => update(ctx, value))
    );
  }


  @Action(RemoveTask)
  public remove(ctx: StateContext<TaskModel>, action: RemoveTask): Observable<TaskModel> | TaskModel {
    return this.taskService.delete(action.id).pipe(
      map(() => remove(ctx, action.id))
    );
  }


  @Action(AddTaskToStore)
  public addTaskOnlyStore(ctx: StateContext<TaskModel>, { task }: AddTaskToStore) {
    add(ctx, task);
  }


  @Action(UpdateTaskInStore)
  public updateTaskInStore(ctx: StateContext<TaskModel>, { task }: UpdateTaskInStore) {
    update(ctx, task);
  }


  @Action(RemoveTaskFromStore)
  public removeTaskFromStore(ctx: StateContext<TaskModel>, { id }: RemoveTaskFromStore) {
    remove(ctx, id);
  }


  @Action(DisplayCompleted)
  public displayCompleted(ctx: StateContext<TaskModel>, { display }: DisplayCompleted): TaskModel {
    return ctx.patchState({ shownCompleted: display });
  }


  @Action(SortTasks)
  public sort(ctx: StateContext<TaskModel>, { sort }: SortTasks): void {
    ctx.patchState({ sort });
  }


  @Action(AddSubTask)
  public addSubTask(ctx: StateContext<TaskModel>, { taskId, payload }: AddSubTask): Observable<TaskModel> {
    return this.subTaskService.create(taskId, payload).pipe(
      map(subTask => {
        const state = ctx.getState();

        return ctx.patchState({
          tasks: state.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, checkList: [ ...task.checkList, subTask ] };
            }
            return task;
          })
        });
      })
    );
  }

  @Action(DeleteSubTask)
  public deleteSubTask(ctx: StateContext<TaskModel>, { taskId, id }: DeleteSubTask): Observable<void> {
    return this.subTaskService.delete(id).pipe(
      tap(() => {
        const state = ctx.getState();
        return ctx.patchState({
          tasks: state.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, checkList: task.checkList.filter(i => i.id !== id) };
            }
            return task;
          })
        });
      })
    );
  }
}


function filterByGroup(id: number, state: TaskModel): Task[] {
  return state.tasks.filter(i => i.group && i.group === id);
}

function filterByFilter(filter: string, state: TaskModel) {
  switch (filter) {
    case TaskFilter.All:
      return state.tasks;
    case TaskFilter.Incoming:
      return state.tasks.filter(i => !i.group);
    case TaskFilter.Today:
      return state.tasks.filter(i => moment().isSame(i.datetime, 'day'));
    case TaskFilter.Upcoming:
      return state.tasks.filter(i => moment().isBefore(i.datetime));
    default:
      return [];
  }
}

function add(ctx: StateContext<TaskModel>, value: Task | Task[]): TaskModel {
  const state = ctx.getState();
  const all = [ ...state.tasks ];
  Array.isArray(value) ? all.push(...value) : all.push(value);
  return ctx.patchState({ tasks: all });
}

function update(ctx: StateContext<TaskModel>, value: Task): TaskModel {
  const state = ctx.getState();
  const all = state.tasks.map(i => i.id === value.id ? value : i);
  return ctx.patchState({ tasks: all });
}

function remove(ctx: StateContext<TaskModel>, value: number | number[]): TaskModel {
  const state = ctx.getState();
  const all = state.tasks.filter(
    i => Array.isArray(value) ? !value.includes(i.id) : i.id !== value
  );
  return ctx.patchState({ tasks: all });
}
