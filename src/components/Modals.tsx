import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  PhoneCall,
  AlertTriangle,
  Printer
} from 'lucide-react';
import { FacilitationService, MemberRecord } from '../types';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';

// 1. APPLY / ENROLL MODAL
interface ApplyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMember: MemberRecord) => void;
}

export const ApplyCardModal: React.FC<ApplyCardModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'issued'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    dob: '',
    gender: 'Male',
    location: '',
    paymentMethod: 'UPI'
  });
  const [issuedMember, setIssuedMember] = useState<MemberRecord | null>(null);

  if (!isOpen) return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompletePayment = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCardNumber = `GCL-2026-8783-${randomSuffix}`;

    const newMember: MemberRecord = {
      cardNumber: newCardNumber,
      fullName: formData.fullName || 'Member',
      mobile: formData.mobile || '+91 99999 99999',
      dob: formData.dob || '01/01/1990',
      gender: formData.gender,
      preferredLocation: formData.location || 'Delhi',
      issueDate: '10/10/2026',
      validTill: '09/10/2027',
      status: 'ACTIVE',
      approvalStatus: 'PENDING',
      jurisdiction: 'Delhi Only',
      tier: 'All 12 MOU Facilitation Services Active'
    };

    setIssuedMember(newMember);
    onSuccess(newMember);
    setStep('issued');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className={`bg-[#07111e] rounded-3xl ${step === 'issued' ? 'max-w-3xl' : 'max-w-lg'} w-full p-6 sm:p-8 shadow-2xl shadow-sky-950/60 relative border border-sky-400/30 animate-in fade-in zoom-in-95 duration-200 transition-all text-slate-100`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-sky-400/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' && (
          <div>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-500/15 px-2.5 py-1 rounded border border-sky-400/30 inline-block mb-2">
                  Annual Membership Enrollment
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Get Your Healthcare Card @ ₹599
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Immediate access to 12 facilitation services across Delhi NCR.
                </p>
              </div>
              <CompanyLogo className="w-14 h-14" withGlow />
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-sky-200 font-bold mb-1 text-xs">Full Name (As per Govt. ID) *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98712 XXXXX"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Area / Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Harsh Vihar, Delhi"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-sky-500/10 rounded-xl border border-sky-400/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-sky-300 font-bold block">Annual Facilitation Fee:</span>
                  <span className="text-base font-black text-white font-mono">₹599 / Year</span>
                </div>
                <span className="text-[11px] font-semibold text-sky-200 bg-sky-500/20 border border-sky-400/30 px-2 py-0.5 rounded">
                  No Hidden Charges
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-400 hover:bg-sky-300 text-[#03070e] font-black text-sm rounded-xl transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                Proceed to Payment (₹599)
              </button>
            </form>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                Step 2 of 2 · Secure Checkout
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                Confirm ₹599 Payment
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Select your preferred instant payment method to activate your card.
              </p>
            </div>

            <div className="space-y-2">
              {['UPI (Google Pay / PhonePe / Paytm / QR)', 'Debit / Credit Card', 'Net Banking'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === method
                      ? 'border-sky-400 bg-sky-500/15 shadow-sm'
                      : 'border-sky-400/20 hover:border-sky-400/40 bg-black/40'
                  }`}
                >
                  <span className="text-xs font-bold text-white">{method}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={() => setFormData({ ...formData, paymentMethod: method })}
                    className="accent-sky-400"
                  />
                </label>
              ))}
            </div>

            <div className="p-4 bg-black/50 rounded-xl border border-sky-400/20 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Member Name:</span>
                <span className="font-bold text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Jurisdiction:</span>
                <span className="font-semibold text-sky-200">Delhi Only</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1.5 border-t border-sky-400/15">
                <span className="font-bold text-white">Total Payable:</span>
                <span className="font-black text-sky-300 text-sm font-mono">₹599.00</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-3 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompletePayment}
                className="flex-1 py-3 bg-sky-400 hover:bg-sky-300 text-[#03070e] font-black text-xs sm:text-sm rounded-xl transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                Confirm &amp; Issue Card
              </button>
            </div>
          </div>
        )}

        {step === 'issued' && issuedMember && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                Card Issued &amp; Sent for Admin Review
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Your Official Health Card is Ready
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Registered under LLPIN: {COMPANY_CREDENTIALS.llpin}.
              </p>
            </div>

            <div className="my-2 text-left">
              <OfficialCompanyCard
                data={{
                  cardNumber: issuedMember.cardNumber,
                  customerName: issuedMember.fullName,
                  customerMobile: issuedMember.mobile,
                  dateOfIssue: issuedMember.issueDate,
                  validity: issuedMember.validTill,
                  approvalStatus: issuedMember.approvalStatus
                }}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-white/10 hover:bg-white/15 border border-sky-400/30 text-sky-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Card</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-sky-400 hover:bg-sky-300 text-[#03070e] font-black text-xs rounded-xl cursor-pointer shadow"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. SERVICE INQUIRY / BOOKING MODAL
interface ServiceInquiryModalProps {
  isOpen: boolean;
  service: FacilitationService | null;
  onClose: () => void;
}

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  isOpen,
  service,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    cardholderName: '',
    phone: '',
    cardId: '',
    urgency: 'Standard (Today/Tomorrow)',
    notes: ''
  });

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#07111e] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl shadow-sky-950/60 relative border border-sky-400/30 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-sky-400/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded border border-sky-400/30">
                  SERVICE #{service.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-display">
                  Request {service.title}
                </h3>
                <p className="text-xs text-sky-200 mt-1 font-medium bg-sky-500/10 p-2 rounded-lg border border-sky-400/20">
                  {service.mouNotice}
                </p>
              </div>
              <CompanyLogo className="w-12 h-12" withGlow />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-sky-200 font-bold mb-1 text-xs">Patient / Member Name *</label>
                <input
                  type="text"
                  required
                  value={bookingData.cardholderName}
                  onChange={(e) => setBookingData({ ...bookingData, cardholderName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="+91 98712 XXXXX"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sky-200 font-bold mb-1 text-xs">Healthcare Card ID (Optional)</label>
                  <input
                    type="text"
                    value={bookingData.cardId}
                    onChange={(e) => setBookingData({ ...bookingData, cardId: e.target.value })}
                    placeholder="e.g. ADC-8783-001"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1 text-xs">Urgency Window</label>
                <select
                  value={bookingData.urgency}
                  onChange={(e) => setBookingData({ ...bookingData, urgency: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white focus:outline-none"
                >
                  <option value="Emergency (Immediate Assistance)">Emergency (Immediate Assistance)</option>
                  <option value="Today (Within 2-4 Hours)">Today (Within 2-4 Hours)</option>
                  <option value="Tomorrow Scheduled">Tomorrow Scheduled</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1 text-xs">Details / Specific Hospital or Test Required</label>
                <textarea
                  rows={2}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Provide any symptoms, preferred hospital, or doctor specialty..."
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Coordination SLA: <strong className="text-sky-300">{service.partnerSLA}</strong></span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-400 hover:bg-sky-300 text-[#03070e] font-black text-sm rounded-xl transition-colors cursor-pointer shadow-lg shadow-sky-500/20"
              >
                Submit Facilitation Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Request Logged Successfully
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              Our facilitation desk executive has received your request for <strong className="text-white">{service.title}</strong> and will contact you within {service.partnerSLA} at <strong className="text-sky-300 font-mono">{bookingData.phone}</strong>.
            </p>

            <div className="p-3 bg-black/50 rounded-xl border border-sky-400/25 text-xs text-slate-300">
              For urgent hospital transfer or ambulance escalation, call our 24x7 desk immediately at{' '}
              <a href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`} className="font-bold text-sky-300 underline font-mono">
                {COMPANY_CREDENTIALS.helpline}
              </a>.
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-sky-400 hover:bg-sky-300 text-[#03070e] font-black text-xs rounded-xl cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. EMERGENCY CALL MODAL
interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#07111e] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border-2 border-rose-500/80 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
              CRITICAL EMERGENCY DIRECTORY
            </span>
            <h3 className="text-xl font-black text-white font-display">
              Delhi Emergency Helplines
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          If you or someone around you faces life-threatening illness, trauma, cardiac arrest, or severe accident, call government emergency response immediately:
        </p>

        <div className="space-y-3 mb-6">
          <a
            href="tel:102"
            className="flex items-center justify-between p-3.5 bg-rose-950/50 hover:bg-rose-950/80 border border-rose-500/40 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <div>
                <span className="text-sm font-black text-white block font-mono">Dial 102</span>
                <span className="text-[11px] text-slate-300">Government CATS Ambulance Service</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-300 uppercase">Toll-Free</span>
          </a>

          <a
            href="tel:112"
            className="flex items-center justify-between p-3.5 bg-rose-950/50 hover:bg-rose-950/80 border border-rose-500/40 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <div>
                <span className="text-sm font-black text-white block font-mono">Dial 112</span>
                <span className="text-[11px] text-slate-300">National Integrated Emergency Helpline</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-300 uppercase">Toll-Free</span>
          </a>

          <a
            href={`tel:${COMPANY_CREDENTIALS.helplineRaw}`}
            className="flex items-center justify-between p-3.5 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <CompanyLogo className="w-10 h-10" />
              <div>
                <span className="text-sm font-black text-white block font-mono">
                  {COMPANY_CREDENTIALS.helpline}
                </span>
                <span className="text-[11px] text-sky-200">Global Care Link Facilitation Desk</span>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-300 uppercase">24x7 Desk</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 italic text-center">
          Facilitation desk coordinates private MOU ambulances and hospital admission desks. Jurisdiction: Delhi Only.
        </p>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
