import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  private serverSettings!: ServerSettings;
  private destroy$ = new Subject<void>();


  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store) {
  }


  public ngOnInit(): void {
    this.store.select(SettingsState.selectServerSettings).pipe(
      filter(value => !!value),
      takeUntil(this.destroy$)
    ).subscribe(settings => {
      this.serverSettings = settings as ServerSettings;
      this.telegramForm = this.createTelegramForm(settings);
    });
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private createTelegramForm(settings: ServerSettingsPayload): FormGroup<TelegramForm> {
    return this.fb.nonNullable.group({
      telegramUsername: [ settings.telegram, [
        Validators.required,
        Validators.minLength(4)
      ] ]
    });
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
}
