import React, { useState } from 'react';
import { ShieldCheck, Users, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '../../api/mockData';

export default function AdminDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const stats = [
    { label: 'Total Ingested Grievances', value: '1,428', change: '+18% this month', icon: AlertCircle, color: 'text-brand-orange', bg: 'bg-orange-50' },
    { label: 'AI Matched Challenges', value: '384', change: 'Across 14 Universities', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Industry & CSR Capital', value: '₹4.8 Cr', change: '85 Partners Engaged', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved Civic Solutions', value: '942', change: '96.2% Citizen Rating', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const categories = [
    { name: 'Water Resources & Fluoride Removal', count: 384, percentage: 27 },
    { name: 'Agriculture & Cold Storage Solutions', count: 312, percentage: 22 },
    { name: 'Rural Energy & Solar Microgrids', count: 256, percentage: 18 },
    { name: 'Healthcare Infrastructure & Tele-clinics', count: 198, percentage: 14 },
    { name: 'Urban Mobility & Traffic Optimization', count: 178, percentage: 12 },
    { name: 'Waste Reclamation & Mining Ecology', count: 100, percentage: 7 },
  ];

  const recentRegistries = [
    { id: 'CIV-2024-883', title: 'Pothole on Main Street & Drainage Overflow', district: 'Ranchi', domain: 'Urban Mobility', status: 'Pending', confidence: '98%' },
    { id: 'CIV-2024-855', title: 'Fluoride and Arsenic Contamination in Tubewell', district: 'Latehar', domain: 'Water Resources', status: 'In Progress', confidence: '96%' },
    { id: 'CIV-2024-812', title: 'Solar Inverter Failure at Rural Primary Health Centre', district: 'Gumla', domain: 'Rural Energy', status: 'Assigned', confidence: '94%' },
    { id: 'CIV-2024-745', title: 'Decentralized Micro-Cold Storage Need for Mango Farmers', district: 'Khunti', domain: 'Agriculture', status: 'Resolved', confidence: '92%' },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-200">
              <ShieldCheck size={15} />
              State Innovation Command Center
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1E36] font-geist">
              Jharkhand Societal Innovation Analytics (Frontend C)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Unified governance console monitoring civic grievance ingestion, AI classification, academic R&D matching, and CSR funds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold shadow-sm focus:outline-none focus:border-brand-orange"
            >
              <option value="All">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                    <Icon size={20} className={item.color} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#0B1E36] font-geist">{item.value}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-semibold">{item.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Breakdown by Domain */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] font-geist">
                Grievance Distribution by Gemini AI Domain
              </h3>
              <p className="text-xs text-slate-500">
                Automated multi-label categorization across 10 Jharkhand civic domains
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold w-fit">
              AI Pipeline: 99.4% Accuracy
            </span>
          </div>

          <div className="space-y-4">
            {categories.map((c, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">{c.name}</span>
                  <span className="text-slate-900 font-bold">{c.count} ({c.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-orange to-brand-terracotta rounded-full transition-all duration-700"
                    style={{ width: `${c.percentage * 3.2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Ingestion Feed Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-[#0B1E36] font-geist">
                Recent Ingested Grievance Registry
              </h3>
              <p className="text-xs text-slate-500">Real-time status updates across district nodal centers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Ticket</th>
                  <th className="p-4">Issue Description</th>
                  <th className="p-4">District</th>
                  <th className="p-4">AI Domain</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4">Resolution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRegistries.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-700">{r.id}</td>
                    <td className="p-4 font-bold text-slate-900">{r.title}</td>
                    <td className="p-4 text-slate-600 font-medium">{r.district}</td>
                    <td className="p-4 font-semibold text-indigo-700">{r.domain}</td>
                    <td className="p-4 font-bold text-emerald-600">{r.confidence}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          r.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : r.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : r.status === 'Assigned'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
