import { type Listing, ListingStatus } from '@/types/listing';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faHeart } from '@fortawesome/free-solid-svg-icons';

interface Props {
    listing: Listing;
    onFavorite?: () => void;
    isFavorite?: boolean;
}

export default function ListingCard({ listing, onFavorite, isFavorite }: Props) {
    return (
        <div className="card h-100 border-0 shadow-sm">
            <Link 
                href={`/listings/${listing.id}`} 
                className="text-decoration-none"
            >
                <div 
                    className="position-relative" 
                    style={{ height: '240px' }}
                >
                    {listing.images && listing.images.length > 0 ? (
                        <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-top"
                        />
                    ) : (
                        <div className="w-100 h-100 bg-light rounded-top d-flex align-items-center justify-content-center">
                            <span className="text-muted">No image available</span>
                        </div>
                    )}
                    {onFavorite && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onFavorite();
                            }}
                            className="btn btn-link position-absolute top-0 end-0 m-2"
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={isFavorite ? 'text-danger' : 'text-white'}
                                size="lg"
                            />
                        </button>
                    )}
                    {listing.status === ListingStatus.Active && (
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
                            {listing.title}
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
                            ¥{listing.price.toLocaleString()}
                        </div>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                        {listing.location}
                    </p>
                    <div className="d-flex gap-4">
                        <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                            <FontAwesomeIcon icon={faBed} className="me-2" />
                            <span>{listing.bedrooms} Beds</span>
                        </div>
                        <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                            <FontAwesomeIcon icon={faBath} className="me-2" />
                            <span>{listing.bathrooms} Baths</span>
                        </div>
                        {listing.floorArea && (
                            <div style={{ color: '#636e72' }}>
                                <span>{listing.floorArea}m²</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
