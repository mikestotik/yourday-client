import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseError } from '../interfaces/error.interface';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar) {
  }


  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          return throwError(() => errorResponse);
        }

        const apiError: ResponseError = errorResponse.error;

        if (apiError && apiError.message) {
          this.snackBar.open(apiError.message, 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000
          });
        }
        return throwError(() => errorResponse);
      })
    );
  }
}
