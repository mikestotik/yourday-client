import { Routes } from '@angular/router';
import { AuthRoutes } from '../../config/routes.config';
import { AuthComponent } from './auth.component';
import { AuthActivateComponent } from './pages/auth-activate/auth-activate.component';
import { AuthGoogleComponent } from './pages/auth-google/auth-google.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import { AuthResetComponent } from './pages/auth-reset/auth-reset.component';


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
        path: `${ AuthRoutes.Google }/:tokens`,
        component: AuthGoogleComponent
      },
      {
        path: `${ AuthRoutes.Activate }/:email`,
        component: AuthActivateComponent
      },
      {
        path: `${ AuthRoutes.ResetPass }`,
        component: AuthResetComponent
      }
    ]
  }
];
