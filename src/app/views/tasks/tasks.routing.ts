import { Routes } from '@angular/router';
import { TaskFilter } from '../../models/task/task.enum';
import { TasksFilterComponent } from './pages/tasks-filter/tasks-filter.component';
import { TasksGroupComponent } from './pages/tasks-group/tasks-group.component';
import { TasksComponent } from './tasks.component';


export const TasksRouting: Routes = [
  {
    path: '',
    redirectTo: TaskFilter.Incoming,
    pathMatch: 'full'
  },
  {
    path: ':groupOrFilterId',
    component: TasksComponent
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
