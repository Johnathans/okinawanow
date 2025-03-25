'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart as faHeartSolid,
  faCalendarPlus,
  faMapMarkerAlt,
  faChevronLeft,
  faShield
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { Listing } from '@/types/listing';
import LoginPromptModal from '@/components/LoginPromptModal';
import ListingMap from '@/components/ListingMap';

interface ListingClientProps {
  listing: Listing;
  isLoggedIn?: boolean;
}

export default function ListingClient({ listing, isLoggedIn }: ListingClientProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalType, setLoginModalType] = useState<'favorite' | 'tour'>('favorite');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setLoginModalType('favorite');
      setShowLoginModal(true);
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleTourRequest = () => {
    if (!isLoggedIn) {
      setLoginModalType('tour');
      setShowLoginModal(true);
      return;
    }
    // Handle tour request
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="bg-white border-bottom">
        <div className="container">
          <div className="py-4">
            {/* Navigation */}
            <Link 
              href="/listings" 
              className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3"
              style={{ color: 'var(--primary-pink)', fontSize: '0.9rem' }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Back to Listings
            </Link>

            {/* Title and Location */}
            <div className="row align-items-start mb-4">
              <div className="col-lg-8">
                <h1 className="h3 mb-2">{listing.title}</h1>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink" />
                    <span>{listing.location}</span>
                  </div>
                  {listing.baseInspected && (
                    <div className="badge rounded-pill" style={{ 
                      backgroundColor: 'var(--light-pink)',
                      color: 'var(--primary-pink)',
                      padding: '6px 12px',
                      fontSize: '0.9rem'
                    }}>
                      <FontAwesomeIcon icon={faShield} className="me-1" />
                      Base Inspected
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex flex-column align-items-lg-end">
                  <div className="d-flex align-items-baseline gap-2 mb-2">
                    <h2 className="h3 mb-0">¥{listing.price.toLocaleString()}</h2>
                    <span className="text-muted">/month</span>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                    Approx. ${listing.priceUSD.toLocaleString()} USD
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <button 
                onClick={handleTourRequest}
                className="btn btn-primary d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'var(--primary-pink)',
                  border: 'none',
                  padding: '10px 20px'
                }}
              >
                <FontAwesomeIcon icon={faCalendarPlus} />
                Request Tour
              </button>
              <button 
                onClick={handleFavoriteClick}
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '42px',
                  height: '42px',
                  border: '1px solid var(--medium-pink)',
                  color: isFavorite ? 'var(--primary-pink)' : 'var(--medium-pink)',
                  backgroundColor: 'white'
                }}
              >
                <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container py-5">
        {/* Property Images */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="position-relative" style={{ height: '400px' }}>
              {listing.images && listing.images[0] && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Property Info */}
        <div className="row">
          <div className="col-lg-8">
            {/* Description */}
            <section className="mb-5">
              <h2 className="h4 mb-4">About this property</h2>
              <p>{listing.description}</p>
            </section>

            {/* Details */}
            <section className="mb-5">
              <h2 className="h4 mb-4">Property Details</h2>
              <div className="row g-4">
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Property Type</span>
                    <span className="fw-medium">{listing.listingType}</span>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Bedrooms</span>
                    <span className="fw-medium">{listing.bedrooms}</span>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Bathrooms</span>
                    <span className="fw-medium">{listing.bathrooms}</span>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Floor Area</span>
                    <span className="fw-medium">{listing.floorArea} m²</span>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Year Built</span>
                    <span className="fw-medium">{listing.yearBuilt}</span>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="d-flex flex-column">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>Available From</span>
                    <span className="fw-medium">{formatDate(listing.availableFrom)}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="mb-5">
              <h2 className="h4 mb-4">Location</h2>
              <div style={{ height: '300px' }}>
                <ListingMap 
                  listing={listing}
                  className="shadow-sm"
                />
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4">
            <div className="card p-4">
              <h3 className="h5 mb-4">Contact Agent</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows={4}></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  style={{
                    backgroundColor: 'var(--primary-pink)',
                    border: 'none'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message={`Please log in to ${loginModalType} this property`}
        actionType={loginModalType}
      />
    </main>
  );
}
