import { UserCredentials } from '../../../interfaces/account.interface';
import { LoginResponse } from '../../../interfaces/auth.interface';


export class SetLogin {
  static readonly type = '[Auth] SetLogin';


  constructor(
    public payload: LoginResponse) {
  }
}


export class Login {
  static readonly type = '[Auth] Login';


  constructor(
    public payload: UserCredentials) {
  }
}


export class ResetPassword {
  static readonly type = '[Auth] ResetPassword';


  constructor(
    public email: string) {
  }
}


export class RefreshToken {
  static readonly type = '[Auth] RefreshToken';
}


export class Logout {
  static readonly type = '[Auth] Logout';
}


export class ClearState {
  static readonly type = '[Auth] ClearState';
}
