import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Listing } from '@/types/listing';

interface UseListingsProps {
  agencyId?: string;
  city?: string;
  featured?: boolean;
}

export const useListings = ({ agencyId, city, featured }: UseListingsProps = {}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        let q = query(listingsRef);

        if (agencyId) {
          q = query(q, where('agencyId', '==', agencyId));
        }

        if (city) {
          q = query(q, where('city', '==', city));
        }

        if (featured) {
          q = query(q, where('featured', '==', true));
        }

        const querySnapshot = await getDocs(q);
        const loadedListings: Listing[] = [];
        
        querySnapshot.forEach((doc) => {
          loadedListings.push({
            id: doc.id,
            ...doc.data()
          } as Listing);
        });

        setListings(loadedListings);
        setLoading(false);
      } catch (err) {
        console.error('Error loading listings:', err);
        setError('Failed to load listings');
        setLoading(false);
      }
    };

    loadListings();
  }, [agencyId, city, featured]);

  return {
    listings,
    loading,
    error
  };
};
