import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  PhoneCall
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
    }, 250);
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
    <section
      id="verify-card"
      className="py-20 bg-gradient-to-b from-[#040912] via-[#081a30] to-[#040811] text-white relative border-b border-sky-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mb-2">
            Real-time Member Verification Portal
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight font-display">
            Verify Healthcare Card &amp; Validity
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Hospitals, labs, ambulance operators, and members can authenticate active facilitation status, membership validity, and jurisdiction compliance instantly.
          </p>
        </div>

        {/* Verification Box */}
        <div className="max-w-2xl mx-auto sky-black-card rounded-2xl p-6 sm:p-8 shadow-2xl">

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <label className="block text-xs sm:text-sm font-bold text-sky-200">
              Enter Card Number or Registered Mobile Number
            </label>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. ADC-8783-001 or GCL-2026-9042"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/75 border border-sky-400/30 focus:border-sky-400 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none font-mono font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-gradient-to-r from-sky-300 to-sky-400 hover:from-sky-200 hover:to-sky-300 text-[#030914] font-extrabold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {isSearching ? 'Verifying...' : 'Check Status'}
              </button>
            </div>
          </form>

          {/* Sample Test Records */}
          <div className="mt-5 pt-4 border-t border-sky-400/15">
            <span className="text-xs text-slate-400 block mb-2.5 font-medium">
              Click to test with sample active records:
            </span>
            <div className="flex flex-wrap gap-2">
              {MOCK_MEMBERS.map((m) => (
                <button
                  key={m.cardNumber}
                  type="button"
                  onClick={() => handleTestCardClick(m.cardNumber)}
                  className="px-3 py-1.5 bg-black/60 hover:bg-sky-500/20 text-sky-200 hover:text-white border border-sky-400/25 hover:border-sky-400/60 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  {m.cardNumber} ({m.fullName.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {hasSearched && (
            <div className="mt-8 pt-6 border-t border-sky-400/20">
              {verifiedRecord ? (
                <div className="bg-black/60 border border-sky-400/40 rounded-xl p-6 space-y-5">

                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sky-400/15">
                    <div className="flex items-center gap-3">
                      <CompanyLogo className="w-11 h-11" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-400" />
                          <span className="text-xs font-bold text-sky-300 tracking-wider uppercase">
                            Authentication Record Found
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-white font-display">
                          {verifiedRecord.approvalStatus === 'PENDING'
                            ? 'Card Generated (Under Admin Review)'
                            : 'Active & Verified Healthcare Card'}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-extrabold uppercase ${
                        verifiedRecord.approvalStatus === 'PENDING'
                          ? 'text-amber-300'
                          : verifiedRecord.approvalStatus === 'DECLINED'
                          ? 'text-rose-400'
                          : 'text-emerald-300'
                      }`}
                    >
                      {verifiedRecord.approvalStatus === 'PENDING'
                        ? 'Under Review'
                        : verifiedRecord.approvalStatus === 'DECLINED'
                        ? 'Declined'
                        : `✓ ${verifiedRecord.status}`}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="bg-[#07162b] p-3.5 rounded-xl border border-sky-400/15">
                      <span className="text-slate-400 block text-[11px]">Cardholder Full Name</span>
                      <span className="text-sm font-bold text-white">{verifiedRecord.fullName}</span>
                    </div>

                    <div className="bg-[#07162b] p-3.5 rounded-xl border border-sky-400/15">
                      <span className="text-slate-400 block text-[11px]">Card Number / ID</span>
                      <span className="text-sm font-bold text-sky-300 font-mono tabular-nums">{verifiedRecord.cardNumber}</span>
                    </div>

                    <div className="bg-[#07162b] p-3.5 rounded-xl border border-sky-400/15">
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>Validity Period</span>
                      </span>
                      <span className="font-semibold text-white font-mono tabular-nums">
                        {verifiedRecord.issueDate} to {verifiedRecord.validTill}
                      </span>
                    </div>

                    <div className="bg-[#07162b] p-3.5 rounded-xl border border-sky-400/15">
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        <span>Registered Territory</span>
                      </span>
                      <span className="font-semibold text-white">{verifiedRecord.jurisdiction}</span>
                    </div>
                  </div>

                  {/* Entitlement Banner */}
                  <div className="p-3.5 bg-sky-500/10 rounded-xl border border-sky-400/25 text-xs">
                    <span className="text-sky-300 font-bold block mb-0.5">
                      Entitlement Coverage
                    </span>
                    <span className="text-slate-200">
                      {verifiedRecord.tier} (All 12 MOU Partner Services Active across Delhi).
                    </span>
                  </div>

                  {/* Official Card Preview */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-sky-200 block mb-2.5">
                      Verified Member Official Card Copy
                    </span>
                    <OfficialCompanyCard
                      data={{
                        cardNumber: verifiedRecord.cardNumber,
                        customerName: verifiedRecord.fullName,
                        customerMobile: verifiedRecord.mobile,
                        dateOfIssue: verifiedRecord.issueDate,
                        validity: verifiedRecord.validTill,
                        agentId: verifiedRecord.referredByAgentId || 'gcl001',
                        photoUrl: verifiedRecord.photoUrl,
                        approvalStatus: verifiedRecord.approvalStatus || 'APPROVED'
                      }}
                    />
                  </div>

                  {/* Support Desk */}
                  <div className="pt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 border-t border-sky-400/15">
                    <span>Need priority desk assistance for this member?</span>
                    <a
                      href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                      className="text-sky-300 font-bold hover:text-white flex items-center gap-1.5 font-mono"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {COMPANY_CREDENTIALS.helpline}</span>
                    </a>
                  </div>

                </div>
              ) : (
                <div className="bg-black/60 border border-rose-500/40 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    No Matching Card Record Found
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    We could not locate a member record matching &ldquo;{searchInput}&rdquo;. Please verify your card ID or contact our helpline desk for assistance.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <a
                      href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
                      className="px-4 py-2 bg-sky-400 hover:bg-sky-300 text-[#030914] rounded-lg text-xs font-extrabold transition-colors"
                    >
                      Call Helpline
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
