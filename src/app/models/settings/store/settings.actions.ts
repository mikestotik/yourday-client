import { GeneralSettings, ServerSettingsPayload } from '../../../interfaces/settings.interface';


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


export class FindServerSettings {
  static readonly type = '[Settings] FindServerSettings';
}


export class UpdateServerSettings {
  static readonly type = '[Settings] UpdateServerSettings';


  constructor(
    public id: number,
    public payload: Partial<ServerSettingsPayload>) {
  }
}
