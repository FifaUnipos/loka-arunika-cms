import { API_CONFIG } from '@/constants/api';
import { useAuth } from '@/hooks/use-auth';
import { useDeviceId } from '@/hooks/use-device-id';
import type { AxiosError, AxiosRequestHeaders } from 'axios';
import axios from 'axios';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const isAuthFree =
      config.url?.startsWith('/login') || config.url?.startsWith('/register');
    const { token } = useAuth();
    const deviceId = useDeviceId();

    config.headers = Object.assign({}, config.headers);
    config.headers['X-DEVICE-ID'] = deviceId;

    // ✅ Initialize headers if not exists
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    // ✅ Set Content-Type hanya untuk non-FormData requests
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    // ✅ Untuk FormData, biarkan browser yang set Content-Type otomatis

    // ✅ Set auth token
    if (!isAuthFree && token) {
      config.headers['token'] = token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

export default instance;
