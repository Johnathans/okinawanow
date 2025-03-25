'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHome, faInfoCircle, faCamera, faBus, faUtensils } from '@fortawesome/free-solid-svg-icons';
import type { City } from '@/types/city';

interface CityGuideLayoutProps {
    city: City;
    children: React.ReactNode;
}

export default function CityGuideLayout({ city, children }: CityGuideLayoutProps) {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: faInfoCircle },
        { id: 'properties', label: 'Properties', icon: faHome },
        { id: 'attractions', label: 'Attractions', icon: faCamera },
        { id: 'transport', label: 'Transport', icon: faBus },
        { id: 'dining', label: 'Dining', icon: faUtensils }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="position-relative" style={{ height: '400px' }}>
                <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ 
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))'
                    }}
                />
                <div className="container position-relative h-100">
                    <div className="position-absolute bottom-0 text-white pb-4">
                        <div className="d-flex align-items-center mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            <Link href="/city-guides" className="text-white text-decoration-none">
                                City Guides
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{city.name}</span>
                        </div>
                        <h1 className="display-4 fw-bold mb-2">{city.name}</h1>
                        <p className="lead mb-0" style={{ maxWidth: '600px' }}>
                            {city.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-bottom" style={{ backgroundColor: 'var(--light-pink)' }}>
                <div className="container">
                    <div className="d-flex overflow-auto py-2" style={{ gap: '1rem' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`btn border-0 px-4 py-2 rounded-pill ${
                                    activeTab === tab.id 
                                        ? 'text-white'
                                        : 'text-muted'
                                }`}
                                style={{
                                    backgroundColor: activeTab === tab.id 
                                        ? 'var(--primary-pink)'
                                        : 'transparent',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FontAwesomeIcon icon={tab.icon} className="me-2" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container py-5">
                {children}
            </div>
        </div>
    );
}
