import React, { useState } from 'react';
import {
  Building,
  FileText,
  MapPin,
  PhoneCall,
  Mail,
  Globe,
  Calendar,
  ExternalLink,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

export const ComplianceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'statutory' | 'location' | 'governance'>('statutory');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const credentials = [
    {
      label: 'LLPIN (Limited Liability Partnership Identification Number)',
      value: COMPANY_CREDENTIALS.llpin,
      authority: 'Ministry of Corporate Affairs (Govt. of India)',
      key: 'llpin'
    },
    {
      label: 'Permanent Account Number (PAN)',
      value: COMPANY_CREDENTIALS.pan,
      authority: 'Income Tax Department (Govt. of India)',
      key: 'pan'
    },
    {
      label: 'Tax Deduction & Collection Account Number (TAN)',
      value: COMPANY_CREDENTIALS.tan,
      authority: 'Directorate of Income Tax (Govt. of India)',
      key: 'tan'
    },
    {
      label: 'Date of Incorporation',
      value: COMPANY_CREDENTIALS.incorporationDate,
      authority: 'Registrar of Companies, NCT of Delhi & Haryana',
      key: 'inc'
    }
  ];

  return (
    <section
      id="statutory"
      className="py-20 bg-gradient-to-b from-[#040912] via-[#07182d] to-[#03070e] text-white relative border-b border-sky-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mb-2">
            Public Regulatory &amp; Statutory Registry
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight font-display">
            Transparency &amp; Statutory Compliance
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Global Care Link Services LLP operates under strict corporate governance guidelines established by the Ministry of Corporate Affairs, Government of India.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 bg-black/70 rounded-xl border border-sky-400/25">
            <button
              onClick={() => setActiveTab('statutory')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'statutory'
                  ? 'bg-sky-400 text-[#030914]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Statutory Identifiers
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'location'
                  ? 'bg-sky-400 text-[#030914]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Registered Office &amp; Hub
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'governance'
                  ? 'bg-sky-400 text-[#030914]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Operational Scope &amp; Ethics
            </button>
          </div>
        </div>

        {/* Tab 1: Statutory Identifiers */}
        {activeTab === 'statutory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {credentials.map((cred) => (
              <div
                key={cred.key}
                className="sky-black-card hover:border-sky-400/55 p-6 rounded-2xl transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-sky-300/90">
                    {cred.authority}
                  </span>
                  <button
                    onClick={() => copyToClipboard(cred.value, cred.key)}
                    className="p-1.5 text-slate-400 hover:text-sky-300 hover:bg-sky-500/15 rounded-md transition-colors cursor-pointer"
                    title="Copy value"
                  >
                    {copiedKey === cred.key ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="text-sm font-semibold text-slate-200">
                  {cred.label}
                </div>

                <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wider bg-black/65 p-3.5 rounded-xl border border-sky-400/20 flex items-center justify-between tabular-nums">
                  <span>{cred.value}</span>
                  <CheckCircle className="w-5 h-5 text-sky-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Registered Office */}
        {activeTab === 'location' && (
          <div className="max-w-5xl mx-auto sky-black-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

            <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Principal Corporate Domicile</span>
                </span>
                <CompanyLogo className="w-11 h-11" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {COMPANY_CREDENTIALS.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registered under Limited Liability Partnership Act, 2008
                </p>
              </div>

              <div className="p-4 bg-black/60 rounded-xl border border-sky-400/20 space-y-1.5 text-xs sm:text-sm">
                <span className="text-sky-300 block text-xs font-semibold">Registered Office Address</span>
                <p className="font-medium text-white leading-relaxed">
                  {COMPANY_CREDENTIALS.address}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Customer Helpline: <strong className="font-mono text-white">{COMPANY_CREDENTIALS.helpline}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Official Email: <strong className="text-white">{COMPANY_CREDENTIALS.email}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Official Portal: <strong className="text-white">{COMPANY_CREDENTIALS.website}</strong></span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_CREDENTIALS.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-400 hover:bg-sky-300 text-[#030914] text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-[#061830] via-[#040e1f] to-black p-6 sm:p-8 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-sky-400/20">
              <div>
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="font-mono font-bold text-sky-400">
                    Delhi NCR Facilitation Network
                  </span>
                  <span className="font-semibold text-sky-200">
                    Jurisdiction: Delhi
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 font-display">
                  Harsh Vihar Coordination Hub
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Serving North East Delhi, East Delhi, Central Delhi, North Delhi, and the wider National Capital Territory through rapid MOU partner dispatch corridors.
                </p>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="bg-black/65 p-3 rounded-xl border border-sky-400/20 flex items-center justify-between">
                    <span className="text-slate-300">Central Ambulance Dispatch Desk</span>
                    <span className="text-sky-300 font-bold">24x7 Active</span>
                  </div>
                  <div className="bg-black/65 p-3 rounded-xl border border-sky-400/20 flex items-center justify-between">
                    <span className="text-slate-300">Harsh Vihar / Dilshad Corridor</span>
                    <span className="text-emerald-300 font-bold">Priority Zone</span>
                  </div>
                  <div className="bg-black/65 p-3 rounded-xl border border-sky-400/20 flex items-center justify-between">
                    <span className="text-slate-300">Statutory Record Keeper</span>
                    <span className="text-slate-200">MCA ADC-8783</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-400/15 text-xs text-slate-400 flex items-center justify-between">
                <span>Emergency Toll-Free Helpline</span>
                <span className="text-rose-400 font-bold font-mono">Dial 102 / 112 directly</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Operational Scope & Ethics */}
        {activeTab === 'governance' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="sky-black-card p-6 rounded-2xl">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-display">
                <Building className="w-5 h-5 text-sky-400" />
                <span>Facilitation Scope Definition</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Global Care Link Services LLP operates strictly as an independent healthcare facilitation agency. We do not provide clinical diagnosis, medical treatment, pharmaceutical dispensing, or insurance risk underwriting. Our mission is to streamline patient logistics, eliminate hospital queue barriers, and coordinate affordable healthcare solutions via verified third-party memorandum of understanding (MOU) partners.
              </p>
            </div>

            <div className="sky-black-card p-6 rounded-2xl">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-display">
                <FileText className="w-5 h-5 text-sky-400" />
                <span>Partner Quality Assurance &amp; MOUs</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every hospital, diagnostic laboratory, ambulance operator, and home nursing agency empanelled in our network must possess statutory licenses, accreditation (such as NABL/NABH where applicable), and sign formal compliance covenants adhering to Indian healthcare safety standards.
              </p>
            </div>

            <div className="sky-black-card p-6 rounded-2xl">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-display">
                <Calendar className="w-5 h-5 text-sky-400" />
                <span>Annual Review &amp; Renewal Policy</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Membership cards are active for exactly 365 days from the date of issuance. Renewal is completely voluntary with zero automatic debits or hidden maintenance fees.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
