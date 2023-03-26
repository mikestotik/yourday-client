import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SettingsAccountComponent } from './pages/settings-account/settings-account.component';
import { SettingsGeneralComponent } from './pages/settings-general/settings-general.component';
import { SettingsNotificationComponent } from './pages/settings-notification/settings-notification.component';
import { SettingsComponent } from './settings.component';
import { SettingsRouting } from './settings.routing';


@NgModule({
  declarations: [
    SettingsComponent,
    SettingsAccountComponent,
    SettingsGeneralComponent,
    SettingsNotificationComponent
  ],
  exports: [
    SettingsAccountComponent,
    SettingsGeneralComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRouting),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class SettingsModule {}
