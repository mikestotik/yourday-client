import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRouting } from './notifications.routing';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(NotificationsRouting)
  ]
})
export class NotificationsModule {}
