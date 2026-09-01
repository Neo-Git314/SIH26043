import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const { user, switchRole } = useAuth();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-[#F7F9FC] dot-grid">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
          <ShieldAlert size={34} />
        </div>

        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
          HTTP 403 Forbidden
        </span>

        <h2 className="text-2xl font-bold text-[#0B1E36] mb-2 font-geist">
          Access Restricted
        </h2>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Your current account role (<strong className="text-brand-orange uppercase">{user?.role || 'Guest'}</strong>) does not have permission to access this module.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Logged User:</span>
            <span className="font-semibold text-slate-800">{user?.name || 'Unauthenticated'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Active Role:</span>
            <span className="font-semibold text-brand-orange capitalize">{user?.role || 'None'}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Switch to a different demo persona:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['citizen', 'university', 'industry', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                  user?.role === r
                    ? 'border-brand-orange bg-orange-50 text-brand-orange'
                    : 'border-slate-200 hover:border-slate-400 bg-white text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
            >
              <Home size={15} /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
