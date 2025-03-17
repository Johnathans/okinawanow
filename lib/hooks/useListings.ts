import { useState, useEffect } from 'react';
import mockListings from '@/app/listings/mockListings';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqm: number | null;
  images: string[];
  propertyType: string;
  description: string;
  url: string;
  source: string;
  createdAt: any;
  updatedAt: any;
  status: string;
  views: number;
  favorites: number;
  nearestBase?: string;
}

interface UseListingsProps {
  search?: string;
  location?: string;
  propertyType?: string;
  priceRange?: string;
  bedrooms?: string;
  nearestBase?: string;
}

export function useListings({
  search,
  location,
  propertyType,
  priceRange,
  bedrooms,
  nearestBase,
}: UseListingsProps) {
  const [listings, setListings] = useState(mockListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let filteredListings = [...mockListings];

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      filteredListings = filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(searchLower) ||
        listing.description?.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower)
      );
    }

    if (location) {
      filteredListings = filteredListings.filter(listing =>
        listing.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (propertyType) {
      filteredListings = filteredListings.filter(listing =>
        listing.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }

    if (nearestBase) {
      filteredListings = filteredListings.filter(listing =>
        listing.nearestBase?.toLowerCase() === nearestBase.toLowerCase()
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filteredListings = filteredListings.filter(listing =>
          listing.price >= min && listing.price <= max
        );
      }
    }

    if (bedrooms) {
      const minBeds = parseInt(bedrooms);
      if (!isNaN(minBeds)) {
        filteredListings = filteredListings.filter(listing =>
          listing.beds >= minBeds
        );
      }
    }

    setListings(filteredListings);
  }, [search, location, propertyType, priceRange, bedrooms, nearestBase]);

  return { listings, loading, error };
}
