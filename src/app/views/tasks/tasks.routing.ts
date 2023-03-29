import { Routes } from '@angular/router';
import { TasksRoutes } from '../../config/routes.config';
import { TaskFilter } from '../../enums/task.enum';
import { TasksFilterComponent } from './pages/tasks-filter/tasks-filter.component';
import { TasksGroupComponent } from './pages/tasks-group/tasks-group.component';


export const TasksRouting: Routes = [
  {
    path: '',
    redirectTo: `${ TasksRoutes.Filter }/${ TaskFilter.Incoming }`,
    pathMatch: 'full'
  },
  {
    path: `${ TasksRoutes.Filter }/:id`,
    component: TasksFilterComponent
  },
  {
    path: `${ TasksRoutes.Group }/:id`,
    component: TasksGroupComponent
  }
];
