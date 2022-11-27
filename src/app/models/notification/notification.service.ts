import { Injectable } from '@angular/core';

enum DeviceType {
  Android = 'Android',
  BlackBerry = 'BlackBerry 10',
  browser = 'browser',
  iOS = 'iOS',
  WinCE = 'WinCE',
  Tizen = 'Tizen',
  MacOSX = 'Mac OS X'
}


declare var device: {
  platform: DeviceType
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
    const cordova: Cordova = window.cordova;

    if (cordova) {
      console.log('Platform:', device.platform);
    } else {
      if (Notification) {
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


  public show(): void {
    new Notification('Yourday Reminder', {
      icon: 'https://yourday.me/favicon.ico',
      // body: `I remind you of the task: ${ task!.title }`,
      body: `I remind you of the task: 1`,
      vibrate: 10
    });
  }
}
