'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { LocationOption } from '@/types/location';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { suggestions, searchLocations } = useLocationSearch();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    searchLocations(query);
  }, [query, searchLocations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push(`/listings?location=${encodeURIComponent(query.toLowerCase())}`);
    }
  };

  const handleSuggestionClick = (suggestion: LocationOption) => {
    setQuery(suggestion.label);
    setIsOpen(false);
    router.push(`/listings?${suggestion.type}=${encodeURIComponent(suggestion.value)}`);
  };

  return (
    <div className="row justify-content-center" ref={wrapperRef}>
      <div className="col-lg-8">
        <form onSubmit={handleSubmit}>
          <div className="position-relative">
            <div className="input-group input-group-lg mb-0" style={{ boxShadow: 'var(--shadow-md)' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter city, neighborhood, or base name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                style={{ 
                  height: '60px',
                  fontSize: '1.1rem',
                  borderRadius: '12px 0 0 12px',
                  border: '1px solid var(--medium-pink)'
                }}
              />
              <button 
                type="submit"
                className="btn px-4"
                style={{ 
                  height: '60px',
                  borderRadius: '0 12px 12px 0',
                  fontSize: '1.1rem',
                  backgroundColor: 'var(--primary-pink)',
                  color: 'white',
                  border: 'none'
                }}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                Search
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
              <div 
                className="position-absolute w-100 bg-white rounded-3 mt-1"
                style={{ 
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-lg)',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={`${suggestion.type}-${suggestion.value}`}
                    className="p-3 border-bottom cursor-pointer hover-bg-light"
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faMapMarkerAlt} 
                        className="me-2 text-muted"
                        style={{ width: '16px' }}
                      />
                      <div>
                        <div className="fw-medium">{suggestion.label}</div>
                        <div className="small text-muted">
                          {suggestion.type === 'city' ? 'City' : 'Military Base'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
