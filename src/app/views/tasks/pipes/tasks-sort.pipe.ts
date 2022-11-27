import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../../interfaces/task.interface';
import { TaskSort } from '../../../models/task/task.enum';


@Pipe({
  name: 'tasksSort'
})
export class TasksSortPipe implements PipeTransform {

  public transform(tasks: Task[], sort: TaskSort | null): Task[] {
    switch (sort) {
      case TaskSort.None:
        return tasks;
      case TaskSort.Name:
        return tasks.sort(compareByName);
      case TaskSort.Priority:
        return tasks.sort(compareByPriority);
      case TaskSort.Created:
        return tasks.sort(compareByCreated);
      default:
        return tasks;
    }
  }
}


function compareByName(a: Task, b: Task) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function compareByCreated(a: Task, b: Task) {
  if (a.created < b.created) {
    return -1;
  }
  if (a.created > b.created) {
    return 1;
  }
  return 0;
}

function compareByPriority(a: Task, b: Task) {
  const aPriority = a.priority ? a.priority : 0;
  const bPriority = b.priority ? b.priority : 0;

  if (aPriority > bPriority) {
    return -1;
  }
  if (aPriority < bPriority) {
    return 1;
  }
  return 0;
}
