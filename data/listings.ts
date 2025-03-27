import { Listing, ListingType, ListingStatus, PetPolicy } from '@/types/listing';

export const mockListings: Listing[] = [
    {
        id: '1',
        title: 'Modern Apartment in Chatan',
        description: 'Spacious and modern 2-bedroom apartment with ocean views',
        price: 150000,
        priceUSD: 1000,
        listingType: ListingType.Apartment,
        status: ListingStatus.Active,
        negotiable: true,
        available: true,
        featured: true,
        bedrooms: 2,
        bathrooms: 1,
        squareMeters: 75,
        parkingSpaces: 1,
        yearBuilt: 2020,
        availableFrom: '2024-04-01',
        leaseTerm: '12 months',
        prefecture: 'Okinawa',
        city: 'Chatan',
        nearbyBases: [
            {
                name: 'Kadena Air Base',
                distance: 2.5,
                shuttleAvailable: true
            }
        ],
        baseInspected: true,
        securityDeposit: 2,
        keyMoney: 1,
        agencyFee: 1,
        guarantorFee: 0.5,
        utilitiesIncluded: false,
        petPolicy: [PetPolicy.CatsAllowed, PetPolicy.DogsAllowed],
        amenities: {
            interior: [
                'Air Conditioning',
                'Internet Ready',
                'Washer/Dryer',
                'Storage'
            ],
            bathroom: [
                'Unit Bath',
                'Toilet with Washlet'
            ],
            kitchen: [
                'IH Stove',
                'Refrigerator'
            ],
            building: [
                'Elevator',
                'Auto-lock'
            ],
            utility: [
                'Internet Ready',
                'Cable Ready'
            ],
            security: [
                'Security Camera',
                'Intercom'
            ],
            location: [
                'Near Train Station',
                'Near Supermarket'
            ]
        },
        images: [
            '/images/listings/apartment1.jpg',
            '/images/listings/apartment1-2.jpg',
            '/images/listings/apartment1-3.jpg'
        ],
        floorPlan: '/images/floorplans/2bed-1bath.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        createdBy: 'agent123',
        agencyId: 'agency456'
    },
    {
        id: '2',
        title: 'Traditional House in Yomitan',
        description: 'Beautiful traditional Japanese house with modern amenities',
        price: 200000,
        priceUSD: 1350,
        listingType: ListingType.House,
        status: ListingStatus.Active,
        negotiable: false,
        available: true,
        featured: true,
        bedrooms: 3,
        bathrooms: 2,
        squareMeters: 120,
        parkingSpaces: 2,
        yearBuilt: 2015,
        availableFrom: '2024-05-01',
        leaseTerm: '24 months',
        prefecture: 'Okinawa',
        city: 'Yomitan',
        nearbyBases: [
            {
                name: 'Torii Station',
                distance: 3.0,
                shuttleAvailable: true
            }
        ],
        baseInspected: true,
        securityDeposit: 2,
        keyMoney: 1,
        agencyFee: 1,
        guarantorFee: 0.5,
        utilitiesIncluded: false,
        petPolicy: [PetPolicy.NoPets],
        amenities: {
            interior: [
                'Air Conditioning',
                'Storage',
                'Hardwood Floors'
            ],
            bathroom: [
                'Separate Bath/Shower',
                'Double Sink'
            ],
            kitchen: [
                'Full Kitchen',
                'Island Kitchen'
            ],
            building: [
                'Bicycle Parking',
                'Trash Room'
            ],
            utility: [
                'Internet Ready',
                'Cable Ready'
            ],
            security: [
                'Security Camera',
                'Double Lock'
            ],
            location: [
                'Near Park',
                'Quiet Area'
            ]
        },
        images: [
            '/images/listings/house1.jpg',
            '/images/listings/house1-2.jpg',
            '/images/listings/house1-3.jpg'
        ],
        floorPlan: '/images/floorplans/3bed-2bath.png',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        createdBy: 'agent789',
        agencyId: 'agency456'
    },
    {
        id: '3',
        title: 'Luxury Apartment in American Village',
        description: 'High-end apartment with stunning ocean views',
        price: 180000,
        priceUSD: 1200,
        listingType: ListingType.Apartment,
        status: ListingStatus.Active,
        negotiable: true,
        available: true,
        featured: true,
        bedrooms: 2,
        bathrooms: 1,
        squareMeters: 85,
        parkingSpaces: 1,
        yearBuilt: 2022,
        availableFrom: '2024-03-15',
        leaseTerm: '12 months',
        prefecture: 'Okinawa',
        city: 'Chatan',
        nearbyBases: [
            {
                name: 'Camp Foster',
                distance: 1.5,
                shuttleAvailable: true
            }
        ],
        baseInspected: true,
        securityDeposit: 2,
        keyMoney: 1,
        agencyFee: 1,
        guarantorFee: 0.5,
        utilitiesIncluded: true,
        petPolicy: [PetPolicy.CatsAllowed],
        amenities: {
            interior: [
                'Air Conditioning',
                'Walk-in Closet',
                'Furnished'
            ],
            bathroom: [
                'Unit Bath',
                'Vanity Mirror'
            ],
            kitchen: [
                'IH Stove',
                'Dishwasher'
            ],
            building: [
                'Elevator',
                'Auto-lock',
                'Mail Box'
            ],
            utility: [
                'Internet Included',
                'Water Included'
            ],
            security: [
                'Security Guard',
                'Key Card Access'
            ],
            location: [
                'Near Shopping',
                'Near Restaurant'
            ]
        },
        images: [
            '/images/listings/luxury1.jpg',
            '/images/listings/luxury1-2.jpg',
            '/images/listings/luxury1-3.jpg'
        ],
        floorPlan: '/images/floorplans/2bed-1bath-luxury.png',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
        createdBy: 'agent123',
        agencyId: 'agency789'
    }
];
