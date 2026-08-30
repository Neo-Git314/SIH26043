import React from 'react';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Disciplines' },
  { value: 'water_resources', label: 'Water Resources' },
  { value: 'environment', label: 'Environment & Waste' },
  { value: 'energy', label: 'Renewable Energy' },
  { value: 'urban_development', label: 'Urban Development' },
  { value: 'agriculture', label: 'Agriculture & Rural' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education Tech' },
];

const DISTRICT_OPTIONS = [
  'All Districts',
  'Ranchi',
  'Jamshedpur',
  'Dhanbad',
  'Bokaro',
  'Hazaribagh',
];

export default function ChallengeFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedUrgency,
  setSelectedUrgency,
  selectedDistrict,
  setSelectedDistrict,
  onlyMatched,
  setOnlyMatched,
  totalResults,
}) {
  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedUrgency !== 'all' ||
    selectedDistrict !== 'All Districts' ||
    onlyMatched;

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedUrgency('all');
    setSelectedDistrict('All Districts');
    setOnlyMatched(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      {/* Top row: Search input + Match toggle */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems, keywords, locations..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D24]/20 focus:border-[#FF4D24] transition-colors font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#0B1E3D]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* AI Match Toggle */}
        <button
          type="button"
          onClick={() => setOnlyMatched(!onlyMatched)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap w-full md:w-auto justify-center ${
            onlyMatched
              ? 'bg-[#FF4D24] text-white border-[#FF4D24] shadow-md shadow-orange-500/25'
              : 'bg-orange-50/80 text-[#FF4D24] border-orange-200 hover:bg-orange-100/80'
          }`}
        >
          <span className="flex h-2 w-2 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                onlyMatched ? 'bg-white' : 'bg-[#FF4D24]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                onlyMatched ? 'bg-white' : 'bg-[#FF4D24]'
              }`}
            />
          </span>
          AI University Discipline Matches Only
        </button>
      </div>

      {/* Bottom row: Filter Dropdowns */}
      <div className="flex flex-wrap gap-3 items-center justify-between pt-1 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap gap-2.5 items-center flex-1">
          {/* Category / Discipline */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Urgency */}
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Urgencies</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* District */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            {DISTRICT_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 hover:bg-rose-50 rounded transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{totalResults}</span> challenges
        </div>
      </div>
    </div>
  );
}
