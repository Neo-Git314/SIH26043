import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Image as ImageIcon, Sparkles, CheckCircle2, X } from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '../api/mockData';

export default function SubmitIssue({ addComplaint, setView }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('d1');
  const [districtName, setDistrictName] = useState('Ranchi');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mediaUrls, setMediaUrls] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setMediaUrls((prev) => [...prev, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setMediaUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    const payload = {
      title,
      district,
      description,
      mediaUrls,
    };

    if (addComplaint) {
      await addComplaint(payload);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      if (typeof setView === 'function') {
        setView('my-complaints');
      }
      navigate('/my-complaints');
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] dot-grid">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            Citizen Grievance Gateway
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B1E36] font-geist">
            Submit Civic Issue
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Report local civic or infrastructure pain points across Jharkhand. Our AI pipeline categorizes and routes your issue to top university research teams.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-bold text-[#0B1E36] font-geist">
              Grievance Successfully Ingested!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your ticket has been generated and dispatched to the automated AI categorization pipeline. Redirecting to My Grievances...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Issue Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Broken water pipeline causing road waterlogging"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    District Code / Zone *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                  >
                    <option value="d1">District 1 (Ranchi / Central)</option>
                    <option value="d2">District 2 (Dhanbad / East)</option>
                    <option value="d3">District 3 (Jamshedpur / South)</option>
                    <option value="d4">District 4 (Latehar / West)</option>
                    <option value="d5">District 5 (Dumka / Santhal Pargana)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Jharkhand Administrative District
                  </label>
                  <select
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                  >
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide complete details including street names, duration of the issue, and estimated impact on citizens..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                ></textarea>
              </div>

              {/* Photo attachment via URL or Cloudinary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Evidence Photo URL (Optional)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ImageIcon size={16} />
                    </div>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste image URL (https://...)"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    Add Photo
                  </button>
                </div>

                {mediaUrls.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {mediaUrls.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-300 group">
                        <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-80 hover:opacity-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Badge */}
              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs text-brand-navy flex items-start gap-3">
                <Sparkles size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">AI Vector Deduplication & Semantic Matching</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    This submission will be vectorized with Gemini text embeddings to verify non-duplication against existing reports within 5km, followed by research keyword alignment.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-terracotta-dark shadow-md shadow-brand-orange/20 transition-all disabled:opacity-60"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
