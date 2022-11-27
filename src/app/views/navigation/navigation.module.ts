import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import {
  PageNavigationSettingsComponent
} from './components/page-navigation-settings/page-navigation-settings.component';
import { PageNavigationTasksComponent } from './components/page-navigation-tasks/page-navigation-tasks.component';


@NgModule({
  declarations: [
    MainNavigationComponent,
    PageNavigationTasksComponent,
    PageNavigationSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    SharedModule,
    MatRippleModule
  ],
  exports: [
    MainNavigationComponent,
    PageNavigationTasksComponent,
    PageNavigationSettingsComponent
  ]
})
export class NavigationModule {}
