import { Routes } from '@angular/router';
import { AppRoutes } from './config/routes.config';
import { AuthPreGuard } from './models/auth/guards/auth-pre.guard';
import { AuthGuard } from './models/auth/guards/auth.guard';

export const AppRouting: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.App,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.App,
    loadChildren: () => import('./views/main/main.module').then(m => m.MainModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: AppRoutes.Auth,
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    canActivate: [ AuthPreGuard ]
  },
  {
    path: AppRoutes.Errors,
    loadChildren: () => import('./views/errors/errors.module').then(m => m.ErrorsModule)
  }
];
