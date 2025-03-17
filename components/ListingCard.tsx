'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { Property } from '@/types/property';
import LoginPromptModal from './LoginPromptModal';

interface ListingCardProps {
  listing: Property;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  isLoggedIn?: boolean;
}

export default function ListingCard({ listing, isFavorite, onFavoriteClick, isLoggedIn }: ListingCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalType, setLoginModalType] = useState<'favorite' | 'tour'>('favorite');

  const handleTourRequest = () => {
    if (!isLoggedIn) {
      setLoginModalType('tour');
      setShowLoginModal(true);
      return;
    }
    // Handle tour request for logged in users
  };

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setLoginModalType('favorite');
      setShowLoginModal(true);
      return;
    }
    onFavoriteClick();
  };

  return (
    <>
      <div 
        className="card border-0 h-100 shadow-sm" 
        style={{ 
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
        }}
      >
        {/* Image Container */}
        <div className="position-relative">
          <Link href={`/listings/${listing.id}`}>
            <div style={{ height: '200px', position: 'relative' }}>
              <Image
                src={listing.images[0] || '/images/placeholder.jpg'}
                alt={listing.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-top"
              />
            </div>
          </Link>
          
          {/* Action Buttons */}
          <div 
            className="position-absolute d-flex gap-2"
            style={{ 
              top: '10px', 
              right: '10px',
              zIndex: 2
            }}
          >
            {/* Tour Request Button */}
            <button
              onClick={handleTourRequest}
              className="btn btn-light d-flex align-items-center justify-content-center"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid var(--medium-pink)',
                color: 'var(--primary-pink)',
                padding: 0,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--light-pink)';
                e.currentTarget.style.borderColor = 'var(--primary-pink)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = 'var(--medium-pink)';
              }}
            >
              <FontAwesomeIcon icon={faCalendarPlus} style={{ fontSize: '1rem' }} />
            </button>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="btn btn-light d-flex align-items-center justify-content-center"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid var(--medium-pink)',
                color: isFavorite ? 'var(--primary-pink)' : 'var(--medium-pink)',
                padding: 0,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--light-pink)';
                e.currentTarget.style.borderColor = 'var(--primary-pink)';
                e.currentTarget.style.color = 'var(--primary-pink)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = 'var(--medium-pink)';
                if (!isFavorite) {
                  e.currentTarget.style.color = 'var(--medium-pink)';
                }
              }}
            >
              <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} style={{ fontSize: '1rem' }} />
            </button>
          </div>

          {/* Price Tag */}
          <div 
            className="position-absolute"
            style={{ 
              bottom: '10px', 
              left: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: 'var(--primary-pink)'
            }}
          >
            ¥{listing.price.toLocaleString()}
          </div>
        </div>

        {/* Card Body */}
        <Link 
          href={`/listings/${listing.id}`}
          className="text-decoration-none"
        >
          <div className="card-body">
            <h5 className="card-title mb-2 text-dark" style={{ fontSize: '1.1rem' }}>
              {listing.title}
            </h5>
            <p className="card-text text-muted mb-2" style={{ fontSize: '0.9rem' }}>
              {listing.location}
            </p>
            <div className="d-flex gap-3" style={{ fontSize: '0.9rem' }}>
              <span className="text-muted">{listing.bedrooms} Beds</span>
              <span className="text-muted">{listing.bathrooms} Baths</span>
              <span className="text-muted">{listing.floorArea}m²</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message={
          loginModalType === 'favorite'
            ? 'Log in to save this property to your favorites and get updates about similar properties.'
            : 'Log in to request a tour of this property and get in touch with our agents.'
        }
        actionType={loginModalType}
      />
    </>
  );
}
