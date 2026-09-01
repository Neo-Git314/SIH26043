import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, CheckCircle2, ArrowRight, Clock, Award, Zap, Layers } from 'lucide-react';

export default function Challenges({ challenges = [], acceptChallenge, setView }) {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-200">
              <GraduationCap size={15} />
              University Innovation Hub
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1E36] font-geist">
              Civic Innovation Challenges
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              AI-matched research challenges curated from Jharkhand municipal datasets, backed by academic grants and CSR co-sponsors.
            </p>
          </div>

          <Link
            to="/workspace"
            onClick={() => typeof setView === 'function' && setView('workspace')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#0B1E36] hover:bg-slate-800 shadow-md transition-all text-sm shrink-0"
          >
            <Layers size={16} />
            Go to Project Workspace
          </Link>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 gap-6">
          {challenges.map((c) => {
            const isAccepted = c.isAccepted || false;
            const cid = c.id || c._id;

            return (
              <div
                key={cid}
                className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 ${
                  isAccepted
                    ? 'border-emerald-300 bg-emerald-50/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                      {cid.toUpperCase()}
                    </span>
                    <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {c.matchScore || '95% Match'}
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200">
                      {c.topic || 'Societal Tech'}
                    </span>
                    {c.urgency && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          c.urgency.toLowerCase().includes('high')
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {c.urgency}
                      </span>
                    )}
                  </div>

                  {isAccepted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      Adopted by Your Lab
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#0B1E36] mb-2 font-geist">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {c.description}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-brand-orange" />
                      <span>Duration: <strong className="text-slate-800">{c.duration || '6 Months'}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award size={15} className="text-indigo-600" />
                      <span>Grant / CSR Support: <strong className="text-slate-800">{c.grant || '$50k Grant'}</strong></span>
                    </div>
                  </div>

                  {isAccepted ? (
                    <Link
                      to="/workspace"
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 text-xs transition-colors"
                    >
                      <span>Open in Workspace</span>
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => acceptChallenge(cid)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all text-sm"
                    >
                      <Zap size={16} />
                      Accept & Adopt Challenge
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
