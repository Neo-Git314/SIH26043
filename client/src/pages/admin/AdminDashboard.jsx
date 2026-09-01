import React, { useState, useMemo } from 'react';
import {
  mockAnalyticsSummary,
  mockAnalyticsTrends,
  mockUsers,
} from '../../mocks/mockData';
import StatMetricCard from '../../components/admin/StatMetricCard';
import CategoryBarChart from '../../components/admin/CategoryBarChart';
import StatusDonutChart from '../../components/admin/StatusDonutChart';
import TrendsLineChart from '../../components/admin/TrendsLineChart';
import DistrictOverview from '../../components/admin/DistrictOverview';

export default function AdminDashboard() {
  const adminUser = mockUsers.find((u) => u.role === 'admin') || {
    name: 'Admin User',
    organization: 'Dept of Higher Education, Jharkhand',
  };

  const [timeRange, setTimeRange] = useState('30d');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('all');

  // Compute dynamic filtered analytics based on District Scope and Time Range
  const filteredAnalytics = useMemo(() => {
    const isAllDistricts = selectedDistrictFilter === 'all';

    // 1. Calculate District Factor & Target Counts
    const districtEntry = mockAnalyticsSummary.byDistrict.find(
      (d) => d.district === selectedDistrictFilter
    );
    const districtCount = districtEntry ? districtEntry.count : mockAnalyticsSummary.totalComplaints;
    const districtFactor = isAllDistricts ? 1 : districtCount / mockAnalyticsSummary.totalComplaints;

    // 2. Dynamic Time Range Slicing
    let trendData = [...mockAnalyticsTrends];
    if (timeRange === '7d') {
      trendData = trendData.slice(-7);
    } else if (timeRange === 'All Time') {
      // Extended historical projection
      trendData = [
        { date: '2026-01-15', count: 2 },
        { date: '2026-01-20', count: 4 },
        { date: '2026-01-25', count: 6 },
        ...mockAnalyticsTrends,
      ];
    }

    // Scale trends if district is selected
    if (!isAllDistricts) {
      trendData = trendData.map((t) => ({
        ...t,
        count: Math.max(1, Math.round(t.count * districtFactor)),
      }));
    }

    // 3. Dynamic Category Breakdown
    const categoryData = mockAnalyticsSummary.byCategory.map((cat) => {
      if (isAllDistricts) return cat;
      return {
        ...cat,
        count: Math.max(1, Math.round(cat.count * districtFactor)),
      };
    });

    // 4. Dynamic Status Breakdown
    const statusData = mockAnalyticsSummary.byStatus.map((st) => {
      if (isAllDistricts) return st;
      return {
        ...st,
        count: Math.max(1, Math.round(st.count * districtFactor)),
      };
    });

    // 5. Dynamic KPIs
    const totalComplaints = isAllDistricts
      ? mockAnalyticsSummary.totalComplaints
      : districtCount;

    const participatingUniversities = isAllDistricts
      ? mockAnalyticsSummary.totalUniversitiesParticipating
      : selectedDistrictFilter === 'Ranchi'
      ? 3
      : selectedDistrictFilter === 'Jamshedpur'
      ? 2
      : 1;

    const industryPartners = isAllDistricts
      ? mockAnalyticsSummary.totalIndustryPartnersEngaged
      : selectedDistrictFilter === 'Ranchi'
      ? 3
      : 2;

    const projectsCompleted = isAllDistricts
      ? mockAnalyticsSummary.totalProjectsCompleted
      : Math.max(1, Math.round(mockAnalyticsSummary.totalProjectsCompleted * districtFactor));

    return {
      totalComplaints,
      participatingUniversities,
      industryPartners,
      projectsCompleted,
      categoryData,
      statusData,
      trendData,
      byDistrict: mockAnalyticsSummary.byDistrict,
    };
  }, [selectedDistrictFilter, timeRange]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Top Header Card / Admin Profile Bar - EGovt Midnight Navy & Civic Orange */}
        <div className="bg-gradient-to-r from-[#0B1E3D] via-[#122B56] to-[#0B1E3D] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#1E3A68]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF4D24]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#FF4D24]/20 text-[#FF7A00] text-xs font-extrabold rounded-full border border-[#FF4D24]/30 shadow-sm">
                  🛡️ State Oversight & Governance Portal
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Administration Dashboard
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                State-level civic grievance monitoring, AI categorization diagnostics, and university R&D collaboration analytics for Jharkhand.
              </p>
            </div>

            {/* Admin Profile Details */}
            <div className="bg-[#071328]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1.5 w-full md:w-auto flex-shrink-0 shadow-lg">
              <div className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                Authorized Administrator
              </div>
              <div className="font-extrabold text-white text-sm">
                {adminUser.name}
              </div>
              <p className="text-[11px] text-slate-300">
                {adminUser.organization}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#FF4D24] text-white rounded text-[10px] font-extrabold shadow-sm">
                  ROLE: ADMIN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0B1E3D] uppercase tracking-wider text-[11px]">
              Analytics Window:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['7d', '30d', 'All Time'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTimeRange(r)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                    timeRange === r
                      ? 'bg-[#FF4D24] text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-600 hover:text-[#0B1E3D]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#0B1E3D] font-bold uppercase tracking-wider text-[11px]">
              District Scope:
            </span>
            <select
              value={selectedDistrictFilter}
              onChange={(e) => setSelectedDistrictFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-[#0B1E3D] font-bold focus:outline-none focus:ring-2 focus:ring-[#FF4D24]/20 focus:border-[#FF4D24] transition-colors"
            >
              <option value="all">All Jharkhand Districts (148 Total)</option>
              {mockAnalyticsSummary.byDistrict.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district} District ({d.count} Complaints)
                </option>
              ))}
            </select>
            {selectedDistrictFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedDistrictFilter('all')}
                className="text-xs text-[#FF4D24] hover:text-[#E63900] font-bold px-2 py-1 hover:bg-orange-50 rounded transition-colors"
              >
                Reset Scope
              </button>
            )}
          </div>
        </div>

        {/* Four Primary PRD KPI Cards (Dynamic to Selected District & Time) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatMetricCard
            title="Total Complaints"
            value={filteredAnalytics.totalComplaints}
            subtitle={
              selectedDistrictFilter === 'all'
                ? 'Across 10 civic categories'
                : `Active in ${selectedDistrictFilter}`
            }
            icon="📋"
            badgeText={selectedDistrictFilter === 'all' ? 'State Total' : `${selectedDistrictFilter} Hotspot`}
            badgeColor="text-[#FF4D24] bg-orange-50 border-orange-200"
            accentColor="text-[#0B1E3D]"
          />

          <StatMetricCard
            title="Participating Universities"
            value={filteredAnalytics.participatingUniversities}
            subtitle={
              selectedDistrictFilter === 'all'
                ? 'BIT Mesra, NIT Jamshedpur...'
                : `Assigned to ${selectedDistrictFilter}`
            }
            icon="🏛️"
            badgeText="Active R&D"
            badgeColor="text-purple-700 bg-purple-50 border-purple-200"
            accentColor="text-[#0B1E3D]"
          />

          <StatMetricCard
            title="Industry Partners Engaged"
            value={filteredAnalytics.industryPartners}
            subtitle="Startups, MSMEs & CSR"
            icon="🏢"
            badgeText="Collaborating"
            badgeColor="text-blue-700 bg-blue-50 border-blue-200"
            accentColor="text-[#0B1E3D]"
          />

          <StatMetricCard
            title="Projects Completed"
            value={filteredAnalytics.projectsCompleted}
            subtitle="Field verified resolutions"
            icon="✅"
            badgeText="Delivered"
            badgeColor="text-emerald-700 bg-emerald-50 border-emerald-200"
            accentColor="text-emerald-600"
          />
        </div>

        {/* Analytics Visualizations Grid (2x2 Layout optimized for 1366x768) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Complaints by Category (Bar Chart) */}
          <CategoryBarChart data={filteredAnalytics.categoryData} />

          {/* 2. Complaints by Status (Donut / Pie Chart) */}
          <StatusDonutChart data={filteredAnalytics.statusData} />

          {/* 3. Complaint Submission Trends (Line / Area Chart) */}
          <TrendsLineChart data={filteredAnalytics.trendData} />

          {/* 4. District Overview (Ranked Breakdown & Chart) */}
          <DistrictOverview data={filteredAnalytics.byDistrict} />
        </div>
      </div>
    </div>
  );
}
