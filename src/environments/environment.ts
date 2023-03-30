// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ssl: true,
  api: {
    core: '/api/v1.0'
  },
  websocket: {
    url: 'http://127.0.0.1:3000'
  },
  google: {
    redirectUrl: 'http://localhost:3000/api/v1.0/auth/google'
  },
  telegramBotUrl: 'https://t.me/yourday_dev_app_notification_bot',
  vapid: {
    publicKey: 'BDfSXDq89TUBMTAuXrZlLE1HDnawS7BWu5BsA3RYcYA2eM_yxBhyTgjuK3zkNy7bSpqeUDx28N52svPcTmlhdbE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
