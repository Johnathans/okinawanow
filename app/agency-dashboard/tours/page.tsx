'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheck, faTimes, faMapMarkerAlt, faClock, faComment, faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface TourRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingLocation: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone?: string;
}

export default function AgencyToursPage() {
  const router = useRouter();
  const [tours, setTours] = React.useState<TourRequest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const toursRef = collection(db, 'tourRequests');
        const q = query(toursRef, where('status', '==', 'pending'));
        const toursSnap = await getDocs(q);
        
        const toursData = toursSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as TourRequest));

        // Sort by creation date, newest first
        toursData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTours(toursData);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateTourStatus = async (tourId: string, status: TourRequest['status']) => {
    try {
      const tourRef = doc(db, 'tourRequests', tourId);
      await updateDoc(tourRef, { status });
      
      setTours(prev => prev.filter(tour => tour.id !== tourId));
    } catch (error) {
      console.error('Error updating tour status:', error);
    }
  };

  if (loading) {
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

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0 d-flex align-items-center">
              <FontAwesomeIcon 
                icon={faCalendarAlt} 
                className="me-2"
                style={{ color: '#e75d7c' }}
              />
              Tour Requests
            </h1>
          </div>

          {tours.length === 0 ? (
            <div 
              className="text-center py-5 rounded-3" 
              style={{ backgroundColor: '#fdf2f4' }}
            >
              <p className="text-muted mb-0">No pending tour requests at the moment.</p>
            </div>
          ) : (
            <div className="row">
              {tours.map((tour) => (
                <div key={tour.id} className="col-12 mb-4">
                  <div 
                    className="card border-0 shadow-sm" 
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-md-8">
                          <h5 className="mb-1">
                            {tour.listingTitle}
                          </h5>
                          <div className="d-flex align-items-center text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            {tour.listingLocation}
                          </div>
                          <div className="d-flex align-items-center text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faClock} className="me-2" />
                            Requested on {new Date(tour.createdAt).toLocaleDateString()}
                          </div>
                          
                          <div 
                            className="p-3 rounded-3 mb-3" 
                            style={{ 
                              backgroundColor: '#fdf2f4',
                              fontSize: '0.9rem'
                            }}
                          >
                            <div className="d-flex align-items-center text-muted mb-2">
                              <FontAwesomeIcon icon={faComment} className="me-2" />
                              Client Message:
                            </div>
                            <p className="mb-0" style={{ color: '#212529' }}>{tour.message}</p>
                          </div>

                          <div className="d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faUser} className="me-2 text-muted" />
                              {tour.userName}
                            </div>
                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                              {tour.userEmail}
                            </div>
                            {tour.phone && (
                              <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                                {tour.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-4 d-flex flex-column justify-content-center align-items-end gap-2">
                          <button 
                            className="btn w-100"
                            style={{
                              backgroundColor: '#fdf2f4',
                              color: '#e75d7c',
                              borderRadius: '8px'
                            }}
                            onClick={() => updateTourStatus(tour.id, 'approved')}
                          >
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Approve Request
                          </button>
                          <button 
                            className="btn btn-outline-secondary w-100"
                            style={{ borderRadius: '8px' }}
                            onClick={() => updateTourStatus(tour.id, 'rejected')}
                          >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Decline Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
