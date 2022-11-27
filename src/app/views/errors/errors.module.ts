import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorsRouting } from './errors.routing';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';


@NgModule({
  declarations: [
    ErrorNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorsRouting)
  ]
})
export class ErrorsModule {}
