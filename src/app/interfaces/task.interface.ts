import { TaskPriority } from '../models/task/task.enum';
import { User } from './account.interface';
import { Entity } from './entity.interface';
import { SubTask } from './sub-task.interface';
import { Tag } from './tag.interface';


export interface TaskPayload {
  title: string;
  datetime: Date | null;
  group: number | null;
}


export interface Task extends Entity, TaskPayload {
  note: string | null;
  priority: TaskPriority | null;
  completed: boolean;
  reminder: number | null;
  owner: User;
  tag: Tag | null;
  checkList: SubTask[];
  estTime: string;
  estStp: number;
}


export interface TaskUpdate extends Entity, TaskPayload {
  note: string | null;
  priority: TaskPriority | null;
  completed: boolean;
  reminder: number | null;
  owner: User;
  tag: number | null;
  estTime: string | null;
  estStp: number | null;
}


export interface TaskPriorityItem {
  id: TaskPriority;
  title: string;
}
