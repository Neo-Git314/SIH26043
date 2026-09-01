import React from 'react';
import { statusColorMap } from '../../mocks/mockData';

const STATUS_LABELS = {
  pending: 'Pending Review',
  reviewed: 'Verified & Open',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  duplicate: 'Duplicate',
};

const STATUS_DOTS = {
  pending: 'bg-amber-400',
  reviewed: 'bg-blue-400',
  assigned: 'bg-purple-400',
  in_progress: 'bg-indigo-400 animate-pulse',
  resolved: 'bg-emerald-400',
  duplicate: 'bg-rose-400',
};

export default function StatusBadge({ status, className = '' }) {
  const normalizedStatus = status?.toLowerCase() || 'pending';
  const colorClass =
    statusColorMap[normalizedStatus] || 'bg-slate-100 text-slate-700 border-slate-200';
  const label = STATUS_LABELS[normalizedStatus] || status;
  const dotColor = STATUS_DOTS[normalizedStatus] || 'bg-slate-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
