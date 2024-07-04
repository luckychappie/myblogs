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
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useLayoutEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token');
    if (token) {
        createAxios.get('/me', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setUser(response.data);
            router.push('/blogs');
        }).catch(() => {
            localStorage.removeItem('token');
            router.push('/login');
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
    <AuthContext.Provider value={{ user, login, logout , setUser, loading, setLoading}}>
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
