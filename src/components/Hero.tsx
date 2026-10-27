import React from 'react';
import { 
  ShieldCheck, 
  Ambulance, 
  Building2, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Sparkles,
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
    <section id="home" className="relative bg-gradient-to-b from-[#0a192f] via-[#0d234a] to-[#0a192f] text-white pt-12 pb-20 overflow-hidden border-b border-amber-900/30">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle Glow Accents */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline, Statutory Marker & Refer Badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400">
              <span className="bg-amber-400/10 text-amber-300 px-3 py-1 rounded-md border border-amber-400/20 font-semibold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {COMPANY_CREDENTIALS.tagline}
              </span>
              
              {onOpenReferModal && (
                <button
                  type="button"
                  onClick={onOpenReferModal}
                  className="bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>✨ Refer &amp; Earn: Upto ₹200 (Partner Program)</span>
                </button>
              )}

              <span className="text-slate-400 font-mono">
                LLPIN: {COMPANY_CREDENTIALS.llpin}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance font-display">
              Comprehensive Healthcare & Emergency Facilitation at Just{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                ₹599 / Year
              </span>
            </h1>

            {/* Subheading with explicit MOU partner disclosure */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Unlock dedicated 24x7 emergency coordination and seamless access to <strong className="text-white font-semibold">12 core healthcare facilitation services</strong> across Delhi NCR. Powered exclusively by verified, licensed MOU partners with zero hassle.
            </p>

            {/* 3 Key Facilitation Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24x7 Ambulance Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>MOU Partner Discounts</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dual-Sided Digital Card</span>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenApplyModal}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-[#0a192f] font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Enroll Now @ ₹599</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 hover:border-amber-400/40 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 12 Services</span>
              </button>

              <a
                href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                className="px-4 py-3.5 text-amber-300 hover:text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ml-auto sm:ml-0"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>{COMPANY_CREDENTIALS.helpline}</span>
              </a>
            </div>

            {/* Quick Card Verification bar */}
            <div className="pt-4 border-t border-slate-800/80 max-w-xl">
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Already a cardholder? Instant Status Verification:
              </span>
              <form onSubmit={handleQuickSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Card No. (e.g. ADC-8783-001)"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Verify Now
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Official Company Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg">
              {/* Decorative outer glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-blue-500 rounded-2xl blur-md opacity-30" />
              
              <div className="relative bg-[#081b36] border border-[#d4af37]/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
                
                {/* Header label */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                  <div className="flex items-center gap-2.5">
                    <CompanyLogo className="w-7 h-7" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                        OFFICIAL CUSTOMER CARD
                      </h3>
                      <p className="text-[10px] text-amber-400 font-mono">
                        Valid Across All 12 MOU Facilitation Services
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#071933] bg-[#ffd966] px-2.5 py-0.5 rounded shadow">
                    Rs 599 / YR
                  </span>
                </div>

                {/* THE OFFICIAL CARD PREVIEW */}
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

                {/* Instant Action Prompt */}
                <div className="pt-1">
                  <button
                    onClick={onOpenApplyModal}
                    className="w-full py-3 bg-gradient-to-r from-[#ffd966] via-[#f3c64a] to-[#d4af37] hover:from-[#f3c64a] hover:to-[#ffd966] text-[#071933] font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Your Official Card in 2 Minutes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Instant Digital Issuance · Maximum Capped Liability: ₹599</span>
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Statutory Trust Strip Below Hero */}
        <div className="mt-16 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-white block">LLP Incorporated</span>
              <span className="text-slate-400 text-[11px]">Govt. of India MCA Registered</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Ambulance className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-white block">24x7 Ambulance Coordination</span>
              <span className="text-slate-400 text-[11px]">Rapid emergency desk response</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-white block">Verified MOU Partners</span>
              <span className="text-slate-400 text-[11px]">Hospitals, Labs & Clinics</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-white block">100% Capped Liability</span>
              <span className="text-slate-400 text-[11px]">Strict ₹599 cardholder protection</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
