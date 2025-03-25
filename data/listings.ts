import { Listing, ListingType, ListingStatus, PetPolicy } from '@/types/listing';

export const mockListings: Listing[] = [
    {
        id: '1',
        listingId: 'listing-1',
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
        floorArea: 75,
        parkingSpaces: 1,
        yearBuilt: 2020,
        availableFrom: '2024-04-01',
        leaseTerm: '12 months',
        location: 'Chatan',
        city: 'Chatan',
        nearestBase: 'Kadena Air Base',
        baseInspected: true,
        baseProximity: [
            {
                baseName: 'Kadena Air Base',
                distanceKm: 2.5,
                shuttleAvailable: true
            }
        ],
        moveInCosts: {
            deposit: 2,
            keyMoney: 1,
            agencyFee: 1,
            guarantorFee: 0.5
        },
        utilitiesIncluded: false,
        petPolicy: [PetPolicy.CatsAllowed, PetPolicy.DogsAllowed],
        amenities: [
            'Air Conditioning',
            'Internet Ready',
            'Washer/Dryer',
            'Parking'
        ],
        interiorAmenities: [
            'Air Conditioning',
            'Washer/Dryer',
            'Storage'
        ],
        bathroomAmenities: [
            'Unit Bath',
            'Toilet with Washlet'
        ],
        kitchenAmenities: [
            'IH Stove',
            'Refrigerator'
        ],
        buildingAmenities: [
            'Elevator',
            'Auto-lock'
        ],
        utilityAmenities: [
            'Internet Ready',
            'Cable Ready'
        ],
        securityAmenities: [
            'Security Camera',
            'Intercom'
        ],
        locationFeatures: [
            'Near Train Station',
            'Near Supermarket'
        ],
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
        listingId: 'listing-2',
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
        floorArea: 120,
        parkingSpaces: 2,
        yearBuilt: 2015,
        availableFrom: '2024-05-01',
        leaseTerm: '24 months',
        location: 'Yomitan',
        city: 'Yomitan',
        nearestBase: 'Torii Station',
        baseInspected: true,
        baseProximity: [
            {
                baseName: 'Torii Station',
                distanceKm: 3.0,
                shuttleAvailable: false
            }
        ],
        moveInCosts: {
            deposit: 2,
            keyMoney: 1,
            agencyFee: 1,
            guarantorFee: 0.5
        },
        utilitiesIncluded: false,
        petPolicy: [PetPolicy.NoPets],
        amenities: [
            'Garden',
            'Parking',
            'Storage',
            'Security System'
        ],
        interiorAmenities: [
            'Air Conditioning',
            'Storage',
            'Hardwood Floors'
        ],
        bathroomAmenities: [
            'Separate Bath/Shower',
            'Double Sink'
        ],
        kitchenAmenities: [
            'Full Kitchen',
            'Island Kitchen'
        ],
        buildingAmenities: [
            'Bicycle Parking',
            'Trash Room'
        ],
        utilityAmenities: [
            'Internet Ready',
            'Cable Ready'
        ],
        securityAmenities: [
            'Security Camera',
            'Double Lock'
        ],
        locationFeatures: [
            'Near Park',
            'Quiet Area'
        ],
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
        listingId: 'listing-3',
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
        floorArea: 85,
        parkingSpaces: 1,
        yearBuilt: 2022,
        availableFrom: '2024-03-15',
        leaseTerm: '12 months',
        location: 'American Village, Chatan',
        city: 'Chatan',
        nearestBase: 'Camp Foster',
        baseInspected: true,
        baseProximity: [
            {
                baseName: 'Camp Foster',
                distanceKm: 1.5,
                shuttleAvailable: true
            }
        ],
        moveInCosts: {
            deposit: 2,
            keyMoney: 1,
            agencyFee: 1,
            guarantorFee: 0.5
        },
        utilitiesIncluded: true,
        petPolicy: [PetPolicy.CatsAllowed],
        amenities: [
            'Ocean View',
            'Gym',
            'Pool',
            'Security'
        ],
        interiorAmenities: [
            'Air Conditioning',
            'Walk-in Closet',
            'Furnished'
        ],
        bathroomAmenities: [
            'Unit Bath',
            'Vanity Mirror'
        ],
        kitchenAmenities: [
            'IH Stove',
            'Dishwasher'
        ],
        buildingAmenities: [
            'Elevator',
            'Auto-lock',
            'Mail Box'
        ],
        utilityAmenities: [
            'Internet Included',
            'Water Included'
        ],
        securityAmenities: [
            'Security Guard',
            'Key Card Access'
        ],
        locationFeatures: [
            'Near Shopping',
            'Near Restaurant'
        ],
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
