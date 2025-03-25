'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import PersonalInfo from '@/components/profile-setup/PersonalInfo';
import ListingPreferences from '@/components/profile-setup/ListingPreferences';
import ContactPreferences from '@/components/profile-setup/ContactPreferences';
import type { 
  UserProfile, 
  UserPersonalInfo, 
  UserPropertyPreferences, 
  UserContactPreferences 
} from '@/types/profile';

interface ProfileSetupClientProps {
  userId: string;
}

interface StepData {
  personalInfo?: UserPersonalInfo;
  propertyPreferences?: UserPropertyPreferences;
  contactPreferences?: UserContactPreferences;
}

interface StepComponentProps {
  onNext: (data: StepData) => void;
  onBack: () => void;
  initialData?: StepData;
}

export default function ProfileSetupClient({ userId }: ProfileSetupClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<StepData>({});

  const steps = [
    {
      title: 'Personal Information',
      component: PersonalInfo as React.ComponentType<StepComponentProps>,
    },
    {
      title: 'Property Preferences',
      component: ListingPreferences as React.ComponentType<StepComponentProps>,
    },
    {
      title: 'Contact Preferences',
      component: ContactPreferences as React.ComponentType<StepComponentProps>,
    },
  ];

  const handleNext = async (stepData: StepData) => {
    try {
      setFormData((prev) => ({ ...prev, ...stepData }));
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Submit the form
        console.log('Starting profile submission...');

        if (!user?.uid) {
          throw new Error('No user ID available');
        }

        const updatedProfile: UserProfile = {
          id: user.uid,
          completed: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          personalInfo: formData.personalInfo || {
            firstName: '',
            lastName: '',
            email: user.email || '',
            petInfo: {
              hasPets: false
            }
          },
          propertyPreferences: formData.propertyPreferences || {},
          contactPreferences: formData.contactPreferences || {
            email: user.email || '',
            notificationPreferences: {
              newListings: true,
              priceDrops: true,
              similarProperties: true,
              viewingReminders: true
            }
          },
          status: 'active',
          verificationStatus: 'unverified'
        };

        // Save directly to Firestore
        const docRef = doc(db, 'userProfiles', user.uid);
        await setDoc(docRef, updatedProfile);

        console.log('Profile saved successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      // Handle error appropriately
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const getInitialDataForStep = (step: number): StepData => {
    switch (step) {
      case 0:
        return { personalInfo: formData.personalInfo };
      case 1:
        return { propertyPreferences: formData.propertyPreferences };
      case 2:
        return { contactPreferences: formData.contactPreferences };
      default:
        return {};
    }
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
        initialData={getInitialDataForStep(currentStep)}
      />
    </div>
  );
}
