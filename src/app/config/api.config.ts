import { environment } from '../../environments/environment';

const CORE_API_URL = environment.api.core;

export const ApiConfig = {
  ACCOUNT: `${ CORE_API_URL }/account`,
  ACCOUNT_ME: `${ CORE_API_URL }/account/me`,
  ACCOUNT_REGISTER: `${ CORE_API_URL }/account/register`,
  ACCOUNT_ACTIVATE: `${ CORE_API_URL }/account/activate`,
  ACCOUNT_UPDATE_PASS: `${ CORE_API_URL }/account/update-pass`,
  AUTH_LOGIN: `${ CORE_API_URL }/auth/login`,
  AUTH_LOGOUT: `${ CORE_API_URL }/auth/logout`,
  AUTH_REFRESH: `${ CORE_API_URL }/auth/refresh`,
  AUTH_RESET_PASS: `${ CORE_API_URL }/auth/reset-pass`,
  GROUPS: `${ CORE_API_URL }/groups`,
  SETTINGS: `${ CORE_API_URL }/settings`,
  TAGS: `${ CORE_API_URL }/tags`,
  COLORS: `${ CORE_API_URL }/colors`,
  TASKS: `${ CORE_API_URL }/tasks`,
  SUB_TASKS: `${ CORE_API_URL }/sub-tasks`,
};
