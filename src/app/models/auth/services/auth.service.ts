import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '../../../interfaces/account.interface';
import { LoginResponse } from '../../../interfaces/auth.interface';
import { AuthResource } from '../resources/auth.resource';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly cachedRequests: Array<HttpRequest<unknown>> = [];


  constructor(
    private resource: AuthResource) {
  }


  public login(payload: UserCredentials): Observable<LoginResponse> {
    return this.resource.login(payload);
  }


  public refresh(): Observable<LoginResponse> {
    return this.resource.refresh();
  }


  public logout(): Observable<void> {
    return this.resource.logout();
  }


  public collectFailedRequest(request: HttpRequest<unknown>): void {
    this.cachedRequests.push(request);
  }
}
