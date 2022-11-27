import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { UserCredentials } from '../../../interfaces/account.interface';
import { LoginResponse } from '../../../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthResource {

  constructor(
    private http: HttpClient) {
  }


  public login(payload: UserCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(ApiConfig.AUTH_LOGIN, payload);
  }


  public refresh(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(ApiConfig.AUTH_REFRESH);
  }


  public logout(): Observable<void> {
    return this.http.get<void>(ApiConfig.AUTH_LOGOUT);
  }
}
