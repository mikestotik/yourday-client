import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StartPageStrategy } from '../../../enums/start-page.enum';
import { GeneralSettings, SettingsModel } from '../../../interfaces/settings.interface';
import { PinGroup, UnPinGroup, UpdateCurrentUrl, UpdateGeneralSettings } from './settings.actions';


@State<SettingsModel>({
  name: 'settings',
  defaults: {
    pinnedGroups: [],
    lastUrl: '',
    general: {
      startPageStrategy: StartPageStrategy.Incoming
    }
  }
})
@Injectable()
export class SettingsState {

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


  constructor() { }


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
}
