import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppRoutes } from '../../../config/routes.config';
import { JwtUtils } from '../../../utils/jwt.utils';
import { RefreshToken } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router) {
  }


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const assesToken = this.store.selectSnapshot(AuthState.accessToken);
    const refreshToken = this.store.selectSnapshot(AuthState.refreshToken);

    if (JwtUtils.isExpired(refreshToken!)) {
      this.router.navigateByUrl(AppRoutes.Auth);
      return false;
    }

    if (JwtUtils.isExpired(assesToken!)) {
      this.store.dispatch(new RefreshToken());
    }
    return true;
  }

}
