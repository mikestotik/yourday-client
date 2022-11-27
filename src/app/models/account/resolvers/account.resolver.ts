import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { GetAccount } from '../store/account.actions';


@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<boolean> {

  constructor(
    private store: Store) {
  }


  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new GetAccount()).pipe(
      filter(value => !!value)
    );
  }
}
