import { EventEmitter } from '@angular/core';


export interface NavItem {
  routerLink: string;
  title: string;
  icon: string;
  disabled?: boolean;
  hidden?: boolean;
}


export interface NavigationStateModel {
  main: NavItem[];
  page: {
    tasks: NavItem[];
    settings: NavItem[];
  };
}


export interface PageNavigation {
  itemEvent: EventEmitter<void>;
}
