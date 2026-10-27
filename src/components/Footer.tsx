import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  Globe, 
  MapPin, 
  ArrowUp, 
  Heart, 
  Lock,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050e1c] text-slate-400 text-xs border-t border-slate-800">
      
      {/* Prominent Statutory & Emergency Dispatch Strip (Moved from Top) */}
      <div className="bg-[#071324] text-slate-200 border-b border-amber-900/40 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Helpline, Email & LLPIN */}
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-4">
            <a 
              href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>24x7 Customer Helpline: {COMPANY_CREDENTIALS.helpline}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">·</span>
            <a 
              href={`mailto:${COMPANY_CREDENTIALS.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>{COMPANY_CREDENTIALS.email}</span>
            </a>
            <span className="hidden md:inline text-slate-600">·</span>
            <span className="font-mono text-slate-300">
              LLPIN: <strong className="text-amber-400">{COMPANY_CREDENTIALS.llpin}</strong>
            </span>
          </div>

          {/* Delhi Only & Emergency Numbers */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-[11px] font-semibold tracking-wide text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/60 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Jurisdiction: Courts of Delhi Only</span>
            </span>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800/60">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Ambulance: 102 · Police: 112</span>
            </div>
          </div>

        </div>
      </div>

      {/* Upper Footer: Brand, Services, Credentials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Corporate Intro (Col 1 - 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#071324] via-[#0a192f] to-[#16386d] border border-amber-400/50 flex items-center justify-center p-2 shadow-lg shadow-amber-950/40">
                <CompanyLogo className="w-10 h-10" withGlow />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight block">
                  GLOBAL CARE LINK
                </span>
                <span className="text-[10px] font-bold text-amber-400 tracking-widest block uppercase">
                  SERVICES LLP
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-300 font-semibold italic">
              &ldquo;{COMPANY_CREDENTIALS.tagline}&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier healthcare logistics & emergency facilitation provider operating across the NCT of Delhi. Bridging patients with verified licensed hospitals, NABL labs, and ambulance providers under structured MOU protocols.
            </p>

            {/* Quick Badge */}
            <div className="p-3 bg-[#091629] rounded-xl border border-slate-800 text-[11px] space-y-1">
              <div className="text-slate-300 flex justify-between font-mono">
                <span>LLPIN:</span>
                <span className="text-white font-bold">{COMPANY_CREDENTIALS.llpin}</span>
              </div>
              <div className="text-slate-300 flex justify-between font-mono">
                <span>PAN:</span>
                <span className="text-white font-bold">{COMPANY_CREDENTIALS.pan}</span>
              </div>
              <div className="text-slate-300 flex justify-between font-mono">
                <span>TAN:</span>
                <span className="text-white font-bold">{COMPANY_CREDENTIALS.tan}</span>
              </div>
            </div>
          </div>

          {/* Facilitation Services (Col 5 - 7) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              12 Facilitation Services (MOU)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">24x7 Ambulance</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Doctor Appointments</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Pharmacy Refills</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Hospitalization Support</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Wellness Counseling</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Lab Test Bookings</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Home Care Attendants</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Physiotherapy via MOU</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Nursing Assistance</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Medical Equipment</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Health Checkups</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Telemedicine Support</a></li>
            </ul>

            <div className="pt-2 text-[11px] text-amber-400/90 italic">
              All services provided exclusively by independent licensed third-party MOU partners.
            </div>
          </div>

          {/* Contact & Registered Office (Col 8 - 12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Registered Office & Contact
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {COMPANY_CREDENTIALS.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Customer Helpline: <strong>{COMPANY_CREDENTIALS.helpline}</strong>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`mailto:${COMPANY_CREDENTIALS.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {COMPANY_CREDENTIALS.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">
                  {COMPANY_CREDENTIALS.website}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#0a192f] rounded-xl border border-slate-800 text-[11px] text-slate-300">
              <span className="text-amber-400 font-bold block mb-0.5">Territorial Jurisdiction:</span>
              <span>Courts of Delhi Only · Emergency Direct: 102 / 112</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer: Statutory Notes, Copyright & Back to Top */}
      <div className="bg-[#030914] border-t border-slate-900 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          
          <div className="text-center sm:text-left text-slate-500 space-y-0.5">
            <p>
              © 2026 <strong className="text-slate-300">{COMPANY_CREDENTIALS.name}</strong>. All rights reserved.
            </p>
            <p>
              Incorporated on 05 October 2026 under the Limited Liability Partnership Act, 2008. LLPIN: {COMPANY_CREDENTIALS.llpin}.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Capped Liability: ₹599</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold">Top</span>
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
