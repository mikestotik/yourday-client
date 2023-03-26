import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { Group } from '../../../interfaces/group.interface';
import { isGroupId } from '../../../models/group/group.utils';
import { GroupState } from '../../../models/group/store/group.state';
import { NavigationState } from '../../../models/navigation/store/navigation.state';


@Pipe({
  name: 'tasksTitle'
})
/**@deprecated*/
export class TasksTitlePipe implements PipeTransform {

  constructor(
    private store: Store) {
  }


  public transform(groupOrFilterId: string): string | null {
    let filter: { title: string };

    if (isGroupId(groupOrFilterId)) {
      filter = this.store.selectSnapshot(GroupState.selectGroup)(Number(groupOrFilterId)) as Group;
    } else {
      filter = this.store.selectSnapshot(NavigationState.pageNavTasksItem)(groupOrFilterId);
    }

    if (filter) {
      return filter.title;
    }
    return null;
  }

}
