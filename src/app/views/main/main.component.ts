import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Socket } from 'ngx-socket-io';
import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { AppRoutes, MainRoutes } from '../../config/routes.config';
import { WindowConf } from '../../config/window.conf';
import { AppEvents } from '../../enums/events.enum';
import { User } from '../../interfaces/account.interface';
import { Group } from '../../interfaces/group.interface';
import { NavItem } from '../../interfaces/navigation.interface';
import { Task } from '../../interfaces/task.interface';
import { AccountState } from '../../models/account/store/account.state';
import { AddGroupToStore, RemoveGroupFromStore, UpdateGroupInStore } from '../../models/group/store/group.actions';
import { ShowMenu } from '../../models/menu/store/menu.actions';
import { MenuState } from '../../models/menu/store/menu.state';
import { NavigationState } from '../../models/navigation/store/navigation.state';
import { NotificationService } from '../../models/notification/notification.service';
import { AddTaskToStore, RemoveTaskFromStore, UpdateTaskInStore } from '../../models/task/store/task.actions';
import { TaskState } from '../../models/task/store/task.state';

const MAIN_ROUTE_SEGMENT_INDEX = 2;


interface IOSocket {
  connected: boolean;
}


@Component({
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit, OnDestroy {

  @Select(MenuState.shownMenu)
  public readonly shownSidebar$!: Observable<boolean>;
  public readonly mainRoutes = MainRoutes;

  public user!: User;
  public currentNavigation!: NavItem;
  public websocket!: IOSocket;

  private windowWidth = window.innerWidth;
  private mobileView!: boolean;

  private readonly destroy$ = new Subject<void>();


  constructor(
    private router: Router,
    private store: Store,
    private socket: Socket,
    private snackBar: MatSnackBar,
    private notification: NotificationService) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      map(event => parseMainRouteSegment(event)),
      map(routeSegment => this.store.selectSnapshot(NavigationState.mainNavigationItem)(routeSegment)),
      takeUntil(this.destroy$)
    )
      .subscribe(navItem => this.currentNavigation = navItem);
  }


  public ngOnInit(): void {
    this.websocket = this.socket.ioSocket;
    if (!this.websocket.connected) {
      this.snackBar.open('WebSocket connection not established', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }

    this.user = this.store.selectSnapshot(AccountState.user)!;

    // Tasks Events
    this.socket.fromEvent<Task>(`${ AppEvents.TaskCreated }/${ this.user.id }`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => this.store.dispatch(new AddTaskToStore(task)));

    this.socket.fromEvent<Task>(`${ AppEvents.TaskUpdated }/${ this.user.id }`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => this.store.dispatch(new UpdateTaskInStore(task)));

    this.socket.fromEvent<number>(`${ AppEvents.TaskRemoved }/${ this.user.id }`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => this.store.dispatch(new RemoveTaskFromStore(id)));

    this.socket.fromEvent<number>(`${ AppEvents.TaskReminder }/${ this.user.id }`)
      .pipe(
        map(id => this.store.selectSnapshot(TaskState.task)(id)),
        takeUntil(this.destroy$)
      )
      .subscribe(task => {
        console.log(task);
        this.notification.show();
      });

    // Groups Events
    this.socket.fromEvent<Group>(`${ AppEvents.GroupShared }/${ this.user.id }`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(group => this.store.dispatch(new AddGroupToStore(group)));

    this.socket.fromEvent<number>(`${ AppEvents.GroupUnshared }/${ this.user.id }`)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(id => this.store.dispatch(new RemoveGroupFromStore(id)))
      )
      .subscribe(() => this.router.navigate([ AppRoutes.App, MainRoutes.Tasks ]));

    this.socket.fromEvent<Group>(`${ AppEvents.GroupUpdated }/${ this.user.id }`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(group => this.store.dispatch(new UpdateGroupInStore(group)));

    this.socket.fromEvent<number>(`${ AppEvents.GroupRemoved }/${ this.user.id }`)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(id => this.store.dispatch(new RemoveGroupFromStore(id)))
      )
      .subscribe(() => this.router.navigate([ AppRoutes.App, MainRoutes.Tasks ])); // if now & tasks
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  @HostListener('window:resize')
  public onResize() {
    this.dispatchWindowResize(window.innerWidth);
  }


  public onSidebarSwipeLeft(): void {
    if (this.windowWidth <= WindowConf.TABLET_WIDTH) {
      this.store.dispatch(new ShowMenu(false));
    }
  }


  public onPageNavItem(): void {
    if (this.windowWidth <= WindowConf.TABLET_WIDTH) {
      this.store.dispatch(new ShowMenu(false));
    }
  }


  private dispatchWindowResize(innerWidth: number): void {
    this.windowWidth = window.innerWidth;

    if (innerWidth <= WindowConf.TABLET_WIDTH) {
      if (!this.mobileView) {
        this.store.dispatch(new ShowMenu(false));
        this.mobileView = true;
      }
    } else {
      if (this.mobileView) {
        this.store.dispatch(new ShowMenu(true));
        this.mobileView = false;
      }
    }
  }

}


function parseMainRouteSegment(event: NavigationEnd): MainRoutes {
  const routeSegments = event.urlAfterRedirects.split('/');
  return routeSegments[MAIN_ROUTE_SEGMENT_INDEX] as MainRoutes;
}
