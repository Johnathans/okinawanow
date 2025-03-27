'use client';

import { useState, useEffect } from 'react';
import { Listing, ListingType } from '@/types/listing';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NearbyListings.module.css';

interface NearbyListingsProps {
  currentListingId: string;
  city: string;
  limit?: number;
}

export default function NearbyListings({
  currentListingId,
  city,
  limit = 3
}: NearbyListingsProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from Firebase
    // For now, we'll use a mock implementation
    const fetchNearbyListings = async () => {
      try {
        setLoading(true);
        
        // This would be a Firebase query in production
        // For now, we'll simulate with a timeout
        setTimeout(() => {
          // Mock data - in production this would come from Firebase
          const mockNearbyListings: Listing[] = [
            {
              id: 'nearby1',
              title: 'Modern Apartment near Beach',
              description: 'Beautiful apartment with ocean views',
              price: 150000,
              priceUSD: 1000,
              listingType: ListingType.Apartment,
              bedrooms: 2,
              bathrooms: 1,
              squareMeters: 75,
              prefecture: 'Okinawa',
              city: 'Chatan',
              images: ['/images/listings/apartment1.jpg'],
              amenities: {
                interior: ['Air Conditioning', 'Furnished'],
                bathroom: ['Shower'],
                kitchen: ['Refrigerator'],
                building: ['Elevator'],
                utility: ['Internet'],
                security: ['Security Camera'],
                location: ['Near Beach']
              }
            },
            {
              id: 'nearby2',
              title: 'Spacious Family Home',
              description: 'Perfect for military families',
              price: 200000,
              priceUSD: 1350,
              listingType: ListingType.House,
              bedrooms: 3,
              bathrooms: 2,
              squareMeters: 120,
              prefecture: 'Okinawa',
              city: 'Chatan',
              images: ['/images/listings/house1.jpg'],
              amenities: {
                interior: ['Air Conditioning', 'Furnished'],
                bathroom: ['Shower', 'Bathtub'],
                kitchen: ['Refrigerator', 'Stove'],
                building: ['Parking'],
                utility: ['Internet', 'Cable TV'],
                security: ['Security Camera'],
                location: ['Near School']
              }
            },
            {
              id: 'nearby3',
              title: 'Cozy Studio Apartment',
              description: 'Perfect for singles or couples',
              price: 100000,
              priceUSD: 675,
              listingType: ListingType.Apartment,
              bedrooms: 1,
              bathrooms: 1,
              squareMeters: 45,
              prefecture: 'Okinawa',
              city: 'Chatan',
              images: ['/images/listings/studio1.jpg'],
              amenities: {
                interior: ['Air Conditioning'],
                bathroom: ['Shower'],
                kitchen: ['Refrigerator'],
                building: ['Bicycle Parking'],
                utility: ['Internet'],
                security: ['Intercom'],
                location: ['Near Restaurant']
              }
            }
          ];
          
          // Filter out the current listing and limit results
          const filtered = mockNearbyListings
            .filter(listing => listing.id !== currentListingId)
            .slice(0, limit);
            
          setListings(filtered);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching nearby listings:', error);
        setLoading(false);
      }
    };

    fetchNearbyListings();
  }, [currentListingId, city, limit]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading nearby listings...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <div className={styles.nearbyListings}>
      <h3 className={styles.title}>Nearby Listings</h3>
      <div className={styles.listingsGrid}>
        {listings.map(listing => (
          <Link href={`/listings/${listing.id}`} key={listing.id} className={styles.listingCard}>
            <div className={styles.imageContainer}>
              {listing.images && listing.images[0] && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className={styles.image}
                />
              )}
              <div className={styles.price}>¥{listing.price.toLocaleString()}</div>
            </div>
            <div className={styles.content}>
              <h4 className={styles.listingTitle}>{listing.title}</h4>
              <p className={styles.location}>{listing.prefecture} {listing.city}</p>
              <div className={styles.details}>
                <span><i className="fa-solid fa-bed"></i> {listing.bedrooms}</span>
                <span><i className="fa-solid fa-bath"></i> {listing.bathrooms}</span>
                <span><i className="fa-solid fa-ruler-combined"></i> {listing.squareMeters}m²</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.viewMore}>
        <Link href={`/listings?city=${city}`} className={styles.viewMoreLink}>
          View all listings in {city} <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
