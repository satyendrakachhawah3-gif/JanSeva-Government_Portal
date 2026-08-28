import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, CheckCircle2, AlertCircle, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const { user, profile, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    dob: '2002-08-14',
    gender: 'Female',
    state: 'Maharashtra',
    district: 'Pune',
    address: '',
    annualIncome: 180000,
    occupation: 'Student',
    education: 'Graduate',
    maritalStatus: 'Single',
    familySize: 4,
    casteCategory: 'General',
    isStudent: true,
    isFarmer: false,
    isDisability: false,
    isVeteran: false
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '2002-08-14',
        gender: profile.gender || 'Female',
        state: profile.state || 'Maharashtra',
        district: profile.district || 'Pune',
        address: profile.address || '',
        annualIncome: profile.annualIncome || 180000,
        occupation: profile.occupation || 'Student',
        education: profile.education || 'Graduate',
        maritalStatus: profile.maritalStatus || 'Single',
        familySize: profile.familySize || 4,
        casteCategory: profile.casteCategory || 'General',
        isStudent: profile.isStudent ?? true,
        isFarmer: profile.isFarmer ?? false,
        isDisability: profile.isDisability ?? false,
        isVeteran: profile.isVeteran ?? false
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await updateProfile(formData);
      if (res.success) {
        setMessage('Demographic profile updated successfully.');
      }
    } catch (err) {
      console.error('[ProfileSettings] update error:', err);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-gov-navy">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-extrabold text-gov-navy">
              Citizen Demographic Profile
            </h1>
            <p className="text-xs text-slate-500">
              Account Holder: <strong>{user?.name}</strong> ({user?.email})
            </p>
          </div>

          {message && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">State of Residence</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Annual Income (₹)</label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border rounded-xl p-3"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isStudent"
                  checked={formData.isStudent}
                  onChange={handleChange}
                  className="rounded text-gov-navy"
                />
                <span>Enrolled Student</span>
              </label>

              <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFarmer"
                  checked={formData.isFarmer}
                  onChange={handleChange}
                  className="rounded text-gov-navy"
                />
                <span>Registered Farmer</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-gov-navy text-white font-bold rounded-xl shadow flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Updating Profile...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettings;
