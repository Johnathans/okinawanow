export type PropertyType = 'house' | 'apartment' | 'duplex';
export type MilitaryBase = 'Kadena' | 'Foster' | 'Kinser' | 'Hansen' | 'Schwab' | 'McTureous' | 'Courtney';
export type PropertyFeature = 
  | 'parking' 
  | 'pets_allowed'
  | 'furnished'
  | 'yard'
  | 'balcony'
  | 'internet_ready'
  | 'american_appliances'
  | 'japanese_appliances'
  | 'english_support';

export interface UserPropertyPreferences {
  type: PropertyType[];
  bedrooms: number;
  nearBase: MilitaryBase[];
  maxBudget: number;
  desiredFeatures: PropertyFeature[];
  moveInDate: string;
}

export interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  occupation: string;
  familySize: number;
  petInfo: {
    hasPets: boolean;
    petTypes: string[];
    petCount: number;
  };
}

export interface UserContactPreferences {
  email: string;
  phone: string;
  lineId?: string;
  whatsappNumber?: string;
  preferredContactMethods: ('email' | 'phone' | 'line' | 'whatsapp')[];
  preferredContactTimes: ('morning' | 'afternoon' | 'evening')[];
  preferredLanguages: ('english' | 'japanese')[];
}

export interface UserProfile {
  id: string;
  propertyPreferences: UserPropertyPreferences;
  personalInfo: UserPersonalInfo;
  contactPreferences: UserContactPreferences;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
