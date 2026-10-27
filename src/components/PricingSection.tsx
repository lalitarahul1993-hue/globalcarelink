import React from 'react';
import { 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

interface PricingSectionProps {
  onOpenApplyModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenApplyModal }) => {
  const planBenefits = [
    {
      title: 'Full 12 Healthcare Facilitation Services Included',
      desc: 'Ambulance, Hospitalization, Doctors, Pharmacy, Labs, Nursing, Physio, Medical Equipment & more.'
    },
    {
      title: '24x7 Priority Emergency Desk Coordination',
      desc: 'Dedicated rapid-response liaison with verified private ambulance fleets and network hospital reception desks.'
    },
    {
      title: 'Exclusive Negotiated MOU Partner Tariffs',
      desc: 'Save 15% to 35% on prescription pharmacy refills, NABL pathology tests, and specialist clinic consultations.'
    },
    {
      title: 'Dual-Sided Instant Digital Customer Card',
      desc: 'Instant digital card with RFID & QR representation plus printable certificate.'
    },
    {
      title: 'Personalized Facilitation Manager Support',
      desc: 'One-on-one call assistance on +91 7290835403 for appointment bookings and equipment rentals.'
    },
    {
      title: 'Strict Capped Financial Protection',
      desc: 'Total facilitation fee capped at ₹599/year. Zero hidden platform commissions or booking surcharges.'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-md mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Honest, Transparent & Single-Tier Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Membership Plan & Facilitation Pricing
          </h2>
          
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            One simple, all-inclusive annual membership card. No surprise renewal fees, no tiered locks—every member enjoys equal priority across Delhi.
          </p>
        </div>

        {/* Pricing Card Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl border-2 border-amber-400/80 shadow-xl overflow-hidden">
            
            {/* Top Gold Badge */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-2.5 px-6 text-center flex items-center justify-center gap-2">
              <CompanyLogo className="w-5 h-5 shrink-0" />
              <span className="text-xs sm:text-sm font-black text-[#0a192f] tracking-widest uppercase">
                OFFICIAL HEALTHCARE FACILITATION CARD · ANNUAL PASS
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-100">
                
                {/* Plan Title & Price */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <CompanyLogo className="w-8 h-8" />
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-md">
                      Individual Membership · Valid 365 Days
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    Annual Healthcare Facilitation Card
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Provides priority facilitation, hospital bed coordination support, ambulance dispatch escalation, and discounted partner rates across all 12 services in Delhi.
                  </p>
                </div>

                {/* Price Display Block */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#0a192f] to-[#122b59] p-6 rounded-2xl text-white text-center shadow-md">
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                    All-Inclusive Annual Fee
                  </span>
                  <div className="my-2 flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-white font-display">₹599</span>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">/ year</span>
                  </div>
                  <span className="text-[11px] text-amber-300/90 font-mono block">
                    (₹1.64 / day) · No Hidden Taxes
                  </span>

                  <button
                    onClick={onOpenApplyModal}
                    className="w-full mt-4 py-3 bg-amber-400 hover:bg-amber-300 text-[#0a192f] font-extrabold text-sm rounded-xl transition-colors shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#0a192f]" />
                    <span>Buy Membership Card</span>
                  </button>
                </div>

              </div>

              {/* Benefits Checklist */}
              <div className="pt-8">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-5">
                  Everything Included in Your ₹599 Annual Membership:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 leading-snug">
                          {benefit.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Guarantee Box */}
              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Limited Liability Guarantee:
                    </span>
                    <span className="text-slate-600">
                      Our facilitation role is governed by MCA regulations. Maximum customer liability is capped at ₹599.
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="font-mono text-slate-500 font-semibold text-[11px]">
                    LLPIN: {COMPANY_CREDENTIALS.llpin}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* FAQ Strip */}
        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-slate-900 font-display">
              Frequently Asked Questions About Membership
            </h4>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h5 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Is medical treatment included for ₹599?</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              No. Global Care Link Services LLP is a <strong>facilitation provider only</strong> and not a hospital or health insurer. The ₹599 covers 365 days of coordination services, priority bookings, emergency liaison, and partner-negotiated discount access. Direct medical charges are billed independently by licensed MOU hospitals and labs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h5 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>How fast is the card activated after enrollment?</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Your digital card is issued <strong>instantly</strong> upon submitting your application. Your unique membership ID becomes active in our real-time verification registry within minutes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h5 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Can I use this card outside Delhi?</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Our registered network and legal jurisdiction are strictly confined to <strong>Delhi Only</strong>. Emergency coordination and partner facilitation operate within the National Capital Territory of Delhi and adjoining NCR corridors.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
