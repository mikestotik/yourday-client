import { TaskSort } from '../models/task/task.enum';


export const taskSortList = [
  { title: 'None', sort: TaskSort.None, icon: 'icon icon-checkmark-circle-off' },
  { title: 'Name', sort: TaskSort.Name, icon: 'icon icon-sort-alpha-asc' },
  { title: 'Priority', sort: TaskSort.Priority, icon: 'icon icon-sort-amount-asc' },
  { title: 'Created', sort: TaskSort.Created, icon: 'icon icon-calendar-today' }
];
