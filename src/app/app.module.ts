import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HammerConfig } from './config/hammer.config';
import { AccountState } from './models/account/store/account.state';
import { AuthInterceptor } from './models/auth/interceptors/auth.interceptor';
import { AuthState } from './models/auth/store/auth.state';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { GroupModelModule } from './models/group/group.module';
import { MenuState } from './models/menu/store/menu.state';
import { NavigationState } from './models/navigation/store/navigation.state';
import { SettingsState } from './models/settings/store/settings.state';
import { TaskState } from './models/task/store/task.state';
import { TaskModelModule } from './models/task/task.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(AppRouting),
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxsModule.forRoot([
      AuthState,
      AccountState,
      MenuState,
      TaskState,
      NavigationState,
      SettingsState
    ], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: !environment.logs.ngxs
    }),
    GroupModelModule,
    TaskModelModule,
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth.accessToken',
        'auth.refreshToken',
        'menu.visible',
        'tasks.shownCompleted',
        'tasks.sort',
        'settings'
      ]
    }),
    SocketIoModule.forRoot({
      url: environment.websocket.url,
      options: {
        transports: [ 'websocket' ],
        autoConnect: true,
        reconnection: true
      }
    }),
    MatSnackBarModule,
    MatDialogModule,
    MatBottomSheetModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
