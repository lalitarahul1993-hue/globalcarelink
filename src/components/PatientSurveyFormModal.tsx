import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  PhoneCall, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  User, 
  Printer, 
  Clock, 
  Sparkles,
  Upload,
  Plus,
  Trash2,
  Lock,
  FileText,
  MapPin,
  Building,
  HeartPulse,
  IdCard,
  QrCode,
  Tag
} from 'lucide-react';
import { PatientSurveyFormData, MemberRecord, PreferredHospitalItem, EmergencyContactItem } from '../types';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';
import { saveSubmission, getStoredAgents } from '../utils/storage';

interface PatientSurveyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMember: MemberRecord) => void;
}

export const PatientSurveyFormModal: React.FC<PatientSurveyFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<'survey' | 'payment' | 'issued'>('survey');
  const [surveyTab, setSurveyTab] = useState<number>(1); // 1 to 6 tabs for easier navigation

  // Form State initialized with realistic defaults matching PDF
  const [formData, setFormData] = useState<PatientSurveyFormData>({
    fullName: '',
    contactNo: '',
    gender: 'Male',
    dob: '',
    fatherOrHusbandName: '',
    currentAddress: '',
    pinCode: '',
    bloodGroup: 'B+',
    aadhaarNo: '',
    height: '',
    weight: '',
    occupation: '',
    photoUrl: null,
    referredByAgentId: '',

    // Section 2
    gallbladderStones: false,
    kidneyStones: false,
    hernia: false,
    pilesFistula: false,
    rasoliFibroid: false,
    otherCriticalIllness: false,
    specificIllnessDetails: '',

    // Section 3: Up to 5 Hospitals
    preferredHospitals: [
      { id: 1, hospitalName: '', location: '' },
      { id: 2, hospitalName: '', location: '' },
      { id: 3, hospitalName: '', location: '' }
    ],

    // Section 4: Insurance
    insuranceType: 'cash',
    companyTpa: '',
    ayushmanCardNo: '',

    // Section 5: Emergency Contacts (Up to 5)
    emergencyContacts: [
      { sNo: 1, name: '', contactNo: '', relationship: '', remarksVehicle: '' },
      { sNo: 2, name: '', contactNo: '', relationship: '', remarksVehicle: '' }
    ],

    // Section 6: Legal Declaration
    declarationAgreed: false,
    declarationDate: new Date().toLocaleDateString('en-GB'),
    declarationPlace: 'Delhi',
    signatureName: '',

    // Payment Info
    paymentMethod: 'UPI',
    amount: 599
  });

  const [demoPaymentProcessing, setDemoPaymentProcessing] = useState(false);
  const [issuedMember, setIssuedMember] = useState<MemberRecord | null>(null);
  const [matchedAgentName, setMatchedAgentName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        const cleanRef = ref.trim().toLowerCase();
        setFormData(prev => ({ ...prev, referredByAgentId: cleanRef }));
        const agents = getStoredAgents();
        const found = agents.find(a => a.agentId.toLowerCase() === cleanRef);
        if (found) {
          setMatchedAgentName(`${found.fullName} (${found.agentId})`);
        }
      }
    }
  }, [isOpen]);

  const handleAgentIdChange = (val: string) => {
    const clean = val.trim().toLowerCase();
    setFormData(prev => ({ ...prev, referredByAgentId: clean }));
    if (clean) {
      const agents = getStoredAgents();
      const found = agents.find(a => a.agentId.toLowerCase() === clean);
      if (found) {
        setMatchedAgentName(`${found.fullName} (${found.agentId})`);
      } else {
        setMatchedAgentName(null);
      }
    } else {
      setMatchedAgentName(null);
    }
  };

  if (!isOpen) return null;

  // Handlers for dynamic array fields
  const handleHospitalChange = (index: number, field: keyof PreferredHospitalItem, value: string) => {
    const updated = [...formData.preferredHospitals];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, preferredHospitals: updated });
  };

  const addHospitalRow = () => {
    if (formData.preferredHospitals.length < 5) {
      setFormData({
        ...formData,
        preferredHospitals: [
          ...formData.preferredHospitals,
          { id: formData.preferredHospitals.length + 1, hospitalName: '', location: '' }
        ]
      });
    }
  };

  const removeHospitalRow = (index: number) => {
    if (formData.preferredHospitals.length > 1) {
      const updated = formData.preferredHospitals.filter((_, i) => i !== index);
      setFormData({ ...formData, preferredHospitals: updated });
    }
  };

  const handleContactChange = (index: number, field: keyof EmergencyContactItem, value: string) => {
    const updated = [...formData.emergencyContacts];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, emergencyContacts: updated });
  };

  const addContactRow = () => {
    if (formData.emergencyContacts.length < 5) {
      setFormData({
        ...formData,
        emergencyContacts: [
          ...formData.emergencyContacts,
          { sNo: formData.emergencyContacts.length + 1, name: '', contactNo: '', relationship: '', remarksVehicle: '' }
        ]
      });
    }
  };

  const removeContactRow = (index: number) => {
    if (formData.emergencyContacts.length > 1) {
      const updated = formData.emergencyContacts.filter((_, i) => i !== index);
      setFormData({ ...formData, emergencyContacts: updated });
    }
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

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declarationAgreed) {
      alert('कृपया वैधानिक घोषणा (Declaration) पर सहमति प्रदान करें।');
      return;
    }
    // Advance to Payment Step
    setCurrentStep('payment');
  };

  const handleProcessPayment = () => {
    setDemoPaymentProcessing(true);
    setTimeout(() => {
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const newCardNumber = `ADC-8783-${randomSuffix}`;
      const randomPayId = `pay_demo_${Math.random().toString(36).substring(2, 10)}`;

      const completedSurvey: PatientSurveyFormData = {
        ...formData,
        paymentStatus: 'PAID',
        paymentId: randomPayId,
        signatureName: formData.signatureName || formData.fullName
      };

      const now = new Date();
      const issueDateStr = now.toLocaleDateString('en-GB');
      const nextYear = new Date(now);
      nextYear.setFullYear(now.getFullYear() + 1);
      const validTillStr = nextYear.toLocaleDateString('en-GB');

      const newMember: MemberRecord = {
        cardNumber: newCardNumber,
        fullName: formData.fullName || 'Member',
        mobile: formData.contactNo || '+91 7290835403',
        dob: formData.dob || '01/01/1990',
        gender: formData.gender,
        preferredLocation: formData.currentAddress || 'Harsh Vihar, Delhi',
        issueDate: issueDateStr,
        validTill: validTillStr,
        status: 'ACTIVE',
        jurisdiction: 'Delhi Only',
        tier: 'All 12 MOU Facilitation Services Active',
        photoUrl: formData.photoUrl,
        paymentStatus: 'PAID',
        paymentMethod: `UPI / ${completedSurvey.paymentMethod}`,
        referredByAgentId: formData.referredByAgentId?.trim().toLowerCase() || undefined,
        surveyData: completedSurvey,
        submittedAt: new Date().toISOString()
      };

      // Save to localStorage & notify system
      saveSubmission(newMember);

      setIssuedMember(newMember);
      onSuccess(newMember);
      setDemoPaymentProcessing(false);
      setCurrentStep('issued');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className={`bg-white rounded-3xl ${currentStep === 'survey' ? 'max-w-4xl' : currentStep === 'payment' ? 'max-w-xl' : 'max-w-4xl'} w-full max-h-[92vh] flex flex-col shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-200 transition-all`}>
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ================= STEP 1: COMPREHENSIVE PATIENT ASSISTANCE & HEALTH SURVEY FORM ================= */}
        {currentStep === 'survey' && (
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Form Top Header (Exact Copy of Official PDF Header) */}
            <div className="bg-gradient-to-r from-[#071933] via-[#0d274c] to-[#071933] text-white p-4 sm:p-6 rounded-t-3xl border-b border-amber-400/50 shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#061833] border border-amber-400/60 p-1 flex items-center justify-center shrink-0">
                    <CompanyLogo className="w-10 h-10" withGlow />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-white font-display">
                      GLOBAL CARE LINK SERVICES LLP
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide">
                      PATIENT ASSISTANCE & HEALTH SURVEY FORM / रोगी सहायता एवं स्वास्थ्य सर्वेक्षण प्रपत्र
                    </p>
                  </div>
                </div>

                <div className="text-right hidden md:block text-[11px] font-mono text-slate-300">
                  <p><strong className="text-amber-400">LLPIN:</strong> {COMPANY_CREDENTIALS.llpin}</p>
                  <p><strong className="text-amber-400">PAN:</strong> {COMPANY_CREDENTIALS.pan} | <strong className="text-amber-400">TAN:</strong> {COMPANY_CREDENTIALS.tan}</p>
                </div>
              </div>

              {/* Progress Steps / Tabs */}
              <div className="flex items-center justify-between gap-1 mt-4 pt-3 border-t border-slate-700/80 overflow-x-auto text-[11px] font-semibold">
                {[
                  { id: 1, label: '1. रोगी विवरण (Patient Profile)' },
                  { id: 2, label: '2. स्वास्थ्य सर्वेक्षण (Medical)' },
                  { id: 3, label: '3. अस्पताल (Hospitals)' },
                  { id: 4, label: '4. बीमा (Insurance)' },
                  { id: 5, label: '5. आपातकालीन संपर्क (Contacts)' },
                  { id: 6, label: '6. घोषणा (Declaration)' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSurveyTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      surveyTab === t.id
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSurveySubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">

              {/* ----------------- SECTION 1: PATIENT PROFILE ----------------- */}
              {surveyTab === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>1. PATIENT PROFILE / रोगी का व्यक्तिगत विवरण</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Page 1 of Survey</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Full Name (पूरा नाम) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Contact No. (मोबाइल) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        placeholder="+91 72908 XXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Gender (लिंग) *
                      </label>
                      <div className="flex items-center gap-3 mt-1">
                        {['Male', 'Female', 'Other'].map((g) => (
                          <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={() => setFormData({ ...formData, gender: g as 'Male' | 'Female' | 'Other' })}
                              className="text-amber-500 focus:ring-amber-500"
                            />
                            <span className="text-xs text-slate-700 font-medium">
                              {g === 'Male' ? 'Male (पुरुष)' : g === 'Female' ? 'Female (महिला)' : 'Other'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Date of Birth (जन्म तिथि) *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Blood Group (रक्त समूह) *
                      </label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 font-mono focus:outline-none"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-xs">
                      Father&apos;s / Husband&apos;s Name (पिता या पति का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fatherOrHusbandName}
                      onChange={(e) => setFormData({ ...formData, fatherOrHusbandName: e.target.value })}
                      placeholder="e.g. Shri Ramesh Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Current Address (वर्तमान पता) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.currentAddress}
                        onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                        placeholder="House / Gali / Colony, Harsh Vihar, Delhi"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Pin Code (पिन कोड) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pinCode}
                        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                        placeholder="110093"
                        maxLength={6}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Aadhaar No. (आधार संख्या) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.aadhaarNo}
                        onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                        placeholder="XXXX XXXX XXXX"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Height (लंबाई)
                      </label>
                      <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        placeholder="e.g. 5'8'' or 172 cm"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Weight (वजन)
                      </label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="e.g. 70 kg"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">
                        Occupation (व्यवसाय)
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        placeholder="e.g. Business / Service"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Photo Upload Area */}
                  <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-16 rounded border-2 border-dashed border-amber-400 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                        {formData.photoUrl ? (
                          <img src={formData.photoUrl} alt="Cardholder" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-1">
                            <Upload className="w-4 h-4 text-amber-600 mx-auto" />
                            <span className="text-[8px] text-slate-400 block font-mono">35x40mm</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Card Photo (35x40 mm) / फोटो
                        </span>
                        <span className="text-[11px] text-slate-600">
                          Upload passport size photo to appear on your official healthcare card.
                        </span>
                      </div>
                    </div>

                    <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs">
                      <span>{formData.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Referral / Agent ID Input */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full sm:w-auto flex-1">
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-600" />
                        <span>Referral / Agent ID (यदि किसी एजेंट के माध्यम से जुड़े हैं तो दर्ज करें)</span>
                        <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.referredByAgentId || ''}
                          onChange={(e) => handleAgentIdChange(e.target.value)}
                          placeholder="e.g. gcl001 or gcl002"
                          className="w-full sm:w-64 px-3 py-1.5 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs font-mono uppercase text-slate-900 focus:outline-none"
                        />
                        {matchedAgentName && (
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{matchedAgentName}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 text-right sm:max-w-[220px] shrink-0">
                      एजेंट आईडी दर्ज करने पर संबंधित एजेंट को Upto ₹200 कमीशन स्वतः क्रेडिट होगा तथा जारी कार्ड पर Agent ID मुद्रित रहेगी।
                    </span>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(2)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Next: 2. Medical Survey →
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- SECTION 2: MEDICAL & HOSPITALIZATION SURVEY ----------------- */}
              {surveyTab === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-rose-600" />
                      <span>2. MEDICAL & HOSPITALIZATION SURVEY / स्वास्थ्य एवं अस्पताल सर्वेक्षण</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Check all that apply</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    कृपया उन स्वास्थ्य समस्याओं पर टिक करें जिनसे आप या रोगी पूर्व में ग्रसित रहे हैं या वर्तमान में उपचार चल रहा है:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'gallbladderStones', label: 'Gallbladder Stones (पित्त की थैली की पथरी)' },
                      { key: 'kidneyStones', label: 'Kidney Stones (गुर्दे की पथरी)' },
                      { key: 'hernia', label: 'Hernia (हर्निया)' },
                      { key: 'pilesFistula', label: 'Piles / Fistula (बवासीर / फिस्टुला)' },
                      { key: 'rasoliFibroid', label: 'Rasoli / Fibroid (रसौली / ट्यूमर)' },
                      { key: 'otherCriticalIllness', label: 'Other Critical Illness (अन्य कोई गंभीर बीमारी)' }
                    ].map(item => (
                      <label
                        key={item.key}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData[item.key as keyof PatientSurveyFormData]
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(formData[item.key as keyof PatientSurveyFormData])}
                          onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="text-xs">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-xs">
                      Specific Illness Details (अन्य बीमारी या वर्तमान उपचार का विवरण):
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specificIllnessDetails}
                      onChange={(e) => setFormData({ ...formData, specificIllnessDetails: e.target.value })}
                      placeholder="यदि कोई अन्य बीमारी, दवा या पूर्व शल्यक्रिया (Surgery) हुई हो तो यहाँ विवरण लिखें..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(1)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setSurveyTab(3)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      Next: 3. Preferred Hospitals →
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- SECTION 3: PREFERRED HOSPITALS IN NEIGHBORHOOD ----------------- */}
              {surveyTab === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-600" />
                      <span>3. PREFERRED HOSPITALS IN NEIGHBORHOOD / पसंदीदा अस्पताल (प्राथमिकता के अनुसार)</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Up to 5 Hospitals</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    कृपया प्राथमिकता के अनुसार अपने आस-पास के 5 पसंदीदा अस्पतालों के नाम लिखें जहाँ आप आपातकाल में जाना चाहेंगे:
                  </p>

                  <div className="space-y-3">
                    {formData.preferredHospitals.map((hosp, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>

                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={hosp.hospitalName}
                            onChange={(e) => handleHospitalChange(idx, 'hospitalName', e.target.value)}
                            placeholder={`अस्पताल का नाम (Hospital ${idx + 1})`}
                            className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                        </div>

                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={hosp.location}
                            onChange={(e) => handleHospitalChange(idx, 'location', e.target.value)}
                            placeholder="इलाका / Location (e.g. Dilshad Garden / Shahdara)"
                            className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                        </div>

                        {formData.preferredHospitals.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHospitalRow(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1.5"
                            title="Remove Hospital"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {formData.preferredHospitals.length < 5 && (
                    <button
                      type="button"
                      onClick={addHospitalRow}
                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Preferred Hospital (Up to 5)</span>
                    </button>
                  )}

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(2)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setSurveyTab(4)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      Next: 4. Health Insurance →
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- SECTION 4: HEALTH INSURANCE / CARD AVAILABILITY ----------------- */}
              {surveyTab === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>4. HEALTH INSURANCE / CARD AVAILABILITY / स्वास्थ्य बीमा एवं कार्ड की उपलब्धता</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Page 2 of Survey</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    कृपया अपने पास उपलब्ध स्वास्थ्य बीमा या कार्ड का चयन करें:
                  </p>

                  <div className="space-y-3">
                    {/* Option 1: Private Insurance */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      formData.insuranceType === 'private' ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs sm:text-sm text-slate-900">
                        <input
                          type="radio"
                          name="insuranceType"
                          value="private"
                          checked={formData.insuranceType === 'private'}
                          onChange={() => setFormData({ ...formData, insuranceType: 'private' })}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>Private Health Insurance Card (प्राइवेट स्वास्थ्य बीमा कार्ड धारक)</span>
                      </label>
                      {formData.insuranceType === 'private' && (
                        <div className="mt-3 pl-6">
                          <label className="block text-slate-700 font-semibold mb-1 text-xs">
                            Company / TPA Name (बीमा कंपनी या टीपीए का नाम):
                          </label>
                          <input
                            type="text"
                            value={formData.companyTpa}
                            onChange={(e) => setFormData({ ...formData, companyTpa: e.target.value })}
                            placeholder="e.g. Star Health / Care / HDFC Ergo / Medi Assist"
                            className="w-full px-3.5 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Option 2: Ayushman / Govt */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      formData.insuranceType === 'ayushman' ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs sm:text-sm text-slate-900">
                        <input
                          type="radio"
                          name="insuranceType"
                          value="ayushman"
                          checked={formData.insuranceType === 'ayushman'}
                          onChange={() => setFormData({ ...formData, insuranceType: 'ayushman' })}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>Ayushman Bharat / State Govt. Card (आयुष्मान या सरकारी स्वास्थ्य कार्ड धारक)</span>
                      </label>
                      {formData.insuranceType === 'ayushman' && (
                        <div className="mt-3 pl-6">
                          <label className="block text-slate-700 font-semibold mb-1 text-xs">
                            Card No / ABHA ID (कार्ड संख्या / आभा नंबर):
                          </label>
                          <input
                            type="text"
                            value={formData.ayushmanCardNo}
                            onChange={(e) => setFormData({ ...formData, ayushmanCardNo: e.target.value })}
                            placeholder="e.g. AB-DEL-1234567"
                            className="w-full px-3.5 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 font-mono focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Option 3: No Card / Cash Patient */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      formData.insuranceType === 'cash' ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs sm:text-sm text-slate-900">
                        <input
                          type="radio"
                          name="insuranceType"
                          value="cash"
                          checked={formData.insuranceType === 'cash'}
                          onChange={() => setFormData({ ...formData, insuranceType: 'cash' })}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span>No Card / Cash Patient (कोई कार्ड या बीमा नहीं है / नकद भुगतान)</span>
                      </label>
                      <p className="text-[11px] text-slate-500 pl-6 mt-1">
                        हमारे कार्ड के माध्यम से आपको संबद्ध एमओयू अस्पतालों और लैब्स में विशेष रियायती दरें प्राप्त होंगी।
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(3)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setSurveyTab(5)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      Next: 5. Emergency Contacts →
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- SECTION 5: EMERGENCY CONTACTS & WITNESS ----------------- */}
              {surveyTab === 5 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-rose-600" />
                      <span>5. EMERGENCY CONTACTS & WITNESS / आपातकालीन संपर्क एवं साक्षी विवरण</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Up to 5 Contacts</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    आपातकाल या त्वरित अस्पताल सहायता के समय जिन 5 व्यक्तियों से तुरंत संपर्क किया जा सके:
                  </p>

                  <div className="space-y-3">
                    {formData.emergencyContacts.map((contact, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-xs flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-mono text-[11px] flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <span>Contact Person #{idx + 1}</span>
                          </span>
                          {formData.emergencyContacts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeContactRow(idx)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Remove Contact"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                          <input
                            type="text"
                            required
                            value={contact.name}
                            onChange={(e) => handleContactChange(idx, 'name', e.target.value)}
                            placeholder="Name (नाम) *"
                            className="px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                          <input
                            type="tel"
                            required
                            value={contact.contactNo}
                            onChange={(e) => handleContactChange(idx, 'contactNo', e.target.value)}
                            placeholder="Contact No. (मोबाइल) *"
                            className="px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 font-mono focus:outline-none"
                          />
                          <input
                            type="text"
                            required
                            value={contact.relationship}
                            onChange={(e) => handleContactChange(idx, 'relationship', e.target.value)}
                            placeholder="Relationship (संबंध) *"
                            className="px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={contact.remarksVehicle}
                            onChange={(e) => handleContactChange(idx, 'remarksVehicle', e.target.value)}
                            placeholder="Remarks / Vehicle (कार / बाइक)"
                            className="px-3 py-2 bg-white border border-slate-300 focus:border-amber-500 rounded-lg text-xs text-slate-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {formData.emergencyContacts.length < 5 && (
                    <button
                      type="button"
                      onClick={addContactRow}
                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Emergency Contact (Up to 5)</span>
                    </button>
                  )}

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(4)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setSurveyTab(6)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      Next: 6. Legal Declaration →
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- SECTION 6: LEGAL DECLARATION BY APPLICANT ----------------- */}
              {surveyTab === 6 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span>6. LEGAL DECLARATION BY APPLICANT / प्रार्थी द्वारा वैधानिक घोषणा</span>
                    </span>
                    <span className="text-[11px] text-amber-800 font-bold">Mandatory</span>
                  </div>

                  {/* Verbatim Disclaimer and Consent Box from PDF Page 2 */}
                  <div className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-2xl text-xs text-slate-800 leading-relaxed space-y-2">
                    <h5 className="font-black text-amber-950 uppercase">
                      घोषणा एवं सहमति पत्र (Disclaimer &amp; Consent):
                    </h5>
                    <p className="text-slate-700 text-justify">
                      &ldquo;मैं एतद्द्वारा सत्यनिष्ठा से घोषणा करता/करती हूँ कि इस प्रपत्र में मेरे द्वारा दी गई उपरोक्त सभी जानकारी पूर्णतः सत्य, सटीक और प्रमाणित है। मैं यह भली-भाँति समझता/समझती हूँ कि <strong>Global Care Link Services LLP</strong> स्वयं कोई डॉक्टर, नर्स या चिकित्सा संस्थान (Hospital) नहीं है। यह संस्था केवल आपातकालीन सहायता, एम्बुलेंस समन्वय, तथा अधिकृत लैब्स (Authorized Diagnostic Labs) एवं संबद्ध अस्पतालों (Hospitals) के साथ संपर्क/रेफरल (Referral &amp; Facilitation) कराने का कार्य करती है। आपातकालीन स्थिति में संस्था द्वारा प्रदान की जाने वाली इस त्वरित अस्पताल सहायता और मार्गदर्शन सेवाओं के लिए मैं पूर्ण सहमति प्रदान करता/करती हूँ।&rdquo;
                    </p>
                  </div>

                  <label className="flex items-start gap-3 p-3 bg-white border-2 border-amber-400 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.declarationAgreed}
                      onChange={(e) => setFormData({ ...formData, declarationAgreed: e.target.checked })}
                      className="w-5 h-5 text-amber-600 rounded mt-0.5 focus:ring-amber-500"
                    />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      I have read, understood and accept all terms of this declaration / मैंने यह घोषणा पूर्णतः पढ़कर अपनी सहमति दी है। *
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">Date (दिनांक)</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.declarationDate}
                        className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">Place (स्थान)</label>
                      <input
                        type="text"
                        value={formData.declarationPlace}
                        onChange={(e) => setFormData({ ...formData, declarationPlace: e.target.value })}
                        placeholder="e.g. Delhi"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-xs">Applicant Signature / Name (हस्ताक्षर / नाम)</label>
                      <input
                        type="text"
                        value={formData.signatureName || formData.fullName}
                        onChange={(e) => setFormData({ ...formData, signatureName: e.target.value })}
                        placeholder="Type Full Name as Digital Signature"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xs"
                      />
                    </div>
                  </div>

                  {/* Pricing summary */}
                  <div className="p-4 bg-gradient-to-r from-[#071933] to-[#0d274c] text-white rounded-2xl border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                        Annual Healthcare Facilitation Fee
                      </span>
                      <span className="text-2xl font-black text-white font-display">
                        ₹599 / Year
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-300 block">
                        Includes Official Health Card + All 12 Services
                      </span>
                      <span className="text-[11px] text-amber-300 font-mono">
                        Capped Liability: ₹599 · Jurisdiction: Delhi
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setSurveyTab(5)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.declarationAgreed}
                      className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-200 text-[#071933] font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Proceed to Payment (₹599) →</span>
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>
        )}

        {/* ================= STEP 2: DEMO PAYMENT GATEWAY (Razorpay Ready) ================= */}
        {currentStep === 'payment' && (
          <div className="p-6 sm:p-8 flex flex-col h-full overflow-y-auto">
            
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider block mb-1">
                  Razorpay Ready · Demo Payment Mode
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  Complete Payment of ₹599
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Card will be generated and issued immediately upon successful payment confirmation.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#071933] p-1.5 border border-amber-400/50 flex items-center justify-center shrink-0">
                <CompanyLogo className="w-9 h-9" withGlow />
              </div>
            </div>

            {/* Applicant Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mobile Number:</span>
                <span className="font-mono font-semibold text-slate-900">{formData.contactNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-semibold text-slate-900">Annual Healthcare Facilitation Card (365 Days)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="font-extrabold text-slate-900">Total Payable Amount:</span>
                <span className="font-black text-emerald-700">₹599.00</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Select Payment Mode:
              </label>

              {[
                { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm, BHIM)', icon: QrCode, badge: 'Instant Activation' },
                { id: 'CARD', label: 'Debit / Credit Card (Visa, RuPay, MasterCard)', icon: CreditCard },
                { id: 'NETBANKING', label: 'Net Banking (All Major Indian Banks)', icon: Building }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === m.id
                      ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <m.icon className="w-5 h-5 text-amber-600" />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">{m.label}</span>
                      {m.badge && <span className="text-[10px] text-emerald-700 font-semibold">{m.badge}</span>}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={formData.paymentMethod === m.id}
                    onChange={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                </label>
              ))}
            </div>

            {/* UPI QR Simulation Box */}
            {formData.paymentMethod === 'UPI' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2 mb-6">
                <span className="text-[11px] font-bold text-slate-700 uppercase">Scan &amp; Pay via any UPI App</span>
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-300 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full bg-[#071933] rounded-lg p-2 flex flex-col items-center justify-center text-amber-400 text-center">
                    <QrCode className="w-16 h-16 text-amber-300" />
                    <span className="text-[9px] font-mono text-white mt-1">UPI: 7290835403@gcl</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Demo Gateway: Click &ldquo;Confirm Payment&rdquo; below to simulate real-time gateway callback.
                </p>
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Razorpay Ready Architecture:</strong> Payload is prepared for live production Razorpay keys (`key_id`, `order_id`, webhook sync).
              </span>
            </div>

            <div className="flex gap-3 mt-6 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('survey')}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back to Form
              </button>

              <button
                type="button"
                disabled={demoPaymentProcessing}
                onClick={handleProcessPayment}
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {demoPaymentProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Demo Payment (₹599)...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Demo Payment ₹599 &amp; Generate Card</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 3: CARD ISSUED & SUCCESS CONFIRMATION ================= */}
        {currentStep === 'issued' && issuedMember && (
          <div className="p-6 sm:p-8 flex flex-col h-full overflow-y-auto space-y-5 text-center">
            
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Payment Received · Transaction ID: {issuedMember.surveyData?.paymentId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-display">
                Official Healthcare Card Issued Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-1">
                All patient assistance survey details have been saved in the company database. Your card is active immediately.
              </p>
            </div>

            {/* THE EXACT OFFICIAL CARD AS ISSUED */}
            <div className="my-2 max-w-3xl mx-auto w-full text-left">
              <OfficialCompanyCard
                id="official-issued-card"
                data={{
                  cardNumber: issuedMember.cardNumber,
                  customerName: issuedMember.fullName,
                  customerMobile: issuedMember.mobile,
                  dateOfIssue: issuedMember.issueDate,
                  validity: issuedMember.validTill,
                  photoUrl: issuedMember.photoUrl,
                  agentId: issuedMember.referredByAgentId || issuedMember.surveyData?.referredByAgentId || 'gcl001'
                }}
              />
            </div>

            {/* Submissions Details Confirmation Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs max-w-3xl mx-auto w-full space-y-2">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                Recorded Patient Survey Summary:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-slate-500 block">Father/Husband:</span>
                  <span className="font-bold text-slate-800">{issuedMember.surveyData?.fatherOrHusbandName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Aadhaar No:</span>
                  <span className="font-mono font-bold text-slate-800">{issuedMember.surveyData?.aadhaarNo || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Blood Group:</span>
                  <span className="font-bold text-amber-700">{issuedMember.surveyData?.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Insurance:</span>
                  <span className="font-bold text-slate-800 uppercase">{issuedMember.surveyData?.insuranceType}</span>
                </div>
              </div>
            </div>

            {/* Print & Action Controls */}
            <div className="flex flex-wrap gap-3 max-w-3xl mx-auto w-full pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 min-w-[200px] py-3.5 bg-[#071933] hover:bg-[#0a2347] text-[#ffd966] font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Card</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 min-w-[200px] py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer shadow-md"
              >
                Close &amp; Return to Website
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
