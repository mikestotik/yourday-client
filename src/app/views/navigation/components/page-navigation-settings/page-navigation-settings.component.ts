import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, switchMap } from 'rxjs';
import { DialogConfig } from '../../../../config/dialog.config';
import { AppRoutes, MainRoutes } from '../../../../config/routes.config';
import { NavItem, PageNavigation } from '../../../../interfaces/navigation.interface';
import { Logout } from '../../../../models/auth/store/auth.actions';
import { NavigationState } from '../../../../models/navigation/store/navigation.state';
import { ExitDialogComponent } from '../../../shared/dialogs/exit-dialog/exit-dialog.component';


@Component({
  selector: 'app-page-navigation-settings',
  templateUrl: './page-navigation-settings.component.html',
  styleUrls: [ './page-navigation-settings.component.scss' ]
})
export class PageNavigationSettingsComponent implements OnInit, PageNavigation {

  @Select(NavigationState.pageNavSettings)
  public pageNavigation$!: Observable<NavItem[]>;

  @Output()
  public itemEvent = new EventEmitter<void>();

  public appRoutes = AppRoutes;
  public mainRoutes = MainRoutes;


  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router) {
  }


  public ngOnInit(): void { }


  public onExit(): void {
    this.dialog.open(ExitDialogComponent, {
      ...DialogConfig.defaultAlert
    }).afterClosed().pipe(
      filter(close => !!close),
      switchMap(() => this.store.dispatch(new Logout()))
    ).subscribe(() => this.router.navigate([ AppRoutes.Auth ]));
  }


  public onSync() {
    if ('serviceWorker' in navigator) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => caches.delete(cacheName));
        location.reload();
      });
    }
  }
}
