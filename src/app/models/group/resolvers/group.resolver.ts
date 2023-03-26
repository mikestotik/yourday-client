import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetGroups } from '../store/group.actions';


@Injectable()
export class GroupResolver implements Resolve<boolean> {

  constructor(
    private store: Store) {
  }


  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch([ new GetGroups() ]);
  }
}
