import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_NOTIFICATIONS } from '../api/mockData';
import {
  Sparkles,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Building2,
  GraduationCap,
  Users,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, role, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const profileRef = useRef(null);
  const roleRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleSwitcherOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Helper to test if a nav link is active
  const isActive = (path) => location.pathname === path;

  // Role metadata
  const roleConfig = {
    citizen: {
      label: 'Citizen',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      pillClass: 'bg-emerald-600 text-white',
      icon: Users,
    },
    university: {
      label: 'University Lab',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      pillClass: 'bg-indigo-600 text-white',
      icon: GraduationCap,
    },
    industry: {
      label: 'Industry / CSR',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      pillClass: 'bg-amber-600 text-white',
      icon: Building2,
    },
    admin: {
      label: 'State Admin',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      pillClass: 'bg-purple-600 text-white',
      icon: ShieldCheck,
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Government Strip */}
      <div className="bg-[#050E1A] border-b border-slate-800 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-terracotta-light">झारखंड सरकार</span>
            <span className="text-slate-600">|</span>
            <span>Government of Jharkhand</span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:inline-block text-slate-400">Department of Higher & Technical Education</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Classification Engine Active
            </span>
            <span className="text-slate-400 font-mono">SIH 2024 Finalist</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#0B1E36] border-b border-slate-700/60 text-white transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-terracotta flex items-center justify-center shadow-lg shadow-brand-orange/20 transform group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white font-geist">
                    समाधान <span className="text-brand-orange">सेतु</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/30 font-medium">
                    Portal
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Societal Innovation Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Role-Adaptive) */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/')
                    ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Home
              </Link>

              {/* Citizen specific links */}
              {isAuthenticated && role === 'citizen' && (
                <>
                  <Link
                    to="/my-complaints"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/my-complaints')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    My Grievances
                  </Link>
                  <Link
                    to="/submit"
                    className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-orange text-white hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all"
                  >
                    <PlusCircle size={16} />
                    Report Issue
                  </Link>
                </>
              )}

              {/* University specific links */}
              {isAuthenticated && role === 'university' && (
                <>
                  <Link
                    to="/university/challenges"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/university/challenges')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Matched Challenges
                  </Link>
                  <Link
                    to="/university/projects/JH-PROJ-101"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/university/projects/JH-PROJ-101')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Active Projects
                  </Link>
                </>
              )}

              {/* Industry specific links */}
              {isAuthenticated && role === 'industry' && (
                <>
                  <Link
                    to="/industry/invitations"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/industry/invitations')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Project Invitations
                  </Link>
                  <Link
                    to="/university/challenges"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/university/challenges')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Explore R&D
                  </Link>
                </>
              )}

              {/* Admin specific links */}
              {isAuthenticated && role === 'admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/admin/dashboard')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Command Center
                  </Link>
                  <Link
                    to="/admin/complaints"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/admin/complaints')
                        ? 'text-brand-orange bg-brand-orange/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Grievance Registry
                  </Link>
                </>
              )}

              {/* Unauthenticated public navigation */}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/university/challenges"
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                  >
                    Civic Challenges
                  </Link>
                  <Link
                    to="/admin/dashboard"
                    className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                  >
                    Live Analytics
                  </Link>
                </>
              )}
            </div>

            {/* Right Controls: Role Switcher Pill + Notifications + Profile / Login */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Demo Role Switcher (Hackathon Essential) */}
              <div className="relative" ref={roleRef}>
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 hover:border-slate-500 text-xs text-slate-200 transition-all"
                  title="Switch user role for live presentation & testing"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Role:</span>
                  <span className="font-bold text-brand-orange flex items-center gap-1">
                    {role ? roleConfig[role]?.label : 'Public Guest'}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {roleSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F243E] border border-slate-700 shadow-2xl p-2 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-700/80 mb-1">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        ⚡ Quick Switch Role (SIH Demo)
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        switchRole('citizen');
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        role === 'citizen' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-emerald-400" />
                        <div className="text-left">
                          <p className="font-semibold">Citizen</p>
                          <p className="text-[10px] text-slate-400">Birsa Munda (Ranchi)</p>
                        </div>
                      </div>
                      {role === 'citizen' && <CheckCircle2 size={14} className="text-emerald-400" />}
                    </button>

                    <button
                      onClick={() => {
                        switchRole('university');
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        role === 'university' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-indigo-400" />
                        <div className="text-left">
                          <p className="font-semibold">University Researcher</p>
                          <p className="text-[10px] text-slate-400">BIT Mesra AI Hub</p>
                        </div>
                      </div>
                      {role === 'university' && <CheckCircle2 size={14} className="text-indigo-400" />}
                    </button>

                    <button
                      onClick={() => {
                        switchRole('industry');
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        role === 'industry' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-amber-400" />
                        <div className="text-left">
                          <p className="font-semibold">Industry / CSR</p>
                          <p className="text-[10px] text-slate-400">Tata Steel Incubation</p>
                        </div>
                      </div>
                      {role === 'industry' && <CheckCircle2 size={14} className="text-amber-400" />}
                    </button>

                    <button
                      onClick={() => {
                        switchRole('admin');
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-purple-400" />
                        <div className="text-left">
                          <p className="font-semibold">State Admin</p>
                          <p className="text-[10px] text-slate-400">Dept of Tech Education</p>
                        </div>
                      </div>
                      {role === 'admin' && <CheckCircle2 size={14} className="text-purple-400" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={19} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0F243E] border border-slate-700 shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-700 flex justify-between items-center bg-[#0B1E36]">
                      <span className="font-semibold text-sm text-white">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-brand-orange hover:underline font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-800">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markSingleRead(n.id)}
                            className={`p-3.5 text-xs cursor-pointer transition-colors ${
                              n.read ? 'bg-[#0F243E] text-slate-300' : 'bg-slate-800/60 text-white font-medium'
                            } hover:bg-slate-800`}
                          >
                            <p className="leading-snug">{n.message}</p>
                            <p className="mt-1 text-[10px] text-slate-400">
                              {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile or Sign In CTA */}
              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-navy to-brand-terracotta border border-white/20 flex items-center justify-center font-bold text-xs text-white uppercase">
                      {user?.name ? user.name.charAt(0) : <User size={16} />}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white truncate max-w-[110px]">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">
                        {user?.role}
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0F243E] border border-slate-700 shadow-2xl p-2 z-50">
                      <div className="p-3 border-b border-slate-700/80 mb-2">
                        <p className="text-sm font-bold text-white">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                        {user?.organization && (
                          <p className="text-[11px] text-brand-orange mt-1 truncate">
                            🏛️ {user.organization}
                          </p>
                        )}
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-600 bg-slate-800 text-slate-200">
                          Role: {user?.role}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth"
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-brand-orange text-white hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all"
                  >
                    Sign In / Portal Access
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#09172B] border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Quick Role Switcher */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Active Demo Role
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['citizen', 'university', 'industry', 'admin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize text-center transition-all ${
                      role === r
                        ? 'bg-brand-orange text-white shadow'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                Home
              </Link>
              {isAuthenticated && role === 'citizen' && (
                <>
                  <Link
                    to="/submit"
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-brand-orange bg-brand-orange/10"
                  >
                    + Submit Civic Issue
                  </Link>
                  <Link
                    to="/my-complaints"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    My Grievances
                  </Link>
                </>
              )}
              {isAuthenticated && role === 'university' && (
                <>
                  <Link
                    to="/university/challenges"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Matched Challenges
                  </Link>
                  <Link
                    to="/university/projects/JH-PROJ-101"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Active Projects
                  </Link>
                </>
              )}
              {isAuthenticated && role === 'industry' && (
                <>
                  <Link
                    to="/industry/invitations"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Project Invitations
                  </Link>
                </>
              )}
              {isAuthenticated && role === 'admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Admin Command Center
                  </Link>
                  <Link
                    to="/admin/complaints"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Grievance Registry
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-2 border-t border-slate-800">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-white">{user?.name}</p>
                    <p className="text-slate-400 capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/20 text-red-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="block w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-brand-orange text-white"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
