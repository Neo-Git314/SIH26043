import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050E1A] text-slate-400 border-t border-slate-800 text-sm mt-auto">
      {/* Upper Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <span className="text-lg font-bold text-white font-geist">
                समाधान <span className="text-brand-orange">सेतु</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Societal Innovation Collaboration Portal — Jharkhand's unified tech translation bridge connecting civic pain points with academic R&D and CSR co-funding.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck size={16} />
              <span>SIH 2024 Finalist Solution</span>
            </div>
          </div>

          {/* Quick Pathways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Stakeholder Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/submit" className="hover:text-brand-orange transition-colors">
                  Citizen Grievance Submission
                </Link>
              </li>
              <li>
                <Link to="/university/challenges" className="hover:text-brand-orange transition-colors">
                  University R&D Challenges
                </Link>
              </li>
              <li>
                <Link to="/industry/invitations" className="hover:text-brand-orange transition-colors">
                  Industry & CSR Co-Funding
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-brand-orange transition-colors">
                  State Innovation Command Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Jharkhand Innovation Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Academic & State Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>BIT Mesra AI & Environmental Lab</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>NIT Jamshedpur Rural Tech Center</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>IIT (ISM) Dhanbad Mining & Energy Hub</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>Ranchi University Innovation Cell</span>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Nodal Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-orange shrink-0 mt-0.5" />
                <span>State Innovation Council, Nepal House, Doranda, Ranchi, Jharkhand 834002</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-brand-orange shrink-0" />
                <span>innovation@jharkhand.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-brand-orange shrink-0" />
                <span>Toll-Free Helpline: 1800-345-6511</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="border-t border-slate-800/80 bg-[#020E23] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 Samadhan Setu — Department of Higher & Technical Education, Government of Jharkhand.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Use</a>
            <a href="#accessibility" className="hover:text-slate-400 transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
