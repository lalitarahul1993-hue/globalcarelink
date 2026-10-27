import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  CreditCard, 
  Share2,
  Lock,
  ChevronDown
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
  submissionCount = 0,
  activeSection 
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
    <header className="sticky top-0 z-40 bg-[#06162d]/98 backdrop-blur-md border-b-2 border-amber-500/30 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        
        {/* ================= DESKTOP & TABLET: TRUE 3-ZONE GRID (LEFT | CENTER | RIGHT) ================= */}
        <div className="hidden md:grid grid-cols-12 items-center gap-3">
          
          {/* ================= LEFT ZONE (Cols 1-4): REFER & EARN + ADMIN RECORDS ================= */}
          <div className="col-span-4 flex items-center justify-start gap-2.5">
            <button
              onClick={onOpenReferModal}
              className="px-3.5 py-2 text-xs font-bold text-amber-300 hover:text-amber-100 bg-amber-950/70 hover:bg-amber-900/90 rounded-xl border border-amber-400/70 shadow-md flex items-center gap-1.5 transition-all cursor-pointer group active:scale-95"
              title="Refer & Earn Partner Program: Upto ₹200 per Card"
            >
              <Share2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Refer &amp; Earn (Upto ₹200)</span>
            </button>

            <button
              onClick={onOpenAdminModal}
              className="px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-xl border border-slate-700/80 shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              title="Admin Login & Patient Records"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="whitespace-nowrap">Admin Records</span>
              {submissionCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-[#071324] text-[10px] font-black rounded-full">
                  {submissionCount}
                </span>
              )}
            </button>
          </div>

          {/* ================= CENTER ZONE (Cols 5-8): PROMINENT LARGE LOGO + COMPANY NAME ================= */}
          <div className="col-span-4 flex items-center justify-center">
            <a 
              href="#home" 
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer text-center select-none"
              title="Global Care Link Services LLP"
            >
              {/* Extra Large Premium Logo Container */}
              <div className="w-20 md:w-24 h-20 md:h-24 rounded-2xl bg-gradient-to-br from-[#051329] via-[#092247] to-[#14376e] p-2 border-2 border-amber-400 shadow-xl shadow-amber-950/60 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 shrink-0">
                <CompanyLogo className="w-16 md:w-20 h-16 md:h-20" withGlow />
              </div>

              {/* Centered Typography */}
              <div className="flex flex-col text-left">
                <span className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap font-display leading-tight drop-shadow-md">
                  GLOBAL CARE LINK
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-amber-400 uppercase -mt-0.5">
                  SERVICES LLP
                </span>
              </div>
            </a>
          </div>

          {/* ================= RIGHT ZONE (Cols 9-12): GET CARD @ ₹599 + NAVIGATION MENU ================= */}
          <div className="col-span-4 flex items-center justify-end gap-3">
            <nav className="hidden xl:flex items-center gap-3 text-xs font-semibold text-slate-300 mr-1">
              <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              <a href="#health-card" className="hover:text-amber-400 transition-colors">Card Demo</a>
              <a href="#verify-card" className="hover:text-amber-400 transition-colors">Verify</a>
            </nav>

            <button
              onClick={onOpenApplyModal}
              className="px-4 py-2.5 text-xs sm:text-sm font-black text-[#071933] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-[#071933]" />
              <span>Get Card @ ₹599</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ================= MOBILE / COMPACT BAR (Below md screens) ================= */}
        <div className="flex md:hidden items-center justify-between gap-2">
          
          {/* Mobile Left: Refer & Admin Quick Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenReferModal}
              className="px-2 py-1.5 text-[11px] font-bold text-amber-300 bg-amber-950/70 rounded-lg border border-amber-400/60 flex items-center gap-1 active:scale-95"
              title="Refer & Earn Upto ₹200"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Refer</span>
            </button>
            
            <button
              onClick={onOpenAdminModal}
              className="px-2 py-1.5 text-[11px] font-semibold text-slate-200 bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-1 active:scale-95"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin</span>
              {submissionCount > 0 && (
                <span className="px-1 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full">
                  {submissionCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Center: Logo + Name */}
          <a 
            href="#home" 
            className="flex items-center gap-2 group cursor-pointer text-center mx-auto truncate"
            title="Global Care Link Services LLP"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#051329] to-[#123060] p-1 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0">
              <CompanyLogo className="w-9 h-9" withGlow />
            </div>
            <div className="flex flex-col text-left truncate">
              <span className="text-xs sm:text-sm font-black tracking-tight text-white leading-tight truncate">
                GLOBAL CARE LINK
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                SERVICES LLP
              </span>
            </div>
          </a>

          {/* Mobile Right: Get Card + Hamburger */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onOpenApplyModal}
              className="px-2 py-1.5 text-[11px] sm:text-xs font-black text-[#071933] bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1 active:scale-95"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>₹599</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Drawer (Opens for All Screen Sizes on Menu Click) */}
      {mobileMenuOpen && (
        <div className="bg-[#07162c] border-b border-amber-900/40 px-4 sm:px-6 pt-4 pb-6 space-y-4 animate-in fade-in duration-150">
          <div className="max-w-7xl mx-auto">
            {/* Quick Link Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pb-3 border-b border-slate-700/60 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-2.5 text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors font-medium text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions Inside Drawer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReferModal();
                }}
                className="py-3 px-4 text-center text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-950/90 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Refer &amp; Earn Partner Program (Upto ₹200)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="py-3 px-4 text-center text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Admin Login Gate (Survey &amp; Cards)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplyModal();
                }}
                className="py-3 px-4 text-center text-xs font-black text-[#071933] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
