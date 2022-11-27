import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { GroupState } from '../../../models/group/store/group.state';


@Pipe({
  name: 'groupColor'
})
export class GroupColorPipe implements PipeTransform {

  constructor(
    private store: Store) {
  }

  public transform(colorId: number | null): string | null {
    if (!colorId) {
      return null;
    }
    const color = this.store.selectSnapshot(GroupState.color)(colorId);
    return color ? color.value : null;
  }

}
