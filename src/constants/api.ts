export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export interface ApiResponse<T> {
  rc: string;
  message?: string;
  data?: T;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
  },
  CUSTOMER: {
    CREATE: '',
    DELETE: '',
    GET: '',
    GET_SINGLE: '',
    UPDATE: '',
  },
  PRODUCT: {
    CREATE: '',
    DELETE: '',
    GET: '',
    GET_SINGLE: '',
    UPDATE: '',
  },
  PRODUCT_CATEGORY: {
    CREATE: '',
    DELETE: '',
    GET: '',
    GET_SINGLE: '',
    UPDATE: '',
  },
  SUPPORT: {
    UPLOAD_IMAGE: '',
  },
} as const;
