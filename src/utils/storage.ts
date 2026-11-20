import { MemberRecord, PatientSurveyFormData, AgentRecord, ActivityLogItem, ActivityType, ApprovalStatus } from '../types';
import { MOCK_MEMBERS } from '../data/servicesData';

const SUBMISSIONS_STORAGE_KEY = 'globalcarelink_patient_registrations_v1';
const AGENTS_STORAGE_KEY = 'globalcarelink_agents_v1';
const ACTIVITIES_STORAGE_KEY = 'globalcarelink_activities_v1';

export const INITIAL_SAMPLE_SURVEY: PatientSurveyFormData = {
  fullName: 'Rahul Sharma',
  contactNo: '+91 7290835403',
  gender: 'Male',
  dob: '1988-08-14',
  fatherOrHusbandName: 'Shri Ramesh Sharma',
  currentAddress: 'B-1/552, Gali No. 21, Harsh Vihar, North East Delhi',
  pinCode: '110093',
  bloodGroup: 'B+',
  aadhaarNo: '4829 3810 4921',
  height: "5'9''",
  weight: '72 kg',
  occupation: 'Self Employed / Trader',
  photoUrl: null,
  gallbladderStones: false,
  kidneyStones: true,
  hernia: false,
  pilesFistula: false,
  rasoliFibroid: false,
  otherCriticalIllness: false,
  specificIllnessDetails: 'Occasional renal colic symptoms managed via MOU diagnostic tests.',
  preferredHospitals: [
    { id: 1, hospitalName: 'GTB Hospital', location: 'Dilshad Garden, East Delhi' },
    { id: 2, hospitalName: 'Swami Dayanand Hospital', location: 'Shahdara, Delhi' },
    { id: 3, hospitalName: 'Max Super Speciality Hospital', location: 'Patparganj, Delhi' },
    { id: 4, hospitalName: 'Fortis Hospital', location: 'Shalimar Bagh, Delhi' },
    { id: 5, hospitalName: 'Delhi Heart & Lung Institute', location: 'Panchkuian Road, Delhi' }
  ],
  insuranceType: 'ayushman',
  companyTpa: '',
  ayushmanCardNo: 'AB-DEL-9842109',
  emergencyContacts: [
    { sNo: 1, name: 'Sanjay Sharma', contactNo: '+91 98112 34567', relationship: 'Brother', remarksVehicle: 'Car Available' },
    { sNo: 2, name: 'Meenakshi Sharma', contactNo: '+91 98711 98765', relationship: 'Spouse', remarksVehicle: 'At Home' },
    { sNo: 3, name: 'Virender Verma', contactNo: '+91 99580 12345', relationship: 'Neighbor', remarksVehicle: 'Bike Available' }
  ],
  declarationAgreed: true,
  declarationDate: '05/10/2026',
  declarationPlace: 'Harsh Vihar, Delhi',
  signatureName: 'Rahul Sharma',
  paymentMethod: 'UPI',
  paymentId: 'pay_demo_77884411',
  paymentStatus: 'PAID',
  amount: 599,
  referredByAgentId: 'gcl001'
};

