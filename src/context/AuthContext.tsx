import React, { createContext, useContext, useState } from 'react';
import { UserProfile, DEMO_ACCOUNTS } from '../data/mockData';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('qaforge_user');
    return saved ? JSON.parse(saved) : DEMO_ACCOUNTS.admin;
  });

  const [token, setToken] = useState<string | null>(() => {
    const savedJwt = localStorage.getItem('qaforge_jwt');
    return savedJwt ? savedJwt : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.vijay.${Date.now()}`;
  });

  const login = (email: string, pass: string) => {
    if (email === DEMO_ACCOUNTS.admin.email && pass === DEMO_ACCOUNTS.admin.password) {
      const adminUser = DEMO_ACCOUNTS.admin;
      const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin.${Date.now()}`;
      setUser(adminUser);
      setToken(fakeJwt);
      localStorage.setItem('qaforge_user', JSON.stringify(adminUser));
      localStorage.setItem('qaforge_jwt', fakeJwt);
      return { success: true, message: 'Logged in as Admin successfully' };
    }

    if (email === DEMO_ACCOUNTS.user.email && pass === DEMO_ACCOUNTS.user.password) {
      const normalUser = DEMO_ACCOUNTS.user;
      const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user.${Date.now()}`;
      setUser(normalUser);
      setToken(fakeJwt);
      localStorage.setItem('qaforge_user', JSON.stringify(normalUser));
      localStorage.setItem('qaforge_jwt', fakeJwt);
      return { success: true, message: 'Logged in as User successfully' };
    }

    // Default mock user login if credentials match basic format
    if (email && pass.length >= 6) {
      const customUser: UserProfile = {
        email,
        name: email.split('@')[0],
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
        bio: 'Custom practice user account.',
        themePreference: 'dark',
        notificationsEnabled: true
      };
      const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.custom.${Date.now()}`;
      setUser(customUser);
      setToken(fakeJwt);
      localStorage.setItem('qaforge_user', JSON.stringify(customUser));
      localStorage.setItem('qaforge_jwt', fakeJwt);
      return { success: true, message: 'Custom user account logged in.' };
    }

    return { success: false, message: 'Invalid credentials. Use user@qaforge.com / user123 or admin@qaforge.com / admin123' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('qaforge_user');
    localStorage.removeItem('qaforge_jwt');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const newProfile = { ...user, ...updated };
    setUser(newProfile);
    localStorage.setItem('qaforge_user', JSON.stringify(newProfile));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
