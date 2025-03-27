'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function ImpersonateAgencyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const agencyId = params.id;

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check if user is admin
        if (!user || user.email?.toLowerCase() !== 'smithjohnathanr@gmail.com') {
          setError('You do not have admin privileges');
          router.push('/');
          return;
        }

        // Check if the agency exists
        const agencyUserRef = doc(db, 'users', agencyId);
        const agencyUserSnap = await getDoc(agencyUserRef);
        const agencyRef = doc(db, 'agencies', agencyId);
        const agencySnap = await getDoc(agencyRef);

        if (!agencySnap.exists()) {
          setError('Agency not found');
          router.push('/admin/agencies');
          return;
        }

        // Check if this is a user with agency role or a direct agency entry
        if (agencyUserSnap.exists()) {
          const agencyUserData = agencyUserSnap.data();
          if (agencyUserData.role !== 'agency') {
            setError('This user is not an agency');
            router.push('/admin/agencies');
            return;
          }
        }

        // Store impersonation data in sessionStorage
        sessionStorage.setItem('adminAccessToken', user.uid);
        sessionStorage.setItem('impersonatingAgency', agencyId);
        
        // For test agency in development
        if (agencyId === 'test-agency-id' && process.env.NODE_ENV === 'development') {
          console.log('Impersonating test agency in development mode');
          sessionStorage.setItem('testAgencyMode', 'true');
        }

        // Redirect to agency dashboard
        router.push('/agency-dashboard');
      } catch (err) {
        console.error('Error checking admin access:', err);
        setError('An error occurred while checking admin access');
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, router, agencyId]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Accessing agency dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => router.push('/admin/agencies')}
        >
          Back to Agencies
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Redirecting to agency dashboard...</p>
    </div>
  );
}
