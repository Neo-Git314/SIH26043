import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Clock, Image as ImageIcon } from 'lucide-react';

export default function MyComplaints({ complaints = [], setView }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const statusStyles = {
    Pending: 'bg-amber-100 text-amber-800 border-amber-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    Assigned: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const filtered = complaints.filter((item) => {
    const matchesStatus = filterStatus === 'All' || item.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticketId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              Citizen Portal
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1E36] font-geist">
              My Submitted Complaints & Issues
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Live status tracking, ticket resolution updates, and media logs for your civic grievances.
            </p>
          </div>

          <Link
            to="/submit"
            onClick={() => typeof setView === 'function' && setView('submit')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all text-sm shrink-0"
          >
            <PlusCircle size={16} />
            Report New Issue
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ticket ID, title, or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Pending', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterStatus === st
                    ? 'bg-[#0B1E36] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <p className="text-base font-bold text-slate-700">No grievances found matching the criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Submit a new civic issue to begin tracking resolution.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={item.ticketId || item._id || idx}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-7"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                      {item.ticketId || `CIV-${idx + 100}`}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${
                        statusStyles[item.status] || 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {item.status || 'Pending'}
                    </span>
                    {item.district && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Zone: {item.district.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={13} /> {item.date || 'Recent'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1E36] mb-2 font-geist">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Attached Media */}
                {item.mediaUrls && item.mediaUrls.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <ImageIcon size={14} /> Attached Media Evidence
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {item.mediaUrls.map((url, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                        >
                          <img
                            src={url}
                            alt={`Complaint Media ${imgIdx + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
