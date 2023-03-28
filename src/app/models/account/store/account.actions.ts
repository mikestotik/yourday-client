import { AccountActivation, AccountRegister, UpdatePasswordPayload, User } from '../../../interfaces/account.interface';


export class RegisterAccount {
  static readonly type = '[Account] RegisterAccount';


  constructor(
    public payload: AccountRegister) {
  }
}


export class ActivateAccount {
  static readonly type = '[Account] ActivateAccount';


  constructor(
    public payload: AccountActivation) {
  }
}


export class UpdatePassword {
  static readonly type = '[Account] UpdatePassword';


  constructor(
    public id: number,
    public payload: UpdatePasswordPayload) {
  }
}


export class GetAccount {
  static readonly type = '[Account] GetAccount';
}


export class UpdateAccount {
  static readonly type = '[Account] UpdateAccount';


  constructor(
    public id: number,
    public value: Partial<User>) {
  }
}
