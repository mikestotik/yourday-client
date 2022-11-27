import { StartPageStrategy } from '../enums/start-page.enum';


export interface SettingsModel {
  pinnedGroups: number[];
  lastUrl: string;
  general: GeneralSettings;
}

export interface GeneralSettings {
  startPageStrategy: StartPageStrategy;
}
