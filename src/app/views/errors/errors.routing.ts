import { Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';

export const ErrorsRouting: Routes = [
  {
    path: 'not-found',
    component: ErrorNotFoundComponent
  }
];
