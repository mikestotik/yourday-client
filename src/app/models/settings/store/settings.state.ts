import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { StartPageStrategy } from '../../../enums/start-page.enum';
import { GeneralSettings, ServerSettingsPayload, SettingsModel } from '../../../interfaces/settings.interface';
import { SettingsService } from '../services/settings.service';
import {
  FindServerSettings,
  PinGroup,
  UnPinGroup,
  UpdateCurrentUrl,
  UpdateGeneralSettings,
  UpdateServerSettings
} from './settings.actions';


@State<SettingsModel>({
  name: 'settings',
  defaults: {
    pinnedGroups: [],
    lastUrl: '',
    general: {
      startPageStrategy: StartPageStrategy.Incoming
    },
    server: {
      pushSubscription: null
    }
  }
})
@Injectable()
export class SettingsState {

  @Selector()
  public static selectServerSettings(state: SettingsModel): ServerSettingsPayload {
    return state.server;
  }


  @Selector()
  public static pinnedGroups(state: SettingsModel): number[] {
    return state.pinnedGroups;
  }


  @Selector()
  public static selectGeneral(state: SettingsModel): GeneralSettings {
    return state.general;
  }


  @Selector()
  public static selectLastUrl(state: SettingsModel): string {
    return state.lastUrl;
  }


  constructor(
    private readonly settingsService: SettingsService) {
  }


  @Action(PinGroup)
  public pinGroup(ctx: StateContext<SettingsModel>, action: PinGroup): void {
    const state = ctx.getState();
    ctx.patchState({ pinnedGroups: [ action.groupId, ...state.pinnedGroups ] });
  }


  @Action(UnPinGroup)
  public unpinGroup(ctx: StateContext<SettingsModel>, action: PinGroup): void {
    const state = ctx.getState();
    ctx.patchState({ pinnedGroups: state.pinnedGroups.filter(i => i !== action.groupId) });
  }


  @Action(UpdateGeneralSettings)
  public updateGeneralSettings(ctx: StateContext<SettingsModel>, { payload }: UpdateGeneralSettings): void {
    ctx.patchState({ general: payload });
  }


  @Action(UpdateCurrentUrl)
  public updateCurrentUrl(ctx: StateContext<SettingsModel>, { url }: UpdateCurrentUrl): void {
    ctx.patchState({ lastUrl: url });
  }


  @Action(FindServerSettings)
  public findServerSettings(ctx: StateContext<SettingsModel>): Observable<SettingsModel> {
    return this.settingsService.find().pipe(
      map(server => ctx.patchState({ server }))
    );
  }


  @Action(UpdateServerSettings)
  public updateServerSettings(ctx: StateContext<SettingsModel>, {
    id,
    payload
  }: UpdateServerSettings): Observable<SettingsModel> {
    return this.settingsService.update(id, payload).pipe(
      map(server => ctx.patchState({ server }))
    );
  }
}
