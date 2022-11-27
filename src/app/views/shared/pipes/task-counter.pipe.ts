import { Pipe, PipeTransform } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { TaskState } from '../../../models/task/store/task.state';
import { TaskFilter } from '../../../models/task/task.enum';


@Pipe({
  name: 'taskCounter'
})
export class TaskCounterPipe implements PipeTransform {

  @Select(TaskState.tasks)
  public tasks$!: Observable<Task[]>;

  constructor(
    private store: Store) {
  }

  public transform(groupOrFilterId: number | string): Observable<string> {
    return this.store.select(TaskState.filterTasks).pipe(
      map(fun => fun(groupOrFilterId as TaskFilter)),
      map(mapCount)
    );
  }

}


const mapCount = (list: Task[]): string => `${ list.filter(i => i.completed).length }/${ list.length }`;
