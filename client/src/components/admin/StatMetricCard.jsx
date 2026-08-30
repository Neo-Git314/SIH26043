import React from 'react';

export default function StatMetricCard({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  badgeColor = 'text-indigo-600 bg-indigo-50 border-indigo-100',
  accentColor = 'text-indigo-600',
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className={`text-3xl font-extrabold tracking-tight ${accentColor}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">{subtitle}</span>
        {badgeText && (
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
