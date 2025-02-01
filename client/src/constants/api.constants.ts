import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { NavigateFunction } from 'react-router';

export const API_BASE_URL = 'http://localhost:3000/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  withCredentials: true,
});

export function setupAxiosInterceptors(navigate: NavigateFunction) {
  let interceptorId: number | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseInterceptor = (response: AxiosResponse<any, any>) => response;
  const errorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config;

    // reject promise if error has nothing to do with auth
    if (!originalRequest || error.response?.status !== 401) return Promise.reject(error);

    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response.
     *
     * Must be re-attached later on or the token refresh will only happen once
     */

    if (interceptorId !== null) {
      axiosInstance.interceptors.response.eject(interceptorId);
    }

    try {
      const res = await axiosInstance.post('/refresh');

      if (res.status === HttpStatusCode.NoContent) {
        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      // send logout request to delete tokens from cookies
      await axiosInstance.post('/users/logout');

      // redirect to login page
      navigate('/login');

      // reject promise
      return Promise.reject(refreshError);
    } finally {
      interceptorId = axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
    }
  };

  // attach interceptor
  interceptorId = axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
}
