import { Routes } from '@angular/router';
import { SettingsRoute } from '../../config/routes.config';
import { SettingsAccountComponent } from './pages/settings-account/settings-account.component';
import { SettingsGeneralComponent } from './pages/settings-general/settings-general.component';
import { SettingsComponent } from './settings.component';

export const SettingsRouting: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: SettingsRoute.Account,
        pathMatch: 'full'
      },
      {
        path: SettingsRoute.Account,
        component: SettingsAccountComponent
      },
      {
        path: SettingsRoute.General,
        component: SettingsGeneralComponent
      }
    ]
  }
];
