import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRouting } from './statistics.routing';


@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StatisticsRouting)
  ]
})
export class StatisticsModule {}
