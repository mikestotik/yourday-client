import { GeneralSettings } from '../../../interfaces/settings.interface';


export class PinGroup {
  static readonly type = '[Settings] PinGroup';


  constructor(
    public groupId: number) {
  }
}


export class UnPinGroup {
  static readonly type = '[Settings] UnPinGroup';


  constructor(
    public groupId: number) {
  }
}

export class UpdateGeneralSettings {
  static readonly type = '[Settings] UpdateGeneralSettings';

  constructor(
    public payload: GeneralSettings) {
  }
}

export class UpdateCurrentUrl {
  static readonly type = '[Settings] UpdateCurrentUrl';

  constructor(
    public url: string) {
  }
}
