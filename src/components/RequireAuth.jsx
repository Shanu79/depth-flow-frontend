import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import PageLoader from './PageLoader';

const RequireAuth = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.loading);
  const location = useLocation();

  // 1. If auth is still fetching, show a loader
  if (isLoading) {
    return <PageLoader />; 
  }

  // 2. If it finished loading and there is NO user, redirect
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Otherwise, render the protected page
  return children;
};

export default RequireAuth;