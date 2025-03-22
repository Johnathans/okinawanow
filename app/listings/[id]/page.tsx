'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart as faHeartSolid,
  faCalendarPlus,
  faMapMarkerAlt,
  faChevronLeft,
  faCheckCircle,
  faPhone,
  faEnvelope,
  faShare,
  faCar,
  faDog,
  faSnowflake,
  faKey,
  faBuilding,
  faShield,
  faUtensils,
  faWifi,
  faLock,
  faParking,
  faBed,
  faBath,
  faRuler,
  faCalendar,
  faMoneyBill,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Property, PropertyType, PetPolicy } from '@/types/property';
import LoginPromptModal from '@/components/LoginPromptModal';
import PropertyMap from '@/components/PropertyMap';

interface ListingPageProps {
  params: { id: string };
  isLoggedIn?: boolean;
}

export default function ListingPage({ params, isLoggedIn }: ListingPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalType, setLoginModalType] = useState<'favorite' | 'tour'>('favorite');
  const [isFavorite, setIsFavorite] = useState(false);

  // TODO: Fetch actual listing data
  const listing: Property = {
    id: params.id,
    propertyId: params.id,
    title: "Modern 3BR House near Kadena",
    description: "Beautiful modern house perfect for military families. Recently renovated with new appliances and fixtures. Spacious living areas and a modern kitchen. Close to Kadena Air Base and local amenities.",
    price: 180000,
    priceUSD: 1200,
    propertyType: PropertyType.House,
    status: 'active',
    negotiable: true,
    bedrooms: 3,
    bathrooms: 2,
    floorArea: 120,
    parkingSpaces: 2,
    yearBuilt: 2020,
    availableFrom: '2025-04-01',
    leaseTerm: '1 year',
    location: "1-2-3 Chatan, Nakagami District",
    city: "Chatan",
    nearestBase: "Kadena Air Base",
    baseInspected: true,
    baseProximity: [
      { baseName: "Kadena Air Base", distanceKm: 2.5, shuttleAvailable: true },
      { baseName: "Camp Foster", distanceKm: 4.8, shuttleAvailable: false }
    ],
    moveInCosts: {
      deposit: 1,
      keyMoney: 1,
      agencyFee: 0.5,
      guarantorFee: 0.5
    },
    utilitiesIncluded: false,
    petPolicy: [PetPolicy.DogsAllowed, PetPolicy.CatsAllowed],
    interiorAmenities: ['Air Conditioning', 'Washer/Dryer', 'Storage', 'Hardwood Floors'],
    bathroomAmenities: ['Unit Bath', 'Toilet with Washlet'],
    kitchenAmenities: ['Full Kitchen', 'IH Stove', 'Dishwasher', 'Refrigerator'],
    buildingAmenities: ['Auto-lock', 'Bicycle Parking'],
    utilityAmenities: ['Internet Ready', 'Cable Ready'],
    securityAmenities: ['Security Camera', 'Double Lock'],
    locationFeatures: ['Near Supermarket', 'Near Park', 'Safe Neighborhood'],
    images: [
      "/images/listing1.jpg",
      "/images/listing2.jpg",
      "/images/listing3.jpg",
      "/images/listing4.jpg"
    ],
    floorPlan: "/images/floorplan.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "agency1"
  };

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

            {/* Image Gallery */}
            <div className="row g-3">
              {/* Main Image */}
              <div className="col-lg-7">
                <div 
                  className="position-relative rounded-4 overflow-hidden" 
                  style={{ 
                    height: '480px',
                    backgroundColor: 'var(--light-pink)'
                  }}
                >
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>
              {/* Side Images */}
              <div className="col-lg-5">
                <div className="row g-3">
                  {listing.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="col-6">
                      <div 
                        className="position-relative rounded-4 overflow-hidden" 
                        style={{ 
                          height: '230px',
                          backgroundColor: 'var(--light-pink)'
                        }}
                      >
                        <Image
                          src={image}
                          alt={`${listing.title} - Image ${index + 2}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container">
        <div className="py-5">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Key Info */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <div className="row g-4">
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <FontAwesomeIcon icon={faMoneyBill} className="text-pink" size="lg" />
                      <div className="small text-muted">Monthly Rent</div>
                      <div>
                        <div className="fw-bold">¥{listing.price.toLocaleString()}</div>
                        <div className="small text-muted">${listing.priceUSD.toLocaleString()} USD</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <FontAwesomeIcon icon={faBed} className="text-pink" size="lg" />
                      <div className="small text-muted">Bedrooms</div>
                      <div className="fw-bold">{listing.bedrooms}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <FontAwesomeIcon icon={faBath} className="text-pink" size="lg" />
                      <div className="small text-muted">Bathrooms</div>
                      <div className="fw-bold">{listing.bathrooms}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <FontAwesomeIcon icon={faRuler} className="text-pink" size="lg" />
                      <div className="small text-muted">Floor Area</div>
                      <div className="fw-bold">{listing.floorArea}m²</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h3 className="h5 mb-3">About this Property</h3>
                <p className="text-muted mb-0" style={{ whiteSpace: 'pre-line' }}>
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h3 className="h5 mb-4">Amenities & Features</h3>
                <div className="row g-4">
                  {listing.interiorAmenities.length > 0 && (
                    <div className="col-md-6">
                      <h4 className="h6 mb-3">Interior</h4>
                      <ul className="list-unstyled mb-0">
                        {listing.interiorAmenities.map(amenity => (
                          <li key={amenity} className="d-flex align-items-center gap-2 mb-2">
                            <div className="rounded-circle p-1" style={{ backgroundColor: 'var(--light-pink)' }}>
                              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--primary-pink)' }} size="sm" />
                            </div>
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {listing.kitchenAmenities.length > 0 && (
                    <div className="col-md-6">
                      <h4 className="h6 mb-3">Kitchen</h4>
                      <ul className="list-unstyled mb-0">
                        {listing.kitchenAmenities.map(amenity => (
                          <li key={amenity} className="d-flex align-items-center gap-2 mb-2">
                            <div className="rounded-circle p-1" style={{ backgroundColor: 'var(--light-pink)' }}>
                              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--primary-pink)' }} size="sm" />
                            </div>
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h3 className="h5 mb-4">Location</h3>
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink" />
                    <span className="fw-medium">{listing.location}</span>
                  </div>
                  {listing.nearestBase && (
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <FontAwesomeIcon icon={faShield} />
                      <span>Near {listing.nearestBase}</span>
                    </div>
                  )}
                </div>
                <PropertyMap 
                  location={listing.city}
                  className="rounded-4 border"
                  style={{ height: '300px' }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div style={{ position: 'relative' }}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="card-body p-4">
                    <h3 className="h5 mb-4">Contact Agent</h3>
                    <form className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small text-muted">Name</label>
                        <input type="text" className="form-control" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="form-label small text-muted">Email</label>
                        <input type="email" className="form-control" placeholder="Your email" />
                      </div>
                      <div>
                        <label className="form-label small text-muted">Phone</label>
                        <input type="tel" className="form-control" placeholder="Your phone number" />
                      </div>
                      <div>
                        <label className="form-label small text-muted">Message</label>
                        <textarea 
                          className="form-control" 
                          rows={4}
                          placeholder="I'm interested in this property and would like to schedule a viewing."
                        ></textarea>
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

                <div className="card border-0 shadow-sm rounded-4 mt-4">
                  <div className="card-body p-4">
                    <h3 className="h5 mb-4">Quick Facts</h3>
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center gap-3 mb-3">
                        <FontAwesomeIcon icon={faHome} className="text-pink" />
                        <div>
                          <div className="small text-muted">Property Type</div>
                          <div className="fw-medium">{listing.propertyType}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3 mb-3">
                        <FontAwesomeIcon icon={faCalendar} className="text-pink" />
                        <div>
                          <div className="small text-muted">Available From</div>
                          <div className="fw-medium">{formatDate(listing.availableFrom)}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3 mb-3">
                        <FontAwesomeIcon icon={faHandshake} className="text-pink" />
                        <div>
                          <div className="small text-muted">Lease Term</div>
                          <div className="fw-medium">{listing.leaseTerm}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3">
                        <FontAwesomeIcon icon={faWifi} className="text-pink" />
                        <div>
                          <div className="small text-muted">Utilities</div>
                          <div className="fw-medium">
                            {listing.utilitiesIncluded ? 'Included in rent' : 'Not included'}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="bg-light">
        <div className="container">
          <div className="py-5">
            <h2 className="h4 mb-4">Similar Properties</h2>
            {/* Similar properties content */}
          </div>
        </div>
      </div>

      {/* Login Modal */}
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
    </main>
  );
}
