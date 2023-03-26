import { Pipe, PipeTransform } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Task } from '../../../interfaces/task.interface';
import { TaskState } from '../../../models/task/store/task.state';
import { TaskFilter } from '../../../enums/task.enum';


@Pipe({
  name: 'taskCounter'
})
export class TaskCounterPipe implements PipeTransform {

  @Select(TaskState.selectTasks)
  public tasks$!: Observable<Task[]>;


  constructor(
    private store: Store) {
  }


  public transform(groupOrFilter: number | string): Observable<string> {
    if (typeof groupOrFilter === 'number') {
      return this.store.select(TaskState.selectGroupTasks).pipe(
        map(fun => fun(groupOrFilter)),
        map(mapCount)
      );
    } else {
      return this.store.select(TaskState.selectFilterTasks).pipe(
        map(fun => fun(groupOrFilter as TaskFilter)),
        map(mapCount)
      );
    }
  }

}


const mapCount = (list: Task[]): string => `${ list.filter(i => i.completed).length }/${ list.length }`;
