import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-600">Verifying JanSeva Credentials...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to respective appropriate landing dashboard based on actual role
    if (role === 'ADMIN') return <Navigate to="/admin-portal" replace />;
    if (role === 'OFFICER') return <Navigate to="/officer-portal" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
