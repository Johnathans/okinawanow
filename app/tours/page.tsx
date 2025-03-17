'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheck, faTimes, faMapMarkerAlt, faClock, faComment } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface TourRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingLocation: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
}

export default function ToursPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [tours, setTours] = React.useState<TourRequest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTours() {
      if (!user?.uid) return;
      
      setLoading(true);
      try {
        const toursRef = collection(db, 'tourRequests');
        const q = query(toursRef, where('userId', '==', user.uid));
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
    }

    if (!authLoading) {
      if (!user) {
        router.push('/');
      } else {
        fetchTours();
      }
    }
  }, [user, authLoading, router]);

  const cancelTour = async (tourId: string) => {
    if (!user?.uid) return;

    try {
      const tourRef = doc(db, 'tourRequests', tourId);
      await updateDoc(tourRef, {
        status: 'cancelled'
      });
      
      setTours(prev => 
        prev.map(tour => 
          tour.id === tourId 
            ? { ...tour, status: 'cancelled' } 
            : tour
        )
      );
    } catch (error) {
      console.error('Error cancelling tour:', error);
    }
  };

  const getStatusBadge = (status: TourRequest['status']) => {
    const badges = {
      pending: { bg: '#fdf2f4', text: '#e75d7c', border: '#f4c6ce' },
      approved: { bg: '#ebf9f1', text: '#198754', border: '#a3e0c0' },
      rejected: { bg: '#fef1f1', text: '#dc3545', border: '#f5c2c2' },
      cancelled: { bg: '#f8f9fa', text: '#6c757d', border: '#dee2e6' }
    };

    const style = badges[status];
    return (
      <span 
        className="px-3 py-1 rounded-pill" 
        style={{ 
          backgroundColor: style.bg,
          color: style.text,
          border: `1px solid ${style.border}`,
          fontSize: '0.875rem',
          fontWeight: 500
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading || authLoading) {
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

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-4 d-flex align-items-center">
            <FontAwesomeIcon 
              icon={faCalendarAlt} 
              className="me-2"
              style={{ color: '#e75d7c' }}
            />
            My Tour Requests
          </h1>

          {tours.length === 0 ? (
            <div 
              className="text-center py-5 rounded-3" 
              style={{ backgroundColor: '#fdf2f4' }}
            >
              <p className="text-muted mb-4">You haven't requested any property tours yet.</p>
              <Link 
                href="/listings"
                className="btn btn-primary px-4"
                style={{
                  backgroundColor: '#e75d7c',
                  borderColor: '#e75d7c',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d64d6c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e75d7c'}
              >
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="row">
              {tours.map((tour) => (
                <div key={tour.id} className="col-12 mb-4">
                  <div 
                    className="card border-0 shadow-sm" 
                    style={{ 
                      borderRadius: '12px',
                      backgroundColor: tour.status === 'cancelled' ? '#f8f9fa' : 'white'
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="mb-1">
                            <Link 
                              href={`/listings/${tour.listingId}`} 
                              className="text-decoration-none"
                              style={{ 
                                color: tour.status === 'cancelled' ? '#6c757d' : '#212529',
                                transition: 'color 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.color = '#e75d7c'}
                              onMouseOut={(e) => e.currentTarget.style.color = tour.status === 'cancelled' ? '#6c757d' : '#212529'}
                            >
                              {tour.listingTitle}
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            {tour.listingLocation}
                          </div>
                          <div className="d-flex align-items-center text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                            <FontAwesomeIcon icon={faClock} className="me-2" />
                            Requested on {new Date(tour.createdAt).toLocaleDateString()}
                          </div>
                          {getStatusBadge(tour.status)}
                        </div>
                        {tour.status === 'pending' && (
                          <button
                            className="btn btn-outline-danger btn-sm px-3"
                            onClick={() => cancelTour(tour.id)}
                            style={{
                              borderRadius: '8px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Cancel Request
                          </button>
                        )}
                      </div>
                      <div 
                        className="p-3 rounded-3" 
                        style={{ 
                          backgroundColor: '#fdf2f4',
                          fontSize: '0.9rem'
                        }}
                      >
                        <div className="d-flex align-items-center text-muted mb-2">
                          <FontAwesomeIcon icon={faComment} className="me-2" />
                          Your Message:
                        </div>
                        <p className="mb-0" style={{ color: '#212529' }}>{tour.message}</p>
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
