import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { Languages } from 'src/app/enums/language.enum';
import { AuthConfig } from '../../../../config/auth.config';
import { LanguageConfig } from '../../../../config/language.config';
import { AppRoutes, AuthRoutes } from '../../../../config/routes.config';
import { AccountRegister } from '../../../../interfaces/account.interface';
import { DictItem } from '../../../../interfaces/dict.interface';
import { RegisterAccount } from '../../../../models/account/store/account.actions';


interface RegistrationForm {
  email: FormControl<string>;
  password: FormControl<string>;
  lang: FormControl<Languages>;
}


@Component({
  templateUrl: './auth-register.component.html',
  styleUrls: [ './auth-register.component.scss' ]
})
export class AuthRegisterComponent implements OnInit {

  public authConfig = AuthConfig;
  public languageConfig = LanguageConfig;

  public form!: FormGroup<RegistrationForm>;
  public loginRoute!: string;
  public passwordVisible!: boolean;
  public languages!: DictItem[];
  public formSent!: boolean;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router) {

    this.loginRoute = `/${ AppRoutes.Auth }/${ AuthRoutes.Login }`;
    this.form = this.createForm();
    this.languages = [
      { code: Languages.English, value: 'English' },
      { code: Languages.Russian, value: 'Русский' }
    ];
  }


  public ngOnInit(): void { }


  public onSubmit(): void {
    if (this.form.valid) {
      this.formSent = true;
      this.store.dispatch(new RegisterAccount({ ...this.form.value } as AccountRegister))
        .pipe(
          catchError(error => {
            this.formSent = false;
            return error;
          })
        )
        .subscribe(() => {
          this.router.navigate([ AppRoutes.Auth, AuthRoutes.Activate, this.form.value.email ]);
        });
    }
  }


  private createForm(): FormGroup<RegistrationForm> {
    return this.fb.nonNullable.group(
      {
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(this.authConfig.PASSWORD_MIN_LENGTH) ] ],
        lang: [ this.languageConfig.DEFAULT ]
      }
    );
  }
}
