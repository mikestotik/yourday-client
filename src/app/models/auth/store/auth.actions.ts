import { UserCredentials } from '../../../interfaces/account.interface';


export class Login {
  static readonly type = '[Auth] Login';


  constructor(
    public payload: UserCredentials) {
  }
}


export class RefreshToken {
  static readonly type = '[Auth] RefreshToken';
}


export class Logout {
  static readonly type = '[Auth] Logout';
}
