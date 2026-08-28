import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import StatusTimeline from '../components/tracking/StatusTimeline';
import {
  FileCheck,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowLeft,
  User,
  ShieldCheck
} from 'lucide-react';

const ApplicationTrack = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await API.get(`/applications/${id}`);
        if (res.data.success) {
          setApplication(res.data.application);
          setDocuments(res.data.documents || []);
        }
      } catch (err) {
        console.error('[ApplicationTrack] fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

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
        <h2 className="text-base font-bold text-slate-800">Application record not found.</h2>
        <Link to="/dashboard" className="mt-3 inline-block px-4 py-2 bg-gov-navy text-white text-xs font-bold rounded-xl">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back button */}
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-gov-navy">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Application Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-extrabold uppercase font-mono bg-orange-100 text-orange-800 px-3 py-1 rounded-full border border-orange-200">
                Application ID: {application.applicationId}
              </span>
              <h1 className="text-2xl font-extrabold text-gov-navy mt-2">
                {application.scheme?.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Department: {application.scheme?.department} • Category: {application.scheme?.category}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
                application.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                application.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                application.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {application.status}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">
                Submitted: {new Date(application.submittedAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

          {/* Visual Progress Timeline Component */}
          <StatusTimeline
            currentStatus={application.status}
            statusHistory={application.statusHistory}
          />
        </div>

        {/* Applicant Details & Document Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Submitted Applicant Details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
              Applicant Details
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Applicant Name</span>
                <span className="font-bold text-slate-800">{application.applicantDetails?.fullName || application.citizen?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Mobile</span>
                <span className="font-bold text-slate-800">{application.applicantDetails?.mobile || application.citizen?.mobile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">District / State</span>
                <span className="font-bold text-slate-800">{application.applicantDetails?.district}, {application.applicantDetails?.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">DBT Bank Account</span>
                <span className="font-mono font-bold text-slate-800">{application.applicantDetails?.bankAccountNo || 'Aadhaar Seeded'}</span>
              </div>
            </div>
          </div>

          {/* Verification Officer Remarks & Documents */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
              Uploaded Documents & Officer Remarks
            </h3>

            {application.officerRemarks && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <p className="font-bold text-gov-navy text-[11px] uppercase tracking-wider mb-0.5">Officer Remarks:</p>
                <p>{application.officerRemarks}</p>
              </div>
            )}

            <div className="space-y-2">
              {documents.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No document files attached.</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc._id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800">{doc.documentType}</p>
                        <p className="text-[10px] text-slate-400">{doc.fileName}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                      doc.verificationStatus === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.verificationStatus}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplicationTrack;