// Initial Seed Agents (Series starts with gcl001 as specified)
const SEED_AGENTS: AgentRecord[] = [
  {
    agentId: 'gcl001',
    fullName: 'Sunil Verma',
    mobile: '+91 98102 34567',
    email: 'sunil.verma@example.com',
    upiId: 'sunilverma@oksbi',
    city: 'Harsh Vihar, North East Delhi',
    address: 'Gali No. 12, Harsh Vihar, Delhi - 110093',
    photoUrl: null,
    createdAt: '2026-10-06T09:15:00Z',
    totalReferrals: 4,
    approvedReferrals: 2,
    pendingReferrals: 2,
    declinedReferrals: 0,
    totalEarnings: 400, // 2 approved * ₹200
    pendingCommission: 400, // 2 pending * ₹200
    commissionPerCard: 200,
    status: 'ACTIVE',
    payoutStatus: 'PAID',
    referredCards: ['ADC-8783-001', 'ADC-8783-002', 'ADC-8783-003', 'ADC-8783-004'],
    approvedCards: ['ADC-8783-001', 'ADC-8783-002']
  },
  {
    agentId: 'gcl002',
    fullName: 'Pooja Sharma',
    mobile: '+91 98711 22334',
    email: 'pooja.sharma@example.com',
    upiId: 'pooja.sharma@paytm',
    city: 'Dilshad Garden, East Delhi',
    address: 'Pocket A, Dilshad Garden, Delhi - 110095',
    photoUrl: null,
    createdAt: '2026-10-08T11:40:00Z',
    totalReferrals: 2,
    approvedReferrals: 1,
    pendingReferrals: 1,
    declinedReferrals: 0,
    totalEarnings: 200, // 1 approved * ₹200
    pendingCommission: 200, // 1 pending * ₹200
    commissionPerCard: 200,
    status: 'ACTIVE',
    payoutStatus: 'PENDING',
    referredCards: ['ADC-8783-005', 'ADC-8783-006'],
    approvedCards: ['ADC-8783-005']
  }
];

// Seed Activities
const SEED_ACTIVITIES: ActivityLogItem[] = [
  {
    id: 'act_init_1',
    timestamp: '2026-10-06T09:15:00Z',
    formattedTime: '06 Oct 2026, 02:45 PM',
    type: 'AGENT_REGISTERED',
    actor: 'Sunil Verma',
    title: 'New Agent Registered (gcl001)',
    details: 'Sunil Verma enrolled as Referral Partner with Agent ID: gcl001 (UPI: sunilverma@oksbi)',
    agentId: 'gcl001'
  },
  {
    id: 'act_init_2',
    timestamp: '2026-10-06T10:30:00Z',
    formattedTime: '06 Oct 2026, 04:00 PM',
    type: 'CARD_ISSUED',
    actor: 'Rahul Sharma',
    title: 'Customer Health Card Issued (ADC-8783-001)',
    details: 'Rahul Sharma completed 6-section health survey and ₹599 demo payment. Referred by Agent gcl001.',
    agentId: 'gcl001',
    cardNumber: 'ADC-8783-001',
    amount: 599
  },
  {
    id: 'act_init_3',
    timestamp: '2026-10-06T10:35:00Z',
    formattedTime: '06 Oct 2026, 04:05 PM',
    type: 'CARD_APPROVED',
    actor: 'Admin',
    title: 'Card Approved & Verified (ADC-8783-001)',
    details: 'Admin verified and approved card for Rahul Sharma. Referral commission of ₹200 credited to Agent gcl001.',
    agentId: 'gcl001',
    cardNumber: 'ADC-8783-001',
    amount: 200
  },
  {
    id: 'act_init_4',
    timestamp: '2026-10-08T11:40:00Z',
    formattedTime: '08 Oct 2026, 05:10 PM',
    type: 'AGENT_REGISTERED',
    actor: 'Pooja Sharma',
    title: 'New Agent Registered (gcl002)',
    details: 'Pooja Sharma enrolled as Referral Partner with Agent ID: gcl002 (UPI: pooja.sharma@paytm)',
    agentId: 'gcl002'
  }
];

// ================= MEMBER SUBMISSIONS =================

