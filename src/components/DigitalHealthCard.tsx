import React, { useState } from 'react';
import { 
  Printer, 
  Check, 
  Sparkles, 
  Lock, 
  Upload, 
  RotateCcw, 
  Download,
  FileText
} from 'lucide-react';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CardFormData } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';

interface DigitalHealthCardProps {
  onCardGenerated?: (newCardNumber: string, customData?: any) => void;
  onOpenFullSurveyModal?: () => void;
}

export const DigitalHealthCard: React.FC<DigitalHealthCardProps> = ({ 
  onCardGenerated,
  onOpenFullSurveyModal
}) => {
  const [formData, setFormData] = useState<CardFormData & { photoUrl?: string | null }>({
    fullName: 'Rahul Sharma',
    mobile: '+91 7290835403',
    dob: '1988-08-14',
    gender: 'Male',
    preferredLocation: 'Harsh Vihar / North East Delhi',
    email: 'info@globalcarelinkservices.com',
    bloodGroup: 'B+',
    photoUrl: null
  });

  const [cardNumber, setCardNumber] = useState('ADC-8783-001');
  const [issueDate, setIssueDate] = useState('05/10/2026');
  const [validityDate, setValidityDate] = useState('04/10/2027');
  const [isGenerated, setIsGenerated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData(prev => ({ ...prev, photoUrl: uploadEvent.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newCard = `ADC-8783-${randomSuffix}`;
    setCardNumber(newCard);
    setIssueDate('10/10/2026');
    setValidityDate('09/10/2027');
    setIsGenerated(true);
    if (onCardGenerated) {
      onCardGenerated(newCard, formData);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText(cardNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleResetSample = () => {
    setFormData({
      fullName: 'Rahul Sharma',
      mobile: '+91 7290835403',
      dob: '1988-08-14',
      gender: 'Male',
      preferredLocation: 'Harsh Vihar, North East Delhi',
      email: 'info@globalcarelinkservices.com',
      bloodGroup: 'B+',
      photoUrl: null
    });
    setCardNumber('ADC-8783-001');
    setIssueDate('05/10/2026');
    setValidityDate('04/10/2027');
    setIsGenerated(false);
  };

  return (
    <section id="health-card" className="py-20 bg-[#040e1d] text-white relative border-b border-slate-800 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-md mb-3 border border-amber-800/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Company Healthcare Card</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Official Customer Healthcare Card
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            The authentic, statutory annual healthcare facilitation card issued by <strong className="text-amber-400">GLOBAL CARE LINK SERVICES LLP</strong>. Complete with customer credentials, partner details, and all 12 facilitation services.
          </p>
        </div>

        {/* TOP: FULL WIDTH OFFICIAL COMPANY CARD SHOWCASE */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffd966]">
                Live Dynamic Card Preview (As Issued)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSample}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>

              <button
                onClick={handleCopyCardNumber}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                <span>{copySuccess ? 'Copied' : 'Copy Card ID'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#071933] text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Card</span>
              </button>
            </div>
          </div>

          {/* THE OFFICIAL CARD ITSELF */}
          <div className="max-w-4xl mx-auto flex justify-center">
            <OfficialCompanyCard
              id="printable-card"
              data={{
                cardNumber: cardNumber,
                customerName: formData.fullName,
                customerMobile: formData.mobile,
                dateOfIssue: issueDate,
                validity: validityDate,
                photoUrl: formData.photoUrl,
                agentId: formData.referredByAgentId || 'gcl001'
              }}
            />
          </div>

          {isGenerated && (
            <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-xs text-emerald-200 max-w-4xl mx-auto text-center animate-in fade-in duration-300">
              <span className="font-bold block">✓ Card Successfully Generated with Your Details!</span>
              <span>Your Official Card ID is <strong>{cardNumber}</strong> (Agent ID: <strong>{formData.referredByAgentId || 'gcl001'}</strong>). You can verify it below in the Verification registry.</span>
            </div>
          )}
        </div>

        {/* BOTTOM: INTERACTIVE FORM TO PERSONALIZE / APPLY FOR THE OFFICIAL CARD */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* Banner to launch the full official Patient Assistance & Health Survey Form */}
          {onOpenFullSurveyModal && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#071933] to-amber-950/40 border border-[#d4af37]/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-[#d4af37] text-[#071933] flex items-center justify-center shrink-0 shadow-md">
                  <FileText className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Official 6-Section PDF Document</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">Mandatory for Full Benefits</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white mt-0.5">Patient Assistance & Health Survey Form</h4>
                  <p className="text-xs text-slate-300">Complete medical history, preferred 5 hospitals, insurance, emergency contacts & ₹599 card payment.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenFullSurveyModal}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#ffd966] via-amber-400 to-[#d4af37] text-[#071933] font-black text-xs sm:text-sm rounded-xl hover:from-amber-300 hover:to-[#ffd966] transition-all shrink-0 cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Fill Survey Form & Pay ₹599</span>
              </button>
            </div>
          )}

          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Quick Preview & Issue Card
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Apply for Your Official Customer Card
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Enter your details to generate your official card above in real time.
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#061833] border border-[#d4af37]/60 p-2 shrink-0 flex items-center justify-center shadow-md">
              <CompanyLogo className="w-10 h-10" withGlow />
            </div>
          </div>

          <form onSubmit={handleGenerateSubmit} className="space-y-4 text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 focus:border-[#d4af37] rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Customer Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 7290835403"
                  className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 focus:border-[#d4af37] rounded-xl text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 focus:border-[#d4af37] rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 focus:border-[#d4af37] rounded-xl text-white focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-xs">
                  Upload Photo (35x40 mm)
                </label>
                <label className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 hover:border-[#d4af37] rounded-xl text-slate-300 flex items-center justify-between cursor-pointer transition-colors">
                  <span className="truncate text-xs">
                    {formData.photoUrl ? 'Photo Uploaded ✓' : 'Choose Photo...'}
                  </span>
                  <Upload className="w-4 h-4 text-[#ffd966] shrink-0 ml-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">
                Preferred Area / Location in Delhi NCR *
              </label>
              <input
                type="text"
                name="preferredLocation"
                required
                value={formData.preferredLocation}
                onChange={handleInputChange}
                placeholder="e.g. Harsh Vihar, North East Delhi - 110093"
                className="w-full px-3.5 py-2.5 bg-[#061833] border border-slate-700 focus:border-[#d4af37] rounded-xl text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="p-3.5 bg-[#061833] rounded-xl border border-[#d4af37]/40 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Annual Facilitation Fee:</span>
                <span className="text-lg font-black text-[#ffd966]">₹599 / Year</span>
              </div>
              <span className="text-[11px] text-[#ffd966] font-mono bg-[#092247] px-3 py-1 rounded border border-[#d4af37]/40">
                12 Services Included (MOU)
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#ffd966] via-[#f3c64a] to-[#d4af37] hover:from-[#f3c64a] hover:to-[#ffd966] text-[#071933] font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Generate Official Card & Complete Enrollment</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <Lock className="w-3 h-3 text-[#ffd966]" />
              <span>Capped Liability: ₹599. Legal Jurisdiction: Delhi Only. Emergency: 102/112.</span>
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};
