export enum AppRoutes {
  App = 'main',
  Auth = 'auth',
  Errors = 'error',
}


export enum AuthRoutes {
  Login = 'login',
  Register = 'register',
  Activate = 'activate',
  Google = 'google',
}


export enum ErrorRoutes {
  NotFound = 'not-found',
}


export enum MainRoutes {
  Tasks = 'tasks',
  Notifications = 'notifications',
  Statistics = 'statistics',
  Settings = 'settings',
}


export enum SettingsRoute {
  Account = 'account',
  General = 'general',
  Notifications = 'notifications',
  Reminders = 'reminders',
  Theme = 'theme',
  Backups = 'backups',
  Integrations = 'integrations',
}
