import { Routes } from '@angular/router';
import { TaskFilter } from '../../models/task/task.enum';
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
  }
];
