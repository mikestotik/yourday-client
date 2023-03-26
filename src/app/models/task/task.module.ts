import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TaskResolver } from './resolvers/task.resolver';
import { SubTaskResource } from './resources/sub-task.resource';
import { TaskResource } from './resources/task.resource';
import { SubTaskService } from './services/sub-task.service';
import { TaskService } from './services/task.service';
import { TaskState } from './store/task.state';


@NgModule({
  imports: [
    NgxsModule.forFeature([
      TaskState
    ])
  ],
  providers: [
    TaskResolver,
    TaskResource,
    TaskService,
    SubTaskResource,
    SubTaskService
  ],
  exports: [
    NgxsModule
  ]
})
export class TaskModelModule {}
