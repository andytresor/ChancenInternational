import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // Check for token

  if (!token) {
    return <Navigate to="/auth/login" replace />; // Redirect if not authenticated
  }

  return children; // Render the protected route content
};

export default ProtectedRoute;
