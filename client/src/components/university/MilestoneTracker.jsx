import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { mockIndustryPartners } from '../../mocks/mockData';

export default function MilestoneTracker({
  project,
  onUpdateMilestone,
  onViewComplaint,
}) {
  const completedCount = project.milestones?.filter((m) => m.status === 'done').length || 0;
  const totalCount = project.milestones?.length || 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const industryPartner = mockIndustryPartners.find(
    (i) => i._id === project.industryPartnerId
  );

  const facultyMember = project.team?.find((t) => t.role === 'faculty_mentor');
  const studentMembers = project.team?.filter((t) => t.role === 'student') || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF4D24] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
              Project #{project._id}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              District: <strong className="text-[#0B1E3D]">{project.district || 'Ranchi'}</strong>
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0B1E3D] leading-snug">
            {project.complaintTitle || `Innovation Project for Challenge #${project.complaintId}`}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={project.status} />
          {project.complaintId && (
            <button
              onClick={() => onViewComplaint?.(project.complaintId)}
              className="text-xs font-bold text-[#0B1E3D] hover:text-[#FF4D24] px-3 py-1.5 bg-slate-50 hover:bg-orange-50 rounded-lg border border-slate-200 transition-colors"
            >
              View Challenge →
            </button>
          )}
        </div>
      </div>

      {/* Team & Partner Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
        <div>
          <span className="text-slate-400 font-medium block mb-1">FACULTY & RESEARCHERS</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {facultyMember && (
              <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                🎓 {facultyMember.name}
              </span>
            )}
            {studentMembers.map((s, idx) => (
              <span key={idx} className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                👤 {s.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-slate-400 font-medium block mb-1">INDUSTRY COLLABORATOR</span>
          {industryPartner ? (
            <div className="flex items-center gap-2 font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <span>🏢</span>
              <span className="font-bold">{industryPartner.name}</span>
              <span className="text-[10px] text-emerald-600">({industryPartner.type.toUpperCase()})</span>
            </div>
          ) : (
            <span className="text-slate-400 italic">Academic standalone project</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#0B1E3D]">
            Roadmap Execution ({completedCount}/{totalCount} Completed)
          </span>
          <span className="font-extrabold text-[#FF4D24]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#FF4D24] to-[#FF7A00] h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Milestone Checklist */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Actionable Milestones
        </span>
        <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden bg-white">
          {project.milestones?.map((m, idx) => {
            const isDone = m.status === 'done';
            const formattedDueDate = new Date(m.dueDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={m._id || idx}
                className={`p-3 flex items-center justify-between gap-3 text-xs transition-colors ${
                  isDone ? 'bg-emerald-50/30' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onUpdateMilestone?.(project._id, m._id, isDone ? 'pending' : 'done')}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-indigo-500 bg-white'
                    }`}
                  >
                    {isDone && (
                      <svg className="w-3.5 h-3.5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <div className="min-w-0">
                    <span
                      className={`font-semibold block truncate ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {m.title}
                    </span>
                    <span className="text-[11px] text-slate-400">Target: {formattedDueDate}</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : m.status === 'in_progress'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDone ? 'DONE' : m.status === 'in_progress' ? 'IN PROGRESS' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
