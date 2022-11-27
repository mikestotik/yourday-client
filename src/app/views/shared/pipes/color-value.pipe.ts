import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { GroupState } from '../../../models/group/store/group.state';


@Pipe({
  name: 'colorValue'
})
export class ColorValuePipe implements PipeTransform {

  constructor(
    private store: Store) {
  }


  public transform(colorId?: number | null): string | null {
    const color = this.store.selectSnapshot(GroupState.color)(colorId!);
    if (color) {
      return color.value;
    }
    return null;
  }

}
