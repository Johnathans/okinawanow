interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  nearestBase: string | null;
  propertyType: string;
  description?: string;
}

const mockListings: Listing[] = [
  {
    "id": 1000,
    "title": "Spacious Unit with Ocean View",
    "location": "Okinawa City",
    "price": 150000,
    "beds": 3,
    "baths": 1,
    "sqm": 85,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Kadena Air Base",
    "propertyType": "apartment",
    "description": "Beautiful 3-bedroom apartment with stunning ocean views. Just 5 minutes from Kadena Air Base. Features modern appliances and a spacious balcony."
  },
  {
    "id": 1001,
    "title": "Modern Apartment in Chatan",
    "location": "Chatan",
    "price": 302000,
    "beds": 4,
    "baths": 2,
    "sqm": 120,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Camp Foster",
    "propertyType": "apartment",
    "description": "Luxurious 4-bedroom apartment in the heart of American Village. Walking distance to beaches and shopping. Perfect for military families."
  },
  {
    "id": 1002,
    "title": "Duplex close to Kadena",
    "location": "Okinawa City",
    "price": 203000,
    "beds": 3,
    "baths": 2,
    "sqm": 95,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Kadena Air Base",
    "propertyType": "duplex",
    "description": "Newly renovated 3-bedroom duplex with modern amenities. Quiet neighborhood, perfect for families. Close to schools and shopping."
  },
  {
    "id": 1003,
    "title": "Modern Duplex in Kin",
    "location": "Kin",
    "price": 311000,
    "beds": 4,
    "baths": 2,
    "sqm": 130,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Camp Hansen",
    "propertyType": "duplex",
    "description": "Spacious 4-bedroom duplex with traditional Japanese garden. Recently updated kitchen and bathrooms. Close to Camp Hansen."
  },
  {
    "id": 1004,
    "title": "Sunabe Beachfront Apartment",
    "location": "Chatan",
    "price": 413000,
    "beds": 3,
    "baths": 2,
    "sqm": 100,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Camp Foster",
    "propertyType": "apartment",
    "description": "Premium 3-bedroom apartment with direct beach access. Stunning sunset views from the private balcony. High-end finishes throughout."
  },
  {
    "id": 1005,
    "title": "Modern Unit by Rycom Mall",
    "location": "Kitanakagusuku",
    "price": 314000,
    "beds": 3,
    "baths": 2,
    "sqm": 90,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Camp Foster",
    "propertyType": "apartment",
    "description": "Contemporary 3-bedroom apartment near AEON Mall. Features smart home technology and secure parking. Easy access to major highways."
  },
  {
    "id": 1006,
    "title": "Luxury Apartment near Araha Beach",
    "location": "Ginowan",
    "price": 345000,
    "beds": 4,
    "baths": 2,
    "sqm": 115,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "MCAS Futenma",
    "propertyType": "apartment",
    "description": "High-end 4-bedroom apartment with resort-style amenities. Walking distance to Araha Beach. Includes parking and storage."
  },
  {
    "id": 1007,
    "title": "Brand New House in Gated Community",
    "location": "Okinawa City",
    "price": 450000,
    "beds": 5,
    "baths": 3,
    "sqm": 180,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Kadena Air Base",
    "propertyType": "house",
    "description": "Stunning 5-bedroom house with modern design. Features include a chef's kitchen, home theater, and landscaped garden. Military-friendly neighborhood."
  },
  {
    "id": 1008,
    "title": "Traditional Style Family Home",
    "location": "Okinawa City",
    "price": 170000,
    "beds": 3,
    "baths": 1,
    "sqm": 85,
    "image": "/images/listings/placeholder.jpg",
    "nearestBase": "Kadena Air Base",
    "propertyType": "house",
    "description": "Charming 3-bedroom house with traditional Japanese elements. Peaceful location with easy base access. Perfect for first-time renters."
  }
];

export type { Listing };
export default mockListings;