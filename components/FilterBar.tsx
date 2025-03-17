'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faHome, 
  faYenSign, 
  faBed, 
  faBath, 
  faCaretDown 
} from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

export const CITIES = [
  'Naha',
  'Chatan',
  'Ginowan',
  'Urasoe',
  'Okinawa',
  'Uruma',
  'Yomitan',
  'Kitanakagusuku',
  'Nakagusuku',
  'Nishihara'
];

export const BASES = [
  'Kadena Air Base',
  'Camp Foster',
  'Camp Kinser',
  'Camp Hansen',
  'Camp Schwab',
  'White Beach',
  'MCAS Futenma',
  'Torii Station'
];

export const PRICE_RANGES = [
  { label: 'Any Price', value: '' },
  { label: '¥50,000 - ¥100,000', value: '50000-100000' },
  { label: '¥100,000 - ¥150,000', value: '100000-150000' },
  { label: '¥150,000 - ¥200,000', value: '150000-200000' },
  { label: '¥200,000+', value: '200000-' }
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    base: searchParams.get('base') || '',
    propertyType: searchParams.get('propertyType') || '',
    price: searchParams.get('price') || '',
    beds: searchParams.get('beds') || '',
    baths: searchParams.get('baths') || ''
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      city: searchParams.get('city') || '',
      base: searchParams.get('base') || '',
      propertyType: searchParams.get('propertyType') || '',
      price: searchParams.get('price') || '',
      beds: searchParams.get('beds') || '',
      baths: searchParams.get('baths') || ''
    });
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    // Clear related fields
    if (key === 'city' && value) {
      setFilters(prev => ({ ...prev, [key]: value, base: '' }));
    } else if (key === 'base' && value) {
      setFilters(prev => ({ ...prev, [key]: value, city: '' }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }

    // Update URL immediately
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value.toLowerCase());
      if (key === 'city') params.delete('base');
      if (key === 'base') params.delete('city');
    } else {
      params.delete(key);
    }
    router.push(`/listings?${params.toString()}`);
  };

  const selectStyle = {
    height: '40px',
    border: '1px solid var(--medium-pink)',
    borderRadius: '4px',
    paddingLeft: '32px',
    paddingRight: '28px',
    fontSize: '14px',
    appearance: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    backgroundImage: 'none'
  };

  const iconStyle = {
    position: 'absolute' as const,
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--primary-pink)',
    fontSize: '14px'
  };

  const caretStyle = {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--primary-pink)',
    fontSize: '12px',
    pointerEvents: 'none' as const
  };

  return (
    <div className="filter-bar bg-white border-bottom">
      <div className="container-fluid px-4 py-3">
        <div className="row g-2">
          <div className="col">
            <div className="d-flex gap-2 align-items-center">
              {/* City */}
              <div className="position-relative" style={{ minWidth: '140px' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Any City</option>
                  {CITIES.map(city => (
                    <option key={city} value={city.toLowerCase()}>{city}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>

              {/* Base */}
              <div className="position-relative" style={{ minWidth: '140px' }}>
                <FontAwesomeIcon icon={faHome} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.base}
                  onChange={(e) => handleFilterChange('base', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Any Base</option>
                  {BASES.map(base => (
                    <option key={base} value={base.toLowerCase()}>{base}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>

              {/* Property Type */}
              <div className="position-relative" style={{ minWidth: '140px' }}>
                <FontAwesomeIcon icon={faHome} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Any Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="mansion">Mansion</option>
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>

              {/* Price Range */}
              <div className="position-relative" style={{ minWidth: '140px' }}>
                <FontAwesomeIcon icon={faYenSign} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  style={selectStyle}
                >
                  {PRICE_RANGES.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>

              {/* More Button */}
              <button
                className="btn d-flex align-items-center gap-1"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                style={{
                  height: '40px',
                  border: '1px solid var(--medium-pink)',
                  borderRadius: '4px',
                  padding: '0 16px',
                  fontSize: '14px',
                  color: 'var(--primary-pink)',
                  backgroundColor: 'white'
                }}
              >
                More
                <FontAwesomeIcon 
                  icon={faCaretDown} 
                  style={{ 
                    transform: showMoreFilters ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Filters Panel */}
      {showMoreFilters && (
        <div className="container-fluid px-4 py-3 border-top" style={{ borderColor: 'var(--medium-pink)' }}>
          <div className="row g-3">
            {/* Beds */}
            <div className="col-md-3">
              <div className="position-relative">
                <FontAwesomeIcon icon={faBed} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.beds}
                  onChange={(e) => handleFilterChange('beds', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>
            </div>

            {/* Baths */}
            <div className="col-md-3">
              <div className="position-relative">
                <FontAwesomeIcon icon={faBath} style={iconStyle} />
                <select
                  className="form-select"
                  value={filters.baths}
                  onChange={(e) => handleFilterChange('baths', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Any Baths</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
                <FontAwesomeIcon icon={faCaretDown} style={caretStyle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
