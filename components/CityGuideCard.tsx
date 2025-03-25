'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { City } from "@/types/city";

interface CityGuideCardProps {
    city: City;
}

export default function CityGuideCard({ city }: CityGuideCardProps) {
    return (
        <Link 
            href={`/city-guides/${city.id}`}
            className="card h-100 border-0 text-decoration-none"
            style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
        >
            <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                    <div 
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'var(--light-pink)'
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faMapMarkerAlt}
                            style={{ 
                                fontSize: '20px',
                                color: 'var(--primary-pink)'
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="h5 mb-1" style={{ color: 'var(--dark-grey)' }}>
                            {city.name}
                        </h3>
                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                            {city.propertyCount} Listings
                        </div>
                    </div>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                    {city.description}
                </p>
                <div className="d-flex align-items-center" style={{ color: 'var(--primary-pink)' }}>
                    <span style={{ fontSize: '0.9rem' }}>View City Guide</span>
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2" style={{ fontSize: '0.8rem' }} />
                </div>
            </div>
        </Link>
    );
}
