import axios from 'axios';

import { setupInterceptorsTo } from './Interceptor';

export const setupAxios = (): void => {
  setupInterceptorsTo(axios);

  axios.defaults.baseURL = '';
  axios.defaults.headers.common.Authorization = '';
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
};
