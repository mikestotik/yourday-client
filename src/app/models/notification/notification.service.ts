import { Injectable } from '@angular/core';


enum DeviceType {
  Android = 'android',
  Browser = 'browser',
  iOS = 'ios',
  MacOSX = 'Mac OS X'
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly platform!: DeviceType;


  constructor() {
    const cordova: Cordova = window.cordova;

    if (cordova) {
      this.platform = cordova.platformId as DeviceType;

      switch (this.platform) {
        case DeviceType.iOS:
          // @ts-ignore
          cordova.plugins.notification.local.requestPermission( (granted) => {
            if (granted !== 'granted') {
              console.log('Notification permission not granted');
            }
          });
          break;
      }
      // cordova.plugins.notification.local.requestPermission(function (granted) { ... });
    } else {
      // todo: remove, now is push enabled
      if ('Notification' in window) {
        this.platform = DeviceType.Browser;
        Notification.requestPermission().then(permission => {
          if (permission !== 'granted') {
            console.log('Notification permission not granted');
          }
        });
      } else {
        console.log('No Notification support');
      }
    }
  }


  public show(title: string, text: string, datetime?: Date | null): void {
    switch (this.platform) {
      case DeviceType.iOS:
        // @ts-ignore
        cordova.plugins.notification.local.schedule({
          title,
          text,
          foreground: true,
          vibrate: true
        });
        break;
      case DeviceType.Android:
        break;
      case DeviceType.MacOSX:
        break;
      case DeviceType.Browser:
        new Notification(title, {
          body: text,
          icon: 'https://yourday.me/favicon.ico'
        });
        break;
      default:
        break;
    }
  }
}
