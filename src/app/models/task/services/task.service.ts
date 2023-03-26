import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskPayload, TaskUpdate } from '../../../interfaces/task.interface';
import { TaskResource } from '../resources/task.resource';


@Injectable()
export class TaskService {

  constructor(
    private resource: TaskResource) {
  }


  public getAll(): Observable<Task[]> {
    return this.resource.getAll();
  }


  public getByGroup(groupId: number): Observable<Task[]> {
    return this.resource.getByGroup(groupId);
  }


  public getOne(id: number): Observable<Task> {
    return this.resource.getOne(id);
  }


  public create(value: TaskPayload): Observable<Task> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<TaskUpdate>): Observable<Task> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }


  public deleteAll(ids: number[]): Observable<void> {
    return this.resource.deleteAll(ids);
  }
}
