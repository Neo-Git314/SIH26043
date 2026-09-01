import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, CheckSquare, Clock, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function Workspace({ milestones = [], addMilestone }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const completedCount = milestones.filter((m) => m.status?.toLowerCase() === 'completed' || m.status?.toLowerCase() === 'done').length;
  const progressPct = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (addMilestone) {
      addMilestone({
        title: newTitle.trim(),
        status: 'Pending',
        dueDate: newDueDate || 'Q1 2025',
      });
    }

    setNewTitle('');
    setNewDueDate('');
    setShowAddModal(false);
  };

  const projectDetails = {
    code: 'JH-PROJ-883',
    title: 'Autonomous Transit Routing & Urban Micro-Bus Optimization',
    department: 'BIT Mesra - Department of Civil & Transportation Engg',
    industrySponsor: 'Tata Motors & State Urban Transport Dept (CSR Grant)',
    team: [
      { name: 'Prof. S. K. Verma', role: 'Principal Investigator / Faculty Mentor' },
      { name: 'Aman Deep', role: 'Student Researcher (M.Tech AI & Robotics)' },
      { name: 'Priya Kumari', role: 'Student Researcher (B.Tech Transportation)' },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          to="/university/challenges"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-orange mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Challenges
        </Link>

        {/* Project Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-700">
              {projectDetails.code}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Active R&D Sprint
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] mb-2 font-geist">
            {projectDetails.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-4 border-t border-slate-100 mt-4">
            <div>
              <p className="text-slate-400 font-medium">Academic Lead:</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{projectDetails.department}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Co-Funding Partner:</p>
              <p className="font-bold text-brand-orange text-sm mt-0.5">{projectDetails.industrySponsor}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Overall Milestone Completion</span>
              <span className="text-brand-orange">{progressPct}% ({completedCount}/{milestones.length})</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-terracotta transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Milestones & Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Milestones Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-[#0B1E36] text-lg font-geist flex items-center gap-2">
                  <CheckSquare size={20} className="text-brand-orange" />
                  R&D Milestones
                </h3>
                <p className="text-xs text-slate-500">Track prototyping and field validation tasks</p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-sm transition-all"
              >
                <Plus size={14} /> Add Milestone
              </button>
            </div>

            <div className="space-y-3">
              {milestones.map((m, idx) => {
                const isDone = m.status?.toLowerCase() === 'completed' || m.status?.toLowerCase() === 'done';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        ) : (
                          <Clock size={16} className="text-amber-500 shrink-0" />
                        )}
                        <p className={`text-sm font-bold ${isDone ? 'text-slate-800 line-through text-slate-500' : 'text-slate-900'}`}>
                          {m.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 ml-6">
                        {m.completedDate ? `Completed: ${m.completedDate}` : `Due: ${m.dueDate || 'TBD'}`}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status?.toLowerCase() === 'in progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Research Team Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <h3 className="font-bold text-[#0B1E36] text-lg font-geist flex items-center gap-2 mb-4">
                <Users size={20} className="text-indigo-600" />
                Assigned Research Team
              </h3>

              <div className="space-y-3">
                {projectDetails.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                      <p className="text-[11px] text-slate-500">{member.role}</p>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => alert('Industry partner CSR invitation triggered via Nodemailer!')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
                >
                  <Mail size={15} />
                  Invite Additional CSR / Industry Sponsor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Milestone Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-4 font-geist">
                Add Project Milestone
              </h3>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Firmware Testing on Field Microcontroller"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="e.g. Dec 15, 2024 or Q1 2025"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-orange text-white font-bold rounded-xl text-xs hover:bg-brand-terracotta-dark"
                  >
                    Save Milestone
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
