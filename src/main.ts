import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      if ('serviceWorker' in navigator && (environment.production || environment.ssl)) {
        navigator.serviceWorker.register('./ngsw-worker.js');
      }
    })
    .catch(err => console.error(err));
};

if (typeof window['cordova'] !== 'undefined') {
  document.addEventListener('deviceready', () => {
    bootstrap();
  }, false);
} else {
  bootstrap();
}
