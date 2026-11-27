import React, { useState } from 'react';
import {
  Menu,
  X,
  CreditCard,
  Share2,
  Lock
} from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface HeaderProps {
  onOpenApplyModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenAdminModal: () => void;
  onOpenReferModal: () => void;
  submissionCount?: number;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApplyModal,
  onOpenAdminModal,
  onOpenReferModal,
  submissionCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: '12 Services', href: '#services' },
    { label: 'Health Card', href: '#health-card' },
    { label: 'Verify Card', href: '#verify-card' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Statutory', href: '#statutory' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#040811]/95 via-[#07182d]/95 to-[#040811]/95 backdrop-blur-md border-b border-sky-400/25 text-white shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">

        {/* DESKTOP & TABLET: 3-ZONE GRID (LEFT: REFER & ADMIN | CENTER: LARGE LOGO & NAME | RIGHT: GET CARD) */}
        <div className="hidden md:grid grid-cols-12 items-center gap-4">

          {/* LEFT ZONE: Refer & Earn + Admin Records */}
          <div className="col-span-4 flex items-center justify-start gap-2.5">
            <button
              onClick={onOpenReferModal}
              className="px-3.5 py-2 text-xs font-semibold text-sky-200 hover:text-white bg-sky-500/15 hover:bg-sky-500/25 rounded-xl border border-sky-400/40 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              title="Refer & Earn Partner Program: Upto ₹200 per Card"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Refer &amp; Earn (Upto ₹200)</span>
            </button>

            <button
              onClick={onOpenAdminModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-sky-200 bg-black/60 hover:bg-slate-900 rounded-xl border border-sky-400/20 hover:border-sky-400/40 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              title="Admin Login & Patient Records"
            >
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Admin Records</span>
              {submissionCount > 0 && (
                <span className="ml-0.5 text-[11px] font-mono font-bold text-sky-300 tabular-nums">
                  ({submissionCount})
                </span>
              )}
            </button>
          </div>

          {/* CENTER ZONE: PROMINENT LARGE LOGO + COMPANY NAME */}
          <div className="col-span-4 flex items-center justify-center">
            <a
              href="#home"
              className="flex items-center gap-3.5 group cursor-pointer select-none"
              title="Global Care Link Services LLP"
            >
              <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-2xl bg-gradient-to-br from-sky-400/20 via-[#07182d] to-black p-1.5 border border-sky-400/60 shadow-lg shadow-sky-500/15 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0">
                <CompanyLogo className="w-full h-full" withGlow />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xl lg:text-2xl xl:text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent whitespace-nowrap font-display leading-none">
                  GLOBAL CARE LINK
                </span>
                <span className="text-[11px] lg:text-xs font-bold tracking-[0.26em] text-sky-400 uppercase mt-1">
                  SERVICES LLP
                </span>
              </div>
            </a>
          </div>

          {/* RIGHT ZONE: Clean Nav + Primary CTA */}
          <div className="col-span-4 flex items-center justify-end gap-3">
            <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-300 mr-1">
              <a href="#services" className="hover:text-sky-300 transition-colors whitespace-nowrap shrink-0">Services</a>
              <a href="#health-card" className="hover:text-sky-300 transition-colors whitespace-nowrap shrink-0">Card</a>
              <a href="#verify-card" className="hover:text-sky-300 transition-colors whitespace-nowrap shrink-0">Verify</a>
            </nav>

            <button
              onClick={onOpenApplyModal}
              className="px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#030914] bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 hover:from-sky-200 hover:to-sky-300 rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-[#030914]" />
              <span>Get Card @ ₹599</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sky-200 hover:text-white rounded-xl hover:bg-sky-500/15 border border-transparent hover:border-sky-400/30 transition-colors cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE / COMPACT BAR */}
        <div className="flex md:hidden items-center justify-between gap-2">

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenReferModal}
              className="px-2 py-1.5 text-[11px] font-bold text-sky-200 bg-sky-500/15 rounded-lg border border-sky-400/40 flex items-center gap-1"
              title="Refer & Earn Upto ₹200"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Refer</span>
            </button>

            <button
              onClick={onOpenAdminModal}
              className="px-2 py-1.5 text-[11px] font-semibold text-slate-200 bg-black/70 rounded-lg border border-sky-400/25 flex items-center gap-1"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Admin</span>
            </button>
          </div>

          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer mx-auto min-w-0"
            title="Global Care Link Services LLP"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400/20 to-black p-1 border border-sky-400/60 shadow-md flex items-center justify-center shrink-0">
              <CompanyLogo className="w-full h-full" withGlow />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white font-display leading-tight truncate">
                GLOBAL CARE LINK
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-sky-400 uppercase">
                SERVICES LLP
              </span>
            </div>
          </a>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenApplyModal}
              className="px-2.5 py-1.5 text-[11px] font-extrabold text-[#030914] bg-gradient-to-r from-sky-300 to-sky-400 rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>₹599</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-sky-500/15 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#040b16]/98 border-b border-sky-400/25 px-4 sm:px-6 pt-4 pb-6 space-y-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pb-4 border-b border-sky-400/15 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-2.5 text-slate-200 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg transition-colors font-semibold text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReferModal();
                }}
                className="py-3 px-4 text-center text-xs font-bold text-sky-200 bg-sky-500/15 border border-sky-400/40 rounded-xl flex items-center justify-center gap-2 hover:bg-sky-500/25 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>Refer &amp; Earn Partner Program (Upto ₹200)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="py-3 px-4 text-center text-xs font-bold text-slate-200 bg-black/70 hover:bg-slate-900 border border-sky-400/25 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-sky-400" />
                <span>Admin Portal (Survey &amp; Approvals)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplyModal();
                }}
                className="py-3 px-4 text-center text-xs font-extrabold text-[#030914] bg-gradient-to-r from-sky-300 to-sky-400 hover:from-sky-200 hover:to-sky-300 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Get Healthcare Card @ ₹599/Yr</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
