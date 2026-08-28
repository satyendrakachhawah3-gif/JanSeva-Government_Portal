import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  RefreshCw,
  ShieldAlert,
  Info
} from 'lucide-react';

const RecommendationEngine = () => {
  const { profile } = useAuth();

  const [formData, setFormData] = useState({
    annualIncome: profile?.annualIncome || 180000,
    age: profile?.age || 24,
    gender: profile?.gender || 'Female',
    state: profile?.state || 'Maharashtra',
    occupation: profile?.occupation || 'Student',
    isStudent: profile?.isStudent ?? true,
    isFarmer: profile?.isFarmer ?? false,
    isDisability: profile?.isDisability ?? false,
    isVeteran: profile?.isVeteran ?? false
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (inputData = formData) => {
    setLoading(true);
    try {
      const res = await API.post('/schemes/recommend', inputData);
      if (res.data.success) {
        setRecommendations(res.data.recommendations);
      }
    } catch (err) {
      console.error('[RecommendationEngine] error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(updated);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchRecommendations(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="bg-gradient-to-r from-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> AI Engine Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI Scheme Recommendation Engine
            </h1>
            <p className="text-xs text-slate-300">
              Our automated matching engine computes eligibility percentage scores and qualification reasons based on official rules.
            </p>
          </div>
        </div>

        {/* AI Disclaimer Alert */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">AI Informational Notice:</p>
            <p className="mt-0.5 leading-relaxed">
              Match percentages and qualification highlights are AI estimates based on user-provided profile data. Official verification is conducted by department officers upon document submission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Profile Filters Form (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 h-fit">
            <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
              Citizen Profile Parameters
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Family Income (₹)
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Applicant Age (Years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State of Residence</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Occupation</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-gov-navy"
                >
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isStudent"
                    checked={formData.isStudent}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Enrolled Student</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFarmer"
                    checked={formData.isFarmer}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Registered Farmer</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDisability"
                    checked={formData.isDisability}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Divyangjan (Disabled)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gov-navy hover:bg-gov-deep text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
                Re-calculate AI Matches
              </button>
            </form>
          </div>

          {/* Right Recommendation Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {loading ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
                <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">Analyzing criteria against active scheme repository...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-3xl border border-slate-200">
                <p className="text-xs text-slate-500">No schemes found matching profile inputs.</p>
              </div>
            ) : (
              recommendations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-orange-300 transition"
                >
                  {/* Top Match Score Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {item.scheme.category}
                      </span>
                      <h3 className="font-bold text-base text-gov-navy mt-1">
                        <Link to={`/schemes/${item.scheme._id}`} className="hover:text-orange-600">
                          {item.scheme.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500">Department: {item.scheme.department}</p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-extrabold text-sm">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        {item.matchPercentage}% Match
                      </div>
                      <p className="text-[10px] text-emerald-700 font-bold mt-1">
                        Status: {item.eligibilityStatus}
                      </p>
                    </div>
                  </div>

                  {/* Why You May Qualify List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Why You May Qualify:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {item.whyYouQualify.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Caveats if any */}
                  {item.caveats && item.caveats.length > 0 && (
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-800 space-y-1">
                      <p className="font-bold text-[11px] uppercase tracking-wider">Notice Criteria:</p>
                      {item.caveats.map((c, cIdx) => (
                        <p key={cIdx}>• {c}</p>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <Link
                      to={`/schemes/${item.scheme._id}`}
                      className="text-xs font-bold text-gov-navy hover:underline"
                    >
                      View Scheme Details
                    </Link>

                    <Link
                      to={`/apply/${item.scheme._id}`}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      Apply Online <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecommendationEngine;
