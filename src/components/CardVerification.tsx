import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MapPin, 
  PhoneCall, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { MOCK_MEMBERS, COMPANY_CREDENTIALS } from '../data/servicesData';
import { MemberRecord } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';

interface CardVerificationProps {
  initialSearch?: string;
  customMembers?: MemberRecord[];
}

export const CardVerification: React.FC<CardVerificationProps> = ({ 
  initialSearch = '', 
  customMembers = [] 
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [verifiedRecord, setVerifiedRecord] = useState<MemberRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Combine default members with any dynamically created ones
  const allMembers = [...MOCK_MEMBERS, ...customMembers];

  const handleSearch = (query: string) => {
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      const match = allMembers.find(
        m => m.cardNumber.toUpperCase() === trimmed ||
             m.mobile.replace(/\s+/g, '').includes(trimmed.replace(/\s+/g, ''))
      );
      setVerifiedRecord(match || null);
      setIsSearching(false);
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleTestCardClick = (num: string) => {
    setSearchInput(num);
    handleSearch(num);
  };

  return (
    <section id="verify-card" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md mb-3 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time Member Verification Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Verify Healthcare Card & Validity
          </h2>
          
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Hospitals, labs, ambulance operators, and members can authenticate active facilitation status, membership validity, and jurisdiction compliance instantly.
          </p>
        </div>

        {/* Verification Card Box */}
        <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Enter Card Number or Registered Mobile Number
            </label>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. ADC-8783-001 or GCL-2026-9042"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 focus:border-amber-500 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none shadow-2xs font-mono font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-slate-900 hover:bg-[#0a192f] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50 whitespace-nowrap"
              >
                {isSearching ? 'Verifying...' : 'Check Status'}
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-filled Cards */}
          <div className="mt-4 pt-4 border-t border-slate-200/80">
            <span className="text-xs text-slate-500 block mb-2 font-medium">
              Click to test with sample active records:
            </span>
            <div className="flex flex-wrap gap-2">
              {MOCK_MEMBERS.map((m) => (
                <button
                  key={m.cardNumber}
                  type="button"
                  onClick={() => handleTestCardClick(m.cardNumber)}
                  className="px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{m.cardNumber} ({m.fullName.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Verification Results View */}
          {hasSearched && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              {verifiedRecord ? (
                /* Found Record */
                <div className="bg-white border-2 border-emerald-500/40 rounded-xl p-6 shadow-sm space-y-5 animate-in fade-in duration-300">
                  
                  {/* Status Banner */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <CompanyLogo className="w-10 h-10" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                            AUTHENTICATION SUCCESSFUL
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900">
                          Active & Verified Healthcare Card
                        </h4>
                      </div>
                    </div>
                    
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md border border-emerald-300 uppercase">
                      {verifiedRecord.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block text-[11px]">Cardholder Full Name</span>
                      <span className="text-sm font-bold text-slate-900">{verifiedRecord.fullName}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block text-[11px]">Card Number / ID</span>
                      <span className="text-sm font-bold text-amber-700 font-mono">{verifiedRecord.cardNumber}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Validity Period</span>
                      </span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {verifiedRecord.issueDate} to {verifiedRecord.validTill}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-slate-500 block text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Registered Territory</span>
                      </span>
                      <span className="font-semibold text-slate-800">{verifiedRecord.jurisdiction}</span>
                    </div>
                  </div>

                  {/* Entitlement Banner */}
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-xs">
                    <span className="text-amber-900 font-bold block mb-0.5">
                      Entitlement Coverage:
                    </span>
                    <span className="text-amber-800">
                      {verifiedRecord.tier} (All 12 MOU Partner Services Active across Delhi).
                    </span>
                  </div>

                  {/* Official Card Visual Verification Preview */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Verified Member Official Card Copy:
                    </span>
                    <OfficialCompanyCard
                      data={{
                        cardNumber: verifiedRecord.cardNumber,
                        customerName: verifiedRecord.fullName,
                        customerMobile: verifiedRecord.mobile,
                        dateOfIssue: verifiedRecord.issueDate,
                        validity: verifiedRecord.validTill
                      }}
                    />
                  </div>

                  {/* Immediate Support Desk */}
                  <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-100">
                    <span>Need priority desk assistance for this member?</span>
                    <a
                      href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                      className="text-amber-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {COMPANY_CREDENTIALS.helpline}</span>
                    </a>
                  </div>

                </div>
              ) : (
                /* Not Found Record */
                <div className="bg-white border border-rose-200 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    No Matching Card Record Found
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    We could not locate a member record matching &ldquo;{searchInput}&rdquo;. Please verify your card ID or contact our helpline desk for assistance.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <a
                      href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Call Helpline
                    </a>
                    <a
                      href="#health-card"
                      className="px-4 py-2 bg-amber-400 text-[#0a192f] rounded-lg text-xs font-semibold hover:bg-amber-300 transition-colors"
                    >
                      Enroll for New Card @ ₹599
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Verification Note for Partner Clinics & Ambulance Drivers */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Hospitals & MOU partner desks can verify member identity via photo ID match and active card status.</span>
        </div>

      </div>
    </section>
  );
};
