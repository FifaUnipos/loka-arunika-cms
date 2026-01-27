import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthInit } from '@/contexts/auth/auth-context';
import type { AuthUser } from '@/services/auth/auth-service';

const initialState: AuthInit = {
  user: null,
  token: null,
};

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [state, setState] = useState<AuthInit>(initialState);

  const setAuth = (payload: { user: AuthUser; token: string }) => {
    setState({
      user: payload.user,
      token: payload.token,
    });
  };

  const clearAuth = () => {
    setState(initialState);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
