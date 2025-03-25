import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faCircleCheck, faCircleInfo, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '@/types/profile';

interface TourRequestProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    id: string;
    title: string;
    location: string;
  };
}

export default function TourRequest({ isOpen, onClose, listing }: TourRequestProps) {
  const { user } = useAuth();
  const [message, setMessage] = React.useState('I would like to schedule a tour.');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        const userProfileRef = doc(db, 'userProfiles', user.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        if (userProfileSnap.exists()) {
          setUserProfile(userProfileSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const tourRequestData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        phone: userProfile?.contactPreferences?.phone,
        listingId: listing.id,
        listingTitle: listing.title,
        listingLocation: listing.location,
        message: message,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log('Tour request data:', tourRequestData); // Debug log

      const tourId = `${listing.id}_${user.uid}_${Date.now()}`;
      console.log('Generated tour ID:', tourId); // Debug log

      await setDoc(doc(db, 'tourRequests', tourId), {
        ...tourRequestData,
        id: tourId
      });

      console.log('Tour request saved successfully'); // Debug log
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setMessage('I would like to schedule a tour.');
      }, 2000);
    } catch (error) {
      console.error('Detailed error submitting tour request:', error); // More detailed error log
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const fullName = userProfile ? `${userProfile.personalInfo.firstName} ${userProfile.personalInfo.lastName}` : (user?.displayName || user?.email?.split('@')[0] || 'Anonymous');

  return (
    <div 
      className="modal d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflow: 'auto'
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px' }}>
          <div className="modal-header border-0 px-4 pt-4 pb-0">
            <h5 className="modal-title fw-bold fs-4">Request a tour</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{ opacity: 0.5 }}
            />
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Contact Info Section */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Your contact info</h6>
                  <FontAwesomeIcon 
                    icon={faPen} 
                    style={{ 
                      color: '#e75d7c',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }} 
                  />
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  color: '#6c757d',
                  textAlign: 'center',
                  borderBottom: '1px solid #dee2e6',
                  paddingBottom: '8px',
                  marginBottom: '8px'
                }}>
                  {fullName}
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  color: '#6c757d',
                  textAlign: 'center',
                  borderBottom: '1px solid #dee2e6',
                  paddingBottom: '8px',
                  marginBottom: '8px'
                }}>
                  {user?.email}
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  color: '#6c757d',
                  textAlign: 'center'
                }}>
                  {userProfile?.contactPreferences?.phone || 'Add phone number'}
                </div>
              </div>

              {/* Message Section */}
              <div className="mb-4">
                <label htmlFor="message" className="form-label fw-bold mb-2" style={{ fontSize: '0.95rem' }}>Message</label>
                <textarea
                  id="message"
                  className="form-control"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Will be sent to Section */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3" style={{ fontSize: '0.95rem' }}>Will be sent to</h6>
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '48px', 
                      height: '48px',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={faBuilding} 
                      style={{ 
                        fontSize: '1.5rem',
                        color: '#6c757d'
                      }} 
                    />
                  </div>
                  <div>
                    <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>GoodHomes Cedar Creek</div>
                    <div style={{ 
                      fontSize: '0.85rem',
                      color: '#6c757d',
                      marginBottom: '4px'
                    }}>
                      Management company
                    </div>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faCircleCheck} 
                        className="me-1" 
                        style={{ 
                          color: '#198754',
                          fontSize: '0.8rem'
                        }} 
                      />
                      <span style={{ 
                        fontSize: '0.8rem',
                        color: '#198754'
                      }}>
                        Verified
                      </span>
                      <FontAwesomeIcon 
                        icon={faCircleInfo} 
                        className="ms-2" 
                        style={{ 
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          color: '#6c757d'
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Section */}
              <div className="mb-4">
                <small style={{ 
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textAlign: 'center',
                  display: 'block'
                }}>
                  By contacting this listing, you agree to our{' '}
                  <a href="#" className="text-decoration-none" style={{ color: '#e75d7c' }}>
                    Terms of Use
                  </a>
                  . Visit our{' '}
                  <a href="#" className="text-decoration-none" style={{ color: '#e75d7c' }}>
                    Privacy Portal
                  </a>
                  {' '}for more information.
                </small>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#e75d7c',
                  borderColor: '#e75d7c',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 500
                }}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                ) : null}
                {submitStatus === 'success' ? 'Tour Request Sent!' : 'Send tour request'}
              </button>

              {submitStatus === 'error' && (
                <div className="alert alert-danger mt-3" role="alert">
                  Failed to send tour request. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
