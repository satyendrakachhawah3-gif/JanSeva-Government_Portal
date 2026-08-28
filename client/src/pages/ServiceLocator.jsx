import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ServiceMap from '../components/map/ServiceMap';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Mail,
  Building2,
  Navigation
} from 'lucide-react';

const ServiceLocator = () => {
  const [offices, setOffices] = useState([]);
  const [district, setDistrict] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOffices = async () => {
    setLoading(true);
    try {
      const params = {};
      if (district !== 'All') params.district = district;
      if (search) params.search = search;

      const res = await API.get('/offices', { params });
      if (res.data.success) {
        setOffices(res.data.offices);
        if (res.data.offices.length > 0 && !selectedOffice) {
          setSelectedOffice(res.data.offices[0]);
        }
      }
    } catch (err) {
      console.error('[ServiceLocator] error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, [district]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-emerald-300">
              <MapPin className="w-3.5 h-3.5" /> Citizen Facilitation Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Government Service Center Locator
            </h1>
            <p className="text-xs text-slate-300">
              Locate nearby Citizen Facilitation Centers (CSC), Digital Seva Kendras, and District Welfare Offices.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search center by name, area, or department..."
              className="w-full text-xs bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5"
            />
          </div>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="text-xs bg-slate-50 border rounded-xl px-4 py-2.5 font-bold"
          >
            <option value="All">All Districts</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>

        {/* Map & Office List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Interactive React Leaflet Map (7 cols) */}
          <div className="lg:col-span-7">
            <ServiceMap
              offices={offices}
              selectedOffice={selectedOffice}
              onSelectOffice={(off) => setSelectedOffice(off)}
            />
          </div>

          {/* Right Office Cards List (5 cols) */}
          <div className="lg:col-span-5 space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500">Loading service centers...</div>
            ) : offices.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">No centers found for selected location.</div>
            ) : (
              offices.map((off) => (
                <div
                  key={off._id}
                  onClick={() => setSelectedOffice(off)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedOffice?._id === off._id
                      ? 'bg-orange-50/60 border-orange-400 shadow-md ring-2 ring-orange-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {off.type}
                  </span>
                  <h4 className="font-bold text-xs text-gov-navy mt-1">{off.name}</h4>
                  <p className="text-[11px] text-slate-600 mt-1">{off.address}</p>

                  <div className="pt-3 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Phone className="w-3 h-3 text-emerald-600" /> {off.contactNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" /> {off.openingHours}
                    </span>
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

export default ServiceLocator;
