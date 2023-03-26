import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { colorList } from '../../../../config/colors.config';
import { Color } from '../../../../enums/color.enum';
import { CreateGroupPayload } from '../../../../interfaces/group.interface';
import { CreateGroup } from '../../../../models/group/store/group.actions';
import { GroupStateModel } from '../../../../models/group/store/group.state';


interface Form {
  title: FormControl<string>;
  color: FormControl;
}


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: [ './group-create.component.scss' ]
})
export class GroupCreateComponent implements OnInit {

  public form!: FormGroup<Form>;
  public sentSave!: boolean;
  public colors: Color[] = colorList;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<GroupCreateComponent>) {
  }


  public ngOnInit(): void {
    this.form = this.createForm();
  }


  public onClose(groupId?: number): void {
    this.dialogRef.close(groupId);
  }


  public onSubmit(): void {
    if (this.form.valid) {
      this.sentSave = true;
      this.store.dispatch(new CreateGroup(this.form.value as CreateGroupPayload))
        .pipe(
          map(state => (state.groups as GroupStateModel).groups),
          map(groups => groups[groups.length - 1])
        )
        .subscribe(group => {
          this.sentSave = false;
          this.onClose(group.id);
        });
    }
  }


  public onColor(color: Color): void {
    const control = this.form.controls.color;
    if (control.value === color) {
      control.patchValue(undefined);
    } else {
      control.patchValue(color);
    }
  }


  private createForm(): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ '', [ Validators.required ] ],
      color: [ undefined ]
    });
  }
}
