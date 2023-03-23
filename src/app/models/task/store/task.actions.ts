import { SubTaskPayload } from '../../../interfaces/sub-task.interface';
import { Task, TaskPayload, TaskUpdate } from '../../../interfaces/task.interface';
import { TaskSort } from '../task.enum';


export class GetTasks {
  static readonly type = '[Task] GetTasks';
}


export class GetTasksByGroup {
  static readonly type = '[Task] GetTasksByGroup';


  constructor(
    public groupId: number) {
  }
}


export class RemoveTasksByGroup {
  static readonly type = '[Task] RemoveTasksByGroup';


  constructor(
    public groupId: number) {
  }
}


export class GetTask {
  static readonly type = '[Task] GetTask';


  constructor(
    public id: number) {
  }
}


export class AddTask {
  static readonly type = '[Task] AddTask';


  constructor(
    public task: TaskPayload) {
  }
}


export class AddTaskToStore {
  static readonly type = '[Task] AddTaskOnlyStore';


  constructor(
    public task: Task) {
  }
}


export class UpdateTaskInStore {
  static readonly type = '[Task] UpdateTaskInStore';


  constructor(
    public task: Task) {
  }
}


export class RemoveTaskFromStore {
  static readonly type = '[Task] RemoveTaskFromStore';


  constructor(
    public id: number) {
  }
}


export class UpdateTask {
  static readonly type = '[Task] UpdateTask';


  constructor(
    public id: number,
    public task: Partial<TaskUpdate>) {
  }
}


export class RemoveTask {
  static readonly type = '[Tasks] DeleteTask';


  constructor(
    public id: number) {
  }
}


export class DisplayCompleted {
  static readonly type = '[Tasks] DisplayCompleted';


  constructor(
    public display: boolean) {
  }
}


export class SortTasks {
  static readonly type = '[Tasks] SortTasks';


  constructor(
    public sort: TaskSort) {
  }
}


export class ClearTasks {
  static readonly type = '[Tasks] ClearTasks';


  constructor(
    public ids: number[]) {
  }
}


export class AddSubTask {
  static readonly type = '[Tasks] AddSubTask';


  constructor(
    public taskId: number,
    public payload: SubTaskPayload) {
  }
}


export class UpdateSubTask {
  static readonly type = '[Tasks] UpdateSubTask';


  constructor(
    public taskId: number,
    public payload: Partial<SubTaskPayload>) {
  }
}


export class DeleteSubTask {
  static readonly type = '[Tasks] DeleteSubTask';


  constructor(
    public taskId: number,
    public id: number) {
  }
}


export class DownloadExcel {
  static readonly type = '[Tasks] DownloadExcel';


  constructor(
    public tasks: Task[]) {
  }
}
