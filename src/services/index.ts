import axios from 'axios';

import { setupInterceptorsTo } from './Interceptor';

export const setupAxios = (): void => {
  setupInterceptorsTo(axios);

  axios.defaults.baseURL = 'https://tirus-times-back-hf1g.vercel.app/';
};
