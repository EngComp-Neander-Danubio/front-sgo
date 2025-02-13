import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';

interface IProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { isTokenValid } = useAuth();
  const tokenData = isTokenValid();
  console.log('token exists',tokenData)
  if (!tokenData) {
    return <Navigate to="/login-sgo" />;
  }

  return <>{children}</>;
}
