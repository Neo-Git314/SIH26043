import React from 'react';
import { urgencyColorMap } from '../../mocks/mockData';

const URGENCY_LABELS = {
  low: 'Low Urgency',
  medium: 'Medium Urgency',
  high: 'High Priority',
};

export default function UrgencyBadge({ urgency, className = '' }) {
  const normalizedUrgency = urgency?.toLowerCase() || 'medium';
  const colorClass =
    urgencyColorMap[normalizedUrgency] || 'bg-slate-100 text-slate-700 border-slate-200';
  const label = URGENCY_LABELS[normalizedUrgency] || `${urgency} Priority`;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
    >
      {normalizedUrgency === 'high' && (
        <svg
          className="w-3 h-3 text-rose-600 animate-bounce"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {label}
    </span>
  );
}
