import React from 'react';
import {
  PhoneCall,
  Mail,
  Globe,
  MapPin,
  ArrowUp,
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
    <footer id="contact" className="bg-[#02050a] text-slate-400 text-xs border-t border-sky-400/20">

      {/* Statutory & Emergency Strip (kept in footer per user preference) */}
      <div className="bg-gradient-to-r from-[#040b16] via-[#081d38] to-[#040b16] text-slate-200 border-b border-sky-400/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">

          <div className="flex items-center flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            <a
              href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
              className="flex items-center gap-1.5 text-sky-300 hover:text-white font-bold transition-colors font-mono tabular-nums"
            >
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>24x7 Helpline: {COMPANY_CREDENTIALS.helpline}</span>
            </a>
            <span className="hidden sm:inline text-sky-500/40">·</span>
            <a
              href={`mailto:${COMPANY_CREDENTIALS.email}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>{COMPANY_CREDENTIALS.email}</span>
            </a>
            <span className="hidden md:inline text-sky-500/40">·</span>
            <span className="font-mono text-slate-300 tabular-nums">
              LLPIN: <strong className="text-sky-300">{COMPANY_CREDENTIALS.llpin}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-xs font-semibold text-sky-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Jurisdiction: Delhi Only</span>
            </span>

            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Ambulance: 102 · Police: 112</span>
            </span>
          </div>

        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand & Corporate Intro */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400/20 via-[#07182d] to-black border border-sky-400/50 flex items-center justify-center p-1.5 shadow-lg shadow-sky-950/60 shrink-0">
                <CompanyLogo className="w-full h-full" withGlow />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight block font-display">
                  GLOBAL CARE LINK
                </span>
                <span className="text-[11px] font-bold text-sky-400 tracking-[0.22em] block uppercase">
                  SERVICES LLP
                </span>
              </div>
            </div>

            <p className="text-xs text-sky-300 font-semibold">
              &ldquo;{COMPANY_CREDENTIALS.tagline}&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier healthcare logistics &amp; emergency facilitation provider operating across the NCT of Delhi. Bridging patients with verified licensed hospitals, NABL labs, and ambulance providers under structured MOU protocols.
            </p>

            <div className="p-3.5 bg-[#060f1d] rounded-xl border border-sky-400/20 text-[11px] space-y-1.5 font-mono tabular-nums">
              <div className="text-slate-400 flex justify-between">
                <span>LLPIN</span>
                <span className="text-sky-200 font-bold">{COMPANY_CREDENTIALS.llpin}</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span>PAN</span>
                <span className="text-sky-200 font-bold">{COMPANY_CREDENTIALS.pan}</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span>TAN</span>
                <span className="text-sky-200 font-bold">{COMPANY_CREDENTIALS.tan}</span>
              </div>
            </div>
          </div>

          {/* Facilitation Services Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white font-display">
              12 Facilitation Services (MOU)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">24x7 Ambulance</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Doctor Appointments</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Pharmacy Refills</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Hospitalization Support</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Wellness Counseling</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Lab Test Bookings</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Home Care Attendants</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Physiotherapy via MOU</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Nursing Assistance</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Medical Equipment</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Health Checkups</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-sky-300 transition-colors">Telemedicine Support</a></li>
            </ul>

            <p className="pt-2 text-[11px] text-sky-300/80">
              All services provided exclusively by independent licensed third-party MOU partners.
            </p>
          </div>

          {/* Registered Office & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white font-display">
              Registered Office &amp; Contact
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {COMPANY_CREDENTIALS.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Customer Helpline: <strong className="font-mono text-sky-200">{COMPANY_CREDENTIALS.helpline}</strong>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_CREDENTIALS.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {COMPANY_CREDENTIALS.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-300">
                  {COMPANY_CREDENTIALS.website}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#060f1d] rounded-xl border border-sky-400/20 text-[11px] text-slate-300">
              <span className="text-sky-300 font-bold block mb-0.5">Territorial Jurisdiction</span>
              <span>Courts of Delhi Only · Emergency Direct: 102 / 112</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-black border-t border-sky-400/15 py-6 px-4 sm:px-6">
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
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3 h-3 text-sky-400" />
              <span>Capped Liability: ₹599</span>
            </span>

            <button
              onClick={scrollToTop}
              className="px-3 py-2 bg-[#07182d] hover:bg-sky-400 text-sky-200 hover:text-[#030914] border border-sky-400/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-bold"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase">Top</span>
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
