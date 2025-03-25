'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faYen } from '@fortawesome/free-solid-svg-icons';
import { Listing, ListingType, ListingStatus } from '@/types/listing';
import ListingCard from './ListingCard';

// This would come from your database/API
const listings = {
    chatan: [
        {
            id: 'chatan-1',
            title: 'Modern 2BR near American Village',
            description: 'Beautiful modern 2-bedroom apartment located near American Village in Chatan. Perfect for families or couples.',
            price: 150000,
            location: 'Chatan',
            bedrooms: 2,
            bathrooms: 1,
            floorArea: 65,
            images: ['/images/properties/chatan-1.jpg'],
            status: 'active'
        },
        {
            id: 'chatan-2',
            title: 'Spacious 3BR Family Home',
            description: 'Large 3-bedroom family home in a quiet neighborhood of Chatan. Features a modern kitchen and spacious living area.',
            price: 180000,
            location: 'Chatan',
            bedrooms: 3,
            bathrooms: 2,
            floorArea: 85,
            images: ['/images/properties/chatan-2.jpg'],
            status: 'active'
        },
        {
            id: 'chatan-3',
            title: 'Cozy 1BR with Ocean View',
            description: 'Charming 1-bedroom apartment with stunning ocean views. Walking distance to the beach and local amenities.',
            price: 120000,
            location: 'Chatan',
            bedrooms: 1,
            bathrooms: 1,
            floorArea: 45,
            images: ['/images/properties/chatan-3.jpg'],
            status: 'active'
        }
    ],
    // Add other cities...
};

interface Props {
    cityId: string;
    limit?: number;
}

export default function ListingList({ cityId, limit = 3 }: Props) {
    const cityListings = listings[cityId as keyof typeof listings] || [];
    const displayListings: Listing[] = cityListings.map(listing => ({
        ...listing,
        listingId: listing.id,
        priceUSD: listing.price,
        listingType: ListingType.Apartment,
        squareMeters: listing.floorArea,
        status: ListingStatus.Active,
        baseInspected: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '',
        nearestBase: '',
        lat: 0,
        lng: 0,
        amenities: [],
        features: [],
        utilities: [],
        parkingOptions: [],
        leaseTerms: [],
        petPolicy: [],
        deposit: 0,
        keyMoney: 0,
        agencyFee: 0,
        guarantorFee: 0,
        maintenanceFee: 0,
        otherFees: 0,
        totalMoveInCost: 0,
        totalMoveInCostUSD: 0,
        yearBuilt: 0,
        availableFrom: new Date().toISOString(),
        availableUntil: new Date().toISOString(),
        description: listing.description || '',
        negotiable: false,
        available: true,
        featured: false,
        views: 0,
        favoriteCount: 0,
        tourRequestCount: 0,
        applicationCount: 0,
        contractCount: 0,
        reviewCount: 0,
        averageRating: 0,
        lastViewed: new Date().toISOString(),
        lastTourRequest: new Date().toISOString(),
        lastApplication: new Date().toISOString(),
        lastContract: new Date().toISOString(),
        parkingSpaces: 0,
        leaseTerm: '12',
        city: listing.location || '',
        baseProximity: [],
        furnished: false,
        appliances: [],
        internetSpeed: 0,
        floorLevel: 1,
        elevator: false,
        balcony: false,
        airConditioning: false,
        moveInCosts: {
            deposit: 0,
            keyMoney: 0,
            agencyFee: 0,
            guarantorFee: 0
        },
        utilitiesIncluded: false,
        interiorAmenities: [],
        bathroomAmenities: [],
        kitchenAmenities: [],
        securityAmenities: [],
        communityAmenities: [],
        outdoorAmenities: [],
        nearbyAmenities: [],
        accessibility: [],
        buildingAmenities: [],
        utilityAmenities: [],
        locationFeatures: [],
        createdBy: ''
    })).slice(0, limit);

    if (displayListings.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">
                    No listings available at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {displayListings.map((listing) => (
                <div key={listing.listingId} className="col-md-6 col-lg-4">
                    <ListingCard listing={listing} />
                </div>
            ))}
        </div>
    );
}
