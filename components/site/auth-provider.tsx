'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearStoredAccessToken,
  getCurrentUser,
  getStoredAccessToken,
  loginUser,
  registerUser,
  setStoredAccessToken,
  type LoginPayload,
  type RegisterPayload,
  type UserProfile,
} from '@/lib/lms-api';

type AuthContextValue = {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getStoredAccessToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setToken(storedToken);
    getCurrentUser(storedToken)
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        clearStoredAccessToken();
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const refreshUser = async () => {
    const activeToken = token ?? getStoredAccessToken();
    if (!activeToken) {
      setUser(null);
      return;
    }
    const currentUser = await getCurrentUser(activeToken);
    setUser(currentUser);
    setToken(activeToken);
  };

  const login = async (payload: LoginPayload) => {
    const response = await loginUser(payload);
    setStoredAccessToken(response.access_token);
    setToken(response.access_token);
    setUser(response.user);
  };

  const register = async (payload: RegisterPayload) => {
    const response = await registerUser(payload);
    setStoredAccessToken(response.access_token);
    setToken(response.access_token);
    setUser(response.user);
  };

  const logout = () => {
    clearStoredAccessToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      refreshUser,
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}