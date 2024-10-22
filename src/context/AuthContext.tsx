"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import createAxios from '@/lib/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showSnackbar: boolean;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const router = useRouter();

  useLayoutEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token');
    if (token) {
        createAxios.get('/me', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setUser(response.data);
        }).catch(() => {
            localStorage.removeItem('token');
            router.push('/auth/login');
        }).finally(()=> setLoading(false));
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const response = await createAxios.post('/login', data);
    localStorage.setItem('token', response.data.authorisation.token);
    setUser(response.data.user);
    router.push('/blogs');
  };

  const logout = async () => {
    await createAxios.post('/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout , setUser, loading, setLoading, showSnackbar, setShowSnackbar, snackbarMessage, setSnackbarMessage}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
