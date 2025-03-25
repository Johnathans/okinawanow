import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import SearchBar from "@/components/SearchBar";
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Listing } from '@/types/listing';
import Link from 'next/link';

export default async function Home() {
  // Fetch featured listings from Firestore
  const q = query(collection(db, 'listings'), limit(6));
  const snapshot = await getDocs(q);
  const featuredListings = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Listing[];

  const neighborhoods = [
    {
      name: "Chatan",
      description: "Popular area near American Village",
      image: "/images/cityhero.jpg",
      properties: 24
    },
    {
      name: "Kadena",
      description: "Close to Kadena Air Base",
      image: "/images/cityhero.jpg",
      properties: 18
    },
    {
      name: "Foster",
      description: "Near Camp Foster",
      image: "/images/cityhero.jpg",
      properties: 15
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <div 
        className="py-5 mb-5" 
        style={{ 
          background: 'var(--light-pink)',
          minHeight: '500px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0 0 40px 40px'
        }}
      >
        <div className="container">
          <div className="text-center py-5">
            <h1 className="display-4 fw-black mb-4" style={{ color: 'var(--dark-grey)', fontWeight: 900 }}>
              Find your home in Okinawa.
            </h1>
            <p className="lead fw-bolder mb-5" style={{ fontSize: '1.3rem', color: 'var(--dark-grey)', opacity: 0.9, fontWeight: 700 }}>
              Find and reserve military-friendly housing in minutes.
            </p>
            
            {/* Filter Tabs */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <button 
                className="btn px-4 py-2" 
                style={{ 
                  background: 'var(--primary-pink)', 
                  color: 'white',
                  borderRadius: '8px'
                }}
              >
                All Properties
              </button>
              <button 
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px'
                }}
              >
                Military-Approved
              </button>
              <button 
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px'
                }}
              >
                Pet-Friendly
              </button>
              <button 
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px'
                }}
              >
                Near Bases
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-5">
              <SearchBar />
              {/* Illustration Banner */}
              <div className="position-absolute bottom-0 start-50 translate-middle-x" style={{ width: '100%', maxWidth: '1200px' }}>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-2">Featured Properties</h2>
            <p className="text-muted mb-0">Discover our handpicked selection of military-friendly homes</p>
          </div>
          <div className="row g-4">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="col-md-6 col-lg-4">
                <Link href={`/listings/${listing.id}`} className="text-decoration-none">
                  <div 
                    className="card border-0 h-100 transition-all" 
                    style={{ 
                      borderRadius: '1rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <div style={{ position: 'relative', paddingTop: '66.67%' }}>
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        style={{ 
                          objectFit: 'cover',
                          borderRadius: '1rem 1rem 0 0'
                        }}
                      />
                      {listing.baseInspected && (
                        <span 
                          className="badge bg-success position-absolute"
                          style={{ top: '1rem', right: '1rem' }}
                        >
                          Military Approved
                        </span>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="mb-2 text-dark">{listing.title}</h5>
                      <p className="h5 mb-3 text-primary">¥{listing.price.toLocaleString()}</p>
                      <div className="d-flex align-items-center text-muted mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted">
                        <span>{listing.bedrooms} Beds</span>
                        <span>{listing.bathrooms} Baths</span>
                        <span>{listing.squareMeters}m²</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a 
              href="/listings"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
                padding: '1rem 2rem'
              }}
            >
              Browse All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-2">Featured City Guides</h2>
            <p className="text-muted mb-0">Explore the most popular areas for military families in Okinawa</p>
          </div>
          <div className="row g-4">
            {neighborhoods.map((neighborhood, index) => (
              <div key={index} className="col-md-4">
                <a 
                  href={`/neighborhoods/${neighborhood.name.toLowerCase()}`}
                  className="text-decoration-none"
                >
                  <div 
                    className="card border-0 h-100 transition-all" 
                    style={{ 
                      borderRadius: '1rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <div className="position-relative" style={{ height: '240px' }}>
                      <Image
                        src={neighborhood.image}
                        alt={neighborhood.name}
                        width={400}
                        height={240}
                        style={{ 
                          objectFit: "cover",
                          borderRadius: '1rem 1rem 0 0'
                        }}
                      />
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="h5 mb-0" style={{ color: '#2d3436' }}>
                          {neighborhood.name}
                        </h3>
                        <div 
                          className="ms-2 px-3 py-1 rounded-pill" 
                          style={{ 
                            background: 'var(--light-purple)',
                            color: 'var(--primary-purple)',
                            fontSize: '0.875rem'
                          }}
                        >
                          {neighborhood.properties} Properties
                        </div>
                      </div>
                      <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                        {neighborhood.description}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a 
              href="/city-guides"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
                padding: '1rem 2rem'
              }}
            >
              View All City Guides
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-2" style={{ color: '#e75d7c' }}>Frequently Asked Questions</h2>
            <p className="text-muted mb-0">Everything you need to know about finding housing in Okinawa</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 mb-3 rounded-3" style={{ background: 'white', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                      style={{ background: 'white' }}
                    >
                      How does OHA (Overseas Housing Allowance) work in Okinawa?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      OHA is provided to service members to help cover housing costs in Okinawa. The amount varies based on rank and dependency status. 
                      All properties listed on our platform are OHA-approved and come with proper documentation for military housing office requirements.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3" style={{ background: 'white', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                      style={{ background: 'white' }}
                    >
                      What documents do I need to rent a listing?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Typically, you'll need your military ID, orders to Okinawa, passport, and completed housing forms. Our partner agencies will guide you through 
                      the process and help prepare all necessary documentation for the military housing office.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3" style={{ background: 'white', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                      style={{ background: 'white' }}
                    >
                      Are utilities included in the rent?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Utility arrangements vary by listing. Most rentals do not include utilities in the base rent, but you'll receive a utility allowance as part of your OHA. 
                      Our listings clearly indicate which utilities are included, and our agents can help you understand typical utility costs in each area.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3" style={{ background: 'white', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                      style={{ background: 'white' }}
                    >
                      How far in advance should I start looking for housing?
                    </button>
                  </h3>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We recommend starting your search 2-3 months before your PCS date. This gives you time to explore different areas, schedule viewings, and complete all necessary 
                      paperwork. Many of our partner agencies can arrange virtual tours if you're searching from overseas.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3" style={{ background: 'white', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq5"
                      style={{ background: 'white' }}
                    >
                      Are the listings pet-friendly?
                    </button>
                  </h3>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Many listings are pet-friendly, and we clearly mark these with a "Pet Friendly" badge. Pet policies and deposits vary by listing. 
                      You can use our search filters to find pet-friendly listings, and our agents can help you understand specific pet requirements and restrictions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
