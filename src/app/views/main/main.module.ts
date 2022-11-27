import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TaskModelModule } from '../../models/task/task.module';
import { GroupsModule } from '../groups/groups.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRouting } from './main.routing';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRouting),
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDialogModule,
    NavigationModule,
    TaskModelModule,
    GroupsModule
  ],
  exports: [
    MainComponent
  ],
  providers: []
})
export class MainModule {}
