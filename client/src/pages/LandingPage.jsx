import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Building,
  GraduationCap,
  Users,
  Compass,
  Cpu,
  Award,
  Layers,
  MapPin,
  Send,
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated, role, switchRole } = useAuth();
  const navigate = useNavigate();
  const [quickEmail, setQuickEmail] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickEmail) {
      navigate(`/auth?email=${encodeURIComponent(quickEmail)}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dot-grid text-[#191C1E] font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white to-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-wide uppercase">
                <Sparkles size={14} />
                Jharkhand Societal Innovation Platform
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#020E23] leading-[1.15] font-geist tracking-tight">
                Bridging the Gap Between{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-terracotta to-brand-terracotta-dark">
                  University Innovation
                </span>{' '}
                and Real-World Civic Challenges
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                A precision-engineered platform accelerating the deployment of academic research and CSR co-funding into solved civic solutions across Jharkhand. Connect citizen pain points with world-class university R&D teams.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to={isAuthenticated && role === 'citizen' ? '/submit' : '/auth'}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-lg shadow-brand-orange/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Submit Civic Grievance
                </Link>

                <Link
                  to="/university/challenges"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#020E23] bg-white border border-slate-300 hover:border-brand-navy hover:bg-slate-50 shadow-sm transition-all"
                >
                  <Compass size={18} />
                  Explore Challenges
                </Link>
              </div>

              {/* Stakeholder Quick Switches for SIH Presentation */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  ⚡ SIH Interactive Demo: Test Stakeholder Views
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      switchRole('citizen');
                      navigate('/submit');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    <Users size={14} className="text-emerald-600" />
                    Citizen View
                  </button>

                  <button
                    onClick={() => {
                      switchRole('university');
                      navigate('/university/challenges');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                  >
                    <GraduationCap size={14} className="text-indigo-600" />
                    University Researcher View
                  </button>

                  <button
                    onClick={() => {
                      switchRole('industry');
                      navigate('/industry/invitations');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    <Building size={14} className="text-amber-600" />
                    Industry / CSR View
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      navigate('/admin/dashboard');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold hover:bg-purple-100 transition-colors"
                  >
                    <ShieldCheck size={14} className="text-purple-600" />
                    State Admin View
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual (Stitch 3D Dashboard Mockup) */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[440px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white group">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  alt="3D isometric rendering of Samadhan Setu AI matching platform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-r8bmxbFSb1_BIHvtaFb9VSzNt4Z0GaE1sXihcz7TeV-fRJ0pHD_pxcqr5tT9pyUtKNro6fUO1DDHhYvfVd0-MoIfQI8_S-DSefvc_1ZJmWbNOVNzhSU4mhnHz8GnIflCgk8GBfMXRllH7bw0F12OEAuJOt4OL0er6bQegfqcsSx10nHFRqbw0ZflXThUWKiIKkAX-SXK5wkp3vqefNMkuocNdeNMbFUfyeXddmg3_5z9UZID49nmQw"
                />

                {/* Floating Card 1: 98% Match (Stitch overlay token) */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      AI Project Match
                    </p>
                    <p className="text-xs font-bold text-[#020E23]">
                      Urban Water Filtration (BIT Mesra)
                    </p>
                  </div>
                  <div className="ml-1 bg-brand-orange text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                    98%
                  </div>
                </div>

                {/* Floating Card 2: Civic Need Live Pulse */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Civic Grievance Ingested
                    </p>
                    <p className="text-xs font-bold text-[#020E23]">
                      Solar Microgrid Need — Latehar
                    </p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-brand-orange pulsing-dot ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Impact Metrics Banner */}
      <section className="bg-[#0B1E36] text-white py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-800">
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-brand-orange font-geist">24</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Districts Integrated</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-brand-orange font-geist">14+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Partner Universities & Labs</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-brand-orange font-geist">85+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">CSR & Industry Partners</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-extrabold text-brand-orange font-geist">&lt; 4.2h</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">AI Matching Speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section (Preserving Stitch Layout) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Architecture for Impact
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#020E23] font-geist">
            Engineered for Ground-Level Transformation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our multi-tier framework provides the technological infrastructure required to turn academic patents and research into tangible civic improvements.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI-Powered Matching */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-orange"></div>
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                  High Urgency
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#020E23] mb-2 font-geist">
                AI-Powered Direct Matching
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gemini-powered semantic classification instantly aligns civic pain points with relevant university research disciplines and laboratory equipment, cutting bureaucratic delay from months to hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-orange">
              <span>Automatic Discipline Routing</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>

          {/* Card 2: Verified Academic & CSR Funding */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Award size={24} />
                </div>
                <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                  Smart Routing
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#020E23] mb-2 font-geist">
                Verified CSR & Grant Funding
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access a curated pool of state grants, CSR mandates (Tata Steel, Coal India, Jindal), and MSME co-funding specifically structured for civic-university joint ventures.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
              <span>Transparent Fund Allocation</span>
              <ArrowRight size={14} className="ml-1" />
            </div>
          </div>

          {/* Card 3: Dark Navy Collaborative Workspace */}
          <div className="bg-[#020E23] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between text-white shadow-xl">
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-brand-orange flex items-center justify-center">
                  <Layers size={24} />
                </div>
                <span className="text-[11px] font-bold bg-slate-800 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700">
                  Active Sprint
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-geist">
                Collaborative R&D Workspace
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A secure, unified environment for real-time field data sharing, milestone validation, student researcher teaming, and faculty mentorship tracking.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-6">
              <div>
                <p className="text-2xl font-extrabold text-brand-orange font-geist">24</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Active Teams</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-orange font-geist">142</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Proposals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Pathway Loops */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#020E23] font-geist">
              4-Tier Stakeholder Collaboration Loop
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every participant in Jharkhand's ecosystem has a designated role-based workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Citizen (नागरिक)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pinpoints real civic grievances, uploads field photos, tracks milestone progress on Leaflet map.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">University Lab (विश्वविद्यालय)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepts AI-matched challenges, deploys student-mentor research teams, develops field prototypes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-amber-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Industry / CSR (उद्योग)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reviews accepted academic projects, provides CSR capital, pilot testbeds, and commercial scaling.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-purple-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">State Administration (प्रशासन)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitors district heatmaps, resolves bottlenecks, oversees grant dispersal and policy outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Registration Section */}
      <section className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#020E23] via-brand-orange to-[#020E23]"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#020E23] font-geist mb-2">
            Ready to Accelerate Innovation in Jharkhand?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Submit your civic challenge, register your university research lab, or partner with CSR funding today.
          </p>

          <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              placeholder="Enter institutional or official email"
              className="flex-grow bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#020E23] focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all whitespace-nowrap text-sm"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
