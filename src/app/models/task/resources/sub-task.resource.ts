import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../../config/api.config';
import { SubTask, SubTaskPayload } from '../../../interfaces/sub-task.interface';


@Injectable()
export class SubTaskResource {

  constructor(
    private http: HttpClient) {
  }


  public create(taskId: number, value: SubTaskPayload): Observable<SubTask> {
    return this.http.post<SubTask>(ApiConfig.SUB_TASKS, {
      ...value,
      task: taskId
    });
  }


  public update(id: number, value: Partial<SubTaskPayload>): Observable<SubTask> {
    return this.http.patch<SubTask>(`${ ApiConfig.SUB_TASKS }/${ id }`, value);
  }


  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ ApiConfig.SUB_TASKS }/${ id }`);
  }

}