export function getStoredSubmissions(): MemberRecord[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) {
      const seeded: MemberRecord[] = MOCK_MEMBERS.map((m, idx) => {
        // Seed first 2 as APPROVED, next 2 as PENDING, 1 as PENDING, 1 as DECLINED for rich demo
        const approvalStatus: ApprovalStatus = 
          idx < 2 ? 'APPROVED' : 
          idx === 5 ? 'DECLINED' : 'PENDING';

        return {
          ...m,
          approvalStatus,
          approvedAt: approvalStatus === 'APPROVED' ? '2026-10-06T10:35:00Z' : undefined,
          declineReason: approvalStatus === 'DECLINED' ? 'Incomplete Aadhaar Details / Verification Pending' : undefined,
          submittedAt: '2026-10-05T10:30:00Z',
          referredByAgentId: idx < 4 ? 'gcl001' : 'gcl002',
          surveyData: idx === 0 ? INITIAL_SAMPLE_SURVEY : {
            ...INITIAL_SAMPLE_SURVEY,
            fullName: m.fullName,
            contactNo: m.mobile,
            dob: m.dob,
            gender: m.gender as 'Male' | 'Female',
            currentAddress: m.preferredLocation,
            aadhaarNo: `5544 3322 11${idx}0`,
            paymentId: `pay_demo_init_${idx + 1}`,
            referredByAgentId: idx < 4 ? 'gcl001' : 'gcl002'
          }
        };
      });
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed: MemberRecord[] = JSON.parse(raw);
    // Ensure every record has an approvalStatus property
    return parsed.map((item, idx) => ({
      ...item,
      approvalStatus: item.approvalStatus || (idx === 0 ? 'APPROVED' : 'PENDING')
    }));
  } catch (err) {
    console.error('Failed reading submissions from storage', err);
    return MOCK_MEMBERS.map(m => ({
      ...m,
      approvalStatus: 'APPROVED' as ApprovalStatus
    }));
  }
}

/**
 * When a user or agent submits a card, the card is generated immediately,
 * but set to approvalStatus = 'PENDING' until Admin approves it.
 * The agent's commission is on hold and NOT added to totalEarnings yet!
 */
export function saveSubmission(record: MemberRecord): MemberRecord[] {
  try {
    const current = getStoredSubmissions();
    const finalRecord: MemberRecord = {
      ...record,
      approvalStatus: record.approvalStatus || 'PENDING',
      submittedAt: record.submittedAt || new Date().toISOString()
    };

    const updated = [finalRecord, ...current.filter(c => c.cardNumber !== finalRecord.cardNumber)];
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));

    // Log Activity for new card creation
    recordActivity({
      type: 'CARD_ISSUED',
      actor: finalRecord.fullName,
      title: `Customer Card Created (${finalRecord.cardNumber})`,
      details: `${finalRecord.fullName} generated ₹599 Annual Healthcare Card.${finalRecord.referredByAgentId ? ` Referred by Agent ID: ${finalRecord.referredByAgentId}. Status: Awaiting Admin Approval for Commission Release.` : ' Status: Pending Admin Verification.'}`,
      cardNumber: finalRecord.cardNumber,
      agentId: finalRecord.referredByAgentId,
      amount: 599
    });

    if (finalRecord.approvalStatus === 'PENDING') {
      recordActivity({
        type: 'CARD_PENDING_APPROVAL',
        actor: 'System',
        title: `Card Approval Requested (${finalRecord.cardNumber})`,
        details: `Approval request submitted to Admin command center for ${finalRecord.fullName}. ${finalRecord.referredByAgentId ? `Agent ${finalRecord.referredByAgentId} commission of ₹200 is on hold.` : ''}`,
        cardNumber: finalRecord.cardNumber,
        agentId: finalRecord.referredByAgentId
      });
    }

    // Refresh agent data so pending referrals count is synced (without giving commission)
    syncAllAgentsWithSubmissions(updated);

    window.dispatchEvent(new CustomEvent('globalcarelink:new_submission', { detail: finalRecord }));
    return updated;
  } catch (err) {
    console.error('Failed saving submission', err);
    return [];
  }
}

/**
 * Admin Action: Approve Card
 * Releases the commission to the agent only upon this approval!
 */
