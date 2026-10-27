import { FacilitationService, MemberRecord } from '../types';

export const FACILITATION_SERVICES: FacilitationService[] = [
  {
    id: 'ambulance',
    number: '01',
    title: '24x7 Ambulance Facilitation',
    category: 'emergency',
    icon: 'Ambulance',
    tagline: 'Rapid emergency ambulance dispatch coordination across Delhi NCR',
    description: 'Immediate coordination with verified private ambulance fleets (Basic & Advanced Cardiac Life Support) to ensure timely hospital transfer during critical emergencies.',
    facilitationScope: [
      '24x7 Dedicated Helpline Desk coordination',
      'BLS (Basic Life Support) & ACLS coordination via licensed operators',
      'Real-time transit tracking & emergency triage facilitation',
      'Direct liaison with nearest network emergency reception'
    ],
    partnerSLA: 'Immediate escalation within 3-5 minutes of call',
    mouNotice: 'Facilitation via licensed private ambulance MOU partners only'
  },
  {
    id: 'doctor-appointment',
    number: '02',
    title: 'Doctor Appointment Facilitation',
    category: 'consultation',
    icon: 'CalendarCheck',
    tagline: 'Priority outpatient consultation scheduling with multi-specialty clinicians',
    description: 'Bypass long waiting queues at leading hospitals and specialty clinics. Dedicated assistance for booking outpatient visits with top-tier consultants across Delhi.',
    facilitationScope: [
      'Priority slot coordination across General Physicians & Super-specialists',
      'Cardiology, Orthopedics, Oncology, Gynecology & Pediatrics network',
      'Prescription and medical record dispatch assistance',
      'Pre-appointment briefing and reminder alerts'
    ],
    partnerSLA: 'Same-day or next-day scheduled slots depending on specialty',
    mouNotice: 'Facilitation via empanelled hospital and clinic MOU partners only'
  },
  {
    id: 'pharmacy',
    number: '03',
    title: 'Pharmacy Facilitation',
    category: 'homecare',
    icon: 'Pill',
    tagline: 'Discounted prescription medicine doorstep delivery coordination',
    description: 'Convenient facilitation of genuine medicines and chronic care refills delivered directly to your doorstep through licensed partner retail chemist chains.',
    facilitationScope: [
      'Digital prescription upload & validation support',
      'Facilitated partner discounts on genuine branded & generic medicines',
      'Priority express delivery coordination across Delhi NCR',
      'Refill alerts for chronic ailments (Diabetes, Hypertension, Cardiac)'
    ],
    partnerSLA: 'Delivery coordination within 2-4 hours in metro zones',
    mouNotice: 'Facilitation via state-licensed pharmacy MOU partners only'
  },
  {
    id: 'hospitalization',
    number: '04',
    title: 'Hospitalization Support',
    category: 'emergency',
    icon: 'Building2',
    tagline: 'End-to-end admission guidance, desk facilitation & estimated billing transparency',
    description: 'Stress-free assistance during planned or unplanned hospital admissions, including hospital desk guidance, documentation assistance, and coordination with hospital reception.',
    facilitationScope: [
      'Bed category options & tariff transparency guidance',
      'Inpatient admission desk documentation support',
      'MOU partner preferential admission assistance',
      'Discharge summary & itemized billing compilation support'
    ],
    partnerSLA: 'Dedicated facilitation executive assistance during admission',
    mouNotice: 'Facilitation via independent private hospital MOU partners only'
  },
  {
    id: 'wellness',
    number: '05',
    title: 'Wellness Support',
    category: 'diagnostic',
    icon: 'HeartPulse',
    tagline: 'Preventative health lifestyle guidance, dietetics & wellness check-ins',
    description: 'Proactive health support designed to help cardholders maintain vitality through balanced dietary advice, routine vitals tracking, and preventive lifestyle guidance.',
    facilitationScope: [
      'Quarterly dietary & lifestyle review scheduling',
      'Holistic wellness tips & preventive health reminders',
      'Stress management and mental well-being coordination',
      'Periodic health score updates for cardholders'
    ],
    partnerSLA: 'Scheduled sessions via certified wellness specialists',
    mouNotice: 'Facilitation via certified wellness counseling MOU partners only'
  },
  {
    id: 'lab-test',
    number: '06',
    title: 'Lab Test Booking Facilitation',
    category: 'diagnostic',
    icon: 'Microscope',
    tagline: 'Doorstep blood sample collection & discounted diagnostic panel bookings',
    description: 'Facilitated bookings at NABL-accredited diagnostic laboratories with free or discounted home sample collection and swift digital report delivery.',
    facilitationScope: [
      'Home sample collection dispatch by trained phlebotomists',
      'MOU partner negotiated rates on Routine & Specialized Pathology',
      'NABL & CAP certified diagnostic partner laboratory networks',
      'Automated digital report delivery via WhatsApp & Email'
    ],
    partnerSLA: 'Home sample pickup within preferred 2-hour morning window',
    mouNotice: 'Facilitation via NABL-accredited laboratory MOU partners only'
  },
  {
    id: 'home-care',
    number: '07',
    title: 'Home Care Services',
    category: 'homecare',
    icon: 'Home',
    tagline: 'Trained elderly attendants, post-op support & compassionate home assistance',
    description: 'Coordination for verified, background-checked home health aides to assist seniors, recovering patients, and individuals requiring non-invasive personal care support.',
    facilitationScope: [
      '12-hour or 24-hour trained attendant allocation coordination',
      'Assistance with mobility, hygiene, feeding & vital monitoring',
      'Post-operative surgical convalescence companionship',
      'Vetted caregivers with police verification & medical clearance'
    ],
    partnerSLA: 'Caregiver placement coordination within 24-48 hours',
    mouNotice: 'Facilitation via registered home healthcare agency MOU partners only'
  },
  {
    id: 'physiotherapy',
    number: '08',
    title: 'Physiotherapy via MOU',
    category: 'homecare',
    icon: 'Activity',
    tagline: 'Certified physical therapists for in-home rehabilitation or clinic visits',
    description: 'Facilitated access to licensed physical therapists specializing in orthopedic rehabilitation, stroke recovery, sports injury therapy, and geriatric mobility improvement.',
    facilitationScope: [
      'Home visit physiotherapy sessions with portable equipment',
      'Post-orthopedic surgery (Knee/Hip replacement) recovery protocols',
      'Neurological and stroke rehabilitation regimens',
      'Special discounted session packages through MOU partners'
    ],
    partnerSLA: 'Therapist visit coordination within 24 hours of request',
    mouNotice: 'Facilitation via licensed physiotherapy clinic MOU partners only'
  },
  {
    id: 'nursing-assistance',
    number: '09',
    title: 'Nursing Assistance via MOU',
    category: 'homecare',
    icon: 'UserCheck',
    tagline: 'Licensed GNM/B.Sc nurses for clinical home procedures & bedside care',
    description: 'Connecting patients with qualified clinical nurses for specialized at-home procedures including injections, IV infusions, wound dressing, catheter care, and vital monitoring.',
    facilitationScope: [
      'Short-visit nursing for IV drips, injections, and blood sugar checks',
      'Complex aseptic surgical wound dressings and bed sore care',
      'Tracheostomy, Ryle’s tube and urinary catheter management',
      'Supervision by experienced clinical nurse supervisors'
    ],
    partnerSLA: 'Scheduled visits or shift assignments within 12-24 hours',
    mouNotice: 'Facilitation via certified clinical nursing agency MOU partners only'
  },
  {
    id: 'medical-equipment',
    number: '10',
    title: 'Medical Equipment Facilitation',
    category: 'homecare',
    icon: 'Stethoscope',
    tagline: 'Doorstep rental & purchase facilitation for ICU setups & respiratory equipment',
    description: 'Quick procurement and doorstep installation of high-grade medical gear including oxygen concentrators, hospital beds, CPAP/BiPAP machines, suction units, and wheelchairs.',
    facilitationScope: [
      'Oxygen concentrators (5L/10L) & cylinders rental coordination',
      'Motorized & semi-fowler hospital beds with air mattresses',
      'BiPAP, CPAP, and portable suction machine facilitation',
      'Sanitized delivery, installation, and user demo by technicians'
    ],
    partnerSLA: 'Emergency equipment dispatch within 2-4 hours in Delhi',
    mouNotice: 'Facilitation via verified medical equipment provider MOU partners only'
  },
  {
    id: 'health-checkup',
    number: '11',
    title: 'Health Checkup Facilitation',
    category: 'diagnostic',
    icon: 'ShieldCheck',
    tagline: 'Comprehensive annual preventive health screening packages at network rates',
    description: 'Facilitation of full-body executive checkups, cardiac risk assessments, diabetic profiles, and senior citizen screenings at substantial partner discount rates.',
    facilitationScope: [
      'Comprehensive Full-Body profiles (60+ to 90+ clinical parameters)',
      'Partner hospital executive lounge priority check-in',
      'Detailed physician consultation to review test results',
      'Preventive risk scoring for cardiovascular and metabolic disorders'
    ],
    partnerSLA: 'Prior booking with zero queue hospital desk facilitation',
    mouNotice: 'Facilitation via multi-specialty hospital diagnostic MOU partners only'
  },
  {
    id: 'telemedicine',
    number: '12',
    title: 'Telemedicine Support',
    category: 'consultation',
    icon: 'Video',
    tagline: 'Audio/video consultation facilitation with experienced licensed doctors',
    description: 'Seamless digital consultations connecting cardholders directly with experienced physicians for non-emergency medical advice, second opinions, and prescription renewals.',
    facilitationScope: [
      'Instant audio or video consultation link generation',
      'Access to MBBS and MD doctors from the comfort of home',
      'Digital e-prescription issued directly to your mobile phone',
      'Follow-up query support within 48 hours of consultation'
    ],
    partnerSLA: 'Connected within 15-30 minutes for urgent scheduled consults',
    mouNotice: 'Facilitation via registered telemedicine provider MOU partners only'
  }
];

