import { TaskPriority } from '../enums/task-priority.enum';


export function priorityName(priority: TaskPriority | null): string {
  switch (priority) {
    case TaskPriority.Low:
      return 'Low';
    case TaskPriority.Middle:
      return 'Middle';
    case TaskPriority.High:
      return 'High';
    case TaskPriority.VeryHigh:
      return 'VeryHigh';
    default:
      return 'Middle';
  }
}
