import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences?: {
    style: string;
    budget: string;
    apartmentSize: string;
  };
  wishlistCount?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('vanca_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data: Partial<User>) => {
    const defaultUser: User = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      name: data.name || 'User',
      email: data.email || '',
      role: data.role || 'user',
      preferences: { style: 'Modern', budget: 'Premium', apartmentSize: 'Large' },
      wishlistCount: 2,
    };

    // Simulate smart protection logic JWT simulation
    setUser(defaultUser);
    localStorage.setItem('vanca_user', JSON.stringify(defaultUser));

    // Legacy support for specific checks
    if (data.role === 'admin') {
      localStorage.setItem('isAdminAuth', 'true');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vanca_user');
    localStorage.removeItem('isAdminAuth');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      logout
    }}>
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
