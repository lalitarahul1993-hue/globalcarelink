import React, { useState } from 'react';
import {
  Printer,
  Check,
  Lock,
  Upload,
  RotateCcw,
  FileText
} from 'lucide-react';
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
    <section
      id="health-card"
      className="py-20 bg-gradient-to-b from-[#03070e] via-[#09203d] to-[#03070e] text-white relative border-b border-sky-400/20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mb-2">
            Official Company Healthcare Card
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight font-display">
            Official Customer Healthcare Card
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            The authentic annual healthcare facilitation card issued by{' '}
            <strong className="text-sky-300">GLOBAL CARE LINK SERVICES LLP</strong>. Complete with customer credentials, partner details, and all 12 facilitation services.
          </p>
        </div>

        {/* TOP: OFFICIAL COMPANY CARD SHOWCASE */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 max-w-4xl mx-auto">
            <span className="text-xs font-bold tracking-wider uppercase text-sky-300">
              Live Dynamic Card Preview
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSample}
                className="px-3 py-1.5 bg-black/70 hover:bg-sky-950 text-slate-200 text-xs font-semibold rounded-lg border border-sky-400/25 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                <span>Reset Demo</span>
              </button>

              <button
                onClick={handleCopyCardNumber}
                className="px-3 py-1.5 bg-black/70 hover:bg-sky-950 text-xs font-semibold text-slate-200 rounded-lg border border-sky-400/25 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-sky-400" /> : null}
                <span>{copySuccess ? 'Copied' : 'Copy Card ID'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-gradient-to-r from-sky-300 to-sky-400 hover:from-sky-200 hover:to-sky-300 text-[#030914] text-xs font-extrabold rounded-lg shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Card</span>
              </button>
            </div>
          </div>

          {/* THE OFFICIAL CARD */}
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
                agentId: formData.referredByAgentId || 'gcl001',
                approvalStatus: isGenerated ? 'PENDING' : 'APPROVED'
              }}
            />
          </div>

          {isGenerated && (
            <div className="mt-4 p-3.5 bg-sky-950/70 border border-sky-400/40 rounded-xl text-xs text-sky-100 max-w-4xl mx-auto text-center">
              <span className="font-bold block text-sky-300">✓ Card Successfully Generated with Your Details</span>
              <span>
                Your Official Card ID is <strong className="font-mono text-white">{cardNumber}</strong>. You can verify it below in the Verification registry.
              </span>
            </div>
          )}
        </div>

        {/* INTERACTIVE FORM TO PERSONALIZE / APPLY */}
        <div className="max-w-4xl mx-auto sky-black-card rounded-2xl p-6 sm:p-8 shadow-2xl">

          {onOpenFullSurveyModal && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/15 via-[#071a33] to-black/80 border border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-400 text-[#030914] flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-mono font-semibold text-sky-300 block">
                    Official 6-Section Form · Required for Full Benefits
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white mt-0.5 font-display">
                    Patient Assistance &amp; Health Survey Form
                  </h4>
                  <p className="text-xs text-slate-300">
                    Complete medical history, preferred 5 hospitals, insurance, emergency contacts &amp; ₹599 card enrollment.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenFullSurveyModal}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 text-[#030914] font-extrabold text-xs sm:text-sm rounded-xl hover:from-sky-200 hover:to-sky-300 transition-all shrink-0 cursor-pointer shadow-lg shadow-sky-500/20"
              >
                Fill Survey Form &amp; Pay ₹599
              </button>
            </div>
          )}

          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-sky-400 block mb-1">
                Quick Preview &amp; Issue Card
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Apply for Your Official Customer Card
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Enter your details to preview and generate your official card above in real time.
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-black/60 border border-sky-400/40 p-1.5 shrink-0 flex items-center justify-center">
              <CompanyLogo className="w-full h-full" withGlow />
            </div>
          </div>

          <form onSubmit={handleGenerateSubmit} className="space-y-4 text-xs sm:text-sm">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                  Customer Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 7290835403"
                  className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#040a14] border border-sky-400/25 focus:border-sky-400 rounded-xl text-white focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                  Upload Photo (35x40 mm)
                </label>
                <label className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 hover:border-sky-400 rounded-xl text-slate-200 flex items-center justify-between cursor-pointer transition-colors">
                  <span className="truncate text-xs">
                    {formData.photoUrl ? 'Photo Uploaded ✓' : 'Choose Photo...'}
                  </span>
                  <Upload className="w-4 h-4 text-sky-400 shrink-0 ml-2" />
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
              <label className="block text-sky-200 font-semibold mb-1.5 text-xs">
                Preferred Area / Location in Delhi NCR *
              </label>
              <input
                type="text"
                name="preferredLocation"
                required
                value={formData.preferredLocation}
                onChange={handleInputChange}
                placeholder="e.g. Harsh Vihar, North East Delhi - 110093"
                className="w-full px-3.5 py-2.5 bg-black/70 border border-sky-400/25 focus:border-sky-400 rounded-xl text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="p-4 bg-black/60 rounded-xl border border-sky-400/25 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Annual Facilitation Fee</span>
                <span className="text-xl font-extrabold text-sky-300 font-display tabular-nums">₹599 / Year</span>
              </div>
              <span className="text-xs text-sky-200 font-mono">
                12 Services Included (MOU)
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 hover:from-sky-200 hover:to-sky-300 text-[#030914] font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Generate Official Card &amp; Complete Enrollment</span>
            </button>

            <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Capped Liability: ₹599 · Legal Jurisdiction: Delhi Only · Emergency: 102/112</span>
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};
