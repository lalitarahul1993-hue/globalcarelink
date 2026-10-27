import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Printer, 
  FileText, 
  Eye, 
  EyeOff,
  Trash2, 
  Phone, 
  Calendar, 
  User, 
  Shield, 
  Building, 
  HeartPulse,
  IdCard,
  CreditCard,
  AlertCircle,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  CheckCircle2,
  ShieldCheck,
  Users,
  Activity,
  TrendingUp,
  Share2,
  Check,
  RefreshCw,
  Plus,
  DollarSign
} from 'lucide-react';
import { MemberRecord, AgentRecord, ActivityLogItem, ActivityType } from '../types';
import { COMPANY_CREDENTIALS } from '../data/servicesData';
import { 
  exportSubmissionsToCSV, 
  deleteSubmission,
  getStoredAgents,
  saveAgent,
  generateNextAgentId,
  exportAgentsToCSV,
  getStoredActivities,
  exportActivitiesToCSV
} from '../utils/storage';
import { CompanyLogo } from './CompanyLogo';
import { OfficialCompanyCard } from './OfficialCompanyCard';

// SECURE ADMIN CREDENTIALS
const ADMIN_EMAIL = 'info@angelbuddycarellp.com';
const ADMIN_PASSWORD = 'Hari@12345';

interface AdminSubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: MemberRecord[];
  onRefresh: () => void;
}

