import React, { useState, useEffect } from 'react';
import UniversityChallenges from './pages/university/UniversityChallenges';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  // Simple path-aware route state for Frontend 3 development
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('admin')) {
      return '/admin/dashboard';
    }
    return '/university/challenges';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes('admin')) {
        setCurrentRoute('/admin/dashboard');
      } else {
        setCurrentRoute('/university/challenges');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Shared Top Navigation Bar - EGovt Midnight Navy & Civic Orange */}
      <header className="sticky top-0 z-40 bg-[#0B1E3D] border-b border-[#172E54] text-white shadow-md">
        {/* Top Mini Utility Bar */}
        <div className="bg-[#071328] border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>🇮🇳 Government of Jharkhand Civic Portal</span>
            <span className="text-slate-600">•</span>
            <span>Toll Free Support: <strong className="text-white">1800 123 4567</strong></span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Hours: Mon - Sat 9:00 am - 6:00 pm</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Portal Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D24] to-[#FF7A00] flex items-center justify-center font-black text-white text-lg shadow-md shadow-orange-500/30">
              S
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                SAMADHAN SETU
                <span className="text-[10px] font-bold text-white bg-[#FF4D24] px-2 py-0.5 rounded-full shadow-sm">
                  SIH 26043
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                Societal Innovation & University Collaboration Gateway
              </p>
            </div>
          </div>

          {/* Frontend 3 Screen Switcher */}
          <nav className="flex items-center gap-1.5 bg-[#071328] p-1.5 rounded-xl border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => navigateTo('/university/challenges')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                currentRoute === '/university/challenges'
                  ? 'bg-[#FF4D24] text-white shadow-md shadow-orange-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🏛️</span>
              <span>University Challenges</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/admin/dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                currentRoute === '/admin/dashboard'
                  ? 'bg-[#FF4D24] text-white shadow-md shadow-orange-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📊</span>
              <span>Admin Dashboard</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentRoute === '/admin/dashboard' ? (
          <AdminDashboard />
        ) : (
          <UniversityChallenges />
        )}
      </main>
    </div>
  );
}
