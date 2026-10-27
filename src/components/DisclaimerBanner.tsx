import React from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall } from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

export const DisclaimerBanner: React.FC = () => {
  return (
    <section className="bg-amber-50/70 border-y border-amber-300/80 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border-2 border-amber-400 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0a192f] border border-amber-400/50 p-2 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <CompanyLogo className="w-10 h-10" withGlow />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-amber-950 font-display flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important Legal & Regulatory Disclaimer</span>
                </h3>
                <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded border border-amber-300">
                  Jurisdiction: Delhi Only
                </span>
              </div>

              {/* Exact Mandated Statutory Disclaimer Copy */}
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                <strong>Disclaimer:</strong> Global Care Link Services LLP is a facilitation service provider only and is <strong>NOT</strong> a Hospital, Diagnostic Lab, Pharmacy, or Third Party Administrator (TPA). All medical services, treatments, and tests are provided exclusively by independent licensed MOU partners. No guarantee for bed availability, insurance claims, cure, loans, or medical visas. Maximum liability is capped at ₹599. In case of critical emergency, dial 102 / 112 directly. Legal Jurisdiction: Delhi Only.
              </p>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3 pt-1">
                <span className="font-mono">
                  LLPIN: {COMPANY_CREDENTIALS.llpin} · PAN: {COMPANY_CREDENTIALS.pan}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600">For emergency escalation:</span>
                  <a
                    href="tel:102"
                    className="font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial 102 (National Ambulance)</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
