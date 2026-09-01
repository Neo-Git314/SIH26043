import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JHARKHAND_DISTRICTS } from '../api/mockData';
import {
  Sparkles,
  Users,
  GraduationCap,
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Phone,
  Building,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';

export default function AuthPage() {
  const { login, register, isAuthenticated, role, switchRole, error, clearError, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialEmail = searchParams.get('email') || '';

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState(initialEmail ? 'register' : 'login');

  // Form states
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [district, setDistrict] = useState('Ranchi');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Destination redirect
  const from = location.state?.from?.pathname || null;

  // If already authenticated and not actively signing in, redirect to proper landing
  useEffect(() => {
    if (isAuthenticated) {
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (role === 'citizen') navigate('/my-complaints');
        else if (role === 'university') navigate('/university/challenges');
        else if (role === 'industry') navigate('/industry/invitations');
        else if (role === 'admin') navigate('/admin/dashboard');
        else navigate('/');
      }
    }
  }, [isAuthenticated, role, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email || !password) {
      setLocalError('Please provide both email and password.');
      return;
    }

    if (mode === 'register' && !name) {
      setLocalError('Please provide your full name.');
      return;
    }

    if (mode === 'login') {
      const result = await login({ email, password });
      if (!result.success) {
        setLocalError(result.error || 'Invalid credentials.');
      }
    } else {
      const result = await register({
        name,
        email,
        password,
        role: selectedRole,
        phone,
        organization: organization || (selectedRole === 'citizen' ? 'Citizen' : 'Partner'),
        district: selectedRole === 'citizen' ? district : undefined,
      });
      if (!result.success) {
        setLocalError(result.error || 'Registration failed.');
      }
    }
  };

  // Quick Demo Login Action
  const handleQuickLogin = (demoRole) => {
    switchRole(demoRole);
    if (demoRole === 'citizen') navigate('/submit');
    else if (demoRole === 'university') navigate('/university/challenges');
    else if (demoRole === 'industry') navigate('/industry/invitations');
    else if (demoRole === 'admin') navigate('/admin/dashboard');
  };

  const roleCards = [
    {
      id: 'citizen',
      label: 'Citizen',
      subtext: 'Report & track civic issues',
      icon: Users,
      color: 'emerald',
      badgeClass: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
    },
    {
      id: 'university',
      label: 'University Lab',
      subtext: 'R&D prototyping & mentoring',
      icon: GraduationCap,
      color: 'indigo',
      badgeClass: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
    },
    {
      id: 'industry',
      label: 'Industry / CSR',
      subtext: 'Co-funding & tech scaling',
      icon: Building2,
      color: 'amber',
      badgeClass: 'bg-amber-500/10 text-amber-700 border-amber-300',
    },
    {
      id: 'admin',
      label: 'State Admin',
      subtext: 'Oversight & policy dispatch',
      icon: ShieldCheck,
      color: 'purple',
      badgeClass: 'bg-purple-500/10 text-purple-700 border-purple-300',
    },
  ];

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-md">
              <Sparkles size={22} />
            </div>
            <span className="text-2xl font-extrabold text-[#0B1E36] font-geist tracking-tight">
              समाधान <span className="text-brand-orange">सेतु</span>
            </span>
          </Link>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Societal Innovation Collaboration Portal — Jharkhand
          </p>
        </div>

        {/* 1-Click SIH Quick Demo Logins Banner */}
        <div className="mb-6 bg-[#0B1E36] border border-slate-700 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-brand-orange animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                SIH 2024 Demo Fast-Pass (1-Click Instant Login)
              </span>
            </div>
            <span className="text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded border border-brand-orange/30 font-semibold">
              Live Testing
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('citizen')}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-950/80 hover:border-emerald-500 border border-slate-700 transition-all text-center group"
            >
              <Users size={16} className="text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-200">Citizen</span>
              <span className="text-[10px] text-slate-400 truncate max-w-full">Birsa Munda</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('university')}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-950/80 hover:border-indigo-500 border border-slate-700 transition-all text-center group"
            >
              <GraduationCap size={16} className="text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-200">University</span>
              <span className="text-[10px] text-slate-400 truncate max-w-full">BIT Mesra Lab</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('industry')}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-800/80 hover:bg-amber-950/80 hover:border-amber-500 border border-slate-700 transition-all text-center group"
            >
              <Building2 size={16} className="text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-200">Industry / CSR</span>
              <span className="text-[10px] text-slate-400 truncate max-w-full">Tata Steel</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-800/80 hover:bg-purple-950/80 hover:border-purple-500 border border-slate-700 transition-all text-center group"
            >
              <ShieldCheck size={16} className="text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-200">State Admin</span>
              <span className="text-[10px] text-slate-400 truncate max-w-full">Govt Officer</span>
            </button>
          </div>
        </div>

        {/* Main Auth Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Mode Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLocalError('');
                clearError();
              }}
              className={`py-4 text-center transition-all ${
                mode === 'login'
                  ? 'bg-white text-brand-navy border-b-2 border-brand-orange font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In to Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setLocalError('');
                clearError();
              }}
              className={`py-4 text-center transition-all ${
                mode === 'register'
                  ? 'bg-white text-brand-navy border-b-2 border-brand-orange font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register New Account
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Error Message */}
            {(localError || error) && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span>{localError || error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection (Visible in both or prominent in Register) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Stakeholder Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roleCards.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'border-brand-orange bg-orange-50/70 shadow-sm ring-1 ring-brand-orange'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon
                            size={18}
                            className={isSelected ? 'text-brand-orange' : 'text-slate-500'}
                          />
                          {isSelected && <CheckCircle2 size={14} className="text-brand-orange" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{r.label}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{r.subtext}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Register-only Fields */}
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name / Authorized Representative *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rameshwar Mahato"
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone size={16} />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98351..."
                          className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                    </div>

                    {selectedRole === 'citizen' ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Jharkhand District *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <MapPin size={16} />
                          </div>
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                          >
                            {JHARKHAND_DISTRICTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Organization / Institute Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Building size={16} />
                          </div>
                          <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="e.g. BIT Mesra / Tata Steel"
                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      mode === 'login'
                        ? 'citizen@jharkhand.gov.in or your email'
                        : 'official.email@organization.in'
                    }
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Demo Mode: You can enter any password or use the 1-Click Fast Pass above.')}
                      className="text-[11px] text-brand-orange hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create & Register Account'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Security & SIH Notice */}
        <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            Protected by State JWT Encryption & Role-Based Access Gateways
          </p>
          <p className="text-slate-400 text-[11px]">
            Smart India Hackathon 2024 — Problem Statement SIH26043
          </p>
        </div>
      </div>
    </div>
  );
}
