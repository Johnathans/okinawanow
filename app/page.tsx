import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faMapMarkerAlt,
    faBuilding,
    faSearch,
    faHandshake,
    faPlane,
    faShieldAlt,
    faComments
} from "@fortawesome/free-solid-svg-icons";
import FilterBar from '../components/FilterBar';
import HeroAnimation from '../components/HeroAnimation';
import HeroIllustration from '../components/HeroIllustration';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const featuredListings = [
    {
      id: 1,
      title: "Modern 3BR near Kadena",
      price: "¥180,000",
      location: "Chatan",
      image: "/images/sample1.jpg",
      images: ["/images/sample1.jpg"],
      beds: 3,
      baths: 2,
      sqm: 120,
      badge: "Military Friendly"
    },
    {
      id: 2,
      title: "Luxury 2BR Ocean View",
      price: "¥150,000",
      location: "American Village",
      image: "/images/sample2.jpg",
      images: ["/images/sample2.jpg"],
      beds: 2,
      baths: 1,
      sqm: 85,
      badge: "Pet Friendly"
    },
    {
      id: 3,
      title: "Family Home near Foster",
      price: "¥200,000",
      location: "Kitanakagusuku",
      image: "/images/sample3.jpg",
      images: ["/images/sample3.jpg"],
      beds: 4,
      baths: 2,
      sqm: 150,
      badge: "New"
    },
    {
      id: 4,
      title: "Spacious 4BR Villa",
      price: "¥220,000",
      location: "Chatan",
      image: "/images/sample1.jpg",
      images: ["/images/sample1.jpg"],
      beds: 4,
      baths: 3,
      sqm: 180,
      badge: "Military Friendly"
    },
    {
      id: 5,
      title: "Cozy 1BR with Sea View",
      price: "¥120,000",
      location: "American Village",
      image: "/images/sample2.jpg",
      images: ["/images/sample2.jpg"],
      beds: 1,
      baths: 1,
      sqm: 55,
      badge: "Great Value"
    },
    {
      id: 6,
      title: "Modern 3BR Townhouse",
      price: "¥190,000",
      location: "Ginowan",
      image: "/images/sample3.jpg",
      images: ["/images/sample3.jpg"],
      beds: 3,
      baths: 2,
      sqm: 140,
      badge: "Pet Friendly"
    }
  ];

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
            <SearchBar />

            <div className="mt-5">
              {/* Illustration Banner */}
              <div className="position-absolute bottom-0 start-50 translate-middle-x" style={{ width: '100%', maxWidth: '1200px' }}>
                <HeroIllustration />
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
                <div 
                  className="card border-0 h-100 transition-all" 
                  style={{ 
                    borderRadius: '1rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div className="position-relative">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      width={400}
                      height={300}
                      style={{ 
                        objectFit: "cover",
                        borderRadius: '1rem 1rem 0 0',
                        width: '100%'
                      }}
                    />
                    {listing.badge && (
                      <div 
                        className="position-absolute px-3 py-1 m-3"
                        style={{
                          background: 'var(--primary-pink)',
                          color: 'white',
                          borderRadius: '1rem',
                          top: 0,
                          right: 0,
                          fontSize: '0.875rem'
                        }}
                      >
                        {listing.badge}
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
                          background: 'var(--primary-pink)',
                          color: 'white',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {listing.price}
                      </div>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                      <FontAwesomeIcon 
                        icon={faMapMarkerAlt} 
                        className="me-2" 
                        style={{ color: 'var(--primary-pink)' }} 
                      />
                      {listing.location}
                    </p>
                    <div className="d-flex gap-4">
                      <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        <span>{listing.beds} Beds</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        <span>{listing.baths} Baths</span>
                      </div>
                      <div style={{ color: '#636e72' }}>
                        <span>{listing.sqm}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link 
              href="/listings"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
                padding: '1rem 2rem'
              }}
            >
              Browse All Properties
            </Link>
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
                <Link 
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
                        fill
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
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link 
              href="/city-guides"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
                padding: '1rem 2rem'
              }}
            >
              View All City Guides
            </Link>
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
                      What documents do I need to rent a property?
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
                      Utility arrangements vary by property. Most rentals do not include utilities in the base rent, but you'll receive a utility allowance as part of your OHA. 
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
                      Many properties are pet-friendly, and we clearly mark these with a "Pet Friendly" badge. Pet policies and deposits vary by property. 
                      You can use our search filters to find pet-friendly properties, and our agents can help you understand specific pet requirements and restrictions.
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
