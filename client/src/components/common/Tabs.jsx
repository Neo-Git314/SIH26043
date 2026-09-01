import React from 'react';

export default function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 border-b border-slate-200 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2.5 pb-3.5 px-4 text-sm font-bold border-b-2 transition-all relative ${
              isActive
                ? 'border-[#FF4D24] text-[#FF4D24]'
                : 'border-transparent text-[#0B1E3D]/70 hover:text-[#0B1E3D] hover:border-slate-300'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  isActive
                    ? 'bg-orange-100 text-[#FF4D24]'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
