import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTask, SubTaskPayload } from '../../../interfaces/sub-task.interface';
import { SubTaskResource } from '../resources/sub-task.resource';


@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  constructor(
    private resource: SubTaskResource) {
  }


  public create(taskId: number, value: SubTaskPayload): Observable<SubTask> {
    return this.resource.create(taskId, value);
  }


  public update(id: number, value: Partial<SubTaskPayload>): Observable<SubTask> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
