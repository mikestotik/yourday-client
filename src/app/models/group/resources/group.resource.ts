import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { CreateGroupPayload, Group } from '../../../interfaces/group.interface';


@Injectable()
export class GroupResource {

  constructor(
    private http: HttpClient) {
  }


  public getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(ApiConfig.GROUPS);
  }


  public getOne(id: number): Observable<Group> {
    return this.http.get<Group>(`${ ApiConfig.GROUPS }/${ id }`);
  }


  public create(value: CreateGroupPayload): Observable<Group> {
    return this.http.post<Group>(ApiConfig.GROUPS, value);
  }


  public update(id: number, value: Partial<Group>): Observable<Group> {
    return this.http.patch<Group>(`${ ApiConfig.GROUPS }/${ id }`, value);
  }


  public delete(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${ ApiConfig.GROUPS }/${ id }`);
  }


  public share(id: number, email: string): Observable<Group> {
    return this.http.post<Group>(`${ ApiConfig.GROUPS }/${ id }/share`, { email });
  }


  public unshare(id: number, email: string): Observable<Group> {
    return this.http.post<Group>(`${ ApiConfig.GROUPS }/${ id }/unshare`, { email });
  }

}
