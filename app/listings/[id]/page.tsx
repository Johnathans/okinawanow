import { Suspense } from 'react';
import ListingClient from './ListingClient';
import { Listing, ListingType, Agency } from '@/types/listing';
import { db } from '@/lib/firebase-admin'; // Use admin SDK for server-side
import { notFound } from 'next/navigation';
import Loading from './loading';

// Predefined lists of amenities for categorization
const INTERIOR_AMENITIES = [
  'Air Conditioning', 'Heating', 'Washer/Dryer', 'Washer/Dryer Hookups', 
  'Walk-in Closet', 'Storage', 'Furnished', 'Hardwood Floors', 'Carpet', 
  'Ceiling Fan', 'Fireplace', 'Balcony/Patio'
];
const BATHROOM_AMENITIES = [
  'Unit Bath', 'Separate Bath/Shower', 'Double Sink', 'Toilet with Washlet', 
  'Vanity Mirror'
];
const KITCHEN_AMENITIES = [
  'Full Kitchen', 'IH Stove', 'Gas Stove', 'Dishwasher', 'Microwave', 
  'Refrigerator', 'Counter Space', 'Island Kitchen'
];
const BUILDING_AMENITIES = [
  'Elevator', 'Auto-lock', 'Mail Box', 'Bicycle Parking', 'Trash Room', 
  'Common Area', 'Rooftop Access', 'Swimming Pool', 'Gym/Fitness Center', 
  'Business Center', 'Clubhouse', 'Playground', 'Garage Parking', 'Gated Community'
];
const UTILITY_AMENITIES = [
  'Internet Ready', 'Cable Ready', 'Water Included', 'Gas Included', 
  'Electricity Included', 'Internet Included'
];
const SECURITY_AMENITIES = [
  'Security Camera', 'Security Guard', 'Intercom', 'Double Lock', 
  'Key Card Access', 'Security System'
];
const LOCATION_FEATURES = [
  'Near Train Station', 'Near Bus Stop', 'Near Supermarket', 'Near School', 
  'Near Park', 'Near Hospital', 'Near Shopping', 'Near Restaurant', 
  'Quiet Area', 'Safe Neighborhood', 'Private Entrance', 'Fenced Yard'
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const listingDoc = await db.collection('listings').doc(params.id).get();

    if (!listingDoc.exists) {
      notFound();
    }

    const listing = {
      id: listingDoc.id,
      ...listingDoc.data()
    } as Listing;

    // Check if amenities is already categorized or is a flat array
    if (listing.amenities && Array.isArray(listing.amenities)) {
      // Categorize amenities if it's a flat array
      const amenitiesByCategory = {
        interior: listing.amenities.filter(amenity => INTERIOR_AMENITIES.includes(amenity)) || [],
        bathroom: listing.amenities.filter(amenity => BATHROOM_AMENITIES.includes(amenity)) || [],
        kitchen: listing.amenities.filter(amenity => KITCHEN_AMENITIES.includes(amenity)) || [],
        building: listing.amenities.filter(amenity => BUILDING_AMENITIES.includes(amenity)) || [],
        utility: listing.amenities.filter(amenity => UTILITY_AMENITIES.includes(amenity)) || [],
        security: listing.amenities.filter(amenity => SECURITY_AMENITIES.includes(amenity)) || [],
        location: listing.amenities.filter(amenity => LOCATION_FEATURES.includes(amenity)) || [],
        other: listing.amenities.filter(amenity => 
          !INTERIOR_AMENITIES.includes(amenity) &&
          !BATHROOM_AMENITIES.includes(amenity) &&
          !KITCHEN_AMENITIES.includes(amenity) &&
          !BUILDING_AMENITIES.includes(amenity) &&
          !UTILITY_AMENITIES.includes(amenity) &&
          !SECURITY_AMENITIES.includes(amenity) &&
          !LOCATION_FEATURES.includes(amenity)
        ) || []
      };
      
      // Replace the flat array with the categorized object
      listing.amenities = amenitiesByCategory;
    }

    // Get agency information if available
    let agency: Agency | null = null;
    if (listing.agencyId) {
      const agencyDoc = await db.collection('agencies').doc(listing.agencyId).get();
      if (agencyDoc.exists) {
        agency = {
          id: agencyDoc.id,
          ...agencyDoc.data()
        } as Agency;
      }
    }

    return (
      <div className="container">
        <Suspense fallback={<Loading />}>
          <ListingClient
            listing={listing}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error fetching listing:', error);
    notFound();
  }
}
