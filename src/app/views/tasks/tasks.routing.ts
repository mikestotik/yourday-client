import { Routes } from '@angular/router';
import { TaskFilter } from '../../enums/task.enum';
import { TasksFilterComponent } from './pages/tasks-filter/tasks-filter.component';
import { TasksGroupComponent } from './pages/tasks-group/tasks-group.component';


export const TasksRouting: Routes = [
  {
    path: '',
    redirectTo: `filter/${ TaskFilter.Incoming }`,
    pathMatch: 'full'
  },
  {
    path: 'filter/:id',
    component: TasksFilterComponent
  },
  {
    path: 'group/:id',
    component: TasksGroupComponent
  }
];
