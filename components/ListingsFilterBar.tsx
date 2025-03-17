'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLocationDot, 
    faBuilding, 
    faCoins, 
    faBed, 
    faFilter, 
    faXmark, 
    faMapMarkerAlt,
    faSearch 
} from '@fortawesome/free-solid-svg-icons';

interface ListingsFilterBarProps {
    initialFilters?: {
        location?: string;
        nearestBase?: string;
        propertyType?: string;
        bedrooms?: string;
        priceRange?: string;
        search?: string;
    };
}

const ListingsFilterBar = ({ initialFilters = {} }: ListingsFilterBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state with either initialFilters or URL params
    const [location, setLocation] = useState(initialFilters.location || searchParams?.get('location') || '');
    const [nearestBase, setNearestBase] = useState(initialFilters.nearestBase || searchParams?.get('nearestBase') || '');
    const [propertyType, setPropertyType] = useState(initialFilters.propertyType || searchParams?.get('propertyType') || '');
    const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || searchParams?.get('bedrooms') || '');
    const [priceRange, setPriceRange] = useState(initialFilters.priceRange || searchParams?.get('priceRange') || '');
    const [search, setSearch] = useState(initialFilters.search || searchParams?.get('search') || '');
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(searchParams?.toString());
        if (location) params.set('location', location);
        else params.delete('location');
        if (nearestBase) params.set('nearestBase', nearestBase);
        else params.delete('nearestBase');
        if (propertyType) params.set('propertyType', propertyType);
        else params.delete('propertyType');
        if (priceRange) params.set('priceRange', priceRange);
        else params.delete('priceRange');
        if (bedrooms) params.set('bedrooms', bedrooms);
        else params.delete('bedrooms');
        if (search) params.set('search', search);
        else params.delete('search');
        
        router.push(`/listings?${params.toString()}`);
    }, [location, nearestBase, propertyType, priceRange, bedrooms, search]);

    const clearFilter = (setter: (value: string) => void) => {
        setter('');
    };

    const getActiveFiltersCount = () => {
        return [location, nearestBase, propertyType, priceRange, bedrooms, search].filter(Boolean).length;
    };

    const filterButtonStyle = (active: boolean) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        height: '40px',
        fontSize: '0.875rem',
        color: active ? 'var(--primary-pink)' : '#4F5D75',
        backgroundColor: active ? 'var(--light-pink)' : '#F8F9FA',
        border: 'none',
        borderRadius: '20px',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        fontWeight: active ? '500' : '400'
    });

    const clearAllFilters = () => {
        setLocation('');
        setNearestBase('');
        setPropertyType('');
        setPriceRange('');
        setBedrooms('');
        setSearch('');
        router.push('/listings');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Build query string
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (nearestBase) params.set('nearestBase', nearestBase);
        if (propertyType) params.set('propertyType', propertyType);
        if (bedrooms) params.set('bedrooms', bedrooms);
        if (priceRange) params.set('priceRange', priceRange);
        if (search) params.set('search', search);

        // Navigate with new params
        router.push(`/listings?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex gap-2 align-items-center">
                {/* Search Bar */}
                <div style={{ width: '320px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by city or base..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            borderRadius: '8px',
                            height: '40px',
                            paddingLeft: '16px',
                            border: '1px solid #e9ecef',
                        }}
                    />
                </div>

                {/* City Filter */}
                <div className="dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        data-bs-toggle="dropdown"
                        style={filterButtonStyle(!!location)}
                    >
                        <FontAwesomeIcon 
                            icon={faLocationDot} 
                            style={{ fontSize: '0.875rem' }}
                            className={location ? 'text-primary-pink' : ''} 
                        />
                        {location ? location.charAt(0).toUpperCase() + location.slice(1) : 'City'}
                        {location && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                className="ms-1"
                                style={{ fontSize: '0.75rem', opacity: 0.7 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilter(setLocation);
                                }}
                            />
                        )}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setLocation('')}>All Cities</button></li>
                        <li><button className="dropdown-item" onClick={() => setLocation('chatan')}>Chatan</button></li>
                        <li><button className="dropdown-item" onClick={() => setLocation('kadena')}>Kadena</button></li>
                        <li><button className="dropdown-item" onClick={() => setLocation('ginowan')}>Ginowan</button></li>
                        <li><button className="dropdown-item" onClick={() => setLocation('naha')}>Naha</button></li>
                    </ul>
                </div>

                {/* Base Filter */}
                <div className="dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        data-bs-toggle="dropdown"
                        style={filterButtonStyle(!!nearestBase)}
                    >
                        <FontAwesomeIcon 
                            icon={faMapMarkerAlt} 
                            style={{ fontSize: '0.875rem' }}
                            className={nearestBase ? 'text-primary-pink' : ''} 
                        />
                        {nearestBase ? nearestBase.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ') : 'Base'}
                        {nearestBase && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                className="ms-1"
                                style={{ fontSize: '0.75rem', opacity: 0.7 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilter(setNearestBase);
                                }}
                            />
                        )}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setNearestBase('')}>Any Base</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('kadena')}>Kadena Air Base</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('foster')}>Camp Foster</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('hansen')}>Camp Hansen</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('schwab')}>Camp Schwab</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('courtney')}>Camp Courtney</button></li>
                        <li><button className="dropdown-item" onClick={() => setNearestBase('mcas-futenma')}>MCAS Futenma</button></li>
                    </ul>
                </div>

                {/* Property Type Filter */}
                <div className="dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        data-bs-toggle="dropdown"
                        style={filterButtonStyle(!!propertyType)}
                    >
                        <FontAwesomeIcon 
                            icon={faBuilding} 
                            style={{ fontSize: '0.875rem' }}
                            className={propertyType ? 'text-primary-pink' : ''} 
                        />
                        {propertyType ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1) : 'Type'}
                        {propertyType && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                className="ms-1"
                                style={{ fontSize: '0.75rem', opacity: 0.7 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilter(setPropertyType);
                                }}
                            />
                        )}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setPropertyType('')}>All Types</button></li>
                        <li><button className="dropdown-item" onClick={() => setPropertyType('apartment')}>Apartment</button></li>
                        <li><button className="dropdown-item" onClick={() => setPropertyType('house')}>House</button></li>
                        <li><button className="dropdown-item" onClick={() => setPropertyType('mansion')}>Mansion</button></li>
                    </ul>
                </div>

                {/* Price Range Filter */}
                <div className="dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        data-bs-toggle="dropdown"
                        style={filterButtonStyle(!!priceRange)}
                    >
                        <FontAwesomeIcon 
                            icon={faCoins} 
                            style={{ fontSize: '0.875rem' }}
                            className={priceRange ? 'text-primary-pink' : ''} 
                        />
                        {priceRange ? `¥${priceRange.split('-')[0]/1000}k - ¥${priceRange.split('-')[1]/1000}k` : 'Price'}
                        {priceRange && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                className="ms-1"
                                style={{ fontSize: '0.75rem', opacity: 0.7 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilter(setPriceRange);
                                }}
                            />
                        )}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setPriceRange('')}>Any Price</button></li>
                        <li><button className="dropdown-item" onClick={() => setPriceRange('0-100000')}>Under ¥100k</button></li>
                        <li><button className="dropdown-item" onClick={() => setPriceRange('100000-150000')}>¥100k - ¥150k</button></li>
                        <li><button className="dropdown-item" onClick={() => setPriceRange('150000-200000')}>¥150k - ¥200k</button></li>
                        <li><button className="dropdown-item" onClick={() => setPriceRange('200000-1000000')}>Over ¥200k</button></li>
                    </ul>
                </div>

                {/* Bedrooms Filter */}
                <div className="dropdown">
                    <button 
                        className="btn dropdown-toggle" 
                        data-bs-toggle="dropdown"
                        style={filterButtonStyle(!!bedrooms)}
                    >
                        <FontAwesomeIcon 
                            icon={faBed} 
                            style={{ fontSize: '0.875rem' }}
                            className={bedrooms ? 'text-primary-pink' : ''} 
                        />
                        {bedrooms ? `${bedrooms} Beds` : 'Beds'}
                        {bedrooms && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                className="ms-1"
                                style={{ fontSize: '0.75rem', opacity: 0.7 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFilter(setBedrooms);
                                }}
                            />
                        )}
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setBedrooms('')}>Any</button></li>
                        <li><button className="dropdown-item" onClick={() => setBedrooms('1')}>1 Bed</button></li>
                        <li><button className="dropdown-item" onClick={() => setBedrooms('2')}>2 Beds</button></li>
                        <li><button className="dropdown-item" onClick={() => setBedrooms('3')}>3 Beds</button></li>
                        <li><button className="dropdown-item" onClick={() => setBedrooms('4')}>4+ Beds</button></li>
                    </ul>
                </div>

                {/* Clear All Button */}
                {getActiveFiltersCount() > 0 && (
                    <button 
                        className="btn"
                        onClick={clearAllFilters}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            height: '40px',
                            fontSize: '0.875rem',
                            backgroundColor: 'var(--light-pink)',
                            color: 'var(--primary-pink)',
                            border: 'none',
                            borderRadius: '20px',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} style={{ fontSize: '0.875rem' }} />
                        Clear All
                    </button>
                )}
            </div>
        </form>
    );
};

export default ListingsFilterBar;
