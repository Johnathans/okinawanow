'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import ListingCard from '@/components/ListingCard';
import FilterBar from '@/components/FilterBar';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { CITY_DESCRIPTIONS, BASE_DESCRIPTIONS } from '@/constants/locationDescriptions';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ListingsClient() {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  // Get current filter values
  const currentCity = searchParams.get('city')?.toLowerCase() || '';
  const currentBase = searchParams.get('base')?.toLowerCase() || '';
  const currentType = searchParams.get('propertyType')?.toLowerCase() || '';

  const getListingsHeader = () => {
    const propertyTypeText = currentType ? 
      currentType === 'house' ? 'Houses' :
      currentType === 'apartment' ? 'Apartments' :
      currentType === 'mansion' ? 'Mansions' :
      'Homes & Apartments' : 'Homes & Apartments';

    const location = currentCity ? 
      currentCity.charAt(0).toUpperCase() + currentCity.slice(1) : 
      currentBase ? 
        `near ${currentBase.charAt(0).toUpperCase() + currentBase.slice(1)}` : 
        'in Okinawa';

    return `${propertyTypeText} for Rent ${location}`;
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
        let q = query(collection(db, 'properties'));

        // Apply filters
        if (currentCity) {
          q = query(q, where('city', '==', currentCity));
        }
        if (currentBase) {
          q = query(q, where('base', '==', currentBase));
        }
        if (currentType) {
          q = query(q, where('propertyType', '==', currentType));
        }
        if (searchParams.get('price')) {
          const [min, max] = searchParams.get('price')!.split('-').map(Number);
          if (min) q = query(q, where('price', '>=', min));
          if (max) q = query(q, where('price', '<=', max));
        }
        if (searchParams.get('beds')) {
          q = query(q, where('beds', '>=', parseInt(searchParams.get('beds')!)));
        }
        if (searchParams.get('baths')) {
          q = query(q, where('baths', '>=', parseInt(searchParams.get('baths')!)));
        }

        const snapshot = await getDocs(q);
        const fetchedListings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];

        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams, currentCity, currentBase, currentType]);

  const handlePopularSearch = (params: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    window.location.href = url.toString();
  };

  const popularSearches = [
    { label: 'Homes near Kadena', params: { base: 'kadena air base' } },
    { label: 'Apartments in Chatan', params: { city: 'chatan', propertyType: 'apartment' } },
    { label: 'Houses in American Village', params: { city: 'chatan', propertyType: 'house' } },
    { label: 'Foster Housing', params: { base: 'camp foster' } },
    { label: 'Luxury Homes', params: { minPrice: '300000' } },
    { label: 'Pet-Friendly Rentals', params: { pets: 'true' } },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Filter Bar */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-4">
          <FilterBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="container-fluid px-4">
          <div className="row g-0">
            {/* Listings Section */}
            <div className={`${showMap ? 'col-md-6 col-lg-7' : 'col-12'} bg-white`} style={{ minHeight: 'calc(100vh - 180px)' }}>
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
                          onMouseEnter={() => setHoveredListing(listing.id)}
                          onMouseLeave={() => setHoveredListing(null)}
                        >
                          <ListingCard
                            listing={listing}
                            isFavorite={favorites.includes(listing.id)}
                            onFavoriteClick={() => {
                              if (!user) {
                                alert('Please log in to save favorites');
                                return;
                              }
                              toggleFavorite(listing.id);
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
              <div className="col-md-6 col-lg-5">
                <div className="position-sticky" style={{ height: 'calc(100vh - 180px)', top: '73px' }}>
                  <Map
                    center={{ lat: 26.3344, lng: 127.7997 }}
                    markers={listings.map(listing => ({
                      id: listing.id,
                      lat: listing.lat || 0,
                      lng: listing.lng || 0,
                      price: listing.price,
                    }))}
                    hoveredListing={hoveredListing}
                  />
                </div>
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
