import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '../shared/shared.module';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';


@NgModule({
  declarations: [
    GroupDetailsComponent,
    GroupCreateComponent
  ],
  exports: [
    GroupDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    SharedModule
  ]
})
export class GroupsModule {}
