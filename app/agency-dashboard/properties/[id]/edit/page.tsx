'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import ListingForm from '@/components/ListingForm';
import { Listing } from '@/types/listing';
import { syncListingWithListing } from '@/lib/listingSync';

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [property, setProperty] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      // Get user role from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userRole = userDoc.data()?.role;

      if (userRole !== 'agency') {
        router.push('/');
        return;
      }

      setUser(user);

      try {
        const propertyRef = doc(db, 'properties', params.id);
        const propertyDoc = await getDoc(propertyRef);

        if (!propertyDoc.exists()) {
          setError('Property not found');
          return;
        }

        const propertyData = propertyDoc.data();
        if (propertyData.agencyId !== user.uid) {
          setError('You do not have permission to edit this property');
          return;
        }

        setProperty(propertyData);
      } catch (err) {
        setError('Error fetching property');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [params.id, router]);

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await syncListingWithListing(params.id, data, user.uid, 'agency');
      router.push('/agency-dashboard');
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <h1 className="h3 mb-0">Edit Property</h1>
        <div className="badge text-bg-secondary">{property?.status}</div>
      </div>

      {property && (
        <ListingForm
          initialData={property}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          mode="agency"
        />
      )}
    </div>
  );
}
