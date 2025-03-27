import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHome,
  faHouseLaptop,
  faBuilding,
  faHouse,
  faCity,
  faLocationDot,
  faPlane,
  faShip,
  faFighterJet,
  faHelicopter,
  faUsers,
  faUserShield,
  faMedal,
  faKey,
  faCoins,
  faHandshake
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
        {/* Background Pattern */}
        <div 
          className="position-absolute" 
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(var(--primary-pink) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.1,
            zIndex: 0
          }}
        ></div>
        
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="text-center py-5">
            <h1 className="display-4 fw-black mb-4" style={{ color: 'var(--dark-grey)', fontWeight: 900 }}>
              Find your home in Okinawa.
            </h1>
            <p className="lead fw-bolder mb-5" style={{ fontSize: '1.3rem', color: 'var(--dark-grey)', opacity: 0.9, fontWeight: 700 }}>
              Find and reserve military-friendly housing in minutes.
            </p>
            
            {/* Filter Tabs */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <Link 
                href="/listings"
                className="btn px-4 py-2" 
                style={{ 
                  background: 'var(--primary-pink)', 
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                All Properties
              </Link>
              <Link 
                href="/listings?features=ocean-view"
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Ocean View
              </Link>
              <Link 
                href="/listings?features=pet-friendly"
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Pet Friendly
              </Link>
              <Link 
                href="/listings?near=camp-foster"
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Near Camp Foster
              </Link>
              <Link 
                href="/listings?near=kadena-air-base"
                className="btn px-4 py-2" 
                style={{ 
                  border: '1px solid var(--primary-pink)', 
                  color: 'var(--primary-pink)',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Near KAB
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mt-5 mb-5">
              <SearchBar />
            </div>
            
            {/* Illustration Banner - Below Search Bar */}
            <div className="position-relative" style={{ height: '80px', marginTop: '2rem' }}>
              {/* Cityscape silhouette */}
              <div className="position-absolute bottom-0 w-100" style={{ height: '80px' }}>
                <div style={{ 
                  maxWidth: '1400px', 
                  margin: '0 auto', 
                  position: 'relative',
                  height: '100%'
                }}>
                  {/* Traditional Japanese House */}
                  <div className="position-absolute" style={{ 
                    left: '5%', 
                    bottom: 0,
                    width: '60px',
                    height: '30px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Roof */}
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '-10px',
                      width: '80px',
                      height: '25px',
                      borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                      backgroundColor: 'var(--primary-pink)',
                      opacity: 0.5,
                      boxShadow: '0 -1px 3px rgba(0,0,0,0.1)'
                    }}></div>
                  </div>
                  
                  {/* Modern House */}
                  <div className="position-absolute" style={{ 
                    left: '18%', 
                    bottom: 0,
                    width: '50px',
                    height: '35px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Roof */}
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-5px',
                      width: '60px',
                      height: '20px',
                      clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                      backgroundColor: 'var(--primary-pink)',
                      opacity: 0.5,
                      filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.1))'
                    }}></div>
                    {/* Window */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: '15px',
                      height: '15px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    {/* Door */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '10px',
                      width: '12px',
                      height: '20px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                  </div>
                  
                  {/* Apartment Building */}
                  <div className="position-absolute" style={{ 
                    left: '32%', 
                    bottom: 0,
                    width: '70px',
                    height: '65px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Windows - Row 1 */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '30px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '50px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    {/* Windows - Row 2 */}
                    <div style={{
                      position: 'absolute',
                      top: '30px',
                      left: '10px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '30px',
                      left: '30px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '30px',
                      left: '50px',
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    {/* Door */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '25px',
                      width: '20px',
                      height: '15px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                  </div>
                  
                  {/* Military Base Building */}
                  <div className="position-absolute" style={{ 
                    left: '50%', 
                    bottom: 0,
                    width: '80px',
                    height: '40px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Flat Roof */}
                    <div style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '-5px',
                      width: '90px',
                      height: '5px',
                      backgroundColor: 'var(--primary-pink)',
                      opacity: 0.5,
                      boxShadow: '0 -1px 3px rgba(0,0,0,0.1)'
                    }}></div>
                    {/* Windows */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      width: '15px',
                      height: '15px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      width: '15px',
                      height: '15px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                  </div>
                  
                  {/* Traditional House */}
                  <div className="position-absolute" style={{ 
                    left: '68%', 
                    bottom: 0,
                    width: '55px',
                    height: '30px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Roof */}
                    <div style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '-5px',
                      width: '65px',
                      height: '18px',
                      clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                      backgroundColor: 'var(--primary-pink)',
                      opacity: 0.5,
                      boxShadow: '0 -1px 3px rgba(0,0,0,0.1)'
                    }}></div>
                    {/* Window */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '10px',
                      width: '12px',
                      height: '12px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    {/* Door */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '15px',
                      width: '10px',
                      height: '15px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                  </div>
                  
                  {/* Tall Building */}
                  <div className="position-absolute" style={{ 
                    left: '82%', 
                    bottom: 0,
                    width: '40px',
                    height: '70px',
                    backgroundColor: 'var(--primary-pink)',
                    opacity: 0.3,
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {/* Windows - Column 1 */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '25px',
                      left: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      left: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      left: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    {/* Windows - Column 2 */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '25px',
                      right: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      right: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '55px',
                      right: '10px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      opacity: 0.3
                    }}></div>
                  </div>
                </div>
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
                        <span>{listing.prefecture}</span>
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
            <Link 
              href="/listings"
              className="btn btn-lg"
              style={{
                backgroundColor: 'var(--primary-pink)',
                borderColor: 'var(--primary-pink)',
                color: 'white',
                padding: '1rem 2rem',
                textDecoration: 'none'
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
                  href={`/city-guides/${neighborhood.name.toLowerCase()}`}
                  className="text-decoration-none"
                >
                  <div 
                    className="card border-0 h-100 transition-all" 
                    style={{ 
                      borderRadius: '1rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                      <Image
                        src={neighborhood.image}
                        alt={neighborhood.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ 
                          objectFit: "cover"
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
              className="btn btn-lg"
              style={{
                backgroundColor: 'var(--primary-pink)',
                borderColor: 'var(--primary-pink)',
                color: 'white',
                padding: '1rem 2rem',
                textDecoration: 'none'
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
            <h2 className="h3 fw-bold mb-2" style={{ color: 'var(--primary-pink)' }}>Frequently Asked Questions</h2>
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
