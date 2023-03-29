import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { AppRoutes, AuthRoutes } from '../../../config/routes.config';
import { ClearState } from '../../auth/store/auth.actions';
import { ErrorHandler } from '../error-handler.interface';


export class AuthRefreshErrorHandler implements ErrorHandler {

  constructor(
    private readonly router: Router,
    private readonly store: Store) {
  }


  public handle(errorResponse: HttpErrorResponse): Observable<never> {
    switch (errorResponse.status) {
      case HttpStatusCode.Forbidden: // todo: add inner codes "Access Denied: tokens not matched"
      case HttpStatusCode.NotFound:
        return this.store.dispatch(new ClearState()).pipe(
          map(() => this.router.navigate([ AppRoutes.Auth, AuthRoutes.Login ])),
          switchMap(() => throwError(() => errorResponse))
        );
      default:
        return throwError(() => errorResponse);
    }
  }


}
