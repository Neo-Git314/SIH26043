import React from 'react';
import StatusBadge from '../common/StatusBadge';
import UrgencyBadge from '../common/UrgencyBadge';

const CATEGORY_NAMES = {
  water_resources: 'Water Resources',
  environment: 'Environment',
  energy: 'Renewable Energy',
  urban_development: 'Urban Development',
  agriculture: 'Agriculture',
  healthcare: 'Healthcare',
  education: 'Education',
};

const CATEGORY_FALLBACK_IMAGES = {
  water_resources: '/images/handpump.svg',
  environment: '/images/garbagedump.svg',
  energy: '/images/solarlight.svg',
  urban_development: '/images/solarlight.svg',
  agriculture: '/images/groundwater.svg',
  healthcare: '/images/groundwater.svg',
  education: '/images/solarlight.svg',
};

export default function ChallengeCard({
  complaint,
  currentUniversityId = 'uni501',
  onAdopt,
  onViewDetails,
}) {
  const matchInfo = complaint.suggestedUniversities?.find(
    (u) => u.universityId === currentUniversityId
  );
  const matchScore = matchInfo ? Math.round(matchInfo.score * 100) : null;
  const isAssignedToUs = complaint.assignedUniversity === currentUniversityId;
  const isAssignedToOther =
    complaint.assignedUniversity && complaint.assignedUniversity !== currentUniversityId;
  const displayImageUrl =
    (complaint.mediaUrls && complaint.mediaUrls.length > 0 && complaint.mediaUrls[0]) ||
    CATEGORY_FALLBACK_IMAGES[complaint.category] ||
    CATEGORY_FALLBACK_IMAGES.water_resources;
  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Top Header info */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                {CATEGORY_NAMES[complaint.category] || complaint.category}
              </span>
              {complaint.categoryConfidence && (
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  AI {Math.round(complaint.categoryConfidence * 100)}% Match
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <UrgencyBadge urgency={complaint.urgency} />
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          <h3 className="text-base font-bold text-[#0B1E3D] line-clamp-1 group-hover:text-[#FF4D24] transition-colors">
            {complaint.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {complaint.description}
          </p>
        </div>

        {/* Media / AI caption preview */}
        <div className="px-5 py-2">
          <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70">
            <img
              src={displayImageUrl}
              alt={complaint.title}
              onError={(e) => {
                e.currentTarget.src =
                  CATEGORY_FALLBACK_IMAGES[complaint.category] ||
                  CATEGORY_FALLBACK_IMAGES.water_resources;
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {complaint.imageAnalysis?.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-transparent p-2.5 text-[11px] text-white line-clamp-1">
                🔍 AI Analysis: {complaint.imageAnalysis.caption}
              </div>
            )}
          </div>
        </div>

        {/* Location & Tags */}
        <div className="px-5 py-2 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{complaint.location?.address || complaint.district}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">{formattedDate}</span>
          </div>

          {complaint.imageAnalysis?.tags && complaint.imageAnalysis.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {complaint.imageAnalysis.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Match banner + Action buttons */}
      <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 mt-2 space-y-3">
        {matchScore && (
          <div className="flex items-center justify-between text-xs bg-orange-50/80 border border-orange-200 rounded-lg px-3 py-1.5">
            <span className="text-[#0B1E3D] font-bold">Institution R&D Alignment</span>
            <span className="font-extrabold text-[#FF4D24]">{matchScore}% Match</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails?.(complaint)}
            className="flex-1 py-2 px-3 text-xs font-bold text-[#0B1E3D] bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors text-center"
          >
            Details
          </button>

          {isAssignedToUs ? (
            <div className="flex-1 py-2 px-3 text-xs font-bold text-center text-emerald-800 bg-emerald-100/80 rounded-xl border border-emerald-200">
              ✓ Adopted by You
            </div>
          ) : isAssignedToOther ? (
            <div className="flex-1 py-2 px-3 text-xs font-medium text-center text-slate-400 bg-slate-100 rounded-xl">
              Adopted by Partner
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAdopt?.(complaint)}
              className="flex-1 py-2 px-3 text-xs font-bold text-center text-white bg-[#FF4D24] hover:bg-[#E63900] shadow-md shadow-orange-500/25 rounded-xl transition-all"
            >
              Adopt Challenge →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
