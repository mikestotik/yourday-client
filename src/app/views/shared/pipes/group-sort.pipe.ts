import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../../../interfaces/group.interface';


@Pipe({
  name: 'groupSort'
})
export class GroupSortPipe implements PipeTransform {

  public transform(value: Group[], pinned: number[] | null): Group[] {
    if (pinned) {
      return sortPinned(value, pinned);
    }
    return value;
  }

}


function sortPinned(value: Group[], pinned: number[]): Group[] {
  return [ ...value ].sort(group => {
    if (pinned.includes(group.id)) {
      return -1;
    }
    return 0;
  });
}
