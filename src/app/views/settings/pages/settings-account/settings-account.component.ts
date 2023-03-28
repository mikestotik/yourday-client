import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Languages } from 'src/app/enums/language.enum';
import { User } from '../../../../interfaces/account.interface';
import { DictItem } from '../../../../interfaces/dict.interface';
import { UpdateAccount } from '../../../../models/account/store/account.actions';
import { AccountState } from '../../../../models/account/store/account.state';


interface AccountForm {
  email: FormControl<string>;
  username: FormControl<string>;
  fullName: FormControl<string | null>;
  lang: FormControl<Languages>;
  logo: FormControl<string | null>;
}


interface PasswordForm {
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}


@Component({
  templateUrl: './settings-account.component.html',
  styleUrls: [ './settings-account.component.scss' ]
})
export class SettingsAccountComponent implements OnInit {

  public form!: FormGroup<AccountForm>;
  public formSent!: boolean;


  public passForm!: FormGroup<PasswordForm>;
  public passFormSent!: boolean;

  public languages!: DictItem[];

  public usernameMinlength = 4;

  public oldPassVisible!: boolean;
  public newPassVisible!: boolean;
  public confirmPassVisible!: boolean;

  private user!: User;


  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.languages = [
      { code: Languages.English, value: 'English' },
      { code: Languages.Russian, value: 'Русский' }
    ];
  }


  public ngOnInit(): void {
    this.user = this.store.selectSnapshot(AccountState.user)!;
    this.form = this.createForm(this.user);
    this.passForm = this.createPassForm();
  }


  public onSubmit(): void {
    this.formSent = true;
    this.store.dispatch(new UpdateAccount(this.user.id, { ...this.form.value } as User))
      .subscribe(() => {
        this.formSent = false;
      });
  }


  public onSubmitPassword(): void {

  }


  private createForm(user: User): FormGroup<AccountForm> {
    return this.fb.nonNullable.group({
      logo: [ user.logo ? user.logo : null ],
      email: [ { value: user.email, disabled: true }, [ Validators.required, Validators.email ] ],
      username: [ {
        value: user.username,
        disabled: false
      }, [ Validators.required, Validators.minLength(this.usernameMinlength) ] ],
      lang: [ user.lang ],
      fullName: [ user.fullName ? user.fullName : null ]
    });
  }


  private createPassForm(): FormGroup<PasswordForm> {
    return this.fb.nonNullable.group({
      oldPassword: [ '', [ Validators.required ] ],
      newPassword: [ '', [ Validators.required ] ],
      confirmPassword: [ '', [ Validators.required ] ]
    });
  }
}
