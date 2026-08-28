import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

const EligibilityWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    age: 24,
    gender: 'Female',
    annualIncome: 180000,
    occupation: 'Student',
    state: 'Maharashtra',
    district: 'Pune',
    education: 'Graduate',
    isStudent: true,
    isFarmer: false,
    isDisability: false,
    isVeteran: false
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWizardData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 5) {
      evaluateResults();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const evaluateResults = async () => {
    setLoading(true);
    try {
      const res = await API.post('/schemes/eligibility-check', wizardData);
      if (res.data.success) {
        setResults(res.data);
        setCurrentStep(6);
      }
    } catch (err) {
      console.error('[EligibilityWizard] error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Wizard Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-2">
            <CheckSquare className="w-4 h-4 text-blue-600" /> Interactive 6-Step Evaluator
          </div>
          <h1 className="text-2xl font-extrabold text-gov-navy">
            Government Scheme Eligibility Wizard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Answer 5 quick demographic questions to calculate your eligibility status across national schemes.
          </p>

          {/* Progress Bar */}
          <div className="mt-6 flex justify-between items-center max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step < currentStep
                    ? 'bg-emerald-600 text-white'
                    : step === currentStep
                    ? 'bg-gov-navy text-white ring-4 ring-orange-200'
                    : 'bg-white border border-slate-300 text-slate-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form Steps Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b pb-2">
                Step 1: Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Age (Years)</label>
                  <input
                    type="number"
                    name="age"
                    value={wizardData.age}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={wizardData.gender}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Income & Occupation */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b pb-2">
                Step 2: Income & Employment Category
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Annual Family Income (₹)
                  </label>
                  <input
                    type="number"
                    name="annualIncome"
                    value={wizardData.annualIncome}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Occupation</label>
                  <select
                    name="occupation"
                    value={wizardData.occupation}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  >
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer / Agri Worker</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self Employed">Self Employed / Micro Trader</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b pb-2">
                Step 3: Residential State & District
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={wizardData.state}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={wizardData.district}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Education */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b pb-2">
                Step 4: Highest Education Attained
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Education Level</label>
                <select
                  name="education"
                  value={wizardData.education}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                >
                  <option value="Secondary">10th / Secondary</option>
                  <option value="Higher Secondary">12th / Higher Secondary</option>
                  <option value="Graduate">Undergraduate / Graduate Degree</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Diploma">Diploma / ITI</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: Welfare Toggles */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider border-b pb-2">
                Step 5: Special Welfare Statuses
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    name="isStudent"
                    checked={wizardData.isStudent}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Currently enrolled in a school, college, or university</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    name="isFarmer"
                    checked={wizardData.isFarmer}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Agricultural landowner or PM-Kisan registered farmer</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    name="isDisability"
                    checked={wizardData.isDisability}
                    onChange={handleChange}
                    className="rounded text-gov-navy"
                  />
                  <span>Divyangjan / Benchmark disability (40% or higher)</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: Wizard Results Breakdown */}
          {currentStep === 6 && results && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900 text-xs">
                <p className="font-extrabold text-sm">Eligibility Assessment Complete!</p>
                <p className="mt-1">
                  Evaluated {results.summary.totalEvaluated} schemes against your inputs. Found{' '}
                  <strong className="text-emerald-700">{results.summary.eligibleCount} potentially eligible schemes</strong>.
                </p>
              </div>

              {/* Eligible list */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-gov-navy uppercase tracking-wider">
                  Potentially Eligible Schemes ({results.eligible.length})
                </h4>
                {results.eligible.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center gap-4">
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{item.scheme.name}</h5>
                      <p className="text-[11px] text-slate-500">{item.scheme.department}</p>
                    </div>
                    <Link
                      to={`/apply/${item.scheme._id}`}
                      className="px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-xl shadow shrink-0"
                    >
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Navigation Controls */}
          {currentStep <= 5 && (
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="px-6 py-2.5 bg-gov-navy hover:bg-gov-deep text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {currentStep === 5 ? 'Evaluate Eligibility' : 'Next Step'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default EligibilityWizard;
