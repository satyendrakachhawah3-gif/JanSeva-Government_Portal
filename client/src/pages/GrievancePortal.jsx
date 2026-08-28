import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  HelpCircle,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  MessageSquare
} from 'lucide-react';

const GrievancePortal = () => {
  const { user, role } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Application Delay');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const endpoint = role === 'CITIZEN' ? '/grievances/my-grievances' : '/grievances';
      const res = await API.get(endpoint);
      if (res.data.success) {
        setGrievances(res.data.grievances);
      }
    } catch (err) {
      console.error('[GrievancePortal] error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await API.post('/grievances', {
        subject,
        category,
        description
      });

      if (res.data.success) {
        setMessage(`Grievance registered. Ticket ID: ${res.data.grievance.grievanceId}`);
        setSubject('');
        setDescription('');
        fetchGrievances();
      }
    } catch (err) {
      console.error('[SubmitGrievance] error:', err);
      setMessage('Failed to register grievance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-purple-300">
              <HelpCircle className="w-3.5 h-3.5" /> Public Grievance Redressal Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Central Grievance Portal (CPGRAMS Integrated)
            </h1>
            <p className="text-xs text-slate-300">
              File complaints regarding application delays, document issues, or officer service delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Submit Ticket (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
              Register New Grievance Ticket
            </h3>

            {message && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Issue Summary *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Delay in scholarship verification"
                  className="w-full bg-slate-50 border rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grievance Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                >
                  <option value="Application Delay">Application Delay</option>
                  <option value="Document Issue">Document Issue</option>
                  <option value="Technical Problem">Technical Problem</option>
                  <option value="Scheme Issue">Scheme Issue</option>
                  <option value="Officer Issue">Officer Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide complete details including application ID and timeline..."
                  className="w-full bg-slate-50 border rounded-xl p-3 focus:ring-2 focus:ring-gov-navy"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gov-navy text-white font-bold rounded-xl shadow hover:bg-gov-deep transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Registering Ticket...' : 'Submit Grievance Ticket'}
              </button>
            </form>
          </div>

          {/* Right Column: Grievances History (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-gov-navy uppercase tracking-wider border-b pb-2">
              Registered Grievances & Resolution Threads
            </h3>

            {loading ? (
              <div className="py-12 text-center">
                <div className="w-8 h-8 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin mx-auto mb-2"></div>
              </div>
            ) : grievances.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No active grievance tickets found.
              </div>
            ) : (
              <div className="space-y-4">
                {grievances.map((g) => (
                  <div key={g._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                          {g.grievanceId}
                        </span>
                        <h4 className="font-bold text-xs text-slate-800 mt-1">{g.subject}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        g.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {g.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>

                    {g.resolutionNotes && (
                      <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                        <p className="font-bold text-gov-navy text-[10px] uppercase">Officer Resolution Note:</p>
                        <p className="mt-0.5">{g.resolutionNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default GrievancePortal;
