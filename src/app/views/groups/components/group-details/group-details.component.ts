import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { createRandom } from 'src/app/utils/num.utils';
import { AppRoutes, MainRoutes } from '../../../../config/routes.config';
import { Color } from '../../../../interfaces/color.interface';
import { CreateGroupPayload, Group } from '../../../../interfaces/group.interface';
import { CreateTagPayload, Tag } from '../../../../interfaces/tag.interface';
import {
  CreateTag,
  RemoveGroup,
  RemoveTag,
  ShareGroup,
  UnShareGroup,
  UpdateGroup
} from '../../../../models/group/store/group.actions';
import { GroupState } from '../../../../models/group/store/group.state';
import { PinGroup, UnPinGroup } from '../../../../models/settings/store/settings.actions';
import { SettingsState } from '../../../../models/settings/store/settings.state';
import { isEqual } from '../../../../utils/obj.utils';


interface GroupDetailsForm {
  title: FormControl<string>;
  color: FormControl<number | null>;
  renewable: FormControl<boolean>;
}


interface AddUserForm {
  email: FormControl<string>;
}


interface AddTagForm {
  title: FormControl<string>;
  group: FormControl<number>;
  color: FormControl<number>;
}


@Component({
  templateUrl: './group-details.component.html',
  styleUrls: [ './group-details.component.scss' ]
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  @Select(SettingsState.pinnedGroups)
  public pinnedGroups$!: Observable<number[]>;

  public group!: Group;
  public colors!: Color[];

  public form!: FormGroup<GroupDetailsForm>;
  public formAddUser!: FormGroup<AddUserForm>;
  public formAddTag!: FormGroup<AddTagForm>;

  public sentDelete!: boolean;
  public sentSave!: boolean;

  public tags: Tag[] = [];

  private destroy$ = new Subject<void>();
  private formStartValue: unknown;
  private valueChanged!: boolean;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private groupId: number,
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<GroupDetailsComponent>) {
  }


  public ngOnInit(): void {
    this.store.select(GroupState.colors).pipe(
      tap(colors => this.colors = colors),
      switchMap(() => this.store.select(GroupState.group)),
      map(filterFn => filterFn(this.groupId)),
      filter(value => !!value),
      tap(group => this.group = group!),
      switchMap(group => {
        this.form = this.createForm(group!);
        this.formStartValue = { ...this.form.value };
        this.formAddUser = this.createUsersForm();
        this.formAddTag = this.createTagsForm();
        return this.form.valueChanges;
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(value => this.valueChanged = !isEqual(this.formStartValue, value));
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onClose(): void {
    this.bottomSheetRef.dismiss();
  }


  public onSubmit(): void {
    this.saveValue(this.form.value);
    this.onClose();
  }


  public onSubmitAddUser(): void {
    this.store.dispatch(new ShareGroup(this.groupId, this.formAddUser.value.email!));
  }


  public onDeleteUser(email: string): void {
    this.store.dispatch(new UnShareGroup(this.groupId, email));
  }


  public onSubmitAddTag(): void {
    this.store.dispatch(new CreateTag(this.formAddTag.value as CreateTagPayload));
  }


  public onDeleteTag(tag: Tag): void {
    this.store.dispatch(new RemoveTag(tag.id, this.groupId));
  }


  public onTitleChanged(): void {
    this.saveValue(this.form.value);
  }


  public onColor(colorId: number | null): void {
    const control = this.form.controls.color;
    if (control.value === colorId) {
      control.patchValue(null);
    } else {
      control.patchValue(colorId);
    }
    this.saveValue(this.form.value);
  }


  public onDelete(): void {
    this.sentDelete = true;
    this.store.dispatch(new RemoveGroup(Number(this.groupId)))
      .subscribe(() => {
        this.sentDelete = false;
        this.onClose();
        this.router.navigate([ AppRoutes.App, MainRoutes.Tasks ]);
      });
  }


  private saveValue(value: Partial<CreateGroupPayload>): void {
    if (this.form.valid) {
      this.sentSave = true;
      this.store.dispatch(new UpdateGroup(this.groupId, value)).subscribe(() => {
        this.sentSave = false;
      });
    }
  }


  private createForm(group: CreateGroupPayload): FormGroup<GroupDetailsForm> {
    return this.fb.nonNullable.group({
      title: [ group.title, [ Validators.required ] ],
      color: [ group.color ],
      renewable: [ group.renewable ]
    });
  }


  private createUsersForm(): FormGroup<AddUserForm> {
    return this.fb.nonNullable.group({
      email: [ '', [ Validators.email ] ]
    });
  }


  private createTagsForm(): FormGroup<AddTagForm> {
    return this.fb.nonNullable.group({
      title: [ '', [ Validators.minLength(2) ] ],
      group: [ this.groupId, [ Validators.required ] ],
      color: [ createRandom(1, this.colors.length), [] ]
    });
  }


  public onPin(value: boolean): void {
    this.store.dispatch(value ?
      new PinGroup(Number(this.groupId)) :
      new UnPinGroup(Number(this.groupId))
    );
  }


  public onRenewable(value: MatSlideToggleChange): void {
    this.store.dispatch(new UpdateGroup(this.groupId, { renewable: value.checked }));
  }
}
