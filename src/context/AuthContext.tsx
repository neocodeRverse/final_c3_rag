/**
 * Authentication Context
 * Manages login state and authentication logic
 */

/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated (from localStorage)
    return localStorage.getItem('rag_authenticated') === 'true';
  });

  const login = (username: string, password: string): boolean => {
    // Frontend validation only - compare with default credentials
    const VALID_USERNAME = 'Admin123';
    const VALID_PASSWORD = 'Password@12345';

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('rag_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rag_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
