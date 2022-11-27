import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { User } from '../../../interfaces/account.interface';
import { AccountService } from '../services/account.service';
import { ActivateAccount, GetAccount, RegisterAccount, UpdateAccount } from './account.actions';


export interface AccountModel {
  user: User | null;
}


@State<AccountModel>({
  name: 'account',
  defaults: {
    user: null
  }
})
@Injectable()
export class AccountState {

  @Selector()
  public static user(state: AccountModel): User | null {
    return state.user;
  }


  constructor(
    private accountService: AccountService) {
  }


  @Action(RegisterAccount)
  public register(ctx: StateContext<AccountModel>, action: RegisterAccount): Observable<void> {
    return this.accountService.register(action.payload);
  }


  @Action(ActivateAccount)
  public activate(ctx: StateContext<AccountModel>, action: ActivateAccount): Observable<unknown> {
    return this.accountService.activate(action.payload);
  }


  @Action(GetAccount)
  public getMe(ctx: StateContext<AccountModel>): Observable<User> {
    return this.accountService.getCurrent().pipe(
      tap(result => ctx.patchState({ user: result }))
    );
  }


  @Action(UpdateAccount)
  public update(ctx: StateContext<AccountModel>, action: UpdateAccount): Observable<User> {
    const state = ctx.getState();

    return this.accountService.update(action.id, action.value).pipe(
      tap(() => ctx.patchState({
        user: {
          ...state.user as User,
          ...action.value
        }
      }))
    );
  }
}
