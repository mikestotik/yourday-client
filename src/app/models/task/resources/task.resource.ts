import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { Task, TaskPayload, TaskUpdate } from '../../../interfaces/task.interface';


@Injectable()
export class TaskResource {

  constructor(
    private http: HttpClient) {
  }


  public getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(ApiConfig.TASKS);
  }


  public getByGroup(groupId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${ ApiConfig.TASKS }/group/${ groupId }`);
  }


  public getOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${ ApiConfig.TASKS }/${ id }`);
  }


  public create(value: TaskPayload): Observable<Task> {
    return this.http.post<Task>(ApiConfig.TASKS, value);
  }


  public update(id: number, value: Partial<TaskUpdate>): Observable<Task> {
    return this.http.patch<Task>(`${ ApiConfig.TASKS }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.TASKS }/${ id }`);
  }

}
