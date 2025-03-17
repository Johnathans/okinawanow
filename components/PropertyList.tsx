'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faYen } from '@fortawesome/free-solid-svg-icons';

// This would come from your database/API
const properties = {
    chatan: [
        {
            id: 'chatan-1',
            title: 'Modern Apartment near American Village',
            description: 'Spacious 2-bedroom apartment with ocean views, fully furnished and recently renovated.',
            image: '/images/properties/chatan-1.jpg',
            price: 150000,
            bedrooms: 2,
            bathrooms: 1,
            size: 75, // square meters
            available: true
        },
        {
            id: 'chatan-2',
            title: 'Family Home in Quiet Area',
            description: 'Beautiful 3-bedroom house with garden, perfect for families, close to international schools.',
            image: '/images/properties/chatan-2.jpg',
            price: 200000,
            bedrooms: 3,
            bathrooms: 2,
            size: 120,
            available: true
        },
        {
            id: 'chatan-3',
            title: 'Beachfront Studio',
            description: 'Cozy studio apartment with direct beach access, modern amenities, and stunning sunset views.',
            image: '/images/properties/chatan-3.jpg',
            price: 120000,
            bedrooms: 1,
            bathrooms: 1,
            size: 45,
            available: true
        }
    ],
    // Add other cities...
};

interface PropertyListProps {
    cityId: string;
    limit?: number;
}

export default function PropertyList({ cityId, limit = 3 }: PropertyListProps) {
    const cityProperties = properties[cityId as keyof typeof properties] || [];
    const displayProperties = cityProperties.slice(0, limit);

    if (displayProperties.length === 0) {
        return (
            <div className="text-center py-4 text-muted">
                No properties available at the moment.
            </div>
        );
    }

    return (
        <div className="row g-4">
            {displayProperties.map((property) => (
                <div key={property.id} className="col-md-6 col-lg-4">
                    <Link 
                        href={`/listings/${property.id}`}
                        className="card h-100 border-0 text-decoration-none shadow-sm rounded-4"
                        style={{
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        <div 
                            className="position-relative rounded-top-4"
                            style={{ height: '200px' }}
                        >
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-top-4"
                            />
                            <div 
                                className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill"
                                style={{ 
                                    backgroundColor: 'var(--primary-pink)',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            >
                                ¥{property.price.toLocaleString()}/month
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <h3 className="h6 mb-2" style={{ color: 'var(--dark-grey)' }}>
                                {property.title}
                            </h3>
                            <p className="text-muted small mb-3">
                                {property.description}
                            </p>
                            <div className="d-flex gap-3 text-muted" style={{ fontSize: '0.9rem' }}>
                                <div>
                                    <FontAwesomeIcon icon={faBed} className="me-1" />
                                    {property.bedrooms}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faBath} className="me-1" />
                                    {property.bathrooms}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faRuler} className="me-1" />
                                    {property.size}m²
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
