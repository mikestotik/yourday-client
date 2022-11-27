import { NavItem } from '../interfaces/navigation.interface';
import { TaskFilter } from '../models/task/task.enum';
import { MainRoutes, SettingsRoute } from './routes.config';

/**
 * MAin Sidebar Navigation Config
 * */
export const MAIN_NAVIGATION: NavItem[] = [
  {
    routerLink: MainRoutes.Notifications,
    title: 'Notifications',
    icon: 'icon icon-alarm',
    disabled: false,
    hidden: true
  },
  {
    routerLink: MainRoutes.Statistics,
    title: 'Statistics',
    icon: 'icon icon-pie-chart',
    disabled: true,
    hidden: true
  },
  {
    routerLink: MainRoutes.Tasks,
    title: 'My Tasks',
    icon: 'icon icon-list'
  },
  {
    routerLink: MainRoutes.Settings,
    title: 'Settings',
    icon: 'icon icon-cog'
  }
];

/**
 * Page Sidebar Navigation Config [ Tasks ]
 * */
export const PAGE_NAVIGATION_TASKS: NavItem[] = [
  {
    routerLink: TaskFilter.Incoming,
    title: 'Incoming',
    icon: 'icon icon-inbox'
  },
  {
    routerLink: TaskFilter.Today,
    title: 'Today',
    icon: 'icon icon-clock'
  },
  {
    routerLink: TaskFilter.Upcoming,
    title: 'Planned',
    icon: 'icon icon-calendar-full'
  }
];

/**
 * Page Sidebar Navigation Config [ Settings ]
 * */
export const PAGE_NAVIGATION_SETTINGS: NavItem[] = [
  {
    routerLink: SettingsRoute.Account,
    title: 'Account',
    icon: 'icon icon-user'
  },
  {
    routerLink: SettingsRoute.General,
    title: 'General',
    icon: 'icon icon-cog'
  },
  {
    routerLink: SettingsRoute.Notifications,
    title: 'Notifications',
    icon: 'icon icon-alarm',
    disabled: true,
    hidden: true
  },
  {
    routerLink: SettingsRoute.Reminders,
    title: 'Reminders',
    icon: 'icon icon-clock',
    disabled: true,
    hidden: true
  },
  {
    routerLink: SettingsRoute.Theme,
    title: 'Theme',
    icon: 'icon icon-magic-wand',
    disabled: true,
    hidden: true
  },
  {
    routerLink: SettingsRoute.Backups,
    title: 'Backups',
    icon: 'icon icon-cloud-download',
    disabled: true,
    hidden: true
  },
  {
    routerLink: SettingsRoute.Integrations,
    title: 'Integrations',
    icon: 'icon icon-code',
    disabled: true,
    hidden: true
  }
];