export function approveCardSubmission(cardNumber: string, adminNotes?: string): { success: boolean; message: string; updatedSubmissions: MemberRecord[] } {
  try {
    const current = getStoredSubmissions();
    const targetIndex = current.findIndex(c => c.cardNumber === cardNumber);

    if (targetIndex < 0) {
      return { success: false, message: 'Card not found', updatedSubmissions: current };
    }

    const oldRecord = current[targetIndex];
    const approvedRecord: MemberRecord = {
      ...oldRecord,
      approvalStatus: 'APPROVED',
      approvedAt: new Date().toISOString(),
      declineReason: undefined
    };

    const updated = [...current];
    updated[targetIndex] = approvedRecord;
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));

    // Sync all agents so approved card triggers confirmed commission calculation!
    syncAllAgentsWithSubmissions(updated);

    // Record Activity
    recordActivity({
      type: 'CARD_APPROVED',
      actor: 'Admin',
      title: `Card Approved by Admin (${approvedRecord.cardNumber})`,
      details: `Admin approved card for ${approvedRecord.fullName}.${approvedRecord.referredByAgentId ? ` Referral commission of ₹200 released & credited to Agent ${approvedRecord.referredByAgentId}!` : ''}${adminNotes ? ` Note: ${adminNotes}` : ''}`,
      cardNumber: approvedRecord.cardNumber,
      agentId: approvedRecord.referredByAgentId,
      amount: approvedRecord.referredByAgentId ? 200 : undefined
    });

    window.dispatchEvent(new CustomEvent('globalcarelink:new_submission', { detail: approvedRecord }));
    window.dispatchEvent(new CustomEvent('globalcarelink:agent_updated'));
    return { success: true, message: `Card ${cardNumber} approved successfully. Commission released.`, updatedSubmissions: updated };
  } catch (err) {
    console.error('Failed approving card', err);
    return { success: false, message: 'Failed to approve card', updatedSubmissions: getStoredSubmissions() };
  }
}

/**
 * Admin Action: Decline Card
 * Commission is withheld/removed.
 */
export function declineCardSubmission(cardNumber: string, reason: string = 'Payment/Document verification unconfirmed'): { success: boolean; message: string; updatedSubmissions: MemberRecord[] } {
  try {
    const current = getStoredSubmissions();
    const targetIndex = current.findIndex(c => c.cardNumber === cardNumber);

    if (targetIndex < 0) {
      return { success: false, message: 'Card not found', updatedSubmissions: current };
    }

    const oldRecord = current[targetIndex];
    const declinedRecord: MemberRecord = {
      ...oldRecord,
      approvalStatus: 'DECLINED',
      declineReason: reason
    };

    const updated = [...current];
    updated[targetIndex] = declinedRecord;
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));

    // Sync all agents so commission is NOT credited
    syncAllAgentsWithSubmissions(updated);

    // Record Activity
    recordActivity({
      type: 'CARD_DECLINED',
      actor: 'Admin',
      title: `Card Declined by Admin (${declinedRecord.cardNumber})`,
      details: `Admin declined card for ${declinedRecord.fullName}. Reason: ${reason}.${declinedRecord.referredByAgentId ? ` Agent ${declinedRecord.referredByAgentId} commission cancelled.` : ''}`,
      cardNumber: declinedRecord.cardNumber,
      agentId: declinedRecord.referredByAgentId
    });

    window.dispatchEvent(new CustomEvent('globalcarelink:new_submission', { detail: declinedRecord }));
    window.dispatchEvent(new CustomEvent('globalcarelink:agent_updated'));
    return { success: true, message: `Card ${cardNumber} marked declined. Commission not credited.`, updatedSubmissions: updated };
  } catch (err) {
    console.error('Failed declining card', err);
    return { success: false, message: 'Failed to decline card', updatedSubmissions: getStoredSubmissions() };
  }
}

export function deleteSubmission(cardNumber: string): MemberRecord[] {
  try {
    const current = getStoredSubmissions();
    const updated = current.filter(c => c.cardNumber !== cardNumber);
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));
    syncAllAgentsWithSubmissions(updated);
    window.dispatchEvent(new CustomEvent('globalcarelink:submission_deleted', { detail: cardNumber }));
    return updated;
  } catch (err) {
    console.error('Failed deleting submission', err);
    return [];
  }
}

