'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { saveUserProfile } from '@/lib/firebase-db';
import PersonalInfo from '@/components/profile-setup/PersonalInfo';
import ListingPreferences from '@/components/profile-setup/ListingPreferences';
import ContactPreferences from '@/components/profile-setup/ContactPreferences';
import { UserProfile, UserPersonalInfo, UserPropertyPreferences, UserContactPreferences } from '@/types/profile';

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = React.useState(1);
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState<Partial<UserProfile>>(() => ({
    id: '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Set user ID when available
  React.useEffect(() => {
    if (user?.uid) {
      setProfile(prev => ({
        ...prev,
        id: user.uid
      }));
    }
  }, [user]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handlePersonalInfoSubmit = (data: UserPersonalInfo) => {
    setProfile((prev) => ({
      ...prev,
      personalInfo: data,
    }));
    setStep(2);
  };

  const handlePropertyPreferencesSubmit = (data: UserPropertyPreferences) => {
    setProfile((prev) => ({
      ...prev,
      propertyPreferences: data,
    }));
    setStep(3);
  };

  const handleContactPreferencesSubmit = async (data: UserContactPreferences) => {
    setSaving(true);
    
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        contactPreferences: data,
        completed: true,
        updatedAt: new Date().toISOString(),
      } as UserProfile;

      if (!updatedProfile.id && user?.uid) {
        updatedProfile.id = user.uid;
      }

      await saveUserProfile(updatedProfile);
      router.push('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('There was an error saving your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(step / 3) * 100}%`,
                  backgroundColor: '#e75d7c',
                }}
                aria-valuenow={(step / 3) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span className={`small ${step >= 1 ? 'text-primary' : 'text-muted'}`}>
                Personal Info
              </span>
              <span className={`small ${step >= 2 ? 'text-primary' : 'text-muted'}`}>
                Property Preferences
              </span>
              <span className={`small ${step >= 3 ? 'text-primary' : 'text-muted'}`}>
                Contact Preferences
              </span>
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <PersonalInfo
              onNext={handlePersonalInfoSubmit}
              initialData={profile.personalInfo}
            />
          )}
          {step === 2 && (
            <ListingPreferences
              onNext={handlePropertyPreferencesSubmit}
              initialData={profile.propertyPreferences}
            />
          )}
          {step === 3 && (
            <ContactPreferences
              onNext={handleContactPreferencesSubmit}
              onBack={() => setStep(2)}
              initialData={profile.contactPreferences}
            />
          )}

          {/* Saving Overlay */}
          {saving && (
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 1000 
              }}
            >
              <div className="text-center">
                <div className="spinner-border text-primary mb-2" role="status">
                  <span className="visually-hidden">Saving...</span>
                </div>
                <div>Saving your profile...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
