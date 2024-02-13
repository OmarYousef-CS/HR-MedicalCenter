import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateAdminRoutes({isAdminRole}) {
  const { isAuthenticated, isAdmin } = useAuth();
  console.log('123: ',isAuthenticated, isAdmin)
  if (isAdminRole) {
    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin-login" />;
  }
  return isAuthenticated && !isAdmin ? <Outlet /> : <Navigate to="/admin-login" />;
}

export default PrivateAdminRoutes;
