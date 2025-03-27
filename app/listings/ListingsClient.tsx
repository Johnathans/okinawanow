'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, or } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';
import { Listing } from '@/types/listing';
import { Location } from '@/types/location';
import ListingCard from '@/components/ListingCard';
import FilterBar from '@/components/FilterBar';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { CITY_DESCRIPTIONS, BASE_DESCRIPTIONS } from '@/constants/locationDescriptions';
import { useRouter } from 'next/navigation';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ListingsClient() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [showMap, setShowMap] = useState(true);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const userId = user?.uid || '';
  const { favorites, toggleFavorite } = useFavorites({ userId });
  const router = useRouter();

  // Get current filter values
  const location = searchParams.get('location')?.toLowerCase() as Location | undefined;
  const currentCity = searchParams.get('city')?.toLowerCase() as Location | undefined;
  const currentBase = searchParams.get('base')?.toLowerCase() as Location | undefined;
  const currentType = searchParams.get('propertyType')?.toLowerCase() || searchParams.get('listingType')?.toLowerCase() || '';

  const getListingsHeader = () => {
    const propertyTypeText = currentType ? 
      currentType === 'house' ? 'Houses' :
      currentType === 'apartment' ? 'Apartments' :
      currentType === 'mansion' ? 'Mansions' :
      'Homes & Apartments' : 'Homes & Apartments';

    let locationText = 'in Okinawa';
    if (location) {
      locationText = `in ${location.charAt(0).toUpperCase() + location.slice(1)}`;
    } else if (currentCity) {
      locationText = `in ${currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}`;
    } else if (currentBase) {
      locationText = `near ${currentBase.charAt(0).toUpperCase() + currentBase.slice(1)}`;
    }

    return `${propertyTypeText} for Rent ${locationText}`;
  };

  const getLocationTitle = () => {
    if (currentCity) {
      return `Living in ${currentCity.charAt(0).toUpperCase()}${currentCity.slice(1)}`;
    }
    if (currentBase) {
      return `Living near ${currentBase.charAt(0).toUpperCase()}${currentBase.slice(1)}`;
    }
    return 'Living in Okinawa';
  };

  const getLocationDescription = () => {
    if (currentCity && CITY_DESCRIPTIONS[currentCity]) {
      return CITY_DESCRIPTIONS[currentCity];
    }
    if (currentBase && BASE_DESCRIPTIONS[currentBase]) {
      return BASE_DESCRIPTIONS[currentBase];
    }
    return "Discover your perfect home in Okinawa, where tropical paradise meets modern living. Browse our selection of properties across the island, from bustling city centers to peaceful coastal communities.";
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let q = query(collection(db, 'listings'));

        // Apply filters
        if (location) {
          // Search in both city and base fields
          q = query(q, or(
            where('city', '==', location),
            where('base', '==', location)
          ));
        } else {
          if (currentCity) {
            q = query(q, where('city', '==', currentCity));
          }
          if (currentBase) {
            q = query(q, where('base', '==', currentBase));
          }
        }
        if (currentType) {
          q = query(q, or(
            where('listingType', '==', currentType),
            where('propertyType', '==', currentType)
          ));
        }
        if (searchParams.get('price')) {
          const [min, max] = searchParams.get('price')!.split('-').map(Number);
          if (min) q = query(q, where('price', '>=', min));
          if (max) q = query(q, where('price', '<=', max));
        }
        if (searchParams.get('beds') || searchParams.get('bedrooms')) {
          const beds = parseInt(searchParams.get('beds') || searchParams.get('bedrooms') || '0');
          if (beds > 0) {
            q = query(q, or(
              where('bedrooms', '>=', beds),
              where('beds', '>=', beds)
            ));
          }
        }
        if (searchParams.get('baths') || searchParams.get('bathrooms')) {
          const baths = parseInt(searchParams.get('baths') || searchParams.get('bathrooms') || '0');
          if (baths > 0) {
            q = query(q, or(
              where('bathrooms', '>=', baths),
              where('baths', '>=', baths)
            ));
          }
        }

        const snapshot = await getDocs(q);
        const fetchedListings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];

        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [searchParams, location, currentCity, currentBase, currentType]);

  const handlePopularSearch = (params: Partial<Record<string, string>>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    router.push(`/listings?${searchParams.toString()}`);
  };

  const popularSearches = [
    { label: 'Near Kadena', params: { base: 'Kadena' } },
    { label: 'Houses in Chatan', params: { city: 'Chatan', propertyType: 'house' } },
    { label: 'Under ¥100,000', params: { maxPrice: '100000' } },
    { label: 'Pet Friendly', params: { pets: 'allowed' } },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Filter Bar */}
      <div className="bg-light border-bottom">
        <div className="container-fluid px-4">
          <FilterBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 position-relative">
        <div className="container-fluid px-4">
          <div className="row g-0">
            {/* Listings Section */}
            <div 
              className={`${showMap ? 'col-md-6 col-lg-7' : 'col-12'} bg-white`} 
              style={{ 
                height: 'calc(100vh - 180px)',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              <div className="py-4">
                {listings.length === 0 ? (
                  <div className="text-center">
                    <h3 className="h5 mb-2">No Properties Found</h3>
                    <p className="text-muted">Try adjusting your filters to see more results</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h1 className="h4 mb-2">{getListingsHeader()}</h1>
                      <p className="text-muted">{listings.length} {listings.length === 1 ? 'property' : 'properties'} available</p>
                    </div>
                    <div className="row g-4">
                      {listings.map((listing) => (
                        <div 
                          key={listing.id}
                          className="col-12 col-xl-6"
                          onMouseEnter={() => setHoveredListing(listing.id ?? null)}
                          onMouseLeave={() => setHoveredListing(null)}
                        >
                          <ListingCard
                            listing={listing}
                            isFavorite={listing.id ? favorites.includes(listing.id) : false}
                            onFavorite={async () => {
                              if (!user) {
                                alert('Please log in to save favorites');
                                return;
                              }
                              
                              const listingId = listing.id;
                              if (!listingId) return;

                              await toggleFavorite(listingId);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Location Description and Popular Searches */}
                    <div className="mt-5 pt-4 border-top">
                      <h2 className="h5 mb-3">{getLocationTitle()}</h2>
                      <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {getLocationDescription()}
                      </p>

                      {/* Popular Searches */}
                      <div className="mt-4">
                        <h3 className="h6 mb-3">Popular Searches</h3>
                        <div className="d-flex flex-wrap gap-2">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              className="btn btn-outline-primary"
                              onClick={() => handlePopularSearch(search.params)}
                              style={{
                                borderColor: 'var(--medium-pink)',
                                color: 'var(--primary-pink)',
                                fontSize: '0.9rem',
                                padding: '8px 16px',
                              }}
                            >
                              {search.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Map Section */}
            {showMap && (
              <div className="col-md-6 col-lg-5 d-none d-md-block" style={{ 
                height: 'calc(100vh - 180px)',
                position: 'sticky',
                top: '180px'
              }}>
                <Map 
                  hoveredListing={hoveredListing}
                  style={{ height: '100%', width: '100%' }}
                  markers={listings
                    .filter(listing => listing.id && listing.lat && listing.lng)
                    .map(listing => ({
                      id: listing.id!,
                      lat: Number(listing.lat) || 0,
                      lng: Number(listing.lng) || 0,
                      price: listing.price,
                    }))}
                  center={{ lat: 26.3344, lng: 127.7997 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Map Toggle */}
      <button
        className="d-md-none btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle shadow-lg"
        style={{ 
          backgroundColor: 'var(--primary-pink)',
          width: '50px',
          height: '50px',
          zIndex: 1050
        }}
        onClick={() => setShowMap(!showMap)}
      >
        <FontAwesomeIcon 
          icon={showMap ? faList : faMap} 
          className="text-white"
        />
      </button>
    </div>
  );
}
