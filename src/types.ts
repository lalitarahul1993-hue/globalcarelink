export interface FacilitationService {
  id: string;
  number: string;
  title: string;
  category: 'emergency' | 'consultation' | 'homecare' | 'diagnostic';
  icon: string;
  tagline: string;
  description: string;
  facilitationScope: string[];
  partnerSLA: string;
  mouNotice: string;
}

export interface PreferredHospitalItem {
  id: number;
  hospitalName: string;
  location: string;
}

export interface EmergencyContactItem {
  sNo: number;
  name: string;
  contactNo: string;
  relationship: string;
  remarksVehicle: string;
}

export interface PatientSurveyFormData {
  // 1. PATIENT PROFILE / रोगी का व्यक्तिगत विवरण
  fullName: string;
  contactNo: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  fatherOrHusbandName: string;
  currentAddress: string;
  pinCode: string;
  bloodGroup: string;
  aadhaarNo: string;
  height: string;
  weight: string;
  occupation: string;
  photoUrl?: string | null;

  // 2. MEDICAL & HOSPITALIZATION SURVEY / स्वास्थ्य एवं अस्पताल सर्वेक्षण
  gallbladderStones: boolean;
  kidneyStones: boolean;
  hernia: boolean;
  pilesFistula: boolean;
  rasoliFibroid: boolean;
  otherCriticalIllness: boolean;
  specificIllnessDetails: string;

  // 3. PREFERRED HOSPITALS IN NEIGHBORHOOD (Up to 5)
  preferredHospitals: PreferredHospitalItem[];

  // 4. HEALTH INSURANCE / CARD AVAILABILITY
  insuranceType: 'private' | 'ayushman' | 'cash';
  companyTpa: string;
  ayushmanCardNo: string;

  // 5. EMERGENCY CONTACTS & WITNESS (Up to 5)
  emergencyContacts: EmergencyContactItem[];

  // 6. LEGAL DECLARATION BY APPLICANT
  declarationAgreed: boolean;
  declarationDate: string;
  declarationPlace: string;
  signatureName: string;

  // Payment Metadata (Demo / Razorpay Ready)
  paymentMethod: 'UPI' | 'QR' | 'CARD' | 'NETBANKING';
  paymentId?: string;
  paymentStatus?: 'PAID' | 'PENDING';
  amount: number;
  referredByAgentId?: string;
}

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'DECLINED';

export interface MemberRecord {
  cardNumber: string;
  fullName: string;
  mobile: string;
  dob: string;
  gender: string;
  preferredLocation: string;
  issueDate: string;
  validTill: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  approvalStatus?: ApprovalStatus;
  declineReason?: string;
  approvedAt?: string;
  jurisdiction: string;
  tier: string;
  photoUrl?: string | null;
  paymentStatus?: 'PAID' | 'PENDING' | 'DEMO_PAID';
  paymentMethod?: string;
  referredByAgentId?: string;
  // Full submitted survey data attached to record
  surveyData?: PatientSurveyFormData;
  submittedAt?: string;
}

export interface CardFormData {
  fullName: string;
  mobile: string;
  dob: string;
  gender: string;
  preferredLocation: string;
  email?: string;
  bloodGroup?: string;
  referredByAgentId?: string;
}

// Agent Partner Record for Refer & Earn (gcl001 series)
export interface AgentRecord {
  agentId: string; // Series starts at 'gcl001', 'gcl002', etc.
  fullName: string;
  mobile: string;
  email: string;
  upiId: string;
  city: string;
  address?: string;
  photoUrl?: string | null;
  createdAt: string;
  totalReferrals: number;
  approvedReferrals?: number;
  pendingReferrals?: number;
  declinedReferrals?: number;
  totalEarnings: number; // ONLY credited when card is APPROVED by Admin
  pendingCommission?: number; // On hold until Admin approves
  commissionPerCard: number; // defaults to 200
  status: 'ACTIVE' | 'SUSPENDED';
  payoutStatus: 'PAID' | 'PENDING';
  referredCards: string[];
  approvedCards?: string[];
}

// Global Activity Log for All Website Events
export type ActivityType = 
  | 'AGENT_REGISTERED'
  | 'CARD_ISSUED'
  | 'CARD_PENDING_APPROVAL'
  | 'CARD_APPROVED'
  | 'CARD_DECLINED'
  | 'REFERRAL_CREDITED'
  | 'PAYMENT_RECEIVED'
  | 'CARD_VERIFIED'
  | 'COMMISSION_PAID'
  | 'SURVEY_SUBMITTED';

export interface ActivityLogItem {
  id: string;
  timestamp: string; // ISO string
  formattedTime: string;
  type: ActivityType;
  actor: string;
  title: string;
  details: string;
  agentId?: string;
  cardNumber?: string;
  amount?: number;
}
