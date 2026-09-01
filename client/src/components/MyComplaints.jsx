import React, { useState } from 'react'

function MyComplaints({ complaints, setView }) {
  const [filter, setFilter] = useState('All')
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  // Compute stats
  const totalSubmitted = complaints.length
  const inProgress = complaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length
  const resolved = complaints.filter(c => c.status === 'Resolved').length

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    if (filter === 'All') return true
    if (filter === 'Pending') return c.status === 'Pending'
    if (filter === 'In Progress') return c.status === 'In Progress' || c.status === 'Assigned'
    if (filter === 'Resolved') return c.status === 'Resolved'
    return true
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim'
      case 'Assigned':
      case 'In Progress':
        return 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary-fixed-dim'
      case 'Resolved':
        return 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]'
      default:
        return 'bg-surface-container text-on-surface'
    }
  }

  const getIcon = (title) => {
    const t = title.toLowerCase()
    if (t.includes('pothole') || t.includes('road') || t.includes('street')) return 'add_road'
    if (t.includes('water') || t.includes('leak') || t.includes('sprinkler')) return 'water_drop'
    if (t.includes('light') || t.includes('power') || t.includes('electricity')) return 'lightbulb'
    if (t.includes('tree') || t.includes('park') || t.includes('branch')) return 'park'
    return 'assignment'
  }

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg animate-fadeIn">
      {/* Header Section */}
      <div className="mb-stack-lg">
        <h1 className="font-headline-xl text-headline-xl text-on-secondary-fixed mb-2">My Complaints</h1>
        <p className="font-body-lg text-body-lg text-tertiary">Track the status and progress of your submitted civic issues.</p>
      </div>

      {/* Stats Bar Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-margin-desktop">
        {/* Stat 1 */}
        <div className="bg-surface-container-lowest rounded-[2rem] card-shadow p-6 border border-surface-container-highest flex items-center justify-between">
          <div>
            <h3 className="font-label-bold text-label-bold text-on-secondary-fixed uppercase tracking-wider mb-2">Total Submitted</h3>
            <div className="font-headline-xl text-headline-xl text-primary">{totalSubmitted}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center border border-primary">
            <span className="material-symbols-outlined text-primary text-[24px]">assignment</span>
          </div>
        </div>
        {/* Stat 2 */}
        <div className="bg-surface-container-lowest rounded-[2rem] card-shadow p-6 border border-surface-container-highest flex items-center justify-between">
          <div>
            <h3 className="font-label-bold text-label-bold text-on-secondary-fixed uppercase tracking-wider mb-2">In Progress</h3>
            <div className="font-headline-xl text-headline-xl text-primary">{inProgress}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center border border-primary">
            <span className="material-symbols-outlined text-primary text-[24px]">engineering</span>
          </div>
        </div>
        {/* Stat 3 */}
        <div className="bg-surface-container-lowest rounded-[2rem] card-shadow p-6 border border-surface-container-highest flex items-center justify-between">
          <div>
            <h3 className="font-label-bold text-label-bold text-on-secondary-fixed uppercase tracking-wider mb-2">Resolved</h3>
            <div className="font-headline-xl text-headline-xl text-primary">{resolved}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center border border-primary">
            <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
          </div>
        </div>
      </div>

      {/* Filters & Recent Activity Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-stack-md">
        <h2 className="font-headline-md text-headline-md text-on-secondary-fixed">Recent Activity</h2>
        <div className="flex flex-wrap gap-2">
          {['All', 'Pending', 'In Progress', 'Resolved'].map(btn => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-4 py-1.5 rounded-full font-label-bold text-label-bold transition-all border ${
                filter === btn
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest border-surface-container-highest text-on-secondary-fixed hover:bg-surface-container'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Feed of Complaint Cards */}
      <div className="flex flex-col gap-stack-md">
        {filteredComplaints.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-highest p-12 text-center text-tertiary">
            <span className="material-symbols-outlined text-5xl mb-2 text-surface-variant">inbox</span>
            <p>No complaints found matching this status.</p>
          </div>
        ) : (
          filteredComplaints.map(item => (
            <div
              key={item.ticketId}
              onClick={() => setSelectedComplaint(item)}
              className="bg-surface-container-lowest rounded-2xl card-shadow border border-surface-container-highest overflow-hidden border-t-4 border-t-primary group hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary-fixed flex items-center justify-center border border-primary mt-1">
                    <span className="material-symbols-outlined text-primary icon-fill">{getIcon(item.title)}</span>
                  </div>
                  {/* Content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-headline-md text-headline-md text-on-secondary-fixed group-hover:text-primary transition-colors text-xl">
                        {item.title}
                      </h3>
                      <span className={`px-3 py-0.5 rounded-full font-label-sm text-label-sm border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-tertiary mb-2">
                      Reported on {item.date} • ID: #{item.ticketId}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Action */}
                <div className="shrink-0">
                  <button className="font-label-bold text-label-bold text-on-secondary-fixed hover:text-primary flex items-center gap-1 border border-outline-variant px-4 py-2 rounded-full transition-colors group-hover:border-primary">
                    View Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-stack-lg flex justify-center gap-4">
        <button
          onClick={() => setView('submit-issue')}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-bold hover:bg-primary-container shadow-md transition-colors"
        >
          Submit a New Issue
        </button>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden border border-surface-container-highest animate-scaleUp">
            {/* Header */}
            <div className="bg-on-secondary-fixed p-6 text-inverse-on-surface flex justify-between items-start">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-85">Ticket #{selectedComplaint.ticketId}</span>
                <h3 className="text-2xl font-bold mt-1">{selectedComplaint.title}</h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-inverse-on-surface hover:text-primary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b border-surface-variant">
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">Date Reported</h4>
                  <p className="font-body-lg font-semibold text-on-secondary-fixed">{selectedComplaint.date}</p>
                </div>
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">Current Status</h4>
                  <span className={`inline-block px-3 py-1 mt-1 rounded-full font-label-sm text-label-sm border ${getStatusStyle(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary">District / Ward</h4>
                  <p className="font-body-lg font-semibold text-on-secondary-fixed">
                    {selectedComplaint.district === 'd1' ? 'District 1 - Downtown' :
                     selectedComplaint.district === 'd2' ? 'District 2 - Northside' :
                     selectedComplaint.district === 'd3' ? 'District 3 - East End' :
                     selectedComplaint.district === 'd4' ? 'District 4 - West Valley' : 'Unassigned'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-label-bold text-xs uppercase text-tertiary mb-2">Description</h4>
                <p className="text-on-surface-variant whitespace-pre-wrap">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.mediaUrls && selectedComplaint.mediaUrls.length > 0 && (
                <div>
                  <h4 className="font-label-bold text-xs uppercase text-tertiary mb-3">Supporting Media</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {selectedComplaint.mediaUrls.map((url, i) => (
                      <div key={url || i} className="w-48 h-32 rounded-lg overflow-hidden border border-surface-variant shrink-0">
                        <img src={url} alt="Attached Evidence" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-surface-container p-4 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-6 py-2 bg-on-secondary-fixed text-inverse-on-surface rounded-full font-label-bold hover:bg-[#002147] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyComplaints
