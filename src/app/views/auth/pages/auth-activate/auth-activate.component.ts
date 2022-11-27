import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { AppRoutes, AuthRoutes, ErrorRoutes } from '../../../../config/routes.config';
import { ActivateAccount } from '../../../../models/account/store/account.actions';


interface ActivateForm {
  secret: FormControl<string>;
}


@Component({
  templateUrl: './auth-activate.component.html',
  styleUrls: [ './auth-activate.component.scss' ]
})
export class AuthActivateComponent implements OnInit {

  public form!: FormGroup<ActivateForm>;
  public loginRoute!: string;
  public email!: string | null;
  public formSent!: boolean;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar) {

    this.loginRoute = `/${ AppRoutes.Auth }/${ AuthRoutes.Login }`;
    this.form = this.createForm();
  }


  public ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');

    if (!this.email) {
      this.router.navigate([ AppRoutes.Errors, ErrorRoutes.NotFound ]);
    }
  }


  public onSubmit(): void {
    if (this.form.valid) {
      this.formSent = true;
      this.store.dispatch(new ActivateAccount({
        code: Number(this.form.value.secret),
        email: this.email!
      }))
        .pipe(
          catchError(error => {
            this.formSent = false;
            return error;
          })
        )
        .subscribe(() => {
          this.snackBar.open('Account Activated!', '', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000
          });
          this.router.navigate([ AppRoutes.Auth, AuthRoutes.Login ]);
        });
    }
  }


  private createForm(): FormGroup<ActivateForm> {
    return this.fb.nonNullable.group(
      {
        secret: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }
    );
  }

}
