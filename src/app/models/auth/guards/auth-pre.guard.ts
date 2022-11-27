import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { JwtUtils } from '../../../utils/jwt.utils';
import { AuthState } from '../store/auth.state';


@Injectable({
  providedIn: 'root'
})
export class AuthPreGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router) {
  }


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const refreshToken = this.store.selectSnapshot(AuthState.refreshToken);

    if (JwtUtils.isExpired(refreshToken!)) {
      return true;
    }
    return this.router.navigate([ '/' ]);
  }

}
