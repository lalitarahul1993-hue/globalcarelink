import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Camera, 
  User, 
  IdCard, 
  Briefcase, 
  Ambulance, 
  Stethoscope, 
  Pill, 
  Building2, 
  Leaf, 
  FlaskConical, 
  Home, 
  Activity, 
  UserCheck, 
  Bed, 
  ClipboardCheck, 
  PhoneCall
} from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';
import { COMPANY_CREDENTIALS } from '../data/servicesData';

export interface OfficialCardData {
  cardNumber: string;
  customerName: string;
  customerMobile: string;
  dateOfIssue: string;
  validity: string;
  photoUrl?: string | null;
  agentId?: string;
  referredByAgentId?: string;
}

interface OfficialCompanyCardProps {
  data?: Partial<OfficialCardData>;
  className?: string;
  id?: string;
  compact?: boolean;
}

export const OfficialCompanyCard: React.FC<OfficialCompanyCardProps> = ({
  data = {},
  className = '',
  id,
  compact = false
}) => {
  const {
    cardNumber = 'ADC-8783-001',
    customerName = 'Rahul Sharma',
    customerMobile = '+91 7290835403',
    dateOfIssue = '05/10/2026',
    validity = '04/10/2027',
    photoUrl = null,
    agentId = 'gcl001',
    referredByAgentId
  } = data;
  const displayAgentId = referredByAgentId || agentId || 'gcl001';

  return (
    <div
      id={id}
      className={`relative w-full aspect-[16/9.3] max-w-4xl bg-gradient-to-b from-[#061833] via-[#092247] to-[#041126] text-white rounded-2xl p-3 sm:p-5 md:p-6 shadow-2xl border-2 border-[#d4af37] overflow-hidden select-none font-sans ${className}`}
      style={{
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.25)',
      }}
    >
      {/* Ornate Corner Scrollwork Decorations (SVG Filigree) */}
      <svg className="absolute top-1 left-1 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-[#d4af37] opacity-80 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M5,5 Q40,5 50,25 Q30,30 25,50 Q5,40 5,5 Z" fill="#d4af37" fillOpacity="0.15" strokeWidth="1.5" />
        <path d="M12,12 Q35,12 40,25 Q25,30 20,45" strokeWidth="1.2" />
        <circle cx="15" cy="15" r="3" fill="#d4af37" />
        <path d="M5,60 Q8,20 60,5" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      
      <svg className="absolute top-1 right-1 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-[#d4af37] opacity-80 pointer-events-none -scale-x-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M5,5 Q40,5 50,25 Q30,30 25,50 Q5,40 5,5 Z" fill="#d4af37" fillOpacity="0.15" strokeWidth="1.5" />
        <path d="M12,12 Q35,12 40,25 Q25,30 20,45" strokeWidth="1.2" />
        <circle cx="15" cy="15" r="3" fill="#d4af37" />
        <path d="M5,60 Q8,20 60,5" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      <svg className="absolute bottom-1 left-1 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-[#d4af37] opacity-80 pointer-events-none -scale-y-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M5,5 Q40,5 50,25 Q30,30 25,50 Q5,40 5,5 Z" fill="#d4af37" fillOpacity="0.15" strokeWidth="1.5" />
        <path d="M12,12 Q35,12 40,25 Q25,30 20,45" strokeWidth="1.2" />
        <circle cx="15" cy="15" r="3" fill="#d4af37" />
        <path d="M5,60 Q8,20 60,5" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      <svg className="absolute bottom-1 right-1 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-[#d4af37] opacity-80 pointer-events-none -scale-x-100 -scale-y-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M5,5 Q40,5 50,25 Q30,30 25,50 Q5,40 5,5 Z" fill="#d4af37" fillOpacity="0.15" strokeWidth="1.5" />
        <path d="M12,12 Q35,12 40,25 Q25,30 20,45" strokeWidth="1.2" />
        <circle cx="15" cy="15" r="3" fill="#d4af37" />
        <path d="M5,60 Q8,20 60,5" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      {/* Dual Inner Golden Border Frame with Notched Corners */}
      <div className="absolute inset-1.5 sm:inset-2 md:inset-2.5 border border-[#d4af37]/60 rounded-xl pointer-events-none" />
      <div className="absolute inset-2 sm:inset-3 md:inset-3.5 border border-[#d4af37]/30 rounded-lg pointer-events-none" />

      {/* Subtle Guilloche Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">

        {/* 1. TOP HEADER ROW */}
        <div>
          <div className="flex items-center justify-between gap-2 sm:gap-4 pb-1 sm:pb-2">
            
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-10 sm:w-14 md:w-16 h-10 sm:h-14 md:h-16 rounded-full bg-gradient-to-br from-[#0c2b5e] to-[#041126] border border-[#d4af37] p-1 flex items-center justify-center shadow-md">
                <CompanyLogo className="w-full h-full" withGlow />
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-sm sm:text-lg md:text-2xl font-black tracking-wide uppercase font-display bg-gradient-to-r from-[#fff3b0] via-[#e5b83b] to-[#f9df78] bg-clip-text text-transparent drop-shadow-sm leading-tight whitespace-nowrap">
                  GLOBAL CARE LINK SERVICES LLP
                </h1>
                <p className="text-[9px] sm:text-xs md:text-sm font-semibold italic text-[#f3c64a] tracking-wide mt-0.5">
                  &ldquo;{COMPANY_CREDENTIALS.tagline}&rdquo;
                </p>
              </div>
            </div>

            {/* Price Badge */}
            <div className="shrink-0 bg-gradient-to-r from-[#ffd966] via-[#f3c64a] to-[#d4af37] text-[#071933] font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg border border-[#fff3b0] shadow-md text-[10px] sm:text-xs md:text-sm uppercase tracking-wider flex items-center gap-1">
              <span>Rs 599</span>
            </div>
          </div>

          {/* Registered Office Banner */}
          <div className="mt-1 sm:mt-1.5 bg-[#05142b]/90 border border-[#d4af37]/60 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] md:text-[11px] shadow-inner">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
            <span className="text-[#ffd966] font-bold shrink-0">Registered Office Address:</span>
            <span className="text-slate-200 truncate font-medium">
              {COMPANY_CREDENTIALS.address}
            </span>
          </div>
        </div>

        {/* 2. MIDDLE DETAILS ROW (Customer Details | Partner Details | Photo) */}
        <div className="grid grid-cols-12 gap-1.5 sm:gap-3 my-1 sm:my-2">
          
          {/* CUSTOMER DETAILS BOX (Col 1 to 5) */}
          <div className="col-span-5 bg-[#05142b]/85 border border-[#d4af37]/70 rounded-lg p-1.5 sm:p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-1 pb-1 border-b border-[#d4af37]/30 mb-1">
              <span className="bg-[#d4af37] text-[#071933] font-black text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <span>CUSTOMER DETAILS</span>
                <IdCard className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
            </div>

            <div className="space-y-0.5 sm:space-y-1 text-[8px] sm:text-[10px] md:text-[11px]">
              <div className="flex items-center">
                <span className="text-slate-300 font-semibold w-20 sm:w-28 shrink-0">Card Number:</span>
                <span className="text-[#ffd966] font-mono font-bold border-b border-[#d4af37]/40 flex-1 truncate pb-0.5">
                  {cardNumber || 'ADC-8783-001'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-300 font-semibold w-20 sm:w-28 shrink-0">Customer Name:</span>
                <span className="text-white font-bold border-b border-[#d4af37]/40 flex-1 truncate pb-0.5 uppercase">
                  {customerName || 'Rahul Sharma'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-300 font-semibold w-20 sm:w-28 shrink-0">Customer Mobile:</span>
                <span className="text-slate-100 font-mono font-bold border-b border-[#d4af37]/40 flex-1 truncate pb-0.5">
                  {customerMobile || '+91 7290835403'}
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-amber-500/15 to-transparent px-1.5 py-0.5 rounded border border-[#d4af37]/40">
                <span className="text-amber-300 font-bold w-20 sm:w-28 shrink-0 flex items-center gap-1">
                  <span>Agent ID:</span>
                </span>
                <span className="text-[#ffd966] font-mono font-black tracking-wider flex-1 truncate">
                  {displayAgentId}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-300 font-semibold w-20 sm:w-28 shrink-0">Date of Issue:</span>
                <span className="text-slate-200 font-mono font-bold border-b border-[#d4af37]/40 flex-1 truncate pb-0.5">
                  {dateOfIssue || '05/10/2026'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-300 font-semibold w-20 sm:w-28 shrink-0">Validity:</span>
                <span className="text-[#f3c64a] font-mono font-bold border-b border-[#d4af37]/40 flex-1 truncate pb-0.5">
                  {validity || '04/10/2027'}
                </span>
              </div>
            </div>
          </div>

          {/* PARTNER / COMPANY DETAILS BOX (Col 6 to 9.5) */}
          <div className="col-span-5 bg-[#05142b]/85 border border-[#d4af37]/70 rounded-lg p-1.5 sm:p-2.5 flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-1 pb-1 border-b border-[#d4af37]/30 mb-1">
              <span className="bg-[#d4af37] text-[#071933] font-black text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <span>PARTNER / COMPANY DETAILS</span>
                <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </span>
            </div>

            <div className="space-y-0.5 sm:space-y-0.5 text-[8px] sm:text-[9px] md:text-[10px] leading-tight">
              <div>
                <span className="text-slate-300 font-semibold">Date of Incorporation: </span>
                <span className="text-white font-bold">{COMPANY_CREDENTIALS.incorporationDate}</span>
              </div>
              <div className="text-[7px] sm:text-[8px] md:text-[9px] text-[#ffd966] italic leading-tight">
                (FIFTH day of OCTOBER TWO THOUSAND TWENTY SIX)
              </div>
              <div className="pt-0.5 font-mono">
                <span className="text-slate-300 font-semibold">LLPIN: </span>
                <span className="text-[#ffd966] font-bold">{COMPANY_CREDENTIALS.llpin}</span>
              </div>
              <div className="font-mono">
                <span className="text-slate-300 font-semibold">PAN: </span>
                <span className="text-[#ffd966] font-bold">{COMPANY_CREDENTIALS.pan}</span>
              </div>
              <div className="font-mono">
                <span className="text-slate-300 font-semibold">TAN: </span>
                <span className="text-[#ffd966] font-bold">{COMPANY_CREDENTIALS.tan}</span>
              </div>
            </div>
          </div>

          {/* PHOTO BOX (Col 10 to 12) */}
          <div className="col-span-2 bg-[#05142b]/85 border border-[#d4af37]/70 rounded-lg p-1 sm:p-1.5 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#ffd966] block mb-0.5">
              PHOTO
            </span>
            <div className="w-12 sm:w-16 md:w-20 aspect-[35/40] rounded border-2 border-dashed border-[#d4af37]/60 bg-[#092247] flex flex-col items-center justify-center p-1 text-slate-400 overflow-hidden shadow-inner">
              {photoUrl ? (
                <img src={photoUrl} alt="Cardholder Photo" className="w-full h-full object-cover rounded" />
              ) : (
                <>
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-0.5">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffd966]" />
                  </div>
                  <span className="text-[6px] sm:text-[8px] font-mono text-slate-300 font-semibold">
                    35x40 mm
                  </span>
                </>
              )}
            </div>
          </div>

        </div>

        {/* 3. 12 FACILITATION SERVICES INCLUDED GRID */}
        <div className="bg-[#05142b]/95 border border-[#d4af37]/80 rounded-lg p-1.5 sm:p-2 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-1 border-b border-[#d4af37]/40 mb-1">
            <div className="flex items-center gap-1.5">
              {/* Caduceus SVG / Medical emblem */}
              <div className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd966] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M12 2L10.5 4H13.5L12 2ZM11 5V7.05C8.75 7.42 7.07 9.29 7.07 11.55C7.07 12.83 7.6 13.98 8.47 14.82L9.5 13.79C8.88 13.2 8.5 12.38 8.5 11.5C8.5 9.87 9.81 8.55 11.45 8.5H11.55V10.5H12.45V8.5H12.55C14.19 8.55 15.5 9.87 15.5 11.5C15.5 12.38 15.12 13.2 14.5 13.79L15.53 14.82C16.4 13.98 16.93 12.83 16.93 11.55C16.93 9.29 15.25 7.42 13 7.05V5H11ZM11 11.5H12V22H11V11.5Z" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-xs md:text-sm font-black text-[#ffd966] tracking-wider uppercase font-display">
                12 FACILITATION SERVICES INCLUDED
              </span>
            </div>
            
            <span className="text-[7px] sm:text-[9px] md:text-[10px] italic text-[#f3c64a] font-semibold">
              All services are facilitation via MOU Partner Only
            </span>
          </div>

          {/* 4 Columns x 3 Rows Grid */}
          <div className="grid grid-cols-4 gap-x-1 sm:gap-x-2 gap-y-0.5 sm:gap-y-1 text-[7px] sm:text-[9px] md:text-[10px] text-slate-200">
            
            {/* Column 1 */}
            <div className="flex items-center gap-1 truncate">
              <Ambulance className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">24x7 Ambulance Facilitation</span>
            </div>
            {/* Column 2 */}
            <div className="flex items-center gap-1 truncate">
              <Stethoscope className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Doctor Appointment Facilitation</span>
            </div>
            {/* Column 3 */}
            <div className="flex items-center gap-1 truncate">
              <Pill className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Pharmacy Facilitation</span>
            </div>
            {/* Column 4 */}
            <div className="flex items-center gap-1 truncate">
              <Building2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Hospitalization Support</span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-1 truncate">
              <Leaf className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Wellness Support</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <FlaskConical className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Lab Test Booking Facilitation</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <Home className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Home Care Services</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <Activity className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Physiotherapy via MOU</span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center gap-1 truncate">
              <UserCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Nursing Assistance via MOU</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <Bed className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Medical Equipment Facilitation</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <ClipboardCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Health Checkup Facilitation</span>
            </div>
            <div className="flex items-center gap-1 truncate">
              <PhoneCall className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffd966] shrink-0" />
              <span className="truncate">Telemedicine Support</span>
            </div>

          </div>

        </div>

        {/* 4. FOOTER CONTACT STRIP */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[7.5px] sm:text-[9.5px] md:text-[11px] font-semibold text-slate-200 border-t border-[#d4af37]/40 pt-1">
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#ffd966]">
                <Phone className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </div>
              <span className="text-slate-400">Customer Care:</span>
              <span className="text-[#ffd966] font-bold font-mono">{COMPANY_CREDENTIALS.helpline}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#ffd966]">
                <Mail className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </div>
              <span className="text-slate-400">Email:</span>
              <span className="text-[#ffd966] font-bold">{COMPANY_CREDENTIALS.email}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#ffd966]">
                <Globe className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </div>
              <span className="text-slate-400">Website:</span>
              <span className="text-[#ffd966] font-bold">{COMPANY_CREDENTIALS.website}</span>
            </div>
          </div>

          {/* 5. VERY BOTTOM LEGAL DISCLAIMER FINE PRINT */}
          <p className="text-[6.5px] sm:text-[7.5px] md:text-[8.5px] text-slate-300/90 text-center leading-tight mt-1 border-t border-slate-700/60 pt-0.5">
            Disclaimer: This is facilitation only. Not a Hospital/Lab/Pharmacy/TPA. All services by MOU partners with valid license. No guarantee for bed/claim/cure/loan/visa. Max liability Rs 599. Emergency 102/112. Jurisdiction: Delhi Only.
          </p>
        </div>

      </div>
    </div>
  );
};
