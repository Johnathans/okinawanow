interface LodgingOption {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  priceRange: string;
  contact: {
    phone: string;
    website: string;
    address: string;
  };
  amenities: string[];
  features: string[];
  notes: string;
  images: string[];
  rating: number;
  price: number;
}

export const hotels: LodgingOption[] = [
  {
    id: 'westpac',
    name: 'Westpac Inn',
    location: 'Camp Foster',
    type: 'On-Base',
    description: 'Official military lodging facility on Camp Foster. Priority given to PCS status personnel.',
    priceRange: '$70-90/night',
    price: 8000,
    rating: 4,
    contact: {
      phone: '+81-98-970-5555',
      website: 'https://www.mcipac.marines.mil/lodging',
      address: 'Building 475, Camp Foster'
    },
    amenities: [
      'Free Wi-Fi',
      'Parking',
      'Kitchenette',
      'Pet Friendly'
    ],
    features: [
      'Priority for PCS families',
      'NEX and commissary nearby',
      'Shuttle service available',
      'Laundry facilities'
    ],
    notes: 'Book as early as possible, especially during peak PCS season (May-August)',
    images: ['/images/lodging/westpac-1.jpg', '/images/lodging/westpac-2.jpg']
  },
  {
    id: 'shogun',
    name: 'Shogun Inn',
    location: 'Kadena Air Base',
    type: 'On-Base',
    description: 'Air Force Inns lodging facility on Kadena Air Base. Modern rooms with excellent amenities.',
    priceRange: '$75-95/night',
    price: 8500,
    rating: 4,
    contact: {
      phone: '+81-98-962-1100',
      website: 'https://www.18fss.com/lodging',
      address: 'Building 721, Kadena Air Base'
    },
    amenities: [
      'Free Wi-Fi',
      'Parking',
      'Kitchenette',
      'Restaurant'
    ],
    features: [
      'BX and commissary nearby',
      'Fitness center access',
      'Business center',
      'Children\'s play area'
    ],
    notes: 'Accepts reservations up to 120 days in advance for PCS personnel',
    images: ['/images/lodging/shogun-1.jpg', '/images/lodging/shogun-2.jpg']
  },
  {
    id: 'vessel',
    name: 'Vessel Hotel Campana',
    location: 'Chatan',
    type: 'Off-Base',
    description: 'Modern hotel near American Village with English-speaking staff and great ocean views.',
    priceRange: '¥12,000-18,000/night',
    price: 12000,
    rating: 5,
    contact: {
      phone: '+81-98-926-1111',
      website: 'https://www.vessel-hotel.jp/campana',
      address: '1-2-7 Mihama, Chatan'
    },
    amenities: [
      'Free Wi-Fi',
      'Parking',
      'Restaurant',
      'Car Rental'
    ],
    features: [
      'Ocean view rooms available',
      'Walking distance to American Village',
      'Breakfast included',
      'Airport shuttle service'
    ],
    notes: 'Popular choice for families due to location and amenities',
    images: ['/images/lodging/vessel-1.jpg', '/images/lodging/vessel-2.jpg']
  }
];
