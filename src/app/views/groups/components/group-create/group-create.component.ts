import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Color } from '../../../../interfaces/color.interface';
import { CreateGroupPayload } from '../../../../interfaces/group.interface';
import { CreateGroup } from '../../../../models/group/store/group.actions';
import { GroupState, GroupStateModel } from '../../../../models/group/store/group.state';


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

  @Select(GroupState.colors)
  public colors$!: Observable<Color[]>;

  public form!: FormGroup<Form>;
  public sentSave!: boolean;


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


  private createForm(): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ '', [ Validators.required ] ],
      color: [ null ]
    });
  }
}