export const AdminSubmissionsModal: React.FC<AdminSubmissionsModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onRefresh
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gcl_admin_authenticated') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Master Navigation
  const [adminTab, setAdminTab] = useState<'submissions' | 'agents' | 'activities' | 'analytics'>('submissions');

  // Submissions Tab States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MemberRecord | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'surveyDoc' | 'cardView'>('list');

  // Agents Tab States
  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const [agentSearch, setAgentSearch] = useState('');
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [newAgentForm, setNewAgentForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    upiId: '',
    city: 'Harsh Vihar, Delhi'
  });

  // Activity Log States
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);
  const [activityFilter, setActivityFilter] = useState<string>('ALL');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setAgents(getStoredAgents());
      setActivities(getStoredActivities());
    }

    const handleDataUpdate = () => {
      setAgents(getStoredAgents());
      setActivities(getStoredActivities());
    };

    window.addEventListener('globalcarelink:agent_updated', handleDataUpdate);
    window.addEventListener('globalcarelink:new_activity', handleDataUpdate);
    window.addEventListener('globalcarelink:new_submission', handleDataUpdate);

    return () => {
      window.removeEventListener('globalcarelink:agent_updated', handleDataUpdate);
      window.removeEventListener('globalcarelink:new_activity', handleDataUpdate);
      window.removeEventListener('globalcarelink:new_submission', handleDataUpdate);
    };
  }, [isOpen, isAuthenticated]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (
      loginEmail.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      loginPassword === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gcl_admin_authenticated', 'true');
      setLoginPassword('');
      setLoginError('');
      setAgents(getStoredAgents());
      setActivities(getStoredActivities());
    } else {
      setLoginError('गलत ईमेल या पासवर्ड! केवल अधिकृत एडमिन ही लॉगिन कर सकते हैं। (Invalid Admin Email or Password)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gcl_admin_authenticated');
    setSelectedRecord(null);
    setActiveView('list');
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  if (!isOpen) return null;

  // Filter Submissions
  const filteredSubmissions = submissions.filter(s => {
    const term = searchTerm.toLowerCase();
    const survey = s.surveyData;
    return (
      s.fullName.toLowerCase().includes(term) ||
      s.mobile.includes(term) ||
      s.cardNumber.toLowerCase().includes(term) ||
      (s.referredByAgentId && s.referredByAgentId.toLowerCase().includes(term)) ||
      (survey?.aadhaarNo && survey.aadhaarNo.includes(term)) ||
      (survey?.fatherOrHusbandName && survey.fatherOrHusbandName.toLowerCase().includes(term))
    );
  });

  // Filter Agents
  const filteredAgents = agents.filter(a => {
    const term = agentSearch.toLowerCase();
    return (
      a.agentId.toLowerCase().includes(term) ||
      a.fullName.toLowerCase().includes(term) ||
      a.mobile.includes(term) ||
      a.upiId.toLowerCase().includes(term) ||
      a.city.toLowerCase().includes(term)
    );
  });

  // Filter Activities
  const filteredActivities = activities.filter(act => {
    if (activityFilter === 'ALL') return true;
    return act.type === activityFilter;
  });

  const handleDeleteSubmission = (cardNum: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application for ${name} (${cardNum})?`)) {
      deleteSubmission(cardNum);
      onRefresh();
      if (selectedRecord?.cardNumber === cardNum) {
        setSelectedRecord(null);
        setActiveView('list');
      }
    }
  };

  const handleToggleAgentPayout = (agentId: string) => {
    const current = getStoredAgents();
    const target = current.find(a => a.agentId === agentId);
    if (target) {
      target.payoutStatus = target.payoutStatus === 'PAID' ? 'PENDING' : 'PAID';
      saveAgent(target);
      setAgents(getStoredAgents());
    }
  };

  const handleCreateAgentFromAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = generateNextAgentId();
    const agent: AgentRecord = {
      agentId: nextId,
      fullName: newAgentForm.fullName.trim(),
      mobile: newAgentForm.mobile.trim(),
      email: newAgentForm.email.trim() || `${nextId}@globalcarelinkservices.org`,
      upiId: newAgentForm.upiId.trim(),
      city: newAgentForm.city.trim(),
      createdAt: new Date().toISOString(),
      totalReferrals: 0,
      totalEarnings: 0,
      commissionPerCard: 200,
      status: 'ACTIVE',
      payoutStatus: 'PENDING',
      referredCards: []
    };

    saveAgent(agent);
    setAgents(getStoredAgents());
    setIsAddAgentOpen(false);
    setNewAgentForm({ fullName: '', mobile: '', email: '', upiId: '', city: 'Harsh Vihar, Delhi' });
  };

  // If admin is not logged in, render the secure Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="bg-[#071933] border-2 border-amber-400/60 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar with Security Badge & Close Button */}
          <div className="p-4 border-b border-amber-400/20 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Protected Area / केवल एडमिन के लिए</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 relative z-10">
            {/* Logo and Headings */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#071324] via-[#0a192f] to-[#16386d] border-2 border-amber-400/60 p-2 mx-auto mb-3.5 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <CompanyLogo className="w-12 h-12" withGlow />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                GLOBAL CARE LINK SERVICES LLP
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Administrator Login
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                यह सुरक्षित एडमिन पोर्टल है। ग्राहकों के फॉर्म, एजेंट रेफरल्स (gcl001+), और वेबसाइट एक्टिविटी देखने के लिए एडमिन ईमेल व पासवर्ड दर्ज करें।
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/70 border border-rose-600/70 text-xs text-rose-200 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                  <span>Admin Email / एडमिन ईमेल</span>
                  <button
                    type="button"
                    onClick={() => setLoginEmail(ADMIN_EMAIL)}
                    className="text-[10px] text-amber-400 hover:text-amber-300 underline font-normal cursor-pointer"
                  >
                    Quick Fill Email
                  </button>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="info@angelbuddycarellp.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#051124] border border-amber-400/40 focus:border-amber-400 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                  <span>Master Password / एडमिन पासवर्ड</span>
                  <button
                    type="button"
                    onClick={() => setLoginPassword(ADMIN_PASSWORD)}
                    className="text-[10px] text-amber-400 hover:text-amber-300 underline font-normal cursor-pointer"
                  >
                    Quick Fill Password
                  </button>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#051124] border border-amber-400/40 focus:border-amber-400 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-300 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-[#071324] font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#071324]" />
                <span>Login &amp; View Submissions (डेटा अनलॉक करें)</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Restricted to Authorized Admin Only · All Actions Audited</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalCardsRevenue = submissions.length * 599;
  const totalCommissionsEarned = agents.reduce((acc, a) => acc + (a.totalEarnings || 0), 0);
  const totalReferralCards = submissions.filter(s => !!s.referredByAgentId).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl relative border border-slate-200 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="bg-[#071933] text-white p-4 sm:p-5 rounded-t-3xl border-b border-amber-400/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#061833] border border-amber-400/60 p-1 flex items-center justify-center shrink-0">
              <CompanyLogo className="w-10 h-10" withGlow />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Company Admin Command Center
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {submissions.length} Total Cards
                </span>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {agents.length} Agents (gcl001+)
                </span>
                <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{ADMIN_EMAIL}</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-display mt-0.5">
                GLOBAL CARE LINK SERVICES LLP · Master Administration Panel
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                onRefresh();
                setAgents(getStoredAgents());
                setActivities(getStoredActivities());
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-rose-950/70 hover:bg-rose-900 text-rose-300 hover:text-rose-100 text-xs font-semibold rounded-xl border border-rose-800/50 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout from Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Close Portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Master Navigation Bar (4 Tabs) */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto text-xs font-bold shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setAdminTab('submissions');
                setActiveView('list');
              }}
              className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                adminTab === 'submissions' 
                  ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>1. ग्राहक आवेदन व कार्ड ({submissions.length})</span>
            </button>

            <button
              onClick={() => setAdminTab('agents')}
              className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                adminTab === 'agents' 
                  ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-amber-600" />
              <span>2. एजेंट व रेफरल पार्टनर्स ({agents.length})</span>
            </button>

            <button
              onClick={() => setAdminTab('activities')}
              className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                adminTab === 'activities' 
                  ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>3. वेबसाइट लाइव एक्टिविटी लॉग ({activities.length})</span>
            </button>

            <button
              onClick={() => setAdminTab('analytics')}
              className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                adminTab === 'analytics' 
                  ? 'border-amber-500 text-slate-900 bg-white font-extrabold shadow-xs' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>4. रेफरल समरी व आंकड़े</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {adminTab === 'submissions' && (
              <button
                onClick={() => exportSubmissionsToCSV(submissions)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Submissions CSV</span>
              </button>
            )}
            {adminTab === 'agents' && (
              <button
                onClick={() => exportAgentsToCSV(agents)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Agents CSV</span>
              </button>
            )}
            {adminTab === 'activities' && (
              <button
                onClick={() => exportActivitiesToCSV(activities)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Activities CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* View Switcher if a record is selected in Submissions */}
        {adminTab === 'submissions' && selectedRecord && (
          <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500">Selected Customer:</span>
              <strong className="text-slate-900">{selectedRecord.fullName}</strong>
              <span className="font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                {selectedRecord.cardNumber}
              </span>
              {selectedRecord.referredByAgentId && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-mono">
                  Referred by: {selectedRecord.referredByAgentId}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  activeView === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setActiveView('surveyDoc')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  activeView === 'surveyDoc' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                View 2-Page Survey Form
              </button>
              <button
                onClick={() => setActiveView('cardView')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  activeView === 'cardView' ? 'bg-[#071933] text-amber-300 shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                View Official Card
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* ================= TAB 1: CUSTOMER SUBMISSIONS ================= */}
          {adminTab === 'submissions' && (
            <>
              {activeView === 'list' && (
                <div className="space-y-4">
                  
                  {/* Search Bar & Stats */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                    <div className="relative w-full sm:w-96">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Name, Phone, Aadhaar, Card No, Agent ID..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>Showing {filteredSubmissions.length} of {submissions.length} Applications</span>
                    </div>
                  </div>

                  {/* Submissions Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-200">
                            <th className="py-3 px-4">Card No</th>
                            <th className="py-3 px-4">Customer Name</th>
                            <th className="py-3 px-4">Mobile</th>
                            <th className="py-3 px-4">Aadhaar / DOB</th>
                            <th className="py-3 px-4">Referred By</th>
                            <th className="py-3 px-4">Payment</th>
                            <th className="py-3 px-4">Medical Flags</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredSubmissions.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-slate-400">
                                No applications match your search query.
                              </td>
                            </tr>
                          ) : (
                            filteredSubmissions.map((record) => {
                              const s = record.surveyData;
                              const medFlags = [
                                s?.gallbladderStones ? 'Gallbladder' : null,
                                s?.kidneyStones ? 'Kidney Stones' : null,
                                s?.hernia ? 'Hernia' : null,
                                s?.pilesFistula ? 'Piles' : null,
                                s?.rasoliFibroid ? 'Fibroid' : null,
                                s?.otherCriticalIllness ? 'Critical' : null
                              ].filter(Boolean);

                              return (
                                <tr key={record.cardNumber} className="hover:bg-amber-50/40 transition-colors">
                                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                                    {record.cardNumber}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="font-bold text-slate-900">{record.fullName}</div>
                                    <div className="text-[10px] text-slate-400">{record.preferredLocation}</div>
                                  </td>
                                  <td className="py-3 px-4 font-mono text-slate-600">
                                    {record.mobile}
                                  </td>
                                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                                    <div>{s?.aadhaarNo || '—'}</div>
                                    <div className="text-[10px] text-slate-400">{record.dob} ({record.gender})</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    {record.referredByAgentId ? (
                                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                                        {record.referredByAgentId}
                                      </span>
                                    ) : (
                                      <span className="text-[11px] text-slate-400">Direct / None</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                      ₹599 PAID
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    {medFlags.length > 0 ? (
                                      <div className="flex flex-wrap gap-1">
                                        {medFlags.map(f => (
                                          <span key={f} className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[9px] font-semibold">
                                            {f}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-slate-400 text-[11px]">None Reported</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => {
                                          setSelectedRecord(record);
                                          setActiveView('surveyDoc');
                                        }}
                                        className="p-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-lg transition-colors cursor-pointer"
                                        title="View Full Survey Document"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedRecord(record);
                                          setActiveView('cardView');
                                        }}
                                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                                        title="View Healthcare Card"
                                      >
                                        <IdCard className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteSubmission(record.cardNumber, record.fullName)}
                                        className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                        title="Delete Application"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* View 2-Page Survey Form */}
              {activeView === 'surveyDoc' && selectedRecord && (
                <div className="space-y-4 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        Official Patient Assistance &amp; Health Survey Form Document
                      </h3>
                      <p className="text-xs text-slate-500">
                        Member ID: {selectedRecord.cardNumber} · Applicant: {selectedRecord.fullName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Document</span>
                      </button>
                      <button
                        onClick={() => setActiveView('list')}
                        className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
                      >
                        Back to List
                      </button>
                    </div>
                  </div>

                  {/* Official 2-Page Paper Replica */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-md space-y-6 text-xs text-slate-800">
                    <div className="border-b-2 border-slate-900 pb-4 text-center">
                      <div className="flex items-center justify-center gap-3 mb-1">
                        <CompanyLogo className="w-10 h-10" />
                        <h2 className="text-xl font-black tracking-wider uppercase text-slate-950 font-display">
                          GLOBAL CARE LINK SERVICES LLP
                        </h2>
                      </div>
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        PATIENT ASSISTANCE &amp; HEALTH SURVEY FORM / रोगी सहायता एवं स्वास्थ्य सर्वेक्षण प्रपत्र
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        LLPIN: ADC-8783 | PAN: ABFFG3534R | TAN: DELG35173F | Harsh Vihar, North East Delhi - 110093
                      </p>
                    </div>

                    {/* Section 1 */}
                    <div className="space-y-2">
                      <div className="bg-[#071933] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider rounded">
                        1. PATIENT PROFILE / रोगी का व्यक्तिगत विवरण
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Full Name:</span>
                          <strong>{selectedRecord.fullName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Contact No:</span>
                          <strong>{selectedRecord.mobile}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Gender / DOB:</span>
                          <strong>{selectedRecord.gender} · {selectedRecord.dob}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Blood Group:</span>
                          <strong className="text-rose-700">{selectedRecord.surveyData?.bloodGroup || 'B+'}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Father / Husband:</span>
                          <span>{selectedRecord.surveyData?.fatherOrHusbandName || '—'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Aadhaar No:</span>
                          <span className="font-mono">{selectedRecord.surveyData?.aadhaarNo || '—'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Height / Weight:</span>
                          <span>{selectedRecord.surveyData?.height || '—'} · {selectedRecord.surveyData?.weight || '—'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Occupation:</span>
                          <span>{selectedRecord.surveyData?.occupation || '—'}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-3">
                          <span className="text-slate-500 block text-[10px]">Address:</span>
                          <span>{selectedRecord.surveyData?.currentAddress || selectedRecord.preferredLocation}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Referred By Agent:</span>
                          <strong className="text-amber-700 font-mono">{selectedRecord.referredByAgentId || 'Direct'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-2">
                      <div className="bg-[#071933] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider rounded">
                        2. MEDICAL &amp; HOSPITALIZATION SURVEY / स्वास्थ्य एवं अस्पताल सर्वेक्षण
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.gallbladderStones ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Gallbladder Stones (पित्त की थैली)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.kidneyStones ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Kidney Stones (गुर्दे की पथरी)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.hernia ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Hernia (हर्निया)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.pilesFistula ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Piles / Fistula (बवासीर/भगंदर)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.rasoliFibroid ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Rasoli / Fibroid (रसौली)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded border ${selectedRecord.surveyData?.otherCriticalIllness ? 'bg-amber-500 border-amber-600' : 'bg-white border-slate-300'}`} />
                          <span>Other Critical (अन्य गंभीर बीमारी)</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3 & 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="bg-[#071933] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider rounded">
                          3. PREFERRED HOSPITALS
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                          {selectedRecord.surveyData?.preferredHospitals?.map((h, i) => (
                            <div key={h.id || i} className="text-[11px]">
                              {i + 1}. <strong>{h.hospitalName || '—'}</strong> ({h.location || 'Delhi'})
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-[#071933] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider rounded">
                          4. INSURANCE STATUS
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] space-y-1">
                          <div>Type: <strong className="uppercase">{selectedRecord.surveyData?.insuranceType || 'Cash'}</strong></div>
                          {selectedRecord.surveyData?.insuranceType === 'ayushman' && (
                            <div>Card No: <span className="font-mono">{selectedRecord.surveyData?.ayushmanCardNo}</span></div>
                          )}
                          {selectedRecord.surveyData?.insuranceType === 'private' && (
                            <div>TPA/Company: <span>{selectedRecord.surveyData?.companyTpa}</span></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 5 & 6 */}
                    <div className="space-y-2">
                      <div className="bg-[#071933] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider rounded">
                        5. EMERGENCY CONTACTS (आपातकालीन संपर्क)
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        {selectedRecord.surveyData?.emergencyContacts?.map((c, i) => (
                          <div key={c.sNo || i} className="py-1 flex items-center justify-between text-[11px] border-b border-slate-100 last:border-b-0">
                            <div><strong>{c.name || '—'}</strong> ({c.relationship || 'Relative'})</div>
                            <div className="font-mono">{c.contactNo || '—'} · {c.remarksVehicle || 'Vehicle Available'}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Declaration Date: {selectedRecord.surveyData?.declarationDate || selectedRecord.issueDate}</span>
                      <span>Place: {selectedRecord.surveyData?.declarationPlace || 'Delhi'}</span>
                      <span>Applicant Signature: <strong className="text-slate-900 underline">{selectedRecord.surveyData?.signatureName || selectedRecord.fullName}</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* View Official Card */}
              {activeView === 'cardView' && selectedRecord && (
                <div className="space-y-4 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Customer Healthcare Card Preview</h3>
                      <p className="text-xs text-slate-500">Member ID: {selectedRecord.cardNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Card</span>
                      </button>
                      <button
                        onClick={() => setActiveView('list')}
                        className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
                      >
                        Back to List
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center my-4">
                    <OfficialCompanyCard
                      data={{
                        cardNumber: selectedRecord.cardNumber,
                        customerName: selectedRecord.fullName,
                        customerMobile: selectedRecord.mobile,
                        dateOfIssue: selectedRecord.issueDate,
                        validity: selectedRecord.validTill,
                        photoUrl: selectedRecord.photoUrl,
                        agentId: selectedRecord.referredByAgentId || selectedRecord.surveyData?.referredByAgentId || 'gcl001'
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= TAB 2: AGENTS & REFERRAL PARTNERS (gcl001 series) ================= */}
          {adminTab === 'agents' && (
            <div className="space-y-4">
              
              {/* Agent Actions & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative w-full sm:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={agentSearch}
                    onChange={(e) => setAgentSearch(e.target.value)}
                    placeholder="Search by Agent ID (gcl001), Name, Phone, UPI..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddAgentOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>नया एजेंट जोड़ें (Next: {generateNextAgentId()})</span>
                  </button>

                  <button
                    onClick={() => exportAgentsToCSV(agents)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Add Agent Modal within Admin */}
              {isAddAgentOpen && (
                <div className="bg-amber-50/70 border border-amber-300 p-5 rounded-2xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>नया एजेंट पार्टनर बनाएं (Allocated Agent ID: {generateNextAgentId()})</span>
                    </h4>
                    <button
                      onClick={() => setIsAddAgentOpen(false)}
                      className="text-slate-400 hover:text-slate-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateAgentFromAdmin} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">पूरा नाम *</label>
                      <input
                        type="text"
                        required
                        value={newAgentForm.fullName}
                        onChange={(e) => setNewAgentForm({ ...newAgentForm, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">मोबाइल नंबर *</label>
                      <input
                        type="tel"
                        required
                        value={newAgentForm.mobile}
                        onChange={(e) => setNewAgentForm({ ...newAgentForm, mobile: e.target.value })}
                        placeholder="+91 98111 XXXXX"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">UPI ID (फॉर पेमेंट) *</label>
                      <input
                        type="text"
                        required
                        value={newAgentForm.upiId}
                        onChange={(e) => setNewAgentForm({ ...newAgentForm, upiId: e.target.value })}
                        placeholder="e.g. 98111XXXXX@paytm"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">शहर / क्षेत्र *</label>
                      <input
                        type="text"
                        required
                        value={newAgentForm.city}
                        onChange={(e) => setNewAgentForm({ ...newAgentForm, city: e.target.value })}
                        placeholder="Harsh Vihar, Delhi"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div className="sm:col-span-4 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddAgentOpen(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-xl"
                      >
                        रद्द करें
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-slate-900 text-amber-400 font-bold rounded-xl"
                      >
                        सेव करें और एजेंट आईडी जारी करें
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Agents Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-200">
                        <th className="py-3 px-4">Agent ID (Series)</th>
                        <th className="py-3 px-4">Agent Name</th>
                        <th className="py-3 px-4">Contact &amp; Location</th>
                        <th className="py-3 px-4">UPI for Payout</th>
                        <th className="py-3 px-4 text-center">Cards Referred</th>
                        <th className="py-3 px-4 text-center">Earnings (₹)</th>
                        <th className="py-3 px-4 text-center">Payout Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAgents.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400">
                            No agents found matching your query.
                          </td>
                        </tr>
                      ) : (
                        filteredAgents.map((agent) => (
                          <tr key={agent.agentId} className="hover:bg-amber-50/40 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-mono text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                                {agent.agentId}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{agent.fullName}</div>
                              <div className="text-[10px] text-slate-400">{agent.email}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-mono text-slate-700">{agent.mobile}</div>
                              <div className="text-[10px] text-slate-400">{agent.city}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                              {agent.upiId}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="font-bold text-slate-900 text-sm">
                                {agent.totalReferrals || 0}
                              </span>
                              <span className="text-[10px] text-slate-400 block">Cards</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="font-black text-amber-600 text-sm">
                                ₹{agent.totalEarnings || 0}
                              </span>
                              <span className="text-[10px] text-slate-400 block">@ Upto ₹200/card</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => handleToggleAgentPayout(agent.agentId)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-black cursor-pointer transition-colors ${
                                  agent.payoutStatus === 'PAID'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                                }`}
                              >
                                {agent.payoutStatus === 'PAID' ? '✓ PAID' : 'PENDING'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => {
                                  const url = `${window.location.origin}/?ref=${agent.agentId}`;
                                  navigator.clipboard.writeText(url);
                                  alert(`Copied referral link for ${agent.agentId}: ${url}`);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                                title="Copy Agent Referral Link"
                              >
                                Copy Link
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: WEBSITE ACTIVITY LOG ================= */}
          {adminTab === 'activities' && (
            <div className="space-y-4">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-slate-500 font-bold mr-1">Filter Events:</span>
                  {[
                    { label: 'All Activities', value: 'ALL' },
                    { label: 'Cards Issued', value: 'CARD_ISSUED' },
                    { label: 'Agents Enrolled', value: 'AGENT_REGISTERED' },
                    { label: 'Commissions Credited', value: 'REFERRAL_CREDITED' }
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setActivityFilter(f.value)}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-colors ${
                        activityFilter === f.value 
                          ? 'bg-[#071933] text-amber-300' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => exportActivitiesToCSV(activities)}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Activity Log CSV</span>
                </button>
              </div>

              {/* Activity Timeline List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span>लाइव एक्टिविटी स्ट्रीम (Live Real-time Website Events)</span>
                  </h4>
                  <span className="text-xs text-slate-400">Total {filteredActivities.length} Events Logged</span>
                </div>

                <div className="space-y-3">
                  {filteredActivities.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      No activities match the selected filter.
                    </div>
                  ) : (
                    filteredActivities.map((act) => (
                      <div 
                        key={act.id} 
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                            act.type === 'CARD_ISSUED' 
                              ? 'bg-emerald-600' 
                              : act.type === 'AGENT_REGISTERED'
                              ? 'bg-amber-500 text-slate-950'
                              : act.type === 'REFERRAL_CREDITED'
                              ? 'bg-blue-600'
                              : 'bg-slate-700'
                          }`}>
                            {act.type === 'CARD_ISSUED' ? '💳' : act.type === 'AGENT_REGISTERED' ? '👤' : act.type === 'REFERRAL_CREDITED' ? '₹' : '⚡'}
                          </span>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <strong className="text-slate-900 text-sm font-bold">{act.title}</strong>
                              <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                                {act.type}
                              </span>
                              {act.agentId && (
                                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                                  Agent: {act.agentId}
                                </span>
                              )}
                              {act.cardNumber && (
                                <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                                  Card: {act.cardNumber}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">
                              {act.details}
                            </p>
                          </div>
                        </div>

                        <div className="text-right sm:shrink-0 text-slate-400 font-mono text-[11px]">
                          <div>{act.formattedTime}</div>
                          {act.amount && (
                            <span className="text-emerald-700 font-bold text-xs block">
                              ₹{act.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 4: REFERRAL & REVENUE ANALYTICS ================= */}
          {adminTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1">कुल जारी कार्ड्स</span>
                  <div className="text-2xl font-black text-slate-900">{submissions.length}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Annual Healthcare Cards</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1">कुल कार्ड रेवेन्यू</span>
                  <div className="text-2xl font-black text-emerald-600">₹{totalCardsRevenue}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">@ ₹599 / Card</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1">रेफरल के माध्यम से कार्ड्स</span>
                  <div className="text-2xl font-black text-amber-600">{totalReferralCards}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Via Agent Series gcl001+</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold block mb-1">कुल देय कमीशन (₹)</span>
                  <div className="text-2xl font-black text-blue-600">₹{totalCommissionsEarned}</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">@ Upto ₹200 / Referred Card</span>
                </div>
              </div>

              {/* Agent Performance Leaderboard */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center justify-between">
                  <span>टॉप परफॉर्मिंग एजेंट्स लीडरबोर्ड (Agent Referral Leaderboard)</span>
                  <span className="text-xs text-slate-400 font-normal">Sorted by Total Referred Cards</span>
                </h4>

                <div className="divide-y divide-slate-100 text-xs">
                  {[...agents].sort((a, b) => (b.totalReferrals || 0) - (a.totalReferrals || 0)).map((agent, idx) => (
                    <div key={agent.agentId} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-black flex items-center justify-center text-xs ${
                          idx === 0 
                            ? 'bg-amber-400 text-slate-950' 
                            : idx === 1 
                            ? 'bg-slate-300 text-slate-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-900 text-sm">{agent.fullName}</strong>
                            <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {agent.agentId}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px]">{agent.city} · UPI: {agent.upiId}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-slate-900">{agent.totalReferrals || 0} Cards</span>
                        <span className="text-xs text-emerald-600 font-bold block">₹{agent.totalEarnings || 0} Earned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
