import { MemberRecord, PatientSurveyFormData, AgentRecord, ActivityLogItem, ActivityType } from '../types';
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
    totalEarnings: 800, // 4 * ₹200
    commissionPerCard: 200,
    status: 'ACTIVE',
    payoutStatus: 'PAID',
    referredCards: ['ADC-8783-001', 'ADC-8783-002', 'ADC-8783-003', 'ADC-8783-004']
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
    totalEarnings: 400, // 2 * ₹200
    commissionPerCard: 200,
    status: 'ACTIVE',
    payoutStatus: 'PENDING',
    referredCards: ['ADC-8783-005', 'ADC-8783-006']
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
    details: 'Rahul Sharma completed 6-section health survey and ₹599 UPI payment (Referred by Agent gcl001)',
    agentId: 'gcl001',
    cardNumber: 'ADC-8783-001',
    amount: 599
  },
  {
    id: 'act_init_3',
    timestamp: '2026-10-06T10:31:00Z',
    formattedTime: '06 Oct 2026, 04:01 PM',
    type: 'REFERRAL_CREDITED',
    actor: 'System',
    title: '₹200 Referral Commission Credited',
    details: 'Agent gcl001 credited ₹200 for successful card enrollment of Rahul Sharma (ADC-8783-001)',
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
      const seeded: MemberRecord[] = MOCK_MEMBERS.map((m, idx) => ({
        ...m,
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
      }));
      localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading submissions from storage', err);
    return MOCK_MEMBERS;
  }
}

export function saveSubmission(record: MemberRecord): MemberRecord[] {
  try {
    const current = getStoredSubmissions();
    const updated = [record, ...current.filter(c => c.cardNumber !== record.cardNumber)];
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));

    // Record Activity
    recordActivity({
      type: 'CARD_ISSUED',
      actor: record.fullName,
      title: `Customer Card Issued (${record.cardNumber})`,
      details: `${record.fullName} enrolled for ₹599 Annual Healthcare Card.${record.referredByAgentId ? ` Referred by Agent ID: ${record.referredByAgentId}` : ''}`,
      cardNumber: record.cardNumber,
      agentId: record.referredByAgentId,
      amount: 599
    });

    // If referred by an agent, credit the referral!
    if (record.referredByAgentId) {
      creditReferralToAgent(record.referredByAgentId, record.cardNumber, record.fullName);
    }

    window.dispatchEvent(new CustomEvent('globalcarelink:new_submission', { detail: record }));
    return updated;
  } catch (err) {
    console.error('Failed saving submission', err);
    return [];
  }
}

export function deleteSubmission(cardNumber: string): MemberRecord[] {
  try {
    const current = getStoredSubmissions();
    const updated = current.filter(c => c.cardNumber !== cardNumber);
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('globalcarelink:submission_deleted', { detail: cardNumber }));
    return updated;
  } catch (err) {
    console.error('Failed deleting submission', err);
    return [];
  }
}

// ================= AGENT / REFERRAL SYSTEM (gcl001 series) =================

export function getStoredAgents(): AgentRecord[] {
  try {
    const raw = localStorage.getItem(AGENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(SEED_AGENTS));
      return SEED_AGENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading agents from storage', err);
    return SEED_AGENTS;
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
  // Pad with leading zeros, e.g. gcl001, gcl002, gcl010, etc.
  const padded = String(nextNum).padStart(3, '0');
  return `gcl${padded}`;
}

export function saveAgent(agent: AgentRecord): AgentRecord[] {
  try {
    const current = getStoredAgents();
    const existingIndex = current.findIndex(a => a.agentId.toLowerCase() === agent.agentId.toLowerCase());
    let updated: AgentRecord[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = agent;
    } else {
      updated = [agent, ...current];
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

    window.dispatchEvent(new CustomEvent('globalcarelink:agent_updated', { detail: agent }));
    return updated;
  } catch (err) {
    console.error('Failed saving agent', err);
    return [];
  }
}

export function creditReferralToAgent(agentId: string, cardNumber: string, customerName: string): boolean {
  try {
    const agents = getStoredAgents();
    const normalizedId = agentId.trim().toLowerCase();
    const agent = agents.find(a => a.agentId.toLowerCase() === normalizedId);

    if (!agent) {
      console.warn(`Referral Agent ID ${agentId} not found in database.`);
      return false;
    }

    // Avoid double counting same card
    if (agent.referredCards.includes(cardNumber)) {
      return true;
    }

    agent.totalReferrals = (agent.totalReferrals || 0) + 1;
    const commission = agent.commissionPerCard || 200;
    agent.totalEarnings = (agent.totalEarnings || 0) + commission;
    agent.referredCards = [...agent.referredCards, cardNumber];

    saveAgent(agent);

    // Record Referral Credited Activity
    recordActivity({
      type: 'REFERRAL_CREDITED',
      actor: 'System',
      title: `₹${commission} Commission Credited to ${agent.agentId}`,
      details: `Agent ${agent.fullName} (${agent.agentId}) earned ₹${commission} for referring customer ${customerName} (Card: ${cardNumber})`,
      agentId: agent.agentId,
      cardNumber: cardNumber,
      amount: commission
    });

    return true;
  } catch (err) {
    console.error('Failed crediting referral to agent', err);
    return false;
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
    'Total Referrals (Cards)',
    'Commission Rate',
    'Total Earnings (Rs)',
    'Payout Status',
    'Referred Card IDs',
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
    a.commissionPerCard,
    a.totalEarnings,
    `"${a.payoutStatus}"`,
    `"${a.referredCards.join(', ')}"`,
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
