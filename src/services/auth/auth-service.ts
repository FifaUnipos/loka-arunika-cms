import httpClient from '@/services/http-client';
import { API_ENDPOINTS, type ApiResponse } from '@/constants/api';

// login function
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
}

export interface LoginBodyResponse {
  user: AuthUser;
  refresh_token: string;
}

export type LoginResponse = ApiResponse<LoginBodyResponse>;

export async function login(payload: LoginPayload) {
  const res = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);

  return res.data as LoginResponse;
}

// register function
export interface RegisterPayload {
  // User
  user_email: string;
  user_full_name: string;
  user_password: string;
  user_phone_number: string;
  // Merchant
  merchant_district_id: string;
  merchant_province_id: string;
  merchant_regency_id: string;
  merchant_village_id: string;
  merchant_address: string;
  merchant_address_send: string;
  merchant_email: string;
  merchant_name: string;
  merchant_phone_number: string;
  merchant_zipcode: string;
}

export interface RegisterBodyResponse {
  user: {
    user_email: string;
    user_name: string;
  };
  merchant: {
    merchant_email: string;
    merchant_name: string;
  };
  refresh_token: string;
}

export type RegisterResponse = ApiResponse<RegisterBodyResponse>;

export async function regiister(payload: RegisterPayload) {
  const res = await httpClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);

  return res.data as RegisterResponse;
}

// logout function
export type LogoutResponse = ApiResponse<null>;

export async function logout() {
  const res = await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);

  return res.data as LogoutResponse;
}
