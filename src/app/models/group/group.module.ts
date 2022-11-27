import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupResource } from './resources/group.resource';
import { GroupService } from './services/group.service';
import { GroupState } from './store/group.state';


@NgModule({
  imports: [
    NgxsModule.forFeature([
      GroupState
    ])
  ],
  providers: [
    GroupResolver,
    GroupResource,
    GroupService
  ]
})
export class GroupModelModule {}
