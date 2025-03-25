import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMapMarkerAlt, faHome, faBed, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ListingType } from '@/types/listing';

interface FilterBarProps {
    initialFilters: {
        location?: string;
        nearestBase?: string;
        listingType?: string;
        priceRange?: string;
        bedrooms?: string;
        search?: string;
    };
}

export default function ListingsFilterBar({ initialFilters }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // State for filter values
    const [location, setLocation] = useState(initialFilters.location || searchParams?.get('location') || '');
    const [nearestBase, setNearestBase] = useState(initialFilters.nearestBase || searchParams?.get('nearestBase') || '');
    const [listingType, setListingType] = useState(initialFilters.listingType || searchParams?.get('listingType') || '');
    const [priceRange, setPriceRange] = useState(initialFilters.priceRange || searchParams?.get('priceRange') || '');
    const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || searchParams?.get('bedrooms') || '');
    const [search, setSearch] = useState(initialFilters.search || searchParams?.get('search') || '');

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());

        if (location) params.set('location', location);
        else params.delete('location');

        if (nearestBase) params.set('nearestBase', nearestBase);
        else params.delete('nearestBase');

        if (listingType) params.set('listingType', listingType);
        else params.delete('listingType');

        if (priceRange) params.set('priceRange', priceRange);
        else params.delete('priceRange');

        if (bedrooms) params.set('bedrooms', bedrooms);
        else params.delete('bedrooms');

        if (search) params.set('search', search);
        else params.delete('search');

        router.push(`/listings?${params.toString()}`);
    }, [location, nearestBase, listingType, priceRange, bedrooms, search, router, searchParams]);

    // Count active filters
    const activeFilterCount = () => {
        return [location, nearestBase, listingType, priceRange, bedrooms, search].filter(Boolean).length;
    };

    // Clear all filters
    const clearFilters = () => {
        setLocation('');
        setNearestBase('');
        setListingType('');
        setPriceRange('');
        setBedrooms('');
        setSearch('');

        const params = new URLSearchParams();
        router.push('/listings');
    };

    // Handle search submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams?.toString());

        if (location) params.set('location', location);
        if (nearestBase) params.set('nearestBase', nearestBase);
        if (listingType) params.set('listingType', listingType);
        if (priceRange) params.set('priceRange', priceRange);
        if (bedrooms) params.set('bedrooms', bedrooms);
        if (search) params.set('search', search);

        router.push(`/listings?${params.toString()}`);
    };

    // Styles for filter buttons
    const filterButtonStyle = (isActive: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        backgroundColor: isActive ? '#fff' : '#f8fafc',
        color: isActive ? '#e75d7c' : '#64748b',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap' as const,
        ':hover': {
            backgroundColor: '#fff',
            borderColor: '#e75d7c',
        }
    });

    return (
        <div className="filter-bar bg-white shadow-sm rounded-lg p-4 mb-6">
            <form onSubmit={handleSearchSubmit}>
                <div className="flex flex-wrap gap-3">
                    {/* Search input */}
                    <div className="flex-grow min-w-[200px]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-pink"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Location filter */}
                    <div>
                        <div
                            onClick={() => {/* Add location selector */}}
                            style={filterButtonStyle(!!location)}
                        >
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className={location ? 'text-primary-pink' : ''} 
                                style={{ marginRight: '0.5rem' }}
                            />
                            {location || 'Location'}
                            {location && (
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="ml-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLocation('');
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Listing type filter */}
                    <div>
                        <div
                            onClick={() => {/* Add type selector */}}
                            style={filterButtonStyle(!!listingType)}
                        >
                            <FontAwesomeIcon
                                icon={faHome}
                                className={listingType ? 'text-primary-pink' : ''} 
                                style={{ marginRight: '0.5rem' }}
                            />
                            {listingType ? listingType.charAt(0).toUpperCase() + listingType.slice(1) : 'Type'}
                            {listingType && (
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="ml-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setListingType('');
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Bedrooms filter */}
                    <div>
                        <div
                            onClick={() => {/* Add bedrooms selector */}}
                            style={filterButtonStyle(!!bedrooms)}
                        >
                            <FontAwesomeIcon
                                icon={faBed}
                                className={bedrooms ? 'text-primary-pink' : ''} 
                                style={{ marginRight: '0.5rem' }}
                            />
                            {bedrooms || 'Bedrooms'}
                            {bedrooms && (
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="ml-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setBedrooms('');
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Clear filters button */}
                    {activeFilterCount() > 0 && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-sm text-gray-600 hover:text-primary-pink"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
