// Enums
export enum ListingType {
  House = 'house',
  Apartment = 'apartment',
  Condo = 'condo',
  Townhouse = 'townhouse'
}

export enum ListingStatus {
  Active = 'active',
  Pending = 'pending',
  Inactive = 'inactive',
  Rented = 'rented'
}

export enum PetPolicy {
  CatsAllowed = 'cats_allowed',
  DogsAllowed = 'dogs_allowed',
  NoPets = 'no_pets'
}

// Move-in costs interface
export interface MoveInCosts {
  deposit: number;          // In months of rent
  keyMoney: number;        // In months of rent
  agencyFee: number;       // In months of rent
  guarantorFee: number;    // In months of rent
}

// Base proximity interface
export interface BaseProximity {
  baseName: string;
  distanceKm: number;
  shuttleAvailable: boolean;
}

// Amenity categories
export const INTERIOR_AMENITIES = [
  'Air Conditioning',
  'Heating',
  'Washer/Dryer',
  'Washer/Dryer Hookups',
  'Walk-in Closet',
  'Storage',
  'Furnished',
  'Hardwood Floors',
  'Carpet',
  'Ceiling Fan'
] as const;

export const BATHROOM_AMENITIES = [
  'Unit Bath',
  'Separate Bath/Shower',
  'Double Sink',
  'Toilet with Washlet',
  'Vanity Mirror'
] as const;

export const KITCHEN_AMENITIES = [
  'Full Kitchen',
  'IH Stove',
  'Gas Stove',
  'Dishwasher',
  'Microwave',
  'Refrigerator',
  'Counter Space',
  'Island Kitchen'
] as const;

export const BUILDING_AMENITIES = [
  'Elevator',
  'Auto-lock',
  'Mail Box',
  'Bicycle Parking',
  'Trash Room',
  'Common Area',
  'Rooftop Access'
] as const;

export const UTILITY_AMENITIES = [
  'Internet Ready',
  'Cable Ready',
  'Water Included',
  'Gas Included',
  'Electricity Included',
  'Internet Included'
] as const;

export const SECURITY_AMENITIES = [
  'Security Camera',
  'Security Guard',
  'Intercom',
  'Double Lock',
  'Key Card Access'
] as const;

export const LOCATION_FEATURES = [
  'Near Train Station',
  'Near Bus Stop',
  'Near Supermarket',
  'Near School',
  'Near Park',
  'Near Hospital',
  'Near Shopping',
  'Near Restaurant',
  'Quiet Area',
  'Safe Neighborhood'
] as const;

export interface Listing {
  id?: string;
  listingId: string;
  title: string;
  description: string;
  
  // Basic Info
  price: number;
  priceUSD: number;
  listingType: ListingType;
  status: ListingStatus;
  negotiable: boolean;
  available: boolean;  // Whether the listing is currently available
  featured: boolean;   // Whether the listing is featured
  
  // Listing Details
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  squareMeters?: number;  // For backward compatibility
  parkingSpaces: number;
  yearBuilt?: number;
  availableFrom: string;
  leaseTerm: string;
  
  // Location
  location: string;
  city: string;
  nearestBase: string;
  baseInspected: boolean;
  baseProximity: BaseProximity[];
  lat?: number;
  lng?: number;
  
  // Costs & Terms
  moveInCosts: MoveInCosts;
  utilitiesIncluded: boolean;
  
  // Pet Policy
  petPolicy: PetPolicy[];
  
  // Amenities
  amenities?: string[];  // Legacy field for backward compatibility
  interiorAmenities: typeof INTERIOR_AMENITIES[number][];
  bathroomAmenities: typeof BATHROOM_AMENITIES[number][];
  kitchenAmenities: typeof KITCHEN_AMENITIES[number][];
  buildingAmenities: typeof BUILDING_AMENITIES[number][];
  utilityAmenities: typeof UTILITY_AMENITIES[number][];
  securityAmenities: typeof SECURITY_AMENITIES[number][];
  locationFeatures: typeof LOCATION_FEATURES[number][];
  
  // Media
  images: string[];
  floorPlan?: string;
  video?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  agencyId?: string;
  
  // Review Status (for non-agency submissions)
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  reviewComment?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// Type alias for backward compatibility during transition
export type Property = Listing;
export type PropertyType = ListingType;
export type PropertyStatus = ListingStatus;
