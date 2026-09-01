import React, { useState, useMemo } from 'react';
import {
  mockComplaints,
  mockUniversities,
  mockProjects,
} from '../../mocks/mockData';
import ChallengeCard from '../../components/university/ChallengeCard';
import ChallengeFilters from '../../components/university/ChallengeFilters';
import ProjectProposalModal from '../../components/university/ProjectProposalModal';
import MilestoneTracker from '../../components/university/MilestoneTracker';
import Tabs from '../../components/common/Tabs';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import UrgencyBadge from '../../components/common/UrgencyBadge';

export default function UniversityChallenges() {
  // University session state (default: BIT Mesra uni501)
  const [selectedUniId, setSelectedUniId] = useState('uni501');
  const currentUniversity = useMemo(
    () => mockUniversities.find((u) => u._id === selectedUniId) || mockUniversities[0],
    [selectedUniId]
  );

  // Local state for Complaints & Projects (for interactive Adopt / Milestone actions)
  const [complaints, setComplaints] = useState(mockComplaints);
  const [projects, setProjects] = useState(mockProjects);

  // UI state
  const [activeTab, setActiveTab] = useState('challenges'); // 'challenges' | 'projects'
  const [selectedChallengeForProposal, setSelectedChallengeForProposal] = useState(null);
  const [detailedChallenge, setDetailedChallenge] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [onlyMatched, setOnlyMatched] = useState(true);

  // Trigger temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Derive university matched complaints
  const isComplaintMatched = (c, uni) => {
    if (!uni) return false;
    const hasSuggestedScore = c.suggestedUniversities?.some(
      (su) => su.universityId === uni._id && su.score >= 0.6
    );
    const hasDisciplineMatch = uni.disciplines?.includes(c.category);
    return hasSuggestedScore || hasDisciplineMatch;
  };

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    return complaints.filter((c) => {
      // Exclude duplicates from challenge feed
      if (c.status === 'duplicate') return false;

      // Text search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(term);
        const matchesDesc = c.description.toLowerCase().includes(term);
        const matchesDistrict = c.district.toLowerCase().includes(term);
        const matchesTags = c.imageAnalysis?.tags?.some((t) =>
          t.toLowerCase().includes(term)
        );
        if (!matchesTitle && !matchesDesc && !matchesDistrict && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }

      // Urgency filter
      if (selectedUrgency !== 'all' && c.urgency !== selectedUrgency) {
        return false;
      }

      // District filter
      if (selectedDistrict !== 'All Districts' && c.district !== selectedDistrict) {
        return false;
      }

      // AI Match filter
      if (onlyMatched && !isComplaintMatched(c, currentUniversity)) {
        return false;
      }

      return true;
    });
  }, [
    complaints,
    searchTerm,
    selectedCategory,
    selectedUrgency,
    selectedDistrict,
    onlyMatched,
    currentUniversity,
  ]);

  // University active projects
  const universityProjects = useMemo(() => {
    return projects.filter((p) => p.universityId === currentUniversity._id);
  }, [projects, currentUniversity]);

  // Adoption handler
  const handleAdoptChallenge = (challenge) => {
    setSelectedChallengeForProposal(challenge);
  };

  const handleProposalSubmit = (newProject) => {
    // 1. Add to local projects
    setProjects((prev) => [newProject, ...prev]);

    // 2. Update complaint status in local state
    setComplaints((prev) =>
      prev.map((c) =>
        c._id === newProject.complaintId
          ? {
              ...c,
              status: 'assigned',
              assignedUniversity: currentUniversity._id,
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );

    // 3. Switch to projects tab & show toast
    setActiveTab('projects');
    showToast(
      `🎉 Challenge adopted! Project #${newProject._id} registered for ${currentUniversity.name}.`
    );
  };

  // Milestone status toggle
  const handleUpdateMilestone = (projectId, milestoneId, newStatus) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p._id !== projectId) return p;
        return {
          ...p,
          milestones: p.milestones.map((m) =>
            m._id === milestoneId ? { ...m, status: newStatus } : m
          ),
          updatedAt: new Date().toISOString(),
        };
      })
    );
    showToast(`Milestone updated to: ${newStatus.toUpperCase()}`);
  };

  const handleViewComplaintDetails = (complaintId) => {
    const comp = complaints.find((c) => c._id === complaintId);
    if (comp) setDetailedChallenge(comp);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-bounce">
          <span className="text-emerald-400 font-bold text-lg">✓</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Top Header Card / University Profile Bar - EGovt Midnight Navy & Civic Orange */}
        <div className="bg-gradient-to-r from-[#0B1E3D] via-[#122B56] to-[#0B1E3D] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#1E3A68]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF4D24]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#FF4D24]/20 text-[#FF7A00] text-xs font-extrabold rounded-full border border-[#FF4D24]/30 shadow-sm">
                  🏛️ University Innovation Hub
                </span>
                {currentUniversity.incubationFacility && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Incubation Cell Active
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {currentUniversity.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300">
                <span className="text-slate-400 font-semibold">Priority Disciplines:</span>
                {currentUniversity.disciplines.map((d) => (
                  <span
                    key={d}
                    className="bg-white/10 text-white px-2.5 py-0.5 rounded-md font-semibold border border-white/10"
                  >
                    {d.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* University Switcher */}
            <div className="bg-[#071328]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1.5 w-full md:w-auto flex-shrink-0 shadow-lg">
              <label className="text-slate-300 font-bold block">
                Active Institution Session
              </label>
              <select
                value={selectedUniId}
                onChange={(e) => setSelectedUniId(e.target.value)}
                className="bg-[#0B1E3D] text-white font-bold px-3.5 py-2 rounded-xl border border-[#FF4D24]/40 focus:outline-none focus:ring-2 focus:ring-[#FF4D24] w-full cursor-pointer"
              >
                {mockUniversities.map((uni) => (
                  <option key={uni._id} value={uni._id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">
                Contact: {currentUniversity.contactEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              AI Matched Challenges
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-black text-[#0B1E3D]">
                {complaints.filter((c) => isComplaintMatched(c, currentUniversity)).length}
              </span>
              <span className="text-xs text-[#FF4D24] font-bold">In Target Disciplines</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              High Urgency Problems
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-black text-rose-600">
                {complaints.filter((c) => c.urgency === 'high').length}
              </span>
              <span className="text-xs text-rose-500 font-bold">Needs Immediate R&D</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Active R&D Projects
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-black text-[#FF4D24]">
                {universityProjects.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Adopted & Running</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              District Outreach
            </span>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-black text-[#0B1E3D]">
                {new Set(complaints.map((c) => c.district)).size}
              </span>
              <span className="text-xs text-slate-500 font-medium">Districts Reporting</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          tabs={[
            {
              id: 'challenges',
              label: 'Explore Matched Challenges',
              count: filteredChallenges.length,
            },
            {
              id: 'projects',
              label: "My Institution's Adopted Projects",
              count: universityProjects.length,
            },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* TAB 1: CHALLENGES EXPLORER */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <ChallengeFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              onlyMatched={onlyMatched}
              setOnlyMatched={setOnlyMatched}
              totalResults={filteredChallenges.length}
            />

            {/* Challenges Grid */}
            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((complaint) => (
                  <ChallengeCard
                    key={complaint._id}
                    complaint={complaint}
                    currentUniversityId={currentUniversity._id}
                    onAdopt={handleAdoptChallenge}
                    onViewDetails={(c) => setDetailedChallenge(c)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  No challenges match your filter criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try disabling the "AI University Discipline Matches Only" toggle or clearing your search keywords.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedUrgency('all');
                    setSelectedDistrict('All Districts');
                    setOnlyMatched(false);
                  }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE ADOPTED PROJECTS & MILESTONE TRACKER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {universityProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {universityProjects.map((project) => (
                  <MilestoneTracker
                    key={project._id}
                    project={project}
                    onUpdateMilestone={handleUpdateMilestone}
                    onViewComplaint={handleViewComplaintDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🚀
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  No active projects adopted yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Browse the citizen challenges matched with {currentUniversity.name}'s R&D focus and click "Adopt Challenge" to register a faculty/student project.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('challenges')}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                >
                  Browse Matched Challenges →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADOPT CHALLENGE / PROJECT PROPOSAL MODAL */}
      <ProjectProposalModal
        isOpen={Boolean(selectedChallengeForProposal)}
        onClose={() => setSelectedChallengeForProposal(null)}
        challenge={selectedChallengeForProposal}
        currentUniversity={currentUniversity}
        onSubmitProposal={handleProposalSubmit}
      />

      {/* DETAILED CHALLENGE MODAL */}
      {detailedChallenge && (
        <Modal
          isOpen={Boolean(detailedChallenge)}
          onClose={() => setDetailedChallenge(null)}
          title={detailedChallenge.title}
          subtitle={`Citizen Report #${detailedChallenge._id} • ${detailedChallenge.district}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={detailedChallenge.status} />
              <UrgencyBadge urgency={detailedChallenge.urgency} />
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                Category: {detailedChallenge.category.replace('_', ' ')}
              </span>
              {detailedChallenge.categoryConfidence && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  AI Confidence: {Math.round(detailedChallenge.categoryConfidence * 100)}%
                </span>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200">
              <img
                src={
                  (detailedChallenge.mediaUrls && detailedChallenge.mediaUrls.length > 0 && detailedChallenge.mediaUrls[0]) ||
                  '/images/handpump.svg'
                }
                alt={detailedChallenge.title}
                onError={(e) => {
                  e.currentTarget.src = '/images/handpump.svg';
                }}
                className="w-full h-56 object-cover"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Full Description
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {detailedChallenge.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 font-semibold block">GPS Location:</span>
                <span className="font-bold text-slate-800">
                  {detailedChallenge.location?.lat}, {detailedChallenge.location?.lng}
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {detailedChallenge.location?.address}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Submission Timestamp:</span>
                <span className="font-bold text-slate-800">
                  {new Date(detailedChallenge.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {detailedChallenge.imageAnalysis?.caption && (
              <div className="bg-slate-900 text-white p-3.5 rounded-xl space-y-1 text-xs">
                <div className="font-bold text-indigo-300">🤖 AI Computer Vision Insights</div>
                <p className="text-slate-300">{detailedChallenge.imageAnalysis.caption}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {detailedChallenge.imageAnalysis.tags?.map((t) => (
                    <span key={t} className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDetailedChallenge(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              {detailedChallenge.status !== 'assigned' && detailedChallenge.status !== 'in_progress' && (
                <button
                  type="button"
                  onClick={() => {
                    const c = detailedChallenge;
                    setDetailedChallenge(null);
                    handleAdoptChallenge(c);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200"
                >
                  Adopt as Innovation Project →
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
