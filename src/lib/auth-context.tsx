'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, User, setAuthToken } from './api';

interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  address: {
    line1: string;
    landmark?: string;
    pincode: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserRegistrationData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Safely access localStorage after mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setAuthToken(storedToken);
    if (storedToken) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getProfile();
      setUser(response.data);
      setError(null);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setAuthToken(null);
      setUser(null);
      setError('Session expired. Please login again.');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserRegistrationData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(userData);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 