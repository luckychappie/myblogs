import React, { useEffect, useLayoutEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import createAxios from '@/lib/axios';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
