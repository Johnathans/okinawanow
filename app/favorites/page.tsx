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

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  description?: string;
  amenities?: string[];
  propertyType: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = React.useState<Listing[]>([]);
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
            location: data.location || '',
            price: data.price || 0,
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            images: data.images || [],
            description: data.description || '',
            amenities: data.amenities || [],
            propertyType: data.propertyType || ''
          } as Listing;
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
                    listing={listing}
                    onFavoriteClick={() => removeFavorite(listing.id)}
                    isFavorited={true}
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
