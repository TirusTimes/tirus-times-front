import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import Logging from 'services/logging';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const storageToken = window.localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${storageToken ?? ``}`,
  };
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  Logging.logError(error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  Logging.logError(error);
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
