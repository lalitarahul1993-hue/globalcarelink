import React, { useState } from 'react';
import { 
  Building, 
  FileText, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Globe, 
  Calendar, 
  Scale, 
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
    <section id="statutory" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-md mb-3 border border-slate-200">
            <Scale className="w-3.5 h-3.5 text-slate-700" />
            <span>Public Regulatory & Statutory Registry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Transparency & Statutory Compliance
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Global Care Link Services LLP operates under strict corporate governance guidelines established by the Ministry of Corporate Affairs, Government of India.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('statutory')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'statutory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Statutory Identifiers
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'location'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Registered Office & Map
            </button>
            <button
              onClick={() => setActiveTab('governance')}
              className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'governance'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Operational Scope & Ethics
            </button>
          </div>
        </div>

        {/* Tab Content 1: Statutory Identifiers */}
        {activeTab === 'statutory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {credentials.map((cred) => (
              <div 
                key={cred.key}
                className="bg-slate-50 border border-slate-200/90 hover:border-amber-400/80 p-6 rounded-2xl transition-all shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {cred.authority}
                  </span>
                  <button
                    onClick={() => copyToClipboard(cred.value, cred.key)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
                    title="Copy value"
                  >
                    {copiedKey === cred.key ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="text-sm font-bold text-slate-700">
                  {cred.label}
                </div>

                <div className="font-mono text-xl sm:text-2xl font-black text-[#0a192f] tracking-wider bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>{cred.value}</span>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Registered Office & Interactive Delhi Map */}
        {activeTab === 'location' && (
          <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
            
            {/* Address Details Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Principal Corporate Domicile</span>
                </div>
                <CompanyLogo className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {COMPANY_CREDENTIALS.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registered under Limited Liability Partnership Act, 2008
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                <span className="text-slate-500 block text-xs font-semibold">Registered Office Address:</span>
                <p className="font-semibold text-slate-900 leading-relaxed">
                  {COMPANY_CREDENTIALS.address}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <PhoneCall className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Customer Helpline: <strong>{COMPANY_CREDENTIALS.helpline}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official Email: <strong>{COMPANY_CREDENTIALS.email}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official Portal: <strong>{COMPANY_CREDENTIALS.website}</strong></span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_CREDENTIALS.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-[#0a192f] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Stylized Vector Map Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0a192f] to-[#142e5b] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    DELHI NCR FACILITATION NETWORK
                  </span>
                  <span className="text-[11px] font-semibold bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-400/40">
                    Jurisdiction: Delhi
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">
                  Harsh Vihar Coordination Hub
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Serving North East Delhi, East Delhi, Central Delhi, North Delhi, and the wider National Capital Territory through rapid MOU partner dispatch corridors.
                </p>

                {/* Network Nodes Simulation */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-[#071324]/80 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
                    <span className="text-slate-300">Central Ambulance Dispatch Desk</span>
                    <span className="text-amber-400 font-bold">24x7 Active</span>
                  </div>
                  <div className="bg-[#071324]/80 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
                    <span className="text-slate-300">Harsh Vihar / Dilshad Corridor</span>
                    <span className="text-emerald-400 font-bold">Priority Zone</span>
                  </div>
                  <div className="bg-[#071324]/80 p-2.5 rounded-lg border border-slate-700 flex items-center justify-between">
                    <span className="text-slate-300">Statutory Record Keeper</span>
                    <span className="text-slate-300">MCA ADC-8783</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Emergency Toll-Free Helpline:</span>
                <span className="text-rose-400 font-bold font-mono">Dial 102 / 112 directly</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab Content 3: Operational Scope & Ethics */}
        {activeTab === 'governance' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-600" />
                <span>Facilitation Scope Definition</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Global Care Link Services LLP operates strictly as an independent healthcare facilitation agency. We do not provide clinical diagnosis, medical treatment, pharmaceutical dispensing, or insurance risk underwriting. Our mission is to streamline patient logistics, eliminate hospital queue barriers, and coordinate affordable healthcare solutions via verified third-party memorandum of understanding (MOU) partners.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <span>Partner Quality Assurance & MOUs</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every hospital, diagnostic laboratory, ambulance operator, and home nursing agency empanelled in our network must possess statutory licenses, accreditation (such as NABL/NABH where applicable), and sign formal compliance covenants adhering to Indian healthcare safety standards.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>Annual Review & Renewal Policy</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Membership cards are active for exactly 365 days from the date of issuance. Renewal is completely voluntary with zero automatic debits or hidden maintenance fees.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
