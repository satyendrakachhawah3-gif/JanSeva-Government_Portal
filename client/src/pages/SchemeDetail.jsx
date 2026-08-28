import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  Calendar,
  ExternalLink,
  Bookmark,
  Share2,
  Building2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const SchemeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await API.get(`/schemes/${id}`);
        if (res.data.success) {
          setScheme(res.data.scheme);
        }
      } catch (err) {
        console.error('[SchemeDetail] fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const handleToggleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await API.post('/schemes/saved/toggle', { schemeId: id });
      if (res.data.success) {
        setIsSaved(res.data.isSaved);
      }
    } catch (err) {
      console.error('[SaveScheme] error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Scheme not found.</h2>
        <Link to="/schemes" className="mt-4 inline-block px-4 py-2 bg-gov-navy text-white text-xs font-bold rounded-xl">
          Return to Schemes Directory
        </Link>
      </div>
    );
  }

  const crit = scheme.eligibilityCriteria || {};

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link to="/schemes" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-gov-navy">
          <ArrowLeft className="w-4 h-4" /> Back to Scheme Directory
        </Link>

        {/* Scheme Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded border border-orange-200">
                  {scheme.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  {scheme.state}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy tracking-tight">
                {scheme.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Administering Department: <strong className="text-slate-800">{scheme.department}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSave}
                className={`p-2.5 rounded-xl border transition ${
                  isSaved ? 'bg-amber-50 text-amber-600 border-amber-300' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Bookmark Scheme"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <Link
              to={`/apply/${scheme._id}`}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              Apply Online Now <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/eligibility-checker"
              className="px-5 py-3 bg-gov-navy text-white text-xs font-bold rounded-xl shadow hover:bg-gov-deep transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Check My Eligibility
            </Link>

            {scheme.officialUrl && (
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                Official Department Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Detailed Tabs / Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview & Description */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
                Scheme Description & Purpose
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            {/* Key Benefits List */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
                Key Welfare Benefits
              </h3>
              <ul className="space-y-2.5">
                {(scheme.benefits || []).map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Steps */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
                Step-by-Step Application Workflow
              </h3>
              <div className="space-y-3">
                {(scheme.applicationProcess || []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="w-6 h-6 rounded-full bg-gov-navy text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar (1 col) - Eligibility & Documents */}
          <div className="space-y-6">
            
            {/* Official Eligibility Parameters */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
                Official Eligibility Parameters
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Income Ceiling</span>
                  <span className="font-bold text-slate-800">≤ ₹{Number(crit.maxIncome || 0).toLocaleString('en-IN')}/yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Age Range</span>
                  <span className="font-bold text-slate-800">{crit.minAge || 18} - {crit.maxAge || 70} years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Target Group</span>
                  <span className="font-bold text-slate-800">{scheme.targetBeneficiaries}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Applicable State</span>
                  <span className="font-bold text-slate-800">{scheme.state}</span>
                </div>
              </div>
            </div>

            {/* Required Documents checklist */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b border-slate-100 pb-2">
                Mandatory Upload Documents
              </h3>
              <ul className="space-y-2">
                {(scheme.requiredDocuments || []).map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SchemeDetail;
