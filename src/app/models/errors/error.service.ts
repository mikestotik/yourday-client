import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { ApiConfig } from '../../config/api.config';
import { ErrorHandler } from './error-handler.interface';
import { AccountMeErrorHandler } from './handlers/account-me-error.handler';
import { AuthLoginErrorHandler } from './handlers/auth-login-error.handler';
import { AuthRefreshErrorHandler } from './handlers/auth-refresh-error.handler';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private readonly errorHandlers!: Map<string, ErrorHandler>;


  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar) {

    this.errorHandlers = new Map([
      [ ApiConfig.ACCOUNT_ME, new AccountMeErrorHandler() ],
      [ ApiConfig.AUTH_REFRESH, new AuthRefreshErrorHandler(router, store) ],
      [ ApiConfig.AUTH_LOGIN, new AuthLoginErrorHandler(snackBar) ],
    ]);
  }


  public handleError(requestUrl: string, errorResponse: HttpErrorResponse): Observable<never> {
    const errorHandler = this.errorHandlers.get(requestUrl);

    if (errorHandler) {
      return errorHandler.handle(errorResponse);
    }
    return throwError(() => errorResponse);
  }
}
