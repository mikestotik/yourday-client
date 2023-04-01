import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { filter, map, Observable } from 'rxjs';
import { WebsocketEndpoints } from './config/websocket.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(
    private socket: Socket,
    private router: Router) {
  }


  public ngOnInit(): void {
    // environment.vapid.publicKey
    document.addEventListener('deviceready', () => {
      // @ts-ignore
      // cordova.plugins.notification.local.schedule({
      //   title: 'The big survey',
      //   text: 'Are you a fan of RB Leipzig?',
      //   attachments: ['file://img/rb-leipzig.jpg'],
      //   actions: [
      //     { id: 'yes', title: 'Yes' },
      //     { id: 'no',  title: 'No' }
      //   ]
      // });
    }, false);

    this.navigationEvent().subscribe(event => {
      this.socket.emit(WebsocketEndpoints.TRACKER, event.urlAfterRedirects);
    });
  }


  private navigationEvent(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    );
  }
}
