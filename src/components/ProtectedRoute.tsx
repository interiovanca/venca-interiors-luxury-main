import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Ensure user is authentically logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Strictly enforce role-based access control (RBAC)
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <>{children}</>;
};
