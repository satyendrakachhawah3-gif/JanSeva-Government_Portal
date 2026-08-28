import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  FileText,
  Lock
} from 'lucide-react';

const ApplyScheme = () => {
  const { schemeId } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [applicantDetails, setApplicantDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    state: profile?.state || 'Maharashtra',
    district: profile?.district || 'Pune',
    annualIncome: profile?.annualIncome || 180000,
    occupation: profile?.occupation || 'Student',
    bankAccountNo: '987654321098',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India'
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [docType, setDocType] = useState('Income Certificate');

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await API.get(`/schemes/${schemeId}`);
        if (res.data.success) {
          setScheme(res.data.scheme);
        }
      } catch (err) {
        console.error('[ApplyScheme] fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [schemeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicantDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Step 1: Submit Application
      const appRes = await API.post('/applications', {
        schemeId,
        applicantDetails
      });

      if (appRes.data.success) {
        const newAppId = appRes.data.application._id;

        // Step 2: Upload Document if selected
        if (documentFile) {
          const fileData = new FormData();
          fileData.append('file', documentFile);
          fileData.append('applicationId', newAppId);
          fileData.append('documentType', docType);

          await API.post('/applications/upload-document', fileData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        // Navigate to Application Detail / Tracking Page
        navigate(`/applications/${newAppId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setSubmitting(false);
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
      <div className="min-h-screen py-16 text-center">
        <p className="text-sm font-bold text-slate-700">Scheme not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back link */}
        <Link to={`/schemes/${scheme._id}`} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-gov-navy">
          <ArrowLeft className="w-4 h-4" /> Return to Scheme Details
        </Link>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-extrabold uppercase bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded">
              Digital Scheme Application Form
            </span>
            <h1 className="text-2xl font-extrabold text-gov-navy mt-1">
              Apply for: {scheme.name}
            </h1>
            <p className="text-xs text-slate-500">
              Department: {scheme.department} • All submissions are recorded under central audit trail.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Applicant Demographics */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider border-b pb-2">
                1. Applicant Verification Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={applicantDetails.fullName}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    name="mobile"
                    value={applicantDetails.mobile}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={applicantDetails.state}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    name="district"
                    value={applicantDetails.district}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Direct Benefit Transfer (DBT) Bank Account */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider border-b pb-2 flex items-center justify-between">
                <span>2. DBT Aadhaar-Seeded Bank Account</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">DBT Verified</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    name="bankName"
                    value={applicantDetails.bankName}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    name="bankAccountNo"
                    value={applicantDetails.bankAccountNo}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    required
                    name="ifscCode"
                    value={applicantDetails.ifscCode}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Document Upload Dropzone */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider border-b pb-2">
                3. Mandatory Supporting Document Upload
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Document Category</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                  >
                    {(scheme.requiredDocuments || ['Income Certificate', 'Aadhaar Card', 'Academic Mark Sheet']).map((doc, idx) => (
                      <option key={idx} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-gov-navy rounded-2xl p-6 text-center bg-slate-50/50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    {documentFile ? documentFile.name : 'Click or Drag & Drop Document File'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Supported formats: PDF, JPG, PNG (Max size: 5MB)
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting Application...' : 'Submit Application & Generate Application ID'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default ApplyScheme;
