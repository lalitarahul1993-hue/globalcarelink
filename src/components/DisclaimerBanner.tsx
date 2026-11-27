import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

export const DisclaimerBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#03070e] via-[#07182d] to-[#03070e] border-y border-sky-400/20 py-12 px-4 sm:px-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="sky-black-card border border-sky-400/35 rounded-2xl p-6 sm:p-8 shadow-xl">

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-black/70 border border-sky-400/45 p-1.5 flex items-center justify-center shrink-0">
              <CompanyLogo className="w-full h-full" withGlow />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white font-display flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Important Legal &amp; Regulatory Disclaimer</span>
                </h3>
                <span className="text-xs font-mono font-semibold text-sky-300">
                  Jurisdiction: Delhi Only
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/55 p-4 rounded-xl border border-sky-400/20">
                <strong className="text-sky-300">Disclaimer:</strong> Global Care Link Services LLP is a facilitation service provider only and is <strong className="text-white">NOT</strong> a Hospital, Diagnostic Lab, Pharmacy, or Third Party Administrator (TPA). All medical services, treatments, and tests are provided exclusively by independent licensed MOU partners. No guarantee for bed availability, insurance claims, cure, loans, or medical visas. Maximum liability is capped at ₹599. In case of critical emergency, dial 102 / 112 directly. Legal Jurisdiction: Delhi Only.
              </p>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3 pt-1">
                <span className="font-mono tabular-nums">
                  LLPIN: {COMPANY_CREDENTIALS.llpin} · PAN: {COMPANY_CREDENTIALS.pan}
                </span>
                <div className="flex items-center gap-3">
                  <span>For emergency escalation:</span>
                  <a
                    href="tel:102"
                    className="font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
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
