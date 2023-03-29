import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandler } from '../error-handler.interface';


export class AccountMeErrorHandler implements ErrorHandler {

  public handle(errorResponse: HttpErrorResponse): Observable<never> {
    return throwError(() => errorResponse);
  }

}
