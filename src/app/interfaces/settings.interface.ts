import { StartPageStrategy } from '../enums/start-page.enum';


export interface SettingsModel {
  pinnedGroups: number[];
  lastUrl: string;
  general: GeneralSettings;
  server: ServerSettingsPayload;
}


export interface GeneralSettings {
  startPageStrategy: StartPageStrategy;
}


export interface ServerSettingsPayload {
  telegram?: string;
}


export interface ServerSettings extends ServerSettingsPayload {
  id: number,
}

