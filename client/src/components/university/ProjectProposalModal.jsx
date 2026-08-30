import React, { useState } from 'react';
import Modal from '../common/Modal';
import { mockIndustryPartners } from '../../mocks/mockData';

export default function ProjectProposalModal({
  isOpen,
  onClose,
  challenge,
  currentUniversity = { name: 'Birla Institute of Technology, Mesra', _id: 'uni501' },
  onSubmitProposal,
}) {
  if (!challenge) return null;

  const [projectTitle, setProjectTitle] = useState(
    `R&D Initiative: ${challenge.title}`
  );
  const [facultyMentor, setFacultyMentor] = useState('Dr. Anita Sharma');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [proposalNotes, setProposalNotes] = useState('');
  const [students, setStudents] = useState([
    { name: 'Priya Verma', role: 'Student Project Lead' },
    { name: 'Rahul Sen', role: 'Hardware & IoT' },
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRole, setNewStudentRole] = useState('Student Researcher');
  const [milestones, setMilestones] = useState([
    { title: 'Site Inspection & Feasibility Report', dueDate: '2026-02-18' },
    { title: 'Working Prototype & Community Testing', dueDate: '2026-03-05' },
    { title: 'Deployment & Final Resolution Handover', dueDate: '2026-03-25' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    setStudents([...students, { name: newStudentName.trim(), role: newStudentRole }]);
    setNewStudentName('');
  };

  const handleRemoveStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _id: `p${Date.now().toString().slice(-4)}`,
      complaintId: challenge._id,
      complaintTitle: challenge.title,
      category: challenge.category,
      district: challenge.district,
      universityId: currentUniversity._id,
      team: [
        ...students.map((s) => ({ name: s.name, role: 'student' })),
        { name: facultyMentor, role: 'faculty_mentor' },
      ],
      industryPartnerId: selectedIndustry || null,
      status: 'in_progress',
      milestones: milestones.map((m, idx) => ({
        _id: `m${idx + 1}`,
        title: m.title,
        dueDate: new Date(m.dueDate).toISOString(),
        status: idx === 0 ? 'in_progress' : 'pending',
      })),
      proposalDoc: 'https://res.cloudinary.com/demo/raw/upload/v1/proposal_auto.pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitProposal?.(payload);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adopt Problem as University Innovation Project"
      subtitle={`Connecting academic R&D to grassroots citizen challenge in ${challenge.district}`}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selected Challenge Context Banner */}
        <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-start justify-between">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF4D24]">
              Target Challenge #{challenge._id}
            </div>
            <h4 className="text-sm font-bold text-[#0B1E3D] mt-0.5">
              {challenge.title}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              {challenge.description}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="inline-block px-3 py-1 bg-white border border-orange-300 text-[#0B1E3D] text-xs font-bold rounded-lg shadow-sm">
              {currentUniversity.name}
            </span>
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              Project Initiative Title <span className="text-[#FF4D24]">*</span>
            </label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D24]/20 focus:border-[#FF4D24]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              Lead Faculty Mentor <span className="text-[#FF4D24]">*</span>
            </label>
            <input
              type="text"
              required
              value={facultyMentor}
              onChange={(e) => setFacultyMentor(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D24]/20 focus:border-[#FF4D24]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              Industry / CSR Partner Collab (Optional)
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D24]/20 focus:border-[#FF4D24]"
            >
              <option value="">No Industry Partner (Academic Only)</option>
              {mockIndustryPartners.map((ind) => (
                <option key={ind._id} value={ind._id}>
                  {ind.name} ({ind.type.toUpperCase()} · Focus: {ind.sectorFocus.join(', ')})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student Innovation Team Builder */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
              Student Innovation Team ({students.length} Members)
            </label>
          </div>

          {/* Current Members List */}
          <div className="flex flex-wrap gap-2">
            {students.map((student, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs"
              >
                <span className="font-semibold text-slate-800">{student.name}</span>
                <span className="text-slate-500">({student.role})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStudent(idx)}
                  className="text-slate-400 hover:text-rose-600 ml-1 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Member Row */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Student full name"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <input
              type="text"
              placeholder="Role (e.g. Prototyping)"
              value={newStudentRole}
              onChange={(e) => setNewStudentRole(e.target.value)}
              className="w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <button
              type="button"
              onClick={handleAddStudent}
              className="px-4 py-2 bg-[#0B1E3D] text-white rounded-lg text-xs font-bold hover:bg-[#122B56] transition-colors"
            >
              + Add Member
            </button>
          </div>
        </div>

        {/* Milestone Blueprint */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-[#0B1E3D] uppercase tracking-wider">
            Project Milestone Roadmap (Target Execution)
          </label>
          <div className="space-y-2">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs"
              >
                <span className="w-5 h-5 rounded-full bg-[#FF4D24] text-white flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => {
                    const updated = [...milestones];
                    updated[idx].title = e.target.value;
                    setMilestones(updated);
                  }}
                  className="flex-1 bg-transparent font-medium text-slate-800 focus:outline-none"
                />
                <input
                  type="date"
                  value={m.dueDate}
                  onChange={(e) => {
                    const updated = [...milestones];
                    updated[idx].dueDate = e.target.value;
                    setMilestones(updated);
                  }}
                  className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold text-white bg-[#FF4D24] hover:bg-[#E63900] rounded-xl shadow-md shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Creating Project...
              </>
            ) : (
              'Confirm Adoption & Register Project'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
