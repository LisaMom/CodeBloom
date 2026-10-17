import { useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
}

const AUTH_KEY = 'DevTech_auth';

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(loadAuth);

  /** Simulate a login — replace with real API call as needed. */
  const login = (email: string): void => {
    const next: AuthState = { isAuthenticated: true, user: { email } };
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    setAuth(next);
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
    setAuth({ isAuthenticated: false, user: null });
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    login,
    logout,
  };
}