// ================= AGENT / REFERRAL SYSTEM (gcl001 series) =================

/**
 * Recalculates an agent's statistics strictly against actual card submission records.
 * Commission (totalEarnings) is ONLY granted for cards with approvalStatus === 'APPROVED'!
 */
export function recalculateAgentFromSubmissions(agent: AgentRecord, submissions?: MemberRecord[]): AgentRecord {
  const allSubmissions = submissions || getStoredSubmissions();
  const normalizedId = agent.agentId.toLowerCase();

  // Cards referred by this agent
  const matchedCards = allSubmissions.filter(s => s.referredByAgentId && s.referredByAgentId.trim().toLowerCase() === normalizedId);

  const approvedCards = matchedCards.filter(s => s.approvalStatus === 'APPROVED').map(s => s.cardNumber);
  const pendingCards = matchedCards.filter(s => s.approvalStatus === 'PENDING').map(s => s.cardNumber);
  const declinedCards = matchedCards.filter(s => s.approvalStatus === 'DECLINED').map(s => s.cardNumber);

  const rate = agent.commissionPerCard || 200;

  return {
    ...agent,
    referredCards: matchedCards.map(s => s.cardNumber),
    approvedCards,
    totalReferrals: matchedCards.length,
    approvedReferrals: approvedCards.length,
    pendingReferrals: pendingCards.length,
    declinedReferrals: declinedCards.length,
    // ONLY APPROVED CARDS EARN COMMISSION!
    totalEarnings: approvedCards.length * rate,
    pendingCommission: pendingCards.length * rate
  };
}

export function getStoredAgents(): AgentRecord[] {
  try {
    const raw = localStorage.getItem(AGENTS_STORAGE_KEY);
    let agentsList: AgentRecord[] = raw ? JSON.parse(raw) : SEED_AGENTS;

    // Synchronize agents with current submissions to ensure 100% accurate commission & counts
    const submissions = getStoredSubmissions();
    agentsList = agentsList.map(a => recalculateAgentFromSubmissions(a, submissions));
    return agentsList;
  } catch (err) {
    console.error('Failed reading agents from storage', err);
    return SEED_AGENTS;
  }
}

export function syncAllAgentsWithSubmissions(submissions?: MemberRecord[]): AgentRecord[] {
  try {
    const raw = localStorage.getItem(AGENTS_STORAGE_KEY);
    const agentsList: AgentRecord[] = raw ? JSON.parse(raw) : SEED_AGENTS;
    const subs = submissions || getStoredSubmissions();
    const synced = agentsList.map(a => recalculateAgentFromSubmissions(a, subs));
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(synced));
    window.dispatchEvent(new CustomEvent('globalcarelink:agent_updated'));
    return synced;
  } catch (err) {
    console.error('Failed syncing agents with submissions', err);
    return [];
  }
}

/**
 * Generates next Agent ID in series gcl001, gcl002, gcl003...
 */
