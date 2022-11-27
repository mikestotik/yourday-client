import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { MAIN_NAVIGATION, PAGE_NAVIGATION_SETTINGS, PAGE_NAVIGATION_TASKS } from '../../../config/navigation.config';
import { MainRoutes } from '../../../config/routes.config';
import { NavigationStateModel, NavItem } from '../../../interfaces/navigation.interface';


@State<NavigationStateModel>({
  name: 'navigation',
  defaults: {
    main: MAIN_NAVIGATION,
    page: {
      tasks: PAGE_NAVIGATION_TASKS,
      settings: PAGE_NAVIGATION_SETTINGS
    }
  }
})
@Injectable()
export class NavigationState {

  @Selector()
  public static pageNavTasks(state: NavigationStateModel): NavItem[] {
    return state.page.tasks;
  }


  @Selector()
  public static pageNavTasksItem(state: NavigationStateModel): (routerLink: string) => NavItem {
    return (routerLink: string): NavItem => {
      return state.page.tasks.find(i => i.routerLink === routerLink)!;
    };
  }


  @Selector()
  public static pageNavSettings(state: NavigationStateModel): NavItem[] {
    return state.page.settings;
  }


  @Selector()
  public static mainNavigation(state: NavigationStateModel): NavItem[] {
    return state.main;
  }


  @Selector()
  public static mainNavigationItem(state: NavigationStateModel): (routerLink: MainRoutes) => NavItem {
    return (routerLink: MainRoutes): NavItem => {
      return state.main.find(i => i.routerLink === routerLink)!;
    };
  }

}
