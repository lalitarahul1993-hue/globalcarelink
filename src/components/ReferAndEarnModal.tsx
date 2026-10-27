import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  UserCheck, 
  CreditCard, 
  Award, 
  TrendingUp, 
  Smartphone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Search, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import { AgentRecord } from '../types';
import { 
  getStoredAgents, 
  saveAgent, 
  generateNextAgentId 
} from '../utils/storage';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

interface ReferAndEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAgent?: (agentId: string) => void;
}

export const ReferAndEarnModal: React.FC<ReferAndEarnModalProps> = ({
  isOpen,
  onClose,
  onSelectAgent
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'dashboard' | 'info'>('register');
  const [nextAgentId, setNextAgentId] = useState('gcl001');
  const [copySuccess, setCopySuccess] = useState(false);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    upiId: '',
    city: 'North East Delhi',
    address: ''
  });
  const [regSuccessAgent, setRegSuccessAgent] = useState<AgentRecord | null>(null);

  // Existing Agent Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [currentAgent, setCurrentAgent] = useState<AgentRecord | null>(null);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNextAgentId(generateNextAgentId());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedId = generateNextAgentId();
    
    const newAgent: AgentRecord = {
      agentId: assignedId,
      fullName: regForm.fullName.trim(),
      mobile: regForm.mobile.trim(),
      email: regForm.email.trim() || `${assignedId}@globalcarelinkservices.org`,
      upiId: regForm.upiId.trim(),
      city: regForm.city.trim(),
      address: regForm.address.trim(),
      createdAt: new Date().toISOString(),
      totalReferrals: 0,
      totalEarnings: 0,
      commissionPerCard: 200,
      status: 'ACTIVE',
      payoutStatus: 'PENDING',
      referredCards: []
    };

    saveAgent(newAgent);
    setRegSuccessAgent(newAgent);
    setCurrentAgent(newAgent);
    setActiveTab('dashboard');
    if (onSelectAgent) {
      onSelectAgent(newAgent.agentId);
    }
  };

  const handleLookupAgent = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    const query = lookupQuery.trim().toLowerCase();
    const agents = getStoredAgents();
    const found = agents.find(
      a => a.agentId.toLowerCase() === query || a.mobile.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
    );

    if (found) {
      setCurrentAgent(found);
      setLookupError('');
    } else {
      setLookupError(`कोई एजेंट नहीं मिला! कृपया सही Agent ID (जैसे: gcl001) या मोबाइल नंबर डालें।`);
    }
  };

  const getReferralUrl = (agentId: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('ref', agentId);
      return url.toString();
    }
    return `https://www.globalcarelinkservices.org/?ref=${agentId}`;
  };

  const handleCopyLink = (agentId: string) => {
    const url = getReferralUrl(agentId);
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareWhatsApp = (agent: AgentRecord) => {
    const url = getReferralUrl(agent.agentId);
    const message = `*GLOBAL CARE LINK SERVICES LLP*\n\nनमस्ते! मात्र ₹599/वर्ष में 12 स्वास्थ्य सुविधाएं (एंबुलेंस, डॉक्टर अपॉइंटमेंट, फार्मेसी, हॉस्पिटलाइजेशन सपोर्ट) प्राप्त करें।\n\nमेरा एजेंट रेफरल कोड: *${agent.agentId}*\n\nतुरंत कार्ड बनाने के लिए नीचे लिंक पर क्लिक करें:\n${url}\n\nहेल्पलाइन: +91 7290835403`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl relative border border-slate-200 animate-in fade-in duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#071933] text-white p-4 sm:p-6 border-b border-amber-400/50 flex items-center justify-between gap-4 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#061833] border border-amber-400/60 p-1 flex items-center justify-center shrink-0 shadow-md">
              <CompanyLogo className="w-9 h-9" withGlow />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Refer &amp; Earn Partner Program
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Upto ₹200 Commission / Card
                </span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  Official Partner Portal
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display mt-0.5">
                एजेंट पार्टनर बनें और हर रेफरल पर Upto ₹200 कमाएं
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0 relative z-10"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('register')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'register' 
                ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-500" />
            <span>1. नया एजेंट पार्टनर रजिस्ट्रेशन (Agent Registration)</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>2. एजेंट डैशबोर्ड व कमाई (Agent Dashboard)</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'info' 
                ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>3. नियम व कमीशन विवरण (How it Works)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 text-slate-800">
          
          {/* ================= TAB 1: REGISTER AS AGENT ================= */}
          {activeTab === 'register' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#071933] to-[#0c244d] text-white border border-amber-400/40 shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-300 block">
                    Official Partner Program
                  </span>
                  <h3 className="text-lg font-black text-amber-400 tracking-wide">
                    Instant Agent Enrollment
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    रजिस्टर करते ही आपकी आधिकारिक Agent ID जारी होगी, जो आपके द्वारा बनवाए गए प्रत्येक कार्ड पर दर्ज होगी।
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-300 block">कमीशन प्रति कार्ड</span>
                  <span className="text-2xl font-black text-emerald-400">Upto ₹200</span>
                  <span className="text-[10px] text-slate-400 block">सीधे UPI / बैंक में</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleRegisterSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-500" />
                  <span>एजेंट पार्टनर विवरण दर्ज करें (Agent Enrollment Form)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      एजेंट का पूरा नाम (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      placeholder="e.g. Sunil Verma"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मोबाइल नंबर (WhatsApp No.) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regForm.mobile}
                      onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                      placeholder="+91 98102 34567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      UPI ID (कमीशन भुगतान के लिए) *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.upiId}
                      onChange={(e) => setRegForm({ ...regForm, upiId: e.target.value })}
                      placeholder="e.g. 9810234567@paytm / name@oksbi"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Google Pay, PhonePe, Paytm, या BHIM UPI ID डालें।
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ईमेल पता (Email Address)
                    </label>
                    <input
                      type="email"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="e.g. agent@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      शहर / क्षेत्र (City / District) *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.city}
                      onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                      placeholder="e.g. Harsh Vihar, North East Delhi"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      पूरा पता (Full Address)
                    </label>
                    <input
                      type="text"
                      value={regForm.address}
                      onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                      placeholder="e.g. Gali No. 21, Harsh Vihar, Delhi - 110093"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    रजिस्ट्रेशन के बाद आपको आधिकारिक एजेंट आईडी प्राप्त होगी। आपकी आईडी से बनने वाले प्रत्येक ₹599 कार्ड पर Upto ₹200 कमीशन स्वतः आपके खाते में जुड़ जाएगा तथा जारी कार्ड पर आपकी Agent ID मुद्रित होगी।
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#071324] font-black text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>एजेंट पार्टनर बनें और तुरंत रेफरल कोड प्राप्त करें</span>
                </button>
              </form>

            </div>
          )}

          {/* ================= TAB 2: AGENT DASHBOARD & EARNINGS ================= */}
          {activeTab === 'dashboard' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* If no agent selected, show lookup search box */}
              {!currentAgent && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <h4 className="text-base font-extrabold text-slate-900 mb-1">
                    एजेंट लॉगिन (Check Your Referrals &amp; Earnings)
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    अपनी Agent ID (जैसे: gcl001) या रजिस्टर्ड मोबाइल नंबर डालकर अपना डैशबोर्ड देखें:
                  </p>

                  <form onSubmit={handleLookupAgent} className="flex gap-2 max-w-md mx-auto">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        placeholder="Agent ID (gcl001) या मोबाइल नंबर..."
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#071933] text-amber-400 hover:bg-[#0c244d] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      खोजें
                    </button>
                  </form>

                  {lookupError && (
                    <p className="text-xs text-rose-600 mt-3 font-semibold">
                      {lookupError}
                    </p>
                  )}

                  {/* Quick sample chips */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 flex-wrap text-xs">
                    <span className="text-slate-400 text-[11px]">डेमो एजेंट चेक करें:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setLookupQuery('gcl001');
                        const agents = getStoredAgents();
                        const found = agents.find(a => a.agentId === 'gcl001');
                        if (found) setCurrentAgent(found);
                      }}
                      className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg font-mono hover:bg-amber-100 cursor-pointer"
                    >
                      gcl001 (Sunil Verma)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLookupQuery('gcl002');
                        const agents = getStoredAgents();
                        const found = agents.find(a => a.agentId === 'gcl002');
                        if (found) setCurrentAgent(found);
                      }}
                      className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg font-mono hover:bg-amber-100 cursor-pointer"
                    >
                      gcl002 (Pooja Sharma)
                    </button>
                  </div>
                </div>
              )}

              {/* If Agent is loaded, show full dashboard */}
              {currentAgent && (
                <div className="space-y-6">
                  
                  {/* Top Bar with Agent Switcher */}
                  <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#071933] text-amber-400 flex items-center justify-center font-black font-mono text-base border border-amber-400/60 shrink-0">
                        {currentAgent.agentId.toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold text-slate-900">
                            {currentAgent.fullName}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {currentAgent.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">
                          ID: <strong className="text-amber-600">{currentAgent.agentId}</strong> · Phone: {currentAgent.mobile} · UPI: {currentAgent.upiId}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentAgent(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer shrink-0"
                    >
                      दूसरा एजेंट बदलें
                    </button>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 font-bold block mb-1">कुल रेफर किए गए कार्ड</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900">{currentAgent.totalReferrals || 0}</span>
                        <span className="text-xs text-emerald-600 font-bold">Cards</span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">सक्रिय ग्राहक कार्ड्स</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-xs bg-gradient-to-br from-white to-amber-50/50">
                      <span className="text-xs text-amber-800 font-bold block mb-1">कुल कमीशन कमाई (₹)</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-amber-600">₹{currentAgent.totalEarnings || 0}</span>
                        <span className="text-xs text-amber-700 font-bold">INR</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">Upto ₹{currentAgent.commissionPerCard || 200} / कार्ड की दर से</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 font-bold block mb-1">भुगतान स्थिति (Payout)</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-xl font-black ${currentAgent.payoutStatus === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {currentAgent.payoutStatus === 'PAID' ? '✓ PAID' : 'PENDING'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block font-mono truncate">
                        UPI: {currentAgent.upiId}
                      </span>
                    </div>
                  </div>

                  {/* Shareable Referral Link Box */}
                  <div className="bg-gradient-to-r from-[#071933] to-[#0c244d] p-5 rounded-2xl border border-amber-400/40 text-white shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Share2 className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-amber-400">
                        आपका पर्सनल शेयरिंग लिंक (Share &amp; Earn Link)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 mb-3">
                      इस लिंक को अपने परिचितों या सोशल मीडिया पर शेयर करें। इस लिंक से फॉर्म भरने पर आपका Agent ID (<strong>{currentAgent.agentId}</strong>) स्वतः लागू हो जाएगा:
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      <input
                        type="text"
                        readOnly
                        value={getReferralUrl(currentAgent.agentId)}
                        className="flex-1 px-3.5 py-2.5 bg-[#051124] border border-amber-400/40 rounded-xl text-white font-mono text-xs focus:outline-none"
                      />
                      
                      <button
                        onClick={() => handleCopyLink(currentAgent.agentId)}
                        className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#071324] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copySuccess ? 'Copied ✓' : 'Copy Link'}</span>
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(currentAgent)}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>WhatsApp पर शेयर करें</span>
                      </button>
                    </div>
                  </div>

                  {/* Referred Cards List */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center justify-between">
                      <span>आपके द्वारा रेफर किए गए कार्ड्स ({currentAgent.referredCards?.length || 0})</span>
                      <span className="text-xs font-normal text-slate-500">प्रत्येक कार्ड = Upto ₹200</span>
                    </h4>

                    {(!currentAgent.referredCards || currentAgent.referredCards.length === 0) ? (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        अभी तक इस एजेंट आईडी से कोई कार्ड नहीं बना है। ऊपर दिए गए लिंक को शेयर करके तुरंत कमाई शुरू करें!
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 text-xs">
                        {currentAgent.referredCards.map((cardNo, idx) => (
                          <div key={cardNo} className="py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <strong className="font-mono text-slate-800">{cardNo}</strong>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                                Card Active
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-emerald-600">+Upto ₹200</span>
                              <span className="text-[10px] text-slate-400 block">Earned</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Digital Agent ID Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        आधिकारिक डिजिटल एजेंट पहचान पत्र (Digital Agent ID Card)
                      </h4>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print ID Card</span>
                      </button>
                    </div>

                    <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-br from-[#071933] via-[#0a2144] to-[#071933] border-2 border-amber-400 text-white p-5 shadow-lg relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-amber-400/40 pb-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <CompanyLogo className="w-8 h-8" withGlow />
                          <div>
                            <span className="text-xs font-black tracking-tight text-white block">GLOBAL CARE LINK</span>
                            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">SERVICES LLP</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                          AUTHORIZED AGENT
                        </span>
                      </div>

                      <div className="flex items-center gap-4 my-2">
                        <div className="w-16 h-20 rounded-xl bg-slate-800 border border-amber-400/60 flex flex-col items-center justify-center text-slate-400 shrink-0">
                          <UserCheck className="w-8 h-8 text-amber-400 mb-1" />
                          <span className="text-[9px]">Agent Photo</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div>
                            <span className="text-slate-400 text-[10px] block">Agent ID:</span>
                            <strong className="text-base text-amber-300 font-mono font-black">{currentAgent.agentId}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block">Agent Name:</span>
                            <strong className="text-white text-sm">{currentAgent.fullName}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block">Location:</span>
                            <span className="text-slate-200">{currentAgent.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/80 text-[9px] text-slate-400 flex items-center justify-between">
                        <span>LLPIN: ADC-8783 · Delhi Only</span>
                        <span>Helpline: +91 7290835403</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: PROGRAM INFO & HOW IT WORKS ================= */}
          {activeTab === 'info' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-lg font-black text-slate-900">
                  रेफर एंड अर्न प्रोग्राम कैसे काम करता है? (How it Works)
                </h4>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">फ्री एजेंट रजिस्ट्रेशन (Agent ID Series gcl001+)</strong>
                      <span>अपना नाम, मोबाइल नंबर और UPI ID डालकर मुफ्त में एजेंट पार्टनर बनें। आपको तुरंत एक यूनिक Agent ID (जैसे: gcl001, gcl002) आवंटित की जाएगी।</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">शेयर करें अपना रेफरल लिंक या Agent ID</strong>
                      <span>अपने दोस्तों, पड़ोसियों और सोशल मीडिया पर अपना लिंक शेयर करें। जब भी कोई व्यक्ति फॉर्म भरेगा, आपका Agent ID स्वतः जुड़ जाएगा।</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">हर सफल कार्ड पर Upto ₹200 की सीधी कमाई</strong>
                      <span>जैसे ही ग्राहक ₹599 का भुगतान करके हेल्थ कार्ड जारी कराएगा, तुरंत Upto ₹200 कमीशन आपके एजेंट डैशबोर्ड में क्रेडिट हो जाएगा और कंपनी द्वारा आपके UPI पर ट्रांसफर कर दिया जाएगा।</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                      4
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">100% पारदर्शी और लाइव ट्रैकिंग</strong>
                      <span>एडमिन पैनल पर आपकी हर एक्टिविटी, कस्टमर का नाम, कार्ड नंबर और कमीशन का पूरा ब्यौरा सुरक्षित रहता है।</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center">
                  <button
                    onClick={() => setActiveTab('register')}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    अभी एजेंट आईडी बनाएं (Next ID: {nextAgentId})
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
