import { environment } from '../../environments/environment';

const CORE_API_URL = environment.api.core;

export const ApiConfig = {
  ACCOUNT_REGISTER: `${ CORE_API_URL }/account/register`,
  ACCOUNT_ACTIVATE: `${ CORE_API_URL }/account/activate`,
  ACCOUNT: `${ CORE_API_URL }/account`,
  AUTH_LOGIN: `${ CORE_API_URL }/auth/login`,
  AUTH_LOGOUT: `${ CORE_API_URL }/auth/logout`,
  AUTH_REFRESH: `${ CORE_API_URL }/auth/refresh`,
  GROUPS: `${ CORE_API_URL }/groups`,
  SETTINGS: `${ CORE_API_URL }/settings`,
  TAGS: `${ CORE_API_URL }/tags`,
  COLORS: `${ CORE_API_URL }/colors`,
  TASKS: `${ CORE_API_URL }/tasks`,
  SUB_TASKS: `${ CORE_API_URL }/sub-tasks`,
};
