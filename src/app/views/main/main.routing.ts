import { Routes } from '@angular/router';
import { MainRoutes } from '../../config/routes.config';
import { AccountResolver } from '../../models/account/resolvers/account.resolver';
import { GroupResolver } from '../../models/group/resolvers/group.resolver';
import { SettingsResolver } from '../../models/settings/resolvers/settings.resolver';
import { TaskResolver } from '../../models/task/resolvers/task.resolver';
import { MainComponent } from './main.component';


export const MainRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      account: AccountResolver,
      groups: GroupResolver,
      tasks: TaskResolver,
      settings: SettingsResolver
    },
    children: [
      {
        path: '',
        redirectTo: MainRoutes.Tasks,
        pathMatch: 'full'
      },
      {
        path: MainRoutes.Tasks,
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: MainRoutes.Notifications,
        loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: MainRoutes.Statistics,
        loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: MainRoutes.Settings,
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  }
];
