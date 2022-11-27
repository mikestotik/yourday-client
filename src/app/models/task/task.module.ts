import { NgModule } from '@angular/core';
import { TaskResolver } from './resolvers/task.resolver';
import { SubTaskResource } from './resources/sub-task.resource';
import { TaskResource } from './resources/task.resource';
import { SubTaskService } from './services/sub-task.service';
import { TaskService } from './services/task.service';


@NgModule({
  providers: [
    TaskResolver,
    TaskResource,
    TaskService,
    SubTaskResource,
    SubTaskService
  ]
})
export class TaskModelModule {}
