import React from 'react';
import { CheckCircle2, Clock, FileCheck, XCircle, AlertCircle } from 'lucide-react';

const StatusTimeline = ({ currentStatus, statusHistory = [] }) => {
  const steps = [
    { key: 'SUBMITTED', label: 'Application Submitted' },
    { key: 'DOCUMENTS_VERIFIED', label: 'Documents Verified' },
    { key: 'UNDER_REVIEW', label: 'Under Officer Review' },
    { key: 'APPROVED', label: 'Approved / Disbursed' }
  ];

  const isRejected = currentStatus === 'REJECTED';
  const isActionRequired = currentStatus === 'ACTION_REQUIRED';

  const getStepStatus = (stepKey) => {
    if (isRejected && stepKey === 'APPROVED') return 'rejected';
    
    const statusOrder = ['SUBMITTED', 'DOCUMENTS_VERIFIED', 'UNDER_REVIEW', 'APPROVED'];
    const currentIndex = statusOrder.indexOf(currentStatus === 'ACTION_REQUIRED' ? 'DOCUMENTS_VERIFIED' : currentStatus);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="py-6">
      {/* Horizontal Step Line */}
      <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

        {steps.map((step, idx) => {
          const state = getStepStatus(step.key);

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  state === 'completed'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : state === 'current'
                    ? 'bg-gov-navy text-white ring-4 ring-orange-200 shadow-lg scale-110'
                    : state === 'rejected'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {state === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : state === 'rejected' ? (
                  <XCircle className="w-5 h-5" />
                ) : state === 'current' ? (
                  <Clock className="w-5 h-5 animate-spin-slow" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              <span
                className={`mt-2 text-xs font-semibold text-center max-w-[100px] ${
                  state === 'completed'
                    ? 'text-emerald-700 font-bold'
                    : state === 'current'
                    ? 'text-gov-navy font-extrabold'
                    : state === 'rejected'
                    ? 'text-rose-600 font-bold'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rejection / Action Alert Badge */}
      {isRejected && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-3">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <p className="font-bold">Application Status: Rejected</p>
            <p className="mt-0.5">Please check officer remarks for details or submit a grievance ticket.</p>
          </div>
        </div>
      )}

      {isActionRequired && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold">Additional Document Action Required</p>
            <p className="mt-0.5">The verification officer has requested a re-upload or clarification for uploaded documents.</p>
          </div>
        </div>
      )}

      {/* Detailed Status Log */}
      {statusHistory.length > 0 && (
        <div className="mt-8 border-t border-slate-200 pt-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Verification Activity Log
          </h4>
          <div className="space-y-2">
            {statusHistory.map((h, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{h.status}</span>
                  <span className="text-slate-500">— {h.remarks}</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(h.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