export function generateNextAgentId(): string {
  const agents = getStoredAgents();
  let maxIdNum = 0;
  for (const agent of agents) {
    const match = agent.agentId.match(/gcl(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  }
  const nextNum = maxIdNum + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `gcl${padded}`;
}

export function saveAgent(agent: AgentRecord): AgentRecord[] {
  try {
    const current = getStoredAgents();
    const existingIndex = current.findIndex(a => a.agentId.toLowerCase() === agent.agentId.toLowerCase());
    
    // Ensure accurate metrics
    const updatedAgent = recalculateAgentFromSubmissions(agent);
    
    let updated: AgentRecord[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = updatedAgent;
    } else {
      updated = [updatedAgent, ...current];
    }
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(updated));

    // Log Activity for new agent
    if (existingIndex < 0) {
      recordActivity({
        type: 'AGENT_REGISTERED',
        actor: agent.fullName,
        title: `New Agent Registered (${agent.agentId})`,
        details: `${agent.fullName} joined Refer & Earn Partner program. Agent ID: ${agent.agentId}, Phone: ${agent.mobile}, City: ${agent.city}`,
        agentId: agent.agentId
      });
    }

    window.dispatchEvent(new CustomEvent('globalcarelink:agent_updated', { detail: updatedAgent }));
    return updated;
  } catch (err) {
    console.error('Failed saving agent', err);
    return [];
  }
}

// ================= WEBSITE ACTIVITY LOG =================

export function getStoredActivities(): ActivityLogItem[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
      return SEED_ACTIVITIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading activities from storage', err);
    return SEED_ACTIVITIES;
  }
}

