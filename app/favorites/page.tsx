'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ListingCard from '@/components/ListingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Listing, ListingStatus, ListingType, PetPolicy, INTERIOR_AMENITIES, BATHROOM_AMENITIES, KITCHEN_AMENITIES, BUILDING_AMENITIES, UTILITY_AMENITIES, SECURITY_AMENITIES, LOCATION_FEATURES } from '@/types/listing';

interface FavoriteListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  images: string[];
  status: ListingStatus;
  petPolicy: PetPolicy[];
  listingType: ListingType;
  createdAt: string;
  updatedAt: string;
  agencyId: string;
  createdBy: string;
  updatedBy: string;
  baseInspected: boolean;
  utilitiesIncluded: boolean;
  negotiable: boolean;
  city: string;
  interiorAmenities: typeof INTERIOR_AMENITIES[number][];
  bathroomAmenities: typeof BATHROOM_AMENITIES[number][];
  kitchenAmenities: typeof KITCHEN_AMENITIES[number][];
  buildingAmenities: typeof BUILDING_AMENITIES[number][];
  utilityAmenities: typeof UTILITY_AMENITIES[number][];
  securityAmenities: typeof SECURITY_AMENITIES[number][];
  locationFeatures: typeof LOCATION_FEATURES[number][];
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = React.useState<FavoriteListing[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch user's favorites
  React.useEffect(() => {
    async function fetchFavorites() {
      if (!user?.uid) return;
      
      setLoading(true);
      try {
        // Get user's favorite documents
        const favoritesRef = collection(db, `userFavorites/${user.uid}/listings`);
        const favoritesSnap = await getDocs(favoritesRef);
        
        // Convert favorite documents to listings
        const favoritesData = favoritesSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            price: data.price || 0,
            location: data.location || '',
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            floorArea: data.floorArea || 0,
            images: data.images || [],
            status: data.status || ListingStatus.Active,
            petPolicy: [data.petPolicy || PetPolicy.NoPets],
            listingType: data.listingType || ListingType.House,
            createdAt: data.createdAt || '',
            updatedAt: data.updatedAt || '',
            agencyId: data.agencyId || '',
            createdBy: data.createdBy || '',
            updatedBy: data.updatedBy || '',
            baseInspected: data.baseInspected || false,
            utilitiesIncluded: data.utilitiesIncluded || false,
            negotiable: data.negotiable || false,
            city: data.city || '',
            interiorAmenities: data.interiorAmenities || [],
            bathroomAmenities: data.bathroomAmenities || [],
            kitchenAmenities: data.kitchenAmenities || [],
            buildingAmenities: data.buildingAmenities || [],
            utilityAmenities: data.utilityAmenities || [],
            securityAmenities: data.securityAmenities || [],
            locationFeatures: data.locationFeatures || []
          } as FavoriteListing;
        });

        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      if (!user) {
        router.push('/');
      } else {
        fetchFavorites();
      }
    }
  }, [user, authLoading, router]);

  const removeFavorite = async (listingId: string) => {
    if (!user?.uid) return;

    try {
      await deleteDoc(doc(db, `userFavorites/${user.uid}/listings/${listingId}`));
      setFavorites(prev => prev.filter(fav => fav.id !== listingId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Show loading state
  if (authLoading || loading) {
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

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-4">
            <FontAwesomeIcon 
              icon={faHeart} 
              className="me-2"
              style={{ color: '#e75d7c' }}
            />
            My Favorites
          </h1>

          {favorites.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-4">You haven't saved any properties to your favorites yet.</p>
              <Link 
                href="/listings"
                className="btn btn-primary"
                style={{
                  backgroundColor: '#e75d7c',
                  borderColor: '#e75d7c'
                }}
              >
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {favorites.map((listing) => (
                <div key={listing.id} className="col-12 col-md-6 col-lg-4">
                  <ListingCard
                    listing={{
                      ...listing,
                      priceUSD: listing.price,
                      status: ListingStatus.Active,
                      negotiable: false,
                      parkingSpaces: 0,
                      availableFrom: new Date().toISOString(),
                      leaseTerm: '12',
                      baseInspected: false,
                      utilitiesIncluded: false,
                      securityDeposit: 0,
                      keyMoney: 0,
                      agencyFee: 0,
                      guarantorFee: 0,
                      nearbyBases: [],
                      available: true,
                      featured: false,
                      city: listing.city || '',
                      squareMeters: listing.floorArea || 0,
                      amenities: {
                        interior: (listing.interiorAmenities || []) as typeof INTERIOR_AMENITIES[number][],
                        bathroom: (listing.bathroomAmenities || []) as typeof BATHROOM_AMENITIES[number][],
                        kitchen: (listing.kitchenAmenities || []) as typeof KITCHEN_AMENITIES[number][],
                        building: (listing.buildingAmenities || []) as typeof BUILDING_AMENITIES[number][],
                        utility: (listing.utilityAmenities || []) as typeof UTILITY_AMENITIES[number][],
                        security: (listing.securityAmenities || []) as typeof SECURITY_AMENITIES[number][],
                        location: (listing.locationFeatures || []) as typeof LOCATION_FEATURES[number][]
                      }
                    }}
                    onFavorite={() => removeFavorite(listing.id)}
                    isFavorite={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
