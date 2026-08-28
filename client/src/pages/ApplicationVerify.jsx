import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ArrowLeft,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

const ApplicationVerify = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState('APPROVED');
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await API.get(`/applications/${id}`);
        if (res.data.success) {
          setApplication(res.data.application);
          setDocuments(res.data.documents || []);
          setStatus(res.data.application.status);
          setRemarks(res.data.application.officerRemarks || '');
        }
      } catch (err) {
        console.error('[ApplicationVerify] error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      const res = await API.patch(`/applications/${id}/status`, {
        status,
        remarks
      });

      if (res.data.success) {
        setMessage(`Status updated to ${status} successfully.`);
        setTimeout(() => navigate('/officer-portal'), 1500);
      }
    } catch (err) {
      console.error('[UpdateStatus] error:', err);
      setMessage('Failed to update application status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyDoc = async (docId, docStatus) => {
    try {
      const res = await API.patch(`/applications/documents/${docId}/status`, {
        status: docStatus,
        remarks: `Document marked as ${docStatus} by verification officer.`
      });

      if (res.data.success) {
        setDocuments(prev =>
          prev.map(d => (d._id === docId ? res.data.document : d))
        );
      }
    } catch (err) {
      console.error('[VerifyDoc] error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen py-16 text-center">
        <p className="text-sm font-bold text-slate-800">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link to="/officer-portal" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-gov-navy">
          <ArrowLeft className="w-4 h-4" /> Back to Verification Queue
        </Link>

        {/* Verification Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded border border-orange-200">
                {application.applicationId}
              </span>
              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {application.scheme?.category}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gov-navy mt-1">
              Verify Application for: {application.scheme?.name}
            </h1>
            <p className="text-xs text-slate-500">
              Submitted by: <strong>{application.citizen?.name}</strong> ({application.citizen?.email})
            </p>
          </div>

          <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
            application.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
            application.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
          }`}>
            Current: {application.status}
          </span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Applicant Demographics & Document Inspection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Applicant Demographics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
                1. Citizen Demographic Summary
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Full Name</span>
                  <strong className="text-slate-800">{application.applicantDetails?.fullName || application.citizen?.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Mobile</span>
                  <strong className="text-slate-800">{application.applicantDetails?.mobile || application.citizen?.mobile}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Annual Income</span>
                  <strong className="text-slate-800">₹{Number(application.applicantDetails?.annualIncome || 0).toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <strong className="text-slate-800">{application.applicantDetails?.district}, {application.applicantDetails?.state}</strong>
                </div>
              </div>
            </div>

            {/* Document Inspection & Verification List */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
                2. Document Inspection & Verification
              </h3>

              {documents.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No supporting documents uploaded.</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">{doc.documentType}</h4>
                          <p className="text-[10px] text-slate-500">{doc.fileName} • {(doc.fileSize / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                        doc.verificationStatus === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.verificationStatus}
                      </span>
                    </div>

                    {/* Quick verify buttons */}
                    <div className="flex gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleVerifyDoc(doc._id, 'VERIFIED')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Approve Document
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerifyDoc(doc._id, 'REJECTED')}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Reject Document
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Right Column: Officer Action & Sign-off Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 h-fit">
            <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
              3. Officer Decision & Remarks
            </h3>

            {message && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
                {message}
              </div>
            )}

            <form onSubmit={handleStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Application Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy font-bold"
                >
                  <option value="APPROVED">🎉 APPROVED (Release Grant)</option>
                  <option value="UNDER_REVIEW">UNDER REVIEW (Committee Processing)</option>
                  <option value="DOCUMENTS_VERIFIED">DOCUMENTS VERIFIED</option>
                  <option value="ACTION_REQUIRED">ACTION REQUIRED (Request Re-upload)</option>
                  <option value="REJECTED">REJECTED (Criteria Mismatch)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Officer Notes / Remarks *</label>
                <textarea
                  rows={4}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter official sign-off comments or rejection reasons..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full py-3.5 bg-gov-navy hover:bg-gov-deep text-white font-bold text-xs rounded-xl shadow transition"
              >
                {updating ? 'Saving Decision...' : 'Save & Submit Official Status Decision'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplicationVerify;
