'use client';

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { City } from "@/types/city";

interface CityCardProps {
    city: City;
}

export default function CityCard({ city }: CityCardProps) {
    return (
        <Link 
            href={`/city-guides/${city.id}`}
            className="text-decoration-none"
        >
            <div 
                className="card border-0 h-100 transition-all" 
                style={{ 
                    borderRadius: '1rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease-in-out'
                }}
                onMouseOver={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = 'translateY(-4px)';
                    card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
            >
                <div className="position-relative" style={{ height: '240px' }}>
                    <Image
                        src={city.image}
                        alt={city.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ 
                            objectFit: "cover",
                            borderRadius: '1rem 1rem 0 0'
                        }}
                    />
                </div>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h2 className="h4 mb-0" style={{ color: '#2d3436' }}>
                            {city.name}
                        </h2>
                        <div 
                            className="ms-2 px-3 py-1 rounded-pill" 
                            style={{ 
                                background: 'var(--light-pink)',
                                color: 'var(--primary-pink)',
                                fontSize: '0.875rem',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FontAwesomeIcon icon={faHome} className="me-2" />
                            {city.propertyCount} Listings
                        </div>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                        {city.description}
                    </p>
                    <div className="d-flex align-items-center mt-3" style={{ color: 'var(--primary-pink)' }}>
                        <span className="me-2">Explore Guide</span>
                        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.875rem' }} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
