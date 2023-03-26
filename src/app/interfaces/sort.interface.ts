import { TaskSort } from '../enums/task.enum';


export interface SortMenuItem {
  title: string;
  sort: TaskSort;
  icon: string;
}
