import React from 'react';
import {
  ShieldCheck,
  Ambulance,
  Building2,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileCheck2
} from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';

interface HeroProps {
  onOpenApplyModal: () => void;
  onExploreServices: () => void;
  onQuickVerify: (cardNo: string) => void;
  onOpenReferModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenApplyModal,
  onExploreServices,
  onQuickVerify,
  onOpenReferModal
}) => {
  const [quickSearch, setQuickSearch] = React.useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onQuickVerify(quickSearch.trim());
    }
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#03070e] via-[#081d38] to-[#040912] text-white pt-14 pb-20 overflow-hidden border-b border-sky-400/20"
    >
      {/* Subtle Sky-Blue Atmospheric Glows */}
      <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">

            {/* Clean Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-sky-300 font-semibold">
              <span>{COMPANY_CREDENTIALS.tagline}</span>
              <span aria-hidden="true" className="text-sky-500/60">·</span>
              <span className="font-mono text-slate-300 tabular-nums">
                LLPIN {COMPANY_CREDENTIALS.llpin}
              </span>
              {onOpenReferModal && (
                <>
                  <span aria-hidden="true" className="text-sky-500/60">·</span>
                  <button
                    type="button"
                    onClick={onOpenReferModal}
                    className="text-sky-300 hover:text-white underline underline-offset-4 decoration-sky-400/60 transition-colors cursor-pointer"
                  >
                    Refer &amp; Earn Upto ₹200
                  </button>
                </>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.1] font-display">
              Comprehensive Healthcare &amp; Emergency Facilitation at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">
                ₹599 / Year
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Dedicated 24x7 emergency coordination and direct access to{' '}
              <strong className="text-white font-semibold">12 core healthcare facilitation services</strong>{' '}
              across Delhi NCR — delivered exclusively through verified, licensed MOU partners.
            </p>

            {/* 3 Key Facilitation Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>24x7 Ambulance Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>MOU Partner Discounts</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Instant Digital Card</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenApplyModal}
                className="px-7 py-3.5 bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 hover:from-sky-200 hover:to-sky-300 text-[#030914] font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-sky-500/30 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Enroll Now @ ₹599</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 bg-black/60 hover:bg-sky-950/70 text-sky-100 font-semibold text-sm sm:text-base rounded-xl border border-sky-400/35 hover:border-sky-300/70 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 12 Services</span>
              </button>

              <a
                href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                className="px-3 py-3 text-sky-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors font-mono tabular-nums"
              >
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <span>{COMPANY_CREDENTIALS.helpline}</span>
              </a>
            </div>

            {/* Quick Card Verification Bar */}
            <div className="pt-5 border-t border-sky-400/15 max-w-xl">
              <span className="text-xs text-sky-200/80 block mb-2.5 font-medium">
                Already a cardholder? Instant Status Verification
              </span>
              <form onSubmit={handleQuickSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Card No. (e.g. ADC-8783-001)"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-black/70 border border-sky-400/30 focus:border-sky-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-400 hover:bg-sky-300 text-[#030914] text-xs sm:text-sm font-extrabold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  Verify Now
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Official Company Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-600 rounded-2xl blur-md opacity-25 pointer-events-none" />

              <div className="relative bg-gradient-to-b from-[#081b33] to-[#040912] border border-sky-400/35 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">

                <div className="flex items-center justify-between pb-3 border-b border-sky-400/20">
                  <div className="flex items-center gap-3">
                    <CompanyLogo className="w-9 h-9" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide font-display">
                        Official Customer Card
                      </h3>
                      <p className="text-[11px] text-sky-300 font-medium">
                        Valid Across All 12 MOU Facilitation Services
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-sky-300 tabular-nums">
                    ₹599 / YR
                  </span>
                </div>

                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <OfficialCompanyCard
                    data={{
                      cardNumber: 'ADC-8783-001',
                      customerName: 'Rahul Sharma',
                      customerMobile: '+91 7290835403',
                      dateOfIssue: '05/10/2026',
                      validity: '04/10/2027'
                    }}
                  />
                </div>

                <div className="pt-1">
                  <button
                    onClick={onOpenApplyModal}
                    className="w-full py-3 bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 hover:from-sky-200 hover:to-sky-300 text-[#030914] font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Your Official Card in 2 Minutes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-sky-400" />
                    <span>Instant Digital Issuance · Maximum Capped Liability: ₹599</span>
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Statutory Trust Strip Below Hero */}
        <div className="mt-16 pt-8 border-t border-sky-400/15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-4 sky-black-card rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-400/25 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-white block font-display">LLP Incorporated</span>
              <span className="text-slate-400 text-xs">Govt. of India MCA Registered</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 sky-black-card rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-400/25 flex items-center justify-center shrink-0">
              <Ambulance className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-white block font-display">24x7 Ambulance Desk</span>
              <span className="text-slate-400 text-xs">Rapid emergency coordination</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 sky-black-card rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-400/25 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-white block font-display">Verified MOU Partners</span>
              <span className="text-slate-400 text-xs">Hospitals, Labs &amp; Clinics</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 sky-black-card rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-400/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <span className="font-bold text-white block font-display">Capped Liability</span>
              <span className="text-slate-400 text-xs">Strict ₹599 member protection</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
