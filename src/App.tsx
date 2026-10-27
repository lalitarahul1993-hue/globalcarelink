/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { DigitalHealthCard } from './components/DigitalHealthCard';
import { CardVerification } from './components/CardVerification';
import { PricingSection } from './components/PricingSection';
import { ComplianceSection } from './components/ComplianceSection';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Footer } from './components/Footer';
import { 
  ServiceInquiryModal, 
  EmergencyModal 
} from './components/Modals';
import { PatientSurveyFormModal } from './components/PatientSurveyFormModal';
import { AdminSubmissionsModal } from './components/AdminSubmissionsModal';
import { ReferAndEarnModal } from './components/ReferAndEarnModal';
import { FacilitationService, MemberRecord } from './types';
import { getStoredSubmissions, saveSubmission } from './utils/storage';

export default function App() {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<FacilitationService | null>(null);
  
  // Custom submissions state loaded from persistence
  const [submissions, setSubmissions] = useState<MemberRecord[]>([]);
  const [verifySearchInput, setVerifySearchInput] = useState<string>('');

  useEffect(() => {
    // Initial load
    setSubmissions(getStoredSubmissions());

    // Listen to changes across tabs/windows or other modal triggers
    const handleStorageUpdate = () => {
      setSubmissions(getStoredSubmissions());
    };

    window.addEventListener('globalcarelink:new_submission', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('globalcarelink:new_submission', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const handleQuickVerifyFromHero = (cardNo: string) => {
    setVerifySearchInput(cardNo);
    const element = document.getElementById('verify-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewCardIssued = (newMember: MemberRecord) => {
    saveSubmission(newMember);
    setSubmissions(getStoredSubmissions());
    setVerifySearchInput(newMember.cardNumber);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      
      {/* 1 & 2. Top Announcement Bar & Sticky Header */}
      <Header
        onOpenApplyModal={() => setIsSurveyModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenReferModal={() => setIsReferModalOpen(true)}
        submissionCount={submissions.length}
        activeSection="home"
      />

      <main className="flex-1">
        
        {/* 3. Hero Section */}
        <Hero
          onOpenApplyModal={() => setIsSurveyModalOpen(true)}
          onExploreServices={handleExploreServices}
          onQuickVerify={handleQuickVerifyFromHero}
          onOpenReferModal={() => setIsReferModalOpen(true)}
        />

        {/* 4. 12 Facilitation Services Grid */}
        <ServicesGrid
          onSelectServiceForBooking={(service) => setSelectedServiceForBooking(service)}
        />

        {/* 5. Customer Health Card Showcase & Live Demo */}
        <DigitalHealthCard
          onOpenFullSurveyModal={() => setIsSurveyModalOpen(true)}
          onCardGenerated={(newCardNum, customData) => {
            const tempMember: MemberRecord = {
              cardNumber: newCardNum,
              fullName: customData?.fullName || 'Registered Cardholder',
              mobile: customData?.mobile || '+91 7290835403',
              dob: customData?.dob || '14/08/1988',
              gender: customData?.gender || 'Male',
              preferredLocation: customData?.preferredLocation || 'Harsh Vihar, Delhi',
              issueDate: '10/10/2026',
              validTill: '09/10/2027',
              status: 'ACTIVE',
              jurisdiction: 'Delhi Only',
              tier: 'All 12 MOU Facilitation Services Active',
              paymentStatus: 'PAID',
              paymentMethod: 'UPI (₹599)'
            };
            handleNewCardIssued(tempMember);
          }}
        />

        {/* 6. Card Verification / Lookup Feature */}
        <CardVerification
          key={verifySearchInput}
          initialSearch={verifySearchInput}
          customMembers={submissions}
        />

        {/* 7. Pricing & Membership Plan Section */}
        <PricingSection
          onOpenApplyModal={() => setIsSurveyModalOpen(true)}
        />

        {/* 8. Transparency & Statutory Compliance Section */}
        <ComplianceSection />

        {/* 9. Important Legal Disclaimer Banner */}
        <DisclaimerBanner />

      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Official Patient Assistance & Health Survey 6-Section Application Form with Payment */}
      <PatientSurveyFormModal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
        onSuccess={handleNewCardIssued}
      />

      {/* Admin Records & Submissions Modal (All Customer Details Accessible) */}
      <AdminSubmissionsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        submissions={submissions}
        onRefresh={() => setSubmissions(getStoredSubmissions())}
      />

      {/* Refer & Earn Partner Program Modal (Agent ID Series gcl001+) */}
      <ReferAndEarnModal
        isOpen={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={selectedServiceForBooking !== null}
        service={selectedServiceForBooking}
        onClose={() => setSelectedServiceForBooking(null)}
      />

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

    </div>
  );
}
