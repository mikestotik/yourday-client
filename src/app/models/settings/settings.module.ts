import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SettingsResolver } from './resolvers/settings.resolver';
import { SettingsResource } from './resources/settings.resource';
import { SettingsService } from './services/settings.service';
import { SettingsState } from './store/settings.state';


@NgModule({
  imports: [
    NgxsModule.forFeature([ SettingsState ])
  ],
  providers: [
    SettingsResolver,
    SettingsResource,
    SettingsService
  ],
  exports: [
    NgxsModule
  ]
})
export class SettingsModelModule {}
