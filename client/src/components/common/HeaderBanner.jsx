import React from 'react';
import { ShieldCheck, Phone, Info, Globe } from 'lucide-react';

const HeaderBanner = () => {
  return (
    <div>
      {/* Tricolor top border */}
      <div className="tricolor-bar"></div>
      
      {/* Official Government Utility Header */}
      <div className="bg-gov-navy text-slate-200 text-xs py-1.5 px-4 border-b border-slate-700/50">
        <div className="max-w-7xl mx-mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Government of India • Unified Public Digital Service Portal
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Info className="w-3 h-3 text-cyan-400" />
              AI Recommendations are informational. Always verify with official departments.
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-green-400" />
              <span>Toll Free Helpline: <strong>1800-111-222</strong></span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer transition">
              <Globe className="w-3 h-3" />
              <span>English (IN)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
