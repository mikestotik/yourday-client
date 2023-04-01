import { StartPageStrategy } from '../enums/start-page.enum';
import { PushSubscription } from 'web-push';

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
  telegramEnabled?: boolean;
  telegram?: string;
  pushEnabled?: boolean;
  pushSubscription: PushSubscription | null;
}


export interface ServerSettings extends ServerSettingsPayload {
  id: number,
}

