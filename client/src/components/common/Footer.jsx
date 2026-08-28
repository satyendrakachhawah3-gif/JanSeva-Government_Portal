import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gov-navy text-slate-300 pt-12 pb-8 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
          
          {/* Col 1: Vision & Emblem */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">JanSeva AI</h3>
                <p className="text-xs text-orange-400 font-semibold">Government Service & Schemes Portal</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Indian citizens through unified AI-driven scheme discovery, automated eligibility evaluation, and digital application tracking.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Data Protection & Privacy Compliant</span>
            </div>
          </div>

          {/* Col 2: Key Scheme Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Scheme Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/schemes?category=Education" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • Education & Scholarships
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Agriculture" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • Agriculture & Farmers
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Women+%26+Child+Welfare" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • Women & Child Welfare
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Health" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • Ayushman Health Cover
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Housing" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • PMAY Urban & Rural Housing
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=Disability+Support" className="hover:text-orange-400 transition flex items-center gap-1.5">
                  • Divyangjan Disability Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Tools */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Citizen Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/recommendations" className="hover:text-cyan-300 transition flex items-center gap-1.5">
                  • AI Scheme Recommendation Engine
                </Link>
              </li>
              <li>
                <Link to="/eligibility-checker" className="hover:text-cyan-300 transition flex items-center gap-1.5">
                  • Interactive 6-Step Eligibility Wizard
                </Link>
              </li>
              <li>
                <Link to="/service-locator" className="hover:text-cyan-300 transition flex items-center gap-1.5">
                  • Citizen Service Centers Map
                </Link>
              </li>
              <li>
                <Link to="/grievances" className="hover:text-cyan-300 transition flex items-center gap-1.5">
                  • Public Grievance Redressal
                </Link>
              </li>
              <li>
                <a href="https://myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition flex items-center gap-1.5">
                  • National myScheme Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Helpline */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              Public Facilitation Desk
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Toll-Free National Helpline</p>
                  <p className="text-slate-400">1800-111-222 / 1800-425-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Citizen Support Email</p>
                  <p className="text-slate-400">support@janseva.gov.in</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central Portal Secretariat</p>
                  <p className="text-slate-400">CGO Complex, Lodhi Road, New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 JanSeva AI Platform. Designed for Indian Digital Public Infrastructure.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
