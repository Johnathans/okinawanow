export type PropertyType = 'house' | 'apartment' | 'duplex' | 'condo' | 'townhouse';

export type MilitaryBase = 
  | 'Kadena Air Base'
  | 'Camp Foster'
  | 'Camp Kinser'
  | 'Camp Hansen'
  | 'Camp Schwab'
  | 'Camp McTureous'
  | 'Camp Courtney'
  | 'Camp Shields'
  | 'Camp Lester'
  | 'White Beach Naval Facility'
  | 'Torii Station';

export type PropertyFeature = 
  | 'parking' 
  | 'pets_allowed'
  | 'furnished'
  | 'yard'
  | 'balcony'
  | 'internet_ready'
  | 'american_appliances'
  | 'japanese_appliances'
  | 'english_support'
  | 'air_conditioning'
  | 'dishwasher'
  | 'washer_dryer'
  | 'storage'
  | 'security_system'
  | 'elevator'
  | 'wheelchair_accessible'
  | 'gym'
  | 'pool'
  | 'sofa_contract_ready'
  | 'military_approved';

export interface UserPropertyPreferences {
  type?: PropertyType[];
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  nearBase?: MilitaryBase[];
  minBudget?: number;
  maxBudget?: number;
  desiredFeatures?: PropertyFeature[];
  moveInDate?: string;
  preferredAreas?: string[];
  maxDistanceToBase?: number;
  petFriendly?: boolean;
}

export interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  occupation?: string;
  familySize?: number;
  militaryStatus?: 'active' | 'dependent' | 'civilian' | 'contractor';
  petInfo?: {
    hasPets: boolean;
    petTypes?: string[];
    petCount?: number;
    petWeights?: number[];
  };
}

export interface UserContactPreferences {
  email: string;
  phone?: string;
  lineId?: string;
  whatsappNumber?: string;
  preferredContactMethods?: ('email' | 'phone' | 'line' | 'whatsapp')[];
  preferredContactTimes?: ('morning' | 'afternoon' | 'evening')[];
  preferredLanguages?: ('english' | 'japanese')[];
  notificationPreferences?: {
    newListings: boolean;
    priceDrops: boolean;
    similarProperties: boolean;
    viewingReminders: boolean;
  };
}

export interface UserProfile {
  id: string;
  propertyPreferences?: UserPropertyPreferences;
  personalInfo: UserPersonalInfo;
  contactPreferences: UserContactPreferences;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  role?: 'user' | 'agent' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  verificationStatus: 'unverified' | 'pending' | 'verified';
  savedProperties?: string[];
  viewingHistory?: {
    propertyId: string;
    viewedAt: string;
  }[];
}
