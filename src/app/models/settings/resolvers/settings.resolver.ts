import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FindServerSettings } from '../store/settings.actions';


@Injectable()
export class SettingsResolver implements Resolve<boolean> {

  constructor(
    private store: Store) {
  }


  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch([ new FindServerSettings() ]);
  }
}
