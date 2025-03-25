'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHouseLaptop,
    faMapLocationDot,
    faCircleInfo,
    faHeart,
    faBars,
    faXmark,
    faSearch,
    faBuilding,
    faHouse,
    faCity,
    faLocationDot,
    faInfoCircle,
    faQuestionCircle,
    faPhone,
    faCalendarAlt,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const isListingsPage = pathname.startsWith('/listings');

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className={`${isListingsPage ? 'container-fluid px-4' : 'container'}`}>
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            <div className="d-flex align-items-center">
              <span style={{ 
                fontSize: '1.8rem',
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                lineHeight: '1'
              }}>
                <span style={{ 
                  color: '#000',
                  fontWeight: '900'
                }}>Okinawa</span>
                <span style={{ 
                  color: '#000',
                  fontWeight: '300'
                }}>Rentals</span>
              </span>
              <FontAwesomeIcon 
                icon={faHouseLaptop} 
                style={{ 
                  color: 'var(--primary-pink)',
                  fontSize: '1.4rem',
                  marginLeft: '8px'
                }} 
              />
            </div>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-pink" />
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} style={{ position: 'static' }}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown" style={{ position: 'static' }}>
                <Link 
                  href="/listings" 
                  className={`nav-link dropdown-toggle ${pathname === '/listings' ? 'active fw-bold' : ''}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faHouseLaptop} className="me-2" />
                  Listings
                </Link>
                <div className="dropdown-menu mega-menu p-4" style={{ position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 1040 }}>
                  <div className="container">
                    <div className="row g-4">
                      <div className="col-lg-4">
                        <h6 className="text-pink fw-bold mb-3">Property Types</h6>
                        <div className="d-flex flex-column gap-2">
                          <Link href="/listings?type=apartment" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faBuilding} className="me-2" />
                            Apartments
                          </Link>
                          <Link href="/listings?type=house" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faHouse} className="me-2" />
                            Houses
                          </Link>
                          <Link href="/listings?type=mansion" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faCity} className="me-2" />
                            Mansions
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h6 className="text-pink fw-bold mb-3">Popular Areas</h6>
                        <div className="d-flex flex-column gap-2">
                          <Link href="/listings?area=kadena" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                            Kadena
                          </Link>
                          <Link href="/listings?area=foster" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                            Foster
                          </Link>
                          <Link href="/listings?area=american_village" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                            American Village
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <h6 className="text-pink fw-bold mb-3">Quick Links</h6>
                        <div className="d-flex flex-column gap-2">
                          <Link href="/listings/search" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faSearch} className="me-2" />
                            Advanced Search
                          </Link>
                          <Link href="/listings/featured" className="text-decoration-none text-muted">
                            <FontAwesomeIcon icon={faHeart} className="me-2" />
                            Featured Listings
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link 
                  href="/map" 
                  className={`nav-link ${pathname === '/map' ? 'active fw-bold' : ''}`}
                >
                  <FontAwesomeIcon icon={faMapLocationDot} className="me-2" />
                  Map
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link 
                  href="/about" 
                  className={`nav-link dropdown-toggle ${pathname === '/about' ? 'active fw-bold' : ''}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
                  About
                </Link>
                <div className="dropdown-menu p-4">
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex flex-column gap-2">
                        <Link href="/about" className="text-decoration-none text-muted">
                          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                          About Us
                        </Link>
                        <Link href="/faq" className="text-decoration-none text-muted">
                          <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                          FAQ
                        </Link>
                        <Link href="/contact" className="text-decoration-none text-muted">
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link text-dark text-decoration-none dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.displayName || 'Menu'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link href="/favorites" className="dropdown-item">
                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                        My Favorites
                      </Link>
                    </li>
                    <li>
                      <Link href="/tours" className="dropdown-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                        My Tours
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleSignOut}>
                        <FontAwesomeIcon icon={faSignOut} className="me-2" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  {!loading && (
                    <>
                      <button 
                        onClick={() => setShowAuthModal(true)}
                        className="btn btn-primary"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
