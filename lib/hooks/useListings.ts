import { useState, useEffect } from 'react';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Property } from '@/types/property';

interface ListingsFilter {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

interface UseListingsResult {
  listings: Property[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useListings(filters?: ListingsFilter): UseListingsResult {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);

      let q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));

      if (filters) {
        if (filters.location) {
          q = query(q, where('location', '==', filters.location));
        }
        if (filters.propertyType) {
          q = query(q, where('propertyType', '==', filters.propertyType));
        }
        if (filters.minPrice) {
          q = query(q, where('price', '>=', filters.minPrice));
        }
        if (filters.maxPrice) {
          q = query(q, where('price', '<=', filters.maxPrice));
        }
        if (filters.bedrooms) {
          q = query(q, where('bedrooms', '>=', filters.bedrooms));
        }
        if (filters.bathrooms) {
          q = query(q, where('bathrooms', '>=', filters.bathrooms));
        }
      }

      const snapshot = await getDocs(q);
      const listingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];

      setListings(listingsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch listings'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters?.location, filters?.propertyType, filters?.minPrice, filters?.maxPrice, filters?.bedrooms, filters?.bathrooms]);

  return { listings, loading, error, refetch: fetchListings };
}
