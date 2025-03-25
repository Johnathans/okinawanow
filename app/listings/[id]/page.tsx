import { Listing, ListingType, PetPolicy, ListingStatus } from '@/types/listing';
import Image from 'next/image';

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: Fetch actual listing data from your database
  const listing: Listing = {
    id: params.id,
    listingId: params.id,
    title: "Modern 3BR House near Kadena",
    description: "Beautiful modern house perfect for military families. Recently renovated with new appliances and fixtures. Spacious living areas and a modern kitchen. Close to Kadena Air Base and local amenities.",
    price: 180000,
    priceUSD: 1200,
    listingType: ListingType.House,
    status: ListingStatus.Active,
    negotiable: true,
    available: true,
    featured: false,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoggedIn = true; // Will be used for future auth implementation

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="bg-white border-bottom">
        <div className="container">
          <div className="py-4">
            {/* Navigation */}
            <a 
              href="/listings" 
              className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3"
              style={{ color: 'var(--primary-pink)', fontSize: '0.9rem' }}
            >
              <i className="fa-solid fa-chevron-left"></i>
              Back to Listings
            </a>

            {/* Title and Location */}
            <div className="row align-items-start mb-4">
              <div className="col-lg-8">
                <h1 className="h3 mb-2">{listing.title}</h1>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-map-marker-alt text-pink"></i>
                    <span>{listing.location}</span>
                  </div>
                  {listing.baseInspected && (
                    <div className="badge rounded-pill" style={{ 
                      backgroundColor: 'var(--light-pink)',
                      color: 'var(--primary-pink)',
                      padding: '6px 12px',
                      fontSize: '0.9rem'
                    }}>
                      <i className="fa-solid fa-shield me-1"></i>
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
                className="btn btn-primary d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'var(--primary-pink)',
                  border: 'none',
                  padding: '10px 20px'
                }}
              >
                <i className="fa-solid fa-calendar-plus"></i>
                Request Tour
              </button>
              <button 
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '42px',
                  height: '42px',
                  border: '1px solid var(--medium-pink)',
                  color: 'var(--medium-pink)',
                  backgroundColor: 'white'
                }}
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>

            {/* Image Gallery */}
            <div className="row g-3">
              {/* Main Image */}
              <div className="col-lg-7">
                <div className="relative w-full h-[400px] mb-4">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
              {/* Side Images */}
              <div className="col-lg-5">
                <div className="row g-3">
                  {listing.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="col-6">
                      <div className="relative w-full h-[200px]">
                        <Image
                          src={image}
                          alt={`${listing.title} image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
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
                      <i className="fa-solid fa-money-bill text-pink fa-lg"></i>
                      <div className="small text-muted">Monthly Rent</div>
                      <div>
                        <div className="fw-bold">¥{listing.price.toLocaleString()}</div>
                        <div className="small text-muted">${listing.priceUSD.toLocaleString()} USD</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <i className="fa-solid fa-bed text-pink fa-lg"></i>
                      <div className="small text-muted">Bedrooms</div>
                      <div className="fw-bold">{listing.bedrooms}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <i className="fa-solid fa-bath text-pink fa-lg"></i>
                      <div className="small text-muted">Bathrooms</div>
                      <div className="fw-bold">{listing.bathrooms}</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <i className="fa-solid fa-ruler text-pink fa-lg"></i>
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
                              <i className="fa-solid fa-check-circle text-pink fa-sm"></i>
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
                              <i className="fa-solid fa-check-circle text-pink fa-sm"></i>
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
                    <i className="fa-solid fa-map-marker-alt text-pink"></i>
                    <span className="fw-medium">{listing.location}</span>
                  </div>
                  {listing.nearestBase && (
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <i className="fa-solid fa-shield"></i>
                      <span>Near {listing.nearestBase}</span>
                    </div>
                  )}
                </div>
                <div 
                  className="rounded-4 border"
                  style={{ 
                    height: '300px',
                    width: '100%'
                  }}
                >
                  Map
                </div>
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
                        <i className="fa-solid fa-home text-pink"></i>
                        <div>
                          <div className="small text-muted">Property Type</div>
                          <div className="fw-medium">{listing.listingType}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3 mb-3">
                        <i className="fa-solid fa-calendar text-pink"></i>
                        <div>
                          <div className="small text-muted">Available From</div>
                          <div className="fw-medium">{new Date(listing.availableFrom).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3 mb-3">
                        <i className="fa-solid fa-handshake text-pink"></i>
                        <div>
                          <div className="small text-muted">Lease Term</div>
                          <div className="fw-medium">{listing.leaseTerm}</div>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3">
                        <i className="fa-solid fa-wifi text-pink"></i>
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
    </main>
  );
}
