import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'overdue'
})
export class OverduePipe implements PipeTransform {

  public transform(date: string | Date): boolean {
    return moment(date).isBefore(moment());
  }

}
