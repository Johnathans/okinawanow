'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { City } from "@/types/city";

interface CityListProps {
    cities: City[];
}

export default function CityList({ cities }: CityListProps) {
    return (
        <div className="d-grid gap-3">
            {cities.map((city) => (
                <Link 
                    key={city.id}
                    href={`/city-guides/${city.id}`}
                    className="d-flex align-items-center p-3 text-decoration-none rounded-3 transition-all"
                    style={{
                        backgroundColor: 'white',
                        transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.backgroundColor = 'white';
                    }}
                >
                    <div 
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--light-pink)'
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faMapMarkerAlt} 
                            style={{ color: 'var(--primary-pink)' }}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <div className="fw-medium" style={{ color: 'var(--dark-grey)' }}>
                            {city.name}
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                            {city.propertyCount} Listings
                        </div>
                    </div>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="ms-2"
                        style={{ 
                            color: 'var(--primary-pink)',
                            fontSize: '0.875rem'
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
