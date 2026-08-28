import React, { useState, useEffect } from 'react';
import API from '../services/api';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Search,
  X,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSchemeManage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    category: 'Education',
    state: 'All India',
    targetBeneficiaries: 'All Citizens',
    description: '',
    benefitsText: '',
    requiredDocsText: '',
    minAge: 18,
    maxAge: 70,
    maxIncome: 500000,
    officialUrl: 'https://myscheme.gov.in',
    status: 'PUBLISHED'
  });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await API.get('/schemes?status=PUBLISHED');
      if (res.data.success) {
        setSchemes(res.data.schemes);
      }
    } catch (err) {
      console.error('[AdminSchemeManage] error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateScheme = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        benefits: formData.benefitsText.split('\n').filter(Boolean),
        requiredDocuments: formData.requiredDocsText.split('\n').filter(Boolean),
        eligibilityCriteria: {
          minAge: Number(formData.minAge),
          maxAge: Number(formData.maxAge),
          maxIncome: Number(formData.maxIncome)
        }
      };

      const res = await API.post('/schemes', payload);
      if (res.data.success) {
        setIsModalOpen(false);
        fetchSchemes();
      }
    } catch (err) {
      console.error('[CreateScheme] error:', err);
    }
  };

  const handleDeleteScheme = async (id) => {
    if (!window.confirm('Are you sure you want to archive this scheme?')) return;
    try {
      await API.delete(`/schemes/${id}`);
      fetchSchemes();
    } catch (err) {
      console.error('[DeleteScheme] error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link to="/admin-portal" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-gov-navy mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Admin Overview
            </Link>
            <h1 className="text-2xl font-extrabold text-gov-navy">
              Government Scheme Catalog Governance
            </h1>
            <p className="text-xs text-slate-500">
              Publish, update, and maintain official government scheme guidelines and parameters.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-300" /> Add New Scheme
          </button>
        </div>

        {/* Schemes Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin mx-auto mb-2"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Scheme Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">State</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schemes.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-orange-600">{s.code}</td>
                      <td className="p-3 font-bold text-slate-800">{s.name}</td>
                      <td className="p-3">{s.department}</td>
                      <td className="p-3">{s.category}</td>
                      <td className="p-3">{s.state}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteScheme(s._id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Archive Scheme"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ADD SCHEME MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-base text-gov-navy">Add New Government Welfare Scheme</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateScheme} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Scheme Name *</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Scheme Code (Unique) *</label>
                    <input
                      type="text"
                      required
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g. SCH-EDU-099"
                      className="w-full bg-slate-50 border rounded-xl p-2.5 uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department *</label>
                    <input
                      type="text"
                      required
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border rounded-xl p-2.5"
                    >
                      <option value="Education">Education</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Employment">Employment</option>
                      <option value="Women & Child Welfare">Women & Child Welfare</option>
                      <option value="Health">Health</option>
                      <option value="Housing">Housing</option>
                      <option value="Disability Support">Disability Support</option>
                      <option value="Senior Citizens">Senior Citizens</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Scheme Description *</label>
                  <textarea
                    rows={3}
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Benefits List (One per line)</label>
                  <textarea
                    rows={3}
                    name="benefitsText"
                    value={formData.benefitsText}
                    onChange={handleChange}
                    placeholder="Monthly stipend of ₹2500&#10;Aadhaar linked DBT"
                    className="w-full bg-slate-50 border rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Documents (One per line)</label>
                  <textarea
                    rows={3}
                    name="requiredDocsText"
                    value={formData.requiredDocsText}
                    onChange={handleChange}
                    placeholder="Aadhaar Card&#10;Income Certificate"
                    className="w-full bg-slate-50 border rounded-xl p-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gov-navy text-white font-bold rounded-xl shadow"
                >
                  Publish Scheme to Repository
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminSchemeManage;
