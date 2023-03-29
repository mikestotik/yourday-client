import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from '../models/errors/error.service';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly errorService: ErrorService) {
  }


  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => this.errorService.handleError(request.url, errorResponse))
    );
  }


  // public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request).pipe(
  //     catchError((errorResponse: HttpErrorResponse) => {
  //       if (errorResponse.status === 401) {
  //         return throwError(() => errorResponse);
  //       }
  //
  //       const apiError: ResponseError = errorResponse.error;
  //
  //       if (apiError && apiError.message) {
  //         this.snackBar.open(apiError.message, 'Close', {
  //           verticalPosition: 'top',
  //           horizontalPosition: 'end',
  //           duration: 5000
  //         });
  //       }
  //       return throwError(() => errorResponse);
  //     })
  //   );
  // }
}
