import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faYen } from "@fortawesome/free-solid-svg-icons";
import { Property } from "@/types/property";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link 
            href={`/properties/${property.id}`} 
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
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        style={{ 
                            objectFit: "cover",
                            borderRadius: '1rem 1rem 0 0'
                        }}
                    />
                    {property.available && (
                        <div 
                            className="position-absolute px-3 py-1 m-3"
                            style={{
                                background: 'rgba(231, 93, 124, 0.9)',
                                color: 'white',
                                borderRadius: '1rem',
                                top: 0,
                                right: 0,
                                fontSize: '0.875rem'
                            }}
                        >
                            Available
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h5 mb-0" style={{ color: '#2d3436' }}>
                            {property.title}
                        </h3>
                        <div 
                            className="ms-2 px-3 py-1 rounded-pill" 
                            style={{ 
                                background: 'var(--light-pink)',
                                color: 'var(--primary-pink)',
                                fontSize: '0.875rem',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            ¥{property.price.toLocaleString()}
                        </div>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                        {property.location}
                    </p>
                    <div className="d-flex gap-4">
                        <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                            <FontAwesomeIcon icon={faBed} className="me-2" />
                            <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                            <FontAwesomeIcon icon={faBath} className="me-2" />
                            <span>{property.bathrooms} Baths</span>
                        </div>
                        {property.squareMeters && (
                            <div style={{ color: '#636e72' }}>
                                <span>{property.squareMeters}m²</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
