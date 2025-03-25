'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import ListingsFilterBar from '@/components/ListingsFilterBar';
import ListingsMap from '@/components/ListingsMap';
import ListingCard from '@/components/ListingCard';
import { Listing } from '@/types/listing';
import styles from './styles.module.css';

// Development mode agency ID - replace with your test agency ID
const TEST_AGENCY_ID = 'aX8Jeevdm1TxMMrBnChlG34s0R42';
const isDevelopment = process.env.NODE_ENV === 'development';

export default function ListingsClient({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [userFavorites, setUserFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch listings and user's favorites
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch listings with filtering in development mode
        const listingsRef = collection(db, 'listings');
        const listingsQuery = isDevelopment
          ? query(listingsRef, where('agencyId', '==', TEST_AGENCY_ID))
          : listingsRef;
        
        const listingsSnap = await getDocs(listingsQuery);
        const listingsData = listingsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];

        // Fetch properties to verify each listing has a valid property
        const listingsRef2 = collection(db, 'listings');
        const listingsSnap2 = await getDocs(listingsRef2);
        const validPropertyIds = new Set(listingsSnap2.docs.map(doc => doc.id));

        // Filter out listings without valid properties
        const validListings = listingsData.filter(listing => listing.id && validPropertyIds.has(listing.id));
        console.log('Total listings:', listingsData.length);
        console.log('Valid listings:', validListings.length);
        setListings(validListings);

        // Fetch user's favorites if logged in
        if (user?.uid) {
          const favoritesRef = collection(db, `userFavorites/${user.uid}/listings`);
          const favoritesSnap = await getDocs(favoritesRef);
          const favoriteIds = new Set(favoritesSnap.docs.map(doc => doc.id));
          setUserFavorites(favoriteIds);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (error) {
    return (
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="alert alert-danger" role="alert">
              Error loading listings: {error.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      {/* Filter Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <ListingsFilterBar initialFilters={{
            location: searchParams.location as string,
            nearestBase: searchParams.nearestBase as string,
            listingType: searchParams.propertyType as string,
            bedrooms: searchParams.bedrooms as string,
            priceRange: searchParams.priceRange as string,
            search: searchParams.search as string
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Listings */}
        <div className="col-lg-8">
          <h2 className="h4 mb-3">Properties</h2>
          <p className="text-muted mb-4">{listings.length} properties found</p>

          <div className="row g-4">
            {listings.map((listing) => (
              <div key={listing.id} className="col-md-6">
                <ListingCard
                  listing={listing}
                  isFavorite={listing.id ? userFavorites.has(listing.id) : false}
                />
              </div>
            ))}
          </div>

          {/* Popular Searches */}
          <div className={styles.popularSearches}>
            <h3>Popular Searches</h3>
            <div className={styles.searchTags}>
              <a href="/listings?location=chatan" className={styles.searchTag}>
                Apartments in Chatan
              </a>
              <a href="/listings?nearestBase=kadena" className={styles.searchTag}>
                Near Kadena Air Base
              </a>
              <a href="/listings?bedrooms=3" className={styles.searchTag}>
                3+ Bedroom Houses
              </a>
              <a href="/listings?location=okinawa-city" className={styles.searchTag}>
                Properties in Okinawa City
              </a>
              <a href="/listings?nearestBase=foster" className={styles.searchTag}>
                Near Camp Foster
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="col-lg-4">
          <div style={{ height: 'calc(100vh - 100px)', position: 'sticky', top: '20px' }}>
            <ListingsMap listings={listings} />
          </div>
        </div>
      </div>
    </div>
  );
}
