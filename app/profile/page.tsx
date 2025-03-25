'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, saveUserProfile } from '@/lib/firebase-db';
import PersonalInfo from '@/components/profile-setup/PersonalInfo';
import ListingPreferences from '@/components/profile-setup/ListingPreferences';
import ContactPreferences from '@/components/profile-setup/ContactPreferences';
import { UserProfile, UserPersonalInfo, UserPropertyPreferences, UserContactPreferences } from '@/types/profile';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('personal');
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch user profile
  React.useEffect(() => {
    async function fetchProfile() {
      if (!user?.uid) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);
        } else {
          // If no profile exists, redirect to profile setup
          router.push('/profile-setup');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error loading your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      if (!user) {
        router.push('/');
      } else {
        fetchProfile();
      }
    }
  }, [user, authLoading, router]);

  const handlePersonalInfoSubmit = async (data: UserPersonalInfo) => {
    if (!profile || !user) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        personalInfo: data,
        updatedAt: new Date().toISOString(),
      };
      await saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      alert('Personal information updated successfully!');
    } catch (error) {
      console.error('Error saving personal info:', error);
      setError('Error saving your information. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePropertyPreferencesSubmit = async (data: UserPropertyPreferences) => {
    if (!profile || !user) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        propertyPreferences: data,
        updatedAt: new Date().toISOString(),
      };
      await saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      alert('Property preferences updated successfully!');
    } catch (error) {
      console.error('Error saving property preferences:', error);
      setError('Error saving your preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleContactPreferencesSubmit = async (data: UserContactPreferences) => {
    if (!profile || !user) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const updatedProfile: UserProfile = {
        ...profile,
        contactPreferences: data,
        updatedAt: new Date().toISOString(),
      };
      await saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      alert('Contact preferences updated successfully!');
    } catch (error) {
      console.error('Error saving contact preferences:', error);
      setError('Error saving your preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user || !profile) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="h3 mb-4">Your Profile</h1>
          
          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}
          
          {/* Tabs */}
          <div className="nav nav-pills mb-4">
            <button
              className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
              style={activeTab === 'personal' ? {
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
              } : undefined}
            >
              Personal Info
            </button>
            <button
              className={`nav-link ${activeTab === 'property' ? 'active' : ''} ms-2`}
              onClick={() => setActiveTab('property')}
              style={activeTab === 'property' ? {
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
              } : undefined}
            >
              Property Preferences
            </button>
            <button
              className={`nav-link ${activeTab === 'contact' ? 'active' : ''} ms-2`}
              onClick={() => setActiveTab('contact')}
              style={activeTab === 'contact' ? {
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
              } : undefined}
            >
              Contact Preferences
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'personal' && (
            <PersonalInfo
              onNext={handlePersonalInfoSubmit}
              initialData={profile.personalInfo}
            />
          )}
          {activeTab === 'property' && (
            <ListingPreferences
              onNext={handlePropertyPreferencesSubmit}
              initialData={profile.propertyPreferences}
            />
          )}
          {activeTab === 'contact' && (
            <ContactPreferences
              onNext={handleContactPreferencesSubmit}
              onBack={() => setActiveTab('property')}
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
                <div className="spinner-border mb-2" role="status" style={{ color: '#e75d7c' }}>
                  <span className="visually-hidden">Saving...</span>
                </div>
                <div>Saving your changes...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
