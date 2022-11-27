export enum SnackType {
  Default = 'default',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger'
}


export interface SnackData {
  message: string;
  type: SnackType;
}
