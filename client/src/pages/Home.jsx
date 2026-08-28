import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Clock
} from 'lucide-react';
import JanSevaAssistant from '../components/ai/JanSevaAssistant';

const Home = () => {
  const categories = [
    { name: 'Education & Higher Studies', count: '45+ Schemes', icon: '🎓', color: 'from-blue-500/10 to-indigo-500/10 text-blue-700' },
    { name: 'Agriculture & Farmers Welfare', count: '38+ Schemes', icon: '🌾', color: 'from-emerald-500/10 to-green-500/10 text-emerald-700' },
    { name: 'Women & Child Development', count: '52+ Schemes', icon: '👩‍👧', color: 'from-pink-500/10 to-rose-500/10 text-rose-700' },
    { name: 'Health & Medical Cover', count: '30+ Schemes', icon: '🏥', color: 'from-cyan-500/10 to-teal-500/10 text-teal-700' },
    { name: 'Housing & Urban Development', count: '24+ Schemes', icon: '🏠', color: 'from-amber-500/10 to-orange-500/10 text-amber-700' },
    { name: 'Employment & MSME Loans', count: '60+ Schemes', icon: '💼', color: 'from-purple-500/10 to-violet-500/10 text-purple-700' },
    { name: 'Divyangjan Disability Support', count: '20+ Schemes', icon: '♿', color: 'from-sky-500/10 to-blue-500/10 text-sky-700' },
    { name: 'Senior Citizens Welfare', count: '18+ Schemes', icon: '🧓', color: 'from-orange-500/10 to-amber-500/10 text-orange-700' }
  ];

  const steps = [
    { step: '01', title: 'Fill Demographics', desc: 'Enter basic profile info like income, age, state, and occupation.' },
    { step: '02', title: 'AI Match Evaluation', desc: 'Our engine instantly calculates percentage match & why you qualify.' },
    { step: '03', title: '1-Click Application', desc: 'Upload required documents in digital vault format.' },
    { step: '04', title: 'Track & Disburse', desc: 'Real-time timeline tracking with direct DBT bank release.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gov-navy via-gov-deep to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle background glow graphics */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Next-Gen AI Digital India Public Infrastructure</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Government Schemes, <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover government welfare schemes you may qualify for, evaluate eligibility instantly with AI, apply online with digital document uploads, and track status in real-time.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/recommendations"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl hover:shadow-orange-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                Find Schemes For Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/schemes"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-300" />
                Browse All Schemes
              </Link>
            </div>

            {/* Trust metrics */}
            <div className="pt-6 border-t border-slate-700/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">500+</p>
                <p className="text-xs text-slate-400">Verified Schemes</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-400">100%</p>
                <p className="text-xs text-slate-400">DBT Direct Transfer</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">24/7</p>
                <p className="text-xs text-slate-400">AI Assistance</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Hero Interactive Visual / Animated Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Dashboard Visual Container */}
            <div className="relative bg-gradient-to-tr from-slate-900 to-gov-navy border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
              
              {/* Top Banner Card */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    88%
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">PM Scholarship Match</h4>
                    <p className="text-[10px] text-slate-400">Higher Education Dept.</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded">
                  Potentially Eligible
                </span>
              </div>

              {/* Middle Floating Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white/95 text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-2 py-0.5 rounded uppercase">
                      Application ID: JS-2026-89412
                    </span>
                    <h5 className="font-bold text-xs text-gov-navy mt-1">Status: Under Review</h5>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full w-3/4"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">
                  Document Verified by Officer • Final Disbursal Pending
                </p>
              </motion.div>

              {/* Bottom Quick Feature Pill */}
              <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <p className="text-xs text-slate-300">
                  DigiLocker ready • Zero physical office visits needed
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* SCHEME CATEGORIES SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-navy tracking-tight">
            Explore Government Schemes by Sector
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Browse tailored welfare benefits across key public administration departments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/schemes?category=${encodeURIComponent(cat.name.split(' ')[0])}`}
              className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-gov-card hover:shadow-gov-hover transition-all group"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-sm text-slate-800 group-hover:text-orange-600 transition">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
              Seamless Citizen Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-3">
              How JanSeva AI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group hover:border-gov-navy transition">
                <span className="text-3xl font-black text-slate-300 group-hover:text-orange-500 transition">
                  {s.step}
                </span>
                <h4 className="font-bold text-base text-gov-navy mt-3">{s.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ASSISTANT EMBEDDED DEMO & DISCLAIMER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
              Instant AI Public Assistant
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-navy">
              Have Questions About Scheme Eligibility?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our <strong>JanSeva Assistant</strong> utilizes a RAG architecture index over official scheme documents to answer document queries, application guidelines, and target beneficiary criteria.
            </p>
            <div className="space-y-2 text-xs text-slate-700 font-medium pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Multi-lingual scheme query support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Official citation links for every answer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% transparent eligibility disclaimer</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <JanSevaAssistant embedded={true} />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
