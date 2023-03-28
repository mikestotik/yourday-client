import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthConfig } from '../../../../config/auth.config';
import { AppRoutes, AuthRoutes } from '../../../../config/routes.config';
import { UserCredentials } from '../../../../interfaces/account.interface';
import { Login } from '../../../../models/auth/store/auth.actions';


interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}


@Component({
  templateUrl: './auth-login.component.html',
  styleUrls: [ './auth-login.component.scss' ]
})
export class AuthLoginComponent implements OnInit {

  public config = AuthConfig;
  public form!: FormGroup<LoginForm>;
  public registrationRoute!: string;

  public passwordVisible!: boolean;
  public formSent!: boolean;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router) {

    this.registrationRoute = `/${ AppRoutes.Auth }/${ AuthRoutes.Register }`;
    this.form = this.createForm();
  }


  public ngOnInit(): void { }


  public onSubmit(): void {
    if (this.form.valid) {
      this.formSent = true;
      this.store.dispatch(new Login({ ...this.form.value } as UserCredentials))
        .pipe(
          catchError(error => {
            this.formSent = false;
            return error;
          })
        )
        .subscribe(() => {
          this.router.navigate([ '/' ]);
        });
    }
  }


  public onGoogleAuth(): void {
    window.location.href = environment.google.redirectUrl;
  }


  private createForm(): FormGroup<LoginForm> {
    return this.fb.nonNullable.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(this.config.PASSWORD_MIN_LENGTH) ] ]
    });
  }


}
