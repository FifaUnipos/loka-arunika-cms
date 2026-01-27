import { createContext } from 'react';
import type { AuthUser } from '@/services/auth/auth-service';

export interface AuthInit {
  user: AuthUser | null;
  token: string | null;
}

export interface AuthContextValue extends AuthInit {
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
