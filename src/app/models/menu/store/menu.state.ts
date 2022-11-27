import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShowMenu } from './menu.actions';


export interface MenuStateModel {
  visible: boolean;
}


@State<MenuStateModel>({
  name: 'menu',
  defaults: {
    visible: true
  }
})
@Injectable()
export class MenuState {

  @Selector()
  public static shownMenu(state: MenuStateModel): boolean {
    return state.visible;
  }


  @Action(ShowMenu)
  public toggleMenu(ctx: StateContext<MenuStateModel>, action: ShowMenu): void {
    ctx.patchState({ visible: action.payload });
  }
}
