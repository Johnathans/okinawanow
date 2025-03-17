'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import PersonalInfo from '@/components/profile-setup/PersonalInfo';
import PropertyPreferences from '@/components/profile-setup/PropertyPreferences';
import ContactPreferences from '@/components/profile-setup/ContactPreferences';
import type { UserProfile } from '@/types/profile';

interface ProfileSetupClientProps {
  userId: string;
}

export default function ProfileSetupClient({ userId }: ProfileSetupClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const steps = [
    {
      title: 'Personal Information',
      component: PersonalInfo,
    },
    {
      title: 'Property Preferences',
      component: PropertyPreferences,
    },
    {
      title: 'Contact Preferences',
      component: ContactPreferences,
    },
  ];

  const handleNext = async (stepData: any) => {
    try {
      if (currentStep === steps.length - 1) {
        console.log('Starting profile submission...');

        if (!user?.uid) {
          throw new Error('No user ID available');
        }

        const updatedProfile: UserProfile = {
          ...formData,
          contactPreferences: stepData,
          id: user.uid,
          completed: true,
          updatedAt: new Date().toISOString(),
        };

        // Save directly to Firestore
        const docRef = doc(db, 'userProfiles', user.uid);
        await setDoc(docRef, updatedProfile);

        console.log('Profile saved successfully');
        router.push('/dashboard');
      } else {
        // For non-final steps, update the form data and move to next step
        setFormData((prev) => ({
          ...prev,
          ...stepData,
        }));
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      // Handle error appropriately
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div>
      <div className="progress mb-4" style={{ height: '4px' }}>
        <div
          className="progress-bar bg-primary"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>

      <CurrentStepComponent
        onNext={handleNext}
        onBack={handleBack}
        initialData={formData}
      />
    </div>
  );
}
