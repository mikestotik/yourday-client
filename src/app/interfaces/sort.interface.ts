import { TaskSort } from '../models/task/task.enum';


export interface SortMenuItem {
  title: string;
  sort: TaskSort;
  icon: string;
}
