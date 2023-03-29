import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ErrorHandler {
  handle(errorResponse: HttpErrorResponse): Observable<never>;
}
