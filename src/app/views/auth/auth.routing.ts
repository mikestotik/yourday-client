import { Routes } from '@angular/router';
import { AuthRoutes } from '../../config/routes.config';
import { AuthComponent } from './auth.component';
import { AuthActivateComponent } from './pages/auth-activate/auth-activate.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';

export const AuthRouting: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: AuthRoutes.Login,
        pathMatch: 'full'
      },
      {
        path: AuthRoutes.Login,
        component: AuthLoginComponent
      },
      {
        path: AuthRoutes.Register,
        component: AuthRegisterComponent
      },
      {
        path: `${ AuthRoutes.Activate }/:email`,
        component: AuthActivateComponent
      }
    ]
  }
];