export function recordActivity(item: Omit<ActivityLogItem, 'id' | 'timestamp' | 'formattedTime'>): ActivityLogItem {
  try {
    const activities = getStoredActivities();
    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newActivity: ActivityLogItem = {
      ...item,
      id: `act_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: now.toISOString(),
      formattedTime
    };

    const updated = [newActivity, ...activities].slice(0, 500); // keep recent 500
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent('globalcarelink:new_activity', { detail: newActivity }));
    return newActivity;
  } catch (err) {
    console.error('Failed recording activity', err);
    return {
      ...item,
      id: `act_${Date.now()}`,
      timestamp: new Date().toISOString(),
      formattedTime: 'Just now'
    };
  }
}

// ================= EXPORTERS =================

export function exportSubmissionsToCSV(records: MemberRecord[]) {
  const headers = [
    'Card Number',
    'Full Name',
    'Approval Status',
    'Approved At',
    'Decline Reason',
    'Contact No',
    'Gender',
    'Date of Birth',
    'Father/Husband Name',
    'Address',
    'Pin Code',
    'Blood Group',
    'Aadhaar No',
    'Referred By Agent ID',
    'Height',
    'Weight',
    'Occupation',
    'Gallbladder Stones',
    'Kidney Stones',
    'Hernia',
    'Piles/Fistula',
    'Rasoli/Fibroid',
    'Other Critical Illness',
    'Specific Illness Details',
    'Preferred Hospital 1',
    'Preferred Hospital 2',
    'Preferred Hospital 3',
    'Insurance Type',
    'Insurance Company / Card No',
    'Emergency Contact 1',
    'Emergency Contact 2',
    'Declaration Place',
    'Declaration Date',
    'Payment Status',
    'Payment Method',
    'Payment ID',
    'Amount',
    'Submitted At'
  ];

  const rows = records.map(r => {
    const s = r.surveyData;
    return [
      `"${r.cardNumber}"`,
      `"${r.fullName}"`,
      `"${r.approvalStatus || 'PENDING'}"`,
      `"${r.approvedAt || ''}"`,
      `"${(r.declineReason || '').replace(/"/g, '""')}"`,
      `"${r.mobile}"`,
      `"${r.gender}"`,
      `"${r.dob}"`,
      `"${s?.fatherOrHusbandName || ''}"`,
      `"${(s?.currentAddress || r.preferredLocation || '').replace(/"/g, '""')}"`,
      `"${s?.pinCode || ''}"`,
      `"${s?.bloodGroup || ''}"`,
      `"${s?.aadhaarNo || ''}"`,
      `"${r.referredByAgentId || s?.referredByAgentId || 'Direct / None'}"`,
      `"${s?.height || ''}"`,
      `"${s?.weight || ''}"`,
      `"${s?.occupation || ''}"`,
      s?.gallbladderStones ? 'Yes' : 'No',
      s?.kidneyStones ? 'Yes' : 'No',
      s?.hernia ? 'Yes' : 'No',
      s?.pilesFistula ? 'Yes' : 'No',
      s?.rasoliFibroid ? 'Yes' : 'No',
      s?.otherCriticalIllness ? 'Yes' : 'No',
      `"${(s?.specificIllnessDetails || '').replace(/"/g, '""')}"`,
      `"${s?.preferredHospitals?.[0] ? `${s.preferredHospitals[0].hospitalName} (${s.preferredHospitals[0].location})` : ''}"`,
      `"${s?.preferredHospitals?.[1] ? `${s.preferredHospitals[1].hospitalName} (${s.preferredHospitals[1].location})` : ''}"`,
      `"${s?.preferredHospitals?.[2] ? `${s.preferredHospitals[2].hospitalName} (${s.preferredHospitals[2].location})` : ''}"`,
      `"${s?.insuranceType || 'cash'}"`,
      `"${s?.insuranceType === 'private' ? s.companyTpa : s?.insuranceType === 'ayushman' ? s.ayushmanCardNo : 'None'}"`,
      `"${s?.emergencyContacts?.[0] ? `${s.emergencyContacts[0].name} (${s.emergencyContacts[0].relationship}: ${s.emergencyContacts[0].contactNo})` : ''}"`,
      `"${s?.emergencyContacts?.[1] ? `${s.emergencyContacts[1].name} (${s.emergencyContacts[1].relationship}: ${s.emergencyContacts[1].contactNo})` : ''}"`,
      `"${s?.declarationPlace || 'Delhi'}"`,
      `"${s?.declarationDate || r.issueDate}"`,
      `"${s?.paymentStatus || 'PAID'}"`,
      `"${s?.paymentMethod || 'UPI'}"`,
      `"${s?.paymentId || 'pay_demo'}"`,
      '599',
      `"${r.submittedAt || r.issueDate}"`
    ];
  });

  downloadCSV(headers, rows, `global_care_link_patient_surveys_${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportAgentsToCSV(agents: AgentRecord[]) {
  const headers = [
    'Agent ID',
    'Full Name',
    'Mobile',
    'Email',
    'UPI ID for Payout',
    'City / Area',
    'Status',
    'Total Referrals',
    'Approved Referrals',
    'Pending Referrals',
    'Commission Rate',
    'Confirmed Earnings (Approved Only Rs)',
    'Pending Commission (On Hold Rs)',
    'Payout Status',
    'Approved Card IDs',
    'Created At'
  ];

  const rows = agents.map(a => [
    `"${a.agentId}"`,
    `"${a.fullName}"`,
    `"${a.mobile}"`,
    `"${a.email}"`,
    `"${a.upiId}"`,
    `"${a.city}"`,
    `"${a.status}"`,
    a.totalReferrals,
    a.approvedReferrals || 0,
    a.pendingReferrals || 0,
    a.commissionPerCard,
    a.totalEarnings,
    a.pendingCommission || 0,
    `"${a.payoutStatus}"`,
    `"${(a.approvedCards || []).join(', ')}"`,
    `"${a.createdAt}"`
  ]);

  downloadCSV(headers, rows, `global_care_link_agents_list_${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportActivitiesToCSV(activities: ActivityLogItem[]) {
  const headers = [
    'Activity ID',
    'Date & Time',
    'Type',
    'Actor',
    'Title',
    'Details',
    'Agent ID',
    'Card Number',
    'Amount (Rs)'
  ];

  const rows = activities.map(act => [
    `"${act.id}"`,
    `"${act.formattedTime}"`,
    `"${act.type}"`,
    `"${act.actor}"`,
    `"${act.title}"`,
    `"${act.details.replace(/"/g, '""')}"`,
    `"${act.agentId || ''}"`,
    `"${act.cardNumber || ''}"`,
    act.amount || ''
  ]);

  downloadCSV(headers, rows, `global_care_link_website_activity_log_${new Date().toISOString().slice(0, 10)}.csv`);
}

function downloadCSV(headers: string[], rows: (string | number)[][], filename: string) {
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
