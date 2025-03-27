export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  role?: 'user' | 'agent' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPreferences {
  userId: string;
  listingTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  locations?: string[];
  amenities?: string[];
  notificationSettings?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
