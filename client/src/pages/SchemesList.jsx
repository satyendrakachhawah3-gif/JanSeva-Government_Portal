import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../services/api';
import {
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Building2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const SchemesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState('All States');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Education',
    'Agriculture',
    'Employment',
    'Women & Child Welfare',
    'Health',
    'Housing',
    'Financial Assistance',
    'Entrepreneurship',
    'Senior Citizens',
    'Disability Support',
    'Social Welfare'
  ];

  const states = [
    'All States',
    'All India',
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Gujarat',
    'Uttar Pradesh',
    'Tamil Nadu'
  ];

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedState !== 'All States') params.state = selectedState;

      const res = await API.get('/schemes', { params });
      if (res.data.success) {
        setSchemes(res.data.schemes);
      }
    } catch (err) {
      console.error('[SchemesList] error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedState]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSchemes();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title & Search Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Public Directory
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-2">
                Government Welfare Schemes Repository
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Explore official national and state public welfare schemes available for application.
              </p>
            </div>

            <Link
              to="/recommendations"
              className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              AI Profile Match Scan
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search government schemes by name, department, or benefits..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-gov-navy focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-gov-navy text-white text-xs font-bold rounded-xl shadow hover:bg-gov-deep transition"
            >
              Search
            </button>
          </form>

          {/* Category Pills Slider */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-t border-slate-100 pt-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-gov-navy text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div>
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-semibold text-slate-600">Loading government schemes...</p>
            </div>
          ) : schemes.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No matching schemes found</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your filters or searching with different keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedState('All States');
                  setSearch('');
                }}
                className="mt-4 px-4 py-2 bg-slate-100 text-xs font-bold text-gov-navy rounded-xl hover:bg-slate-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((s) => (
                <div
                  key={s._id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-gov-card hover:shadow-gov-hover transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                        {s.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {s.state}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-gov-navy leading-snug hover:text-orange-600 transition">
                      <Link to={`/schemes/${s._id}`}>{s.name}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      Department: <strong className="text-slate-700">{s.department}</strong>
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Scheme Highlights & Action */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-[11px] text-slate-500 font-medium space-y-1">
                      <p className="flex items-center gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Income limit: ₹{Number(s.eligibilityCriteria?.maxIncome || 0).toLocaleString('en-IN')}/yr</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        to={`/schemes/${s._id}`}
                        className="flex-1 py-2.5 bg-gov-navy hover:bg-gov-deep text-white text-xs font-bold rounded-xl text-center shadow transition"
                      >
                        View Full Details
                      </Link>

                      <Link
                        to={`/apply/${s._id}`}
                        className="px-3.5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl text-center shadow transition"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SchemesList;
