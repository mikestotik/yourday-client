import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { AccountActivation, AccountRegister, UpdatePasswordPayload, User } from '../../../interfaces/account.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountResource {

  constructor(
    private http: HttpClient) {
  }


  public create(payload: AccountRegister): Observable<void> {
    return this.http.post<void>(ApiConfig.ACCOUNT, payload);
  }


  public activate(payload: AccountActivation): Observable<void> {
    return this.http.post<void>(ApiConfig.ACCOUNT_ACTIVATE, payload);
  }


  public getCurrent(): Observable<User> {
    return this.http.get<User>(`${ ApiConfig.ACCOUNT_ME }`);
  }


  public update(id: number, value: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${ ApiConfig.ACCOUNT }/${ id }`, value);
  }


  public updatePassword(payload: UpdatePasswordPayload): Observable<void> {
    return this.http.post<void>(`${ ApiConfig.ACCOUNT_UPDATE_PASS }`, payload);
  }
}
