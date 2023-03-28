import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SetLogin } from '../../../../models/auth/store/auth.actions';


@Component({
  selector: 'app-auth-google',
  templateUrl: './auth-google.component.html',
  styleUrls: [ './auth-google.component.scss' ]
})
export class AuthGoogleComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store) {
  }


  public ngOnInit(): void {
    const base64Tokens = this.route.snapshot.paramMap.get('tokens');

    if (!base64Tokens) {
      throw new Error('Authentication Error');
    }
    const tokens = JSON.parse(atob(base64Tokens));

    this.store.dispatch(new SetLogin(tokens))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate([ '/' ]));
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
