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

// Base proximity interface
export interface NearbyBase {
  name: string;
  distance: number;
  shuttleAvailable: boolean;
}

// Agency interface
export interface Agency {
  id?: string;
  name: string;
  logo?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
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

// Main listing interface
export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: number;
  priceUSD?: number;
  listingType: ListingType;
  status?: ListingStatus;
  negotiable?: boolean;
  available?: boolean;
  featured?: boolean;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  availableFrom?: string;
  leaseTerm?: string;
  prefecture?: string;
  city: string;
  baseInspected?: boolean;
  nearbyBases?: NearbyBase[];
  lat?: number;
  lng?: number;
  securityDeposit?: number;
  keyMoney?: number;
  agencyFee?: number;
  guarantorFee?: number;
  utilitiesIncluded?: boolean;
  petPolicy?: string[];
  amenities?: {
    interior?: string[];
    bathroom?: string[];
    kitchen?: string[];
    building?: string[];
    utility?: string[];
    security?: string[];
    location?: string[];
  };
  images: string[];
  floorPlan?: string;
  video?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  agencyId?: string;
  agency?: Agency;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  reviewComment?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// Type aliases for backward compatibility during transition
export type Property = Listing;
export type PropertyType = ListingType;
export type PropertyStatus = ListingStatus;
export type BaseProximity = NearbyBase;
