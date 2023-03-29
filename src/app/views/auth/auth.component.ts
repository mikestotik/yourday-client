import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../models/auth/store/auth.state';


@Component({
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
})
export class AuthComponent implements OnInit {

  constructor(
    private readonly store: Store) {
  }


  public ngOnInit(): void {
    this.store.reset(AuthState);
  }
}
