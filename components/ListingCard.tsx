import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Property } from '@/types/property';

interface ListingCardProps {
  listing: Property;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function ListingCard({ listing, onFavorite, isFavorite }: ListingCardProps) {
  const handleFavoriteClick = useCallback(() => {
    onFavorite?.(listing.id);
  }, [listing.id, onFavorite]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(listing.price);
  }, [listing.price]);

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          width={400}
          height={300}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '200px' }}
        />
        {onFavorite && (
          <button
            className={`btn position-absolute top-0 end-0 m-2 ${
              isFavorite ? 'btn-primary' : 'btn-outline-light'
            }`}
            onClick={handleFavoriteClick}
          >
            ♥
          </button>
        )}
      </div>
      <div className="card-body">
        <Link href={`/listings/${listing.id}`} className="text-decoration-none">
          <h5 className="card-title text-dark mb-1">{listing.title}</h5>
        </Link>
        <div className="d-flex align-items-center mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-1" />
          <small className="text-muted">{listing.location}</small>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="h5 mb-0 text-primary">{formattedPrice}</span>
          <small className="text-muted">/month</small>
        </div>
        <div className="d-flex justify-content-between border-top pt-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBed} className="text-muted me-1" />
            <small className="text-muted">{listing.bedrooms} beds</small>
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBath} className="text-muted me-1" />
            <small className="text-muted">{listing.bathrooms} baths</small>
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faRuler} className="text-muted me-1" />
            <small className="text-muted">{listing.floorArea}m²</small>
          </div>
        </div>
      </div>
    </div>
  );
}
