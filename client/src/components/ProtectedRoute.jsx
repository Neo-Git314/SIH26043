import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, RefreshCw } from 'lucide-react';

/**
 * ProtectedRoute Component with Role-Based Access Control (RBAC)
 * @param {Array<string>} allowedRoles - Optional list of permitted roles (e.g. ['admin'], ['citizen'])
 * @param {React.ReactNode} children - Child component to render
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated, isLoading, switchRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-bg px-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-brand-terracotta animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-navy">
            सेतु
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">
          Authenticating Samadhan Setu Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, storing intended route in history state
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ShieldAlert size={34} />
          </div>
          
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Access Restricted (403)
          </span>

          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            Role Permission Required
          </h2>
          
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            This module requires <strong className="text-brand-terracotta">{allowedRoles.join(' or ').toUpperCase()}</strong> privileges.
            You are currently logged in as a <strong className="text-brand-navy">{user?.role?.toUpperCase()}</strong>.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Current User:</span>
              <span className="font-semibold text-slate-800">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Active Role:</span>
              <span className="font-semibold text-brand-terracotta uppercase">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Required Role:</span>
              <span className="font-semibold text-slate-800">{allowedRoles.join(', ')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {allowedRoles[0] && (
              <button
                onClick={() => switchRole(allowedRoles[0])}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-terracotta text-white rounded-lg text-sm font-semibold hover:bg-brand-terracotta-dark transition-all shadow-sm"
              >
                <RefreshCw size={16} />
                Switch to {allowedRoles[0].toUpperCase()} Mode
              </button>
            )}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all"
            >
              Back to Home <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
