import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ClockComponent } from './components/clock/clock.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { PageComponent } from './components/page/page.component';
import { TagComponent } from './components/tag/tag.component';
import { ExitDialogComponent } from './dialogs/exit-dialog/exit-dialog.component';
import { ContenteditableDirective } from './directives/contenteditable.directive';
import { InputDirective } from './directives/input.directive';
import { ColorValuePipe } from './pipes/color-value.pipe';
import { GroupColorPipe } from './pipes/group-color.pipe';
import { GroupSortPipe } from './pipes/group-sort.pipe';
import { TaskCounterPipe } from './pipes/task-counter.pipe';
import { SnackSimpleComponent } from './snacks/snack-simple/snack-simple.component';
import { OverduePipe } from './pipes/overdue.pipe';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule
  ],
  declarations: [
    NoContentComponent,
    ClockComponent,
    PageComponent,
    ExitDialogComponent,
    TaskCounterPipe,
    ColorValuePipe,
    InputDirective,
    ContenteditableDirective,
    TagComponent,
    GroupColorPipe,
    GroupSortPipe,
    SnackSimpleComponent,
    OverduePipe
  ],
  exports: [
    MatButtonModule,
    NoContentComponent,
    ClockComponent,
    PageComponent,
    TaskCounterPipe,
    ColorValuePipe,
    InputDirective,
    ContenteditableDirective,
    TagComponent,
    GroupColorPipe,
    GroupSortPipe,
    OverduePipe
  ]
})
export class SharedModule {}
