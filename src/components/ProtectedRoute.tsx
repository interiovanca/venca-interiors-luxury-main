import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If we're strictly enforcing backend AuthContext mapping:
  if (!isAuthenticated && !localStorage.getItem("isAdminAuth")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If you later add role-based checking:
  // if (requireAdmin && user?.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};
