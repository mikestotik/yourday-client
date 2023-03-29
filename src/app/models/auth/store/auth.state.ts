import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../../interfaces/auth.interface';
import { JwtUtils } from '../../../utils/jwt.utils';
import { AuthService } from '../services/auth.service';
import { ClearState, Login, Logout, RefreshToken, ResetPassword, SetLogin } from './auth.actions';


export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    accessToken: null,
    refreshToken: null
  }
})
@Injectable()
export class AuthState {

  @Selector()
  public static accessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }


  @Selector()
  public static refreshToken(state: AuthStateModel): string | null {
    return state.refreshToken;
  }


  @Selector()
  public static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken && !JwtUtils.isExpired(state.accessToken);
  }


  constructor(
    private authService: AuthService) {
  }


  @Action(SetLogin)
  public setLogin(ctx: StateContext<AuthStateModel>, { payload }: SetLogin): AuthStateModel {
    return ctx.setState(payload);
  }


  @Action(Login)
  public logIn(ctx: StateContext<AuthStateModel>, action: Login): Observable<LoginResponse> {
    return this.authService.login(action.payload).pipe(
      tap((response: LoginResponse) => {
        ctx.patchState(response);
      })
    );
  }


  @Action(RefreshToken)
  public refresh(ctx: StateContext<AuthStateModel>): Observable<LoginResponse> {
    return this.authService.refresh().pipe(
      tap((response: LoginResponse) => {
        ctx.patchState(response);
      })
    );
  }


  @Action(ResetPassword)
  public resetPassword(ctx: StateContext<AuthStateModel>, { email }: ResetPassword): Observable<unknown> {
    return this.authService.resetPassword(email);
  }


  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>): Observable<unknown> {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          accessToken: null,
          refreshToken: null
        });
      })
    );
  }


  @Action(ClearState)
  public clearState(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      accessToken: null,
      refreshToken: null
    });
  }
}
