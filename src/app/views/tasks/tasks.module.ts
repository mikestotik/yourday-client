import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '../shared/shared.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskListAddComponent } from './components/task-list-add/task-list-add.component';
import { TaskListEmptyComponent } from './components/task-list-empty/task-list-empty.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { FilterCompletedPipe } from './pipes/tasks-filter-completed.pipe';
import { TasksSortPipe } from './pipes/tasks-sort.pipe';
import { TasksTitlePipe } from './pipes/tasks-title.pipe';
import { TasksComponent } from './tasks.component';
import { TasksRouting } from './tasks.routing';


@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailsComponent,
    TaskListItemComponent,
    FilterCompletedPipe,
    TaskListEmptyComponent,
    TaskListAddComponent,
    TasksSortPipe,
    TasksTitlePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TasksRouting),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    NgxMaskModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MatBottomSheetRef, useValue: {} }
  ]
})
export class TasksModule {}
