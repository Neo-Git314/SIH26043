import React, { useState } from 'react'

function Challenges({ challenges, acceptChallenge, setView }) {
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState('All')
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  // Filter challenges
  const filtered = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase())
    
    if (topicFilter === 'All') return matchesSearch
    return matchesSearch && c.topic.toLowerCase().includes(topicFilter.toLowerCase().replace(' ', ''))
  })

  // Topics extraction for filters
  const topics = ['All', 'Mobility', 'Water', 'Environmental', 'Energy']

  const getUrgencyBadge = (urgency) => {
    if (urgency.includes('High')) {
      return 'bg-error-container text-on-error-container border border-error/20'
    } else if (urgency.includes('Medium')) {
      return 'bg-primary-fixed text-on-primary-fixed-variant border border-primary/20'
    } else {
      return 'bg-surface-container-highest text-on-surface-variant'
    }
  }

  // Find featured (if any not accepted, otherwise just the first one)
  const featured = filtered.find(c => !c.isAccepted) || filtered[0]
  const rest = filtered.filter(c => c !== featured)

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg animate-fadeIn">
      {/* Header section */}
      <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-[#002147] mb-2 font-bold">
            AI-Matched University Challenges
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary">Curated civic problems requesting academic research and prototyping.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-outline-variant rounded focus:border-[#002147] focus:ring-1 focus:ring-[#002147] bg-white text-on-surface w-full md:w-64 font-body-md text-body-md"
              placeholder="Search challenges..."
              type="text"
            />
          </div>
          {/* Topic Filters Toggle */}
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="p-2 border border-outline-variant rounded bg-white text-[#002147] font-label-bold text-label-bold hover:bg-surface-container-low transition-colors"
          >
            <option value="All">All Topics</option>
            <option value="Mobility">Urban Mobility</option>
            <option value="Water">Water Systems</option>
            <option value="Environmental">Environmental IoT</option>
            <option value="Energy">Energy Grid</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl border border-surface-variant p-12 text-center text-tertiary shadow-ambient">
          <span className="material-symbols-outlined text-5xl mb-2 text-surface-variant">search_off</span>
          <p className="font-body-lg">No challenges found matching your filters.</p>
        </div>
      ) : (
        /* Bento Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Featured Challenge Card (Spans 8 cols) */}
          {featured && (
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl shadow-ambient border-t-4 border-[#FF4D00] p-stack-md flex flex-col justify-between border border-surface-variant">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded font-label-sm text-label-sm ${getUrgencyBadge(featured.urgency)}`}>
                      {featured.urgency}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                      {featured.topic}
                    </span>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#002147] text-white font-label-bold text-label-bold flex-col shadow-md">
                    <span className="text-sm">{featured.matchScore}</span>
                  </div>
                </div>
                <h2 className="font-headline-md text-headline-md text-[#002147] mb-3 text-2xl font-semibold">
                  {featured.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {featured.description}
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 text-tertiary font-body-md text-body-md">
                    <span className="material-symbols-outlined text-sm">schedule</span> {featured.duration}
                  </div>
                  <div className="flex items-center gap-2 text-tertiary font-body-md text-body-md">
                    <span className="material-symbols-outlined text-sm">payments</span> {featured.grant}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-surface-variant">
                <button
                  onClick={() => setSelectedChallenge(featured)}
                  className="px-4 py-2 border border-[#002147] text-[#002147] rounded font-label-bold text-label-bold hover:bg-surface-container-low transition-colors"
                >
                  View Details
                </button>
                {featured.isAccepted ? (
                  <button
                    onClick={() => setView('workspace')}
                    className="px-4 py-2 bg-on-secondary-container text-white rounded font-label-bold text-label-bold hover:bg-opacity-95 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    Open Workspace <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => acceptChallenge(featured.id || featured._id)}
                    className="px-4 py-2 bg-[#FF4D00] text-white rounded font-label-bold text-label-bold hover:bg-[#d43f00] transition-colors shadow-sm"
                  >
                    Accept Challenge
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Side Card / Grid Items (Span 4 cols each) */}
          {rest.map(item => (
            <div
              key={item.id || item._id}
              className="md:col-span-4 bg-surface-container-lowest rounded-xl shadow-ambient border border-surface-variant p-stack-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded font-label-sm text-label-sm ${getUrgencyBadge(item.urgency)}`}>
                    {item.urgency}
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#002147] text-white font-label-bold text-label-bold flex-col shadow-sm">
                    <span className="text-xs">{item.matchScore}</span>
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#002147] text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="text-xs text-tertiary mb-4 flex gap-3">
                  <span className="bg-surface-container px-2 py-0.5 rounded">{item.topic}</span>
                  <span>{item.grant}</span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-surface-variant flex justify-between items-center gap-2">
                <button
                  onClick={() => setSelectedChallenge(item)}
                  className="text-xs font-label-bold text-[#002147] hover:underline"
                >
                  Details
                </button>
                {item.isAccepted ? (
                  <button
                    onClick={() => setView('workspace')}
                    className="px-3 py-1.5 bg-on-secondary-container text-white text-xs rounded font-label-bold hover:bg-opacity-95 transition-colors flex items-center gap-1"
                  >
                    Workspace <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => acceptChallenge(item.id || item._id)}
                    className="px-3 py-1.5 bg-[#FF4D00] text-white text-xs rounded font-label-bold hover:bg-[#d43f00] transition-colors shadow-sm"
                  >
                    Accept Challenge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-xl shadow-xl overflow-hidden border border-surface-variant animate-scaleUp">
            {/* Header */}
            <div className="bg-[#002147] p-6 text-white flex justify-between items-start">
              <div>
                <span className="font-label-sm text-xs uppercase tracking-wider text-primary-fixed">{selectedChallenge.topic}</span>
                <h3 className="text-xl font-bold mt-1">{selectedChallenge.title}</h3>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-white hover:text-primary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-surface-variant text-center">
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">Match Match</h4>
                  <p className="text-lg font-bold text-[#FF4D00]">{selectedChallenge.matchScore}</p>
                </div>
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">Est. Timeline</h4>
                  <p className="text-lg font-bold text-on-secondary-fixed">{selectedChallenge.duration}</p>
                </div>
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">Grant Offered</h4>
                  <p className="text-lg font-bold text-on-secondary-fixed">{selectedChallenge.grant}</p>
                </div>
              </div>

              <div>
                <h4 className="font-label-bold text-xs uppercase text-tertiary mb-2">Problem Statement</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{selectedChallenge.description}</p>
              </div>

              <div className="flex justify-between items-center bg-surface-container p-3 rounded-lg">
                <span className="text-xs text-on-surface-variant font-medium">Urgency Level:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getUrgencyBadge(selectedChallenge.urgency)}`}>
                  {selectedChallenge.urgency}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-surface-container p-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="px-4 py-2 border border-[#002147] text-[#002147] rounded font-label-bold text-xs hover:bg-surface-container-low transition-colors"
              >
                Close
              </button>
              {selectedChallenge.isAccepted ? (
                <button
                  onClick={() => {
                    setSelectedChallenge(null)
                    setView('workspace')
                  }}
                  className="px-4 py-2 bg-on-secondary-container text-white rounded font-label-bold text-xs hover:bg-opacity-95 transition-colors"
                >
                  Go to Workspace
                </button>
              ) : (
                <button
                  onClick={() => {
                    acceptChallenge(selectedChallenge.id || selectedChallenge._id)
                    setSelectedChallenge(null)
                  }}
                  className="px-4 py-2 bg-[#FF4D00] text-white rounded font-label-bold text-xs hover:bg-[#d43f00] transition-colors"
                >
                  Accept & Open Workspace
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenges
