import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { Socket } from 'ngx-socket-io';
import { filter, map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { WebsocketEndpoints } from './config/websocket.config';
import { NewsletterService } from './newsletter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService,
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

    this.swPush.requestSubscription({
      serverPublicKey: environment.vapid.publicKey
    })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }


  private navigationEvent(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    );
  }
}
