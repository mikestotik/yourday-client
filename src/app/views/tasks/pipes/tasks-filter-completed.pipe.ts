import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../../interfaces/task.interface';


@Pipe({
  name: 'filterCompleted'
})
export class FilterCompletedPipe implements PipeTransform {

  public transform(tasks: Task[], display: boolean | null): Task[] {
    if (!display) {
      return tasks.filter(i => !i.completed);
    }
    return tasks;
  }

}
