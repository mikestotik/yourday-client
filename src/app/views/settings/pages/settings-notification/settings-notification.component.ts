import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush } from '@angular/service-worker';
import { Store } from '@ngxs/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PushSubscription } from 'web-push';
import { ServerSettings, ServerSettingsPayload } from '../../../../interfaces/settings.interface';
import { UpdateServerSettings } from '../../../../models/settings/store/settings.actions';
import { SettingsState } from '../../../../models/settings/store/settings.state';


interface TelegramForm {
  telegramUsername: FormControl<string | undefined>;
}


@Component({
  templateUrl: './settings-notification.component.html',
  styleUrls: [ './settings-notification.component.scss' ]
})
export class SettingsNotificationComponent implements OnInit, OnDestroy {

  public telegramBotUrl = environment.telegramBotUrl;
  public telegramForm!: FormGroup<TelegramForm>;
  public telegramFormSent!: boolean;

  public serverSettings!: ServerSettings;
  public pushEnabled!: boolean | undefined;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly swPush: SwPush,
    private readonly fb: FormBuilder,
    private readonly store: Store) {
  }


  public ngOnInit(): void {
    this.store.select(SettingsState.selectServerSettings).pipe(
      filter(value => !!value),
      takeUntil(this.destroy$)
    ).subscribe(settings => {
      this.serverSettings = settings as ServerSettings;
      this.pushEnabled = this.serverSettings.pushEnabled;
      this.telegramForm = this.createTelegramForm(settings);
    });
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onSubmitTelegram(): void {
    this.telegramFormSent = true;
    this.store.dispatch(new UpdateServerSettings(this.serverSettings.id, {
      telegram: this.telegramForm.value.telegramUsername
    }))
      .subscribe(() => {
        this.telegramFormSent = false;
      });
  }


  public onEnablePush(enabled: boolean): void {
    if (enabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapid.publicKey
      })
        .then(sub => this.store.dispatch(new UpdateServerSettings(
          this.serverSettings.id, {
            pushEnabled: true,
            pushSubscription: { ...sub.toJSON() } as PushSubscription
          })).subscribe(() => {
          this.snackBar.open('Push Notification enabled.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000
          });
        }))
        .catch(() => {
          this.snackBar.open('Registration failed - permission denied! Please enable notifications in the browser settings.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000
          });
          this.pushEnabled = undefined;
        });
    } else {
      this.store.dispatch(new UpdateServerSettings(
        this.serverSettings.id, {
          pushEnabled: false,
          pushSubscription: null
        })).subscribe(() => {
        this.snackBar.open('Push Notification disabled.', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000
        });
      });
    }
  }


  private createTelegramForm(settings: ServerSettingsPayload): FormGroup<TelegramForm> {
    return this.fb.nonNullable.group({
      telegramUsername: [ settings.telegram, [
        Validators.required,
        Validators.minLength(4)
      ] ]
    });
  }
}
