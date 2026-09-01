import React, { createContext, useContext, useState, useCallback } from 'react';
import { authApi } from '../api/client';
import { DEMO_USERS, generateMockToken } from '../api/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('samadhan_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('samadhan_token') || null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login handler
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('samadhan_token', data.token);
      localStorage.setItem('samadhan_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed. Please verify your credentials.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register handler
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.register(userData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('samadhan_token', data.token);
      localStorage.setItem('samadhan_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('samadhan_token');
    localStorage.removeItem('samadhan_user');
  }, []);

  // Instant Role Switcher for Hackathon Live Demos & Jury Testing
  const switchRole = useCallback((newRole) => {
    if (!DEMO_USERS[newRole]) {
      console.warn(`Role ${newRole} not recognized among demo profiles.`);
      return;
    }
    const demoUser = DEMO_USERS[newRole];
    const mockToken = generateMockToken(demoUser);

    setUser(demoUser);
    setToken(mockToken);
    localStorage.setItem('samadhan_token', mockToken);
    localStorage.setItem('samadhan_user', JSON.stringify(demoUser));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    role: user?.role || null,
    isLoading,
    error,
    login,
    register,
    logout,
    switchRole,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
