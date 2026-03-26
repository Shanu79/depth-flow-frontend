import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import PageLoader from './PageLoader';

const RequireAuth = ({ children }) => {
  // Ensure you pull 'isLoading' or a similar checking state from your store
  const { user, isLoading } = useAuthStore((state) => ({
    user: state.user,
    isLoading: state.isLoading // Or whatever your loading state is named
  }));

  // 1. If auth is still fetching, show a loader
  if (isLoading) {
    return <PageLoader />; 
  }

  // 2. If it finished loading and there is NO user, redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Otherwise, render the protected page
  return children;
};

export default RequireAuth;