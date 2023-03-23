import { TaskPriority } from '../enums/task-priority.enum';
import { DictItem } from '../interfaces/dict.interface';
import { TaskPriorityItem } from '../interfaces/task.interface';


export class TaskConfig {
  //todo PriorityItem
  public static priorityList: TaskPriorityItem[] = [
    { id: TaskPriority.VeryHigh, title: 'Very High' },
    { id: TaskPriority.High, title: 'High' },
    { id: TaskPriority.Middle, title: 'Middle' },
    { id: TaskPriority.Low, title: 'Low' }
  ];
  public static reminderOptions: DictItem[] = [
    { code: null, value: 'None' },
    { code: 5, value: '5 min' },
    { code: 10, value: '10 min' },
    { code: 15, value: '15 min' },
    { code: 20, value: '20 min' },
    { code: 30, value: '30 min' },
    { code: 40, value: '40 min' },
    { code: 50, value: '50 min' },
    { code: 60, value: '1 hour' }
  ];
}
