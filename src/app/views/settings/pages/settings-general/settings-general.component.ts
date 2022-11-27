import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { StartPageStrategy } from '../../../../enums/start-page.enum';
import { DictItem } from '../../../../interfaces/dict.interface';
import { GeneralSettings } from '../../../../interfaces/settings.interface';
import { UpdateGeneralSettings } from '../../../../models/settings/store/settings.actions';
import { SettingsState } from '../../../../models/settings/store/settings.state';


interface Form {
  startPageStrategy: FormControl<StartPageStrategy>;
}


@Component({
  templateUrl: './settings-general.component.html',
  styleUrls: [ './settings-general.component.scss' ]
})
export class SettingsGeneralComponent implements OnInit {

  public form!: FormGroup<Form>;
  public startPages!: DictItem[];


  constructor(
    private fb: FormBuilder,
    private store: Store) {

    this.startPages = [
      { code: StartPageStrategy.Incoming, value: 'Incoming' },
      { code: StartPageStrategy.Today, value: 'Today' },
      { code: StartPageStrategy.Last, value: 'Last' }
    ];
  }


  public ngOnInit(): void {
    this.form = this.createForm(this.store.selectSnapshot(SettingsState.selectGeneral));
  }


  public onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(new UpdateGeneralSettings(this.form.value as GeneralSettings));
    }
  }


  private createForm(settings: GeneralSettings): FormGroup<Form> {
    return this.fb.nonNullable.group({
      startPageStrategy: [ settings.startPageStrategy ]
    });
  }
}