export const COMPANY_CREDENTIALS = {
  name: 'GLOBAL CARE LINK SERVICES LLP',
  tagline: 'Your Growth, Our Support',
  llpin: 'ADC-8783',
  pan: 'ABFFG3534R',
  tan: 'DELG35173F',
  incorporationDate: '05 October 2026',
  helpline: '+91 7290835403',
  helplineRaw: '+917290835403',
  email: 'info@globalcarelinkservices.com',
  website: 'www.globalcarelinkservices.org',
  address: 'B-1/552, GF, Gali No. 21, Kh No. 34/18, Harsh Vihar, North East Delhi - 110093',
  jurisdiction: 'Delhi Only',
  emergencyDirect: '102 / 112',
  cardPrice: '₹599 / Year',
  liabilityCap: '₹599',
};

export const MOCK_MEMBERS: MemberRecord[] = [
  {
    cardNumber: 'ADC-8783-001',
    fullName: 'Rahul Sharma',
    mobile: '+91 98712 34567',
    dob: '14/08/1988',
    gender: 'Male',
    preferredLocation: 'Harsh Vihar, North East Delhi',
    issueDate: '05/10/2026',
    validTill: '04/10/2027',
    status: 'ACTIVE',
    jurisdiction: 'Delhi Only',
    tier: 'All 12 MOU Facilitation Services Active'
  },
  {
    cardNumber: 'GCL-2026-9042',
    fullName: 'Priya Verma',
    mobile: '+91 98114 90211',
    dob: '22/11/1992',
    gender: 'Female',
    preferredLocation: 'Rohini, North Delhi',
    issueDate: '06/10/2026',
    validTill: '05/10/2027',
    status: 'ACTIVE',
    jurisdiction: 'Delhi Only',
    tier: 'All 12 MOU Facilitation Services Active'
  },
  {
    cardNumber: 'GCL-2026-1015',
    fullName: 'Amitabh Sen',
    mobile: '+91 99580 12844',
    dob: '03/05/1975',
    gender: 'Male',
    preferredLocation: 'Laxmi Nagar, East Delhi',
    issueDate: '07/10/2026',
    validTill: '06/10/2027',
    status: 'ACTIVE',
    jurisdiction: 'Delhi Only',
    tier: 'All 12 MOU Facilitation Services Active'
  }
];
