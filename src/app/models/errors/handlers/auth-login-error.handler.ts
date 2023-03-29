import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { ResponseError } from '../../../interfaces/error.interface';
import { ErrorHandler } from '../error-handler.interface';


export class AuthLoginErrorHandler implements ErrorHandler {

  constructor(
    private readonly snackBar: MatSnackBar) {
  }


  public handle(errorResponse: HttpErrorResponse): Observable<never> {
    const error = errorResponse.error as ResponseError;

    switch (errorResponse.status) {
      case HttpStatusCode.BadRequest:
        this.snackBar.open(error.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 5000
        });
        return throwError(() => null);
      default:
        return throwError(() => errorResponse);
    }
  }

}
