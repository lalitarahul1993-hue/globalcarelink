import React from 'react';
import {
  Check,
  CreditCard,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock
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
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-[#03070e] via-[#081d38] to-[#040912] text-white relative border-b border-sky-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mb-2">
            Honest, Transparent &amp; Single-Tier Pricing
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight font-display">
            Membership Plan &amp; Facilitation Pricing
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            One simple, all-inclusive annual membership card. No surprise renewal fees, no tiered locks — every member receives equal priority across Delhi.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative sky-black-card rounded-3xl border border-sky-400/45 shadow-2xl overflow-hidden">

            {/* Top Sky-Blue Header Strip */}
            <div className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 py-3 px-6 text-center flex items-center justify-center gap-2.5">
              <CompanyLogo className="w-6 h-6 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-[#030914] tracking-wider uppercase font-display">
                Official Healthcare Facilitation Card · Annual Pass
              </span>
            </div>

            <div className="p-7 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-sky-400/15">

                {/* Plan Title */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <CompanyLogo className="w-9 h-9" />
                    <span className="text-sky-300 text-xs font-semibold">
                      Individual Membership · Valid 365 Days
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Annual Healthcare Facilitation Card
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Provides priority facilitation, hospital bed coordination support, ambulance dispatch escalation, and discounted partner rates across all 12 services in Delhi.
                  </p>
                </div>

                {/* Price Block */}
                <div className="lg:col-span-5 bg-gradient-to-br from-black via-[#061426] to-[#0b2747] border border-sky-400/35 p-6 rounded-2xl text-white text-center shadow-lg">
                  <span className="text-xs font-semibold text-sky-300 block">
                    All-Inclusive Annual Fee
                  </span>
                  <div className="my-2 flex items-baseline justify-center gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-display tabular-nums">₹599</span>
                    <span className="text-sky-200/80 text-xs sm:text-sm font-medium">/ year</span>
                  </div>
                  <span className="text-xs text-sky-300/90 font-mono block tabular-nums">
                    ₹1.64 / day · No Hidden Taxes
                  </span>

                  <button
                    onClick={onOpenApplyModal}
                    className="w-full mt-5 py-3 bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 hover:from-sky-200 hover:to-sky-300 text-[#030914] font-extrabold text-sm rounded-xl transition-all shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#030914]" />
                    <span>Buy Membership Card</span>
                  </button>
                </div>

              </div>

              {/* Benefits Checklist */}
              <div className="pt-8">
                <h4 className="text-xs sm:text-sm font-bold text-sky-300 tracking-wide mb-5">
                  Everything Included in Your ₹599 Annual Membership
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-sky-400/15 hover:border-sky-400/35 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-sky-400/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white leading-snug font-display">
                          {benefit.title}
                        </h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Guarantee Box */}
              <div className="mt-8 p-4 bg-black/55 rounded-2xl border border-sky-400/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-sky-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">
                      Limited Liability Guarantee
                    </span>
                    <span className="text-slate-300">
                      Our facilitation role is governed by MCA regulations. Maximum customer liability is capped at ₹599.
                    </span>
                  </div>
                </div>

                <span className="font-mono text-sky-300 font-semibold text-xs shrink-0 tabular-nums">
                  LLPIN: {COMPANY_CREDENTIALS.llpin}
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* FAQ Strip */}
        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          <div className="text-center mb-6">
            <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
              Frequently Asked Questions About Membership
            </h4>
          </div>

          <div className="sky-black-card p-5 rounded-xl">
            <h5 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2 font-display">
              <HelpCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Is medical treatment included for ₹599?</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
              No. Global Care Link Services LLP is a <strong className="text-white">facilitation provider only</strong> and not a hospital or health insurer. The ₹599 covers 365 days of coordination services, priority bookings, emergency liaison, and partner-negotiated discount access. Direct medical charges are billed independently by licensed MOU hospitals and labs.
            </p>
          </div>

          <div className="sky-black-card p-5 rounded-xl">
            <h5 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2 font-display">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>How fast is the card activated after enrollment?</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
              Your digital card is issued <strong className="text-white">instantly</strong> upon submitting your application, and reviewed promptly by our Admin team for full activation and referral confirmation.
            </p>
          </div>

          <div className="sky-black-card p-5 rounded-xl">
            <h5 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2 font-display">
              <Zap className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Can I use this card outside Delhi?</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
              Our registered network and legal jurisdiction are strictly confined to <strong className="text-white">Delhi Only</strong>. Emergency coordination and partner facilitation operate within the National Capital Territory of Delhi and adjoining NCR corridors.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
