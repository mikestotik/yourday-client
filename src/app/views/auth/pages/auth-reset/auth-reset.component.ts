import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { ResetPassword } from '../../../../models/auth/store/auth.actions';


interface Form {
  email: FormControl<string>;
}


@Component({
  selector: 'app-auth-reset',
  templateUrl: './auth-reset.component.html',
  styleUrls: [ './auth-reset.component.scss' ]
})
export class AuthResetComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router) {

    this.form = this.createForm();
  }


  public onSubmit(): void {
    this.formSent = true;
    this.store.dispatch(new ResetPassword(String(this.form.value.email)))
      .pipe(
        catchError(error => {
          this.formSent = false;
          return error;
        })
      )
      .subscribe(() => {
        this.router.navigate([ '..' ]);
      });
  }


  private createForm(): FormGroup<Form> {
    return this.fb.nonNullable.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }


}
