'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHouseLaptop,
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
  faCompass,
  faShieldAlt,
  faMoneyBillWave,
  faTachometerAlt,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import AuthModal from './AuthModal';
import { cities } from '@/data/cities';
import { bases } from '@/data/bases';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const isListingsPage = pathname === '/listings' || pathname.startsWith('/listings?');
  const isAdmin = user?.email?.toLowerCase() === 'smithjohnathanr@gmail.com';
  const navbarRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    // Close mobile menu when route changes
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathname, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut();
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm" ref={navbarRef}>
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
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} style={{ color: 'var(--primary-pink)' }} />
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} style={{
            position: isMobileMenuOpen ? 'fixed' : 'static',
            top: isMobileMenuOpen ? '56px' : 'auto',
            left: 0,
            right: 0,
            bottom: isMobileMenuOpen ? 0 : 'auto',
            backgroundColor: 'white',
            zIndex: 1030,
            height: isMobileMenuOpen ? 'calc(100vh - 56px)' : 'auto',
            overflowY: isMobileMenuOpen ? 'auto' : 'visible',
            padding: isMobileMenuOpen ? '1rem' : 0
          }}>
            <ul className="navbar-nav ms-auto align-items-center">
              {/* Properties Dropdown */}
              <li className="nav-item dropdown position-static">
                <Link 
                  href="/listings" 
                  className="nav-link dropdown-toggle text-dark d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleNavLinkClick}
                >
                  Search by Location
                  <FontAwesomeIcon icon={faChevronDown} className="ms-1 nav-dropdown-icon" />
                </Link>
                <div className="dropdown-menu mega-menu w-100 p-3 border-0 shadow-lg" style={{ marginTop: '0' }}>
                  <div className="container">
                    <div className="row g-4">
                      {/* Property Types Column */}
                      <div className="col-lg-3">
                        <h6 className="fw-bold" style={{ color: 'var(--primary-pink)' }}>Property Types</h6>
                        <div className="d-flex flex-column gap-2">
                          <Link href="/listings" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faSearch} className="me-2" />
                            All Properties
                          </Link>
                          <Link href="/listings?type=apartment" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faBuilding} className="me-2" />
                            Apartments
                          </Link>
                          <Link href="/listings?type=house" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faHouse} className="me-2" />
                            Houses
                          </Link>
                          <Link href="/listings?type=mansion" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faCity} className="me-2" />
                            Mansions
                          </Link>
                          <div className="dropdown-divider my-2"></div>
                          <Link href="/listings/search" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faSearch} className="me-2" />
                            Advanced Search
                          </Link>
                          <Link href="/listings/featured" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faHeart} className="me-2" />
                            Featured Listings
                          </Link>
                        </div>
                      </div>
                      
                      {/* Cities Column */}
                      <div className="col-lg-5">
                        <h6 className="fw-bold" style={{ color: 'var(--primary-pink)' }}>Cities</h6>
                        <div className="row">
                          <div className="col-6">
                            {cities.slice(0, Math.ceil(cities.length / 2)).map(city => (
                              <Link 
                                key={city.id} 
                                href={`/cities/${city.id}`} 
                                className="dropdown-item rounded-2 px-3 py-2 text-dark"
                                onClick={handleNavLinkClick}
                              >
                                <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                {city.name}
                              </Link>
                            ))}
                          </div>
                          <div className="col-6">
                            {cities.slice(Math.ceil(cities.length / 2)).map(city => (
                              <Link 
                                key={city.id} 
                                href={`/cities/${city.id}`} 
                                className="dropdown-item rounded-2 px-3 py-2 text-dark"
                                onClick={handleNavLinkClick}
                              >
                                <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                {city.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link href="/cities" className="dropdown-item rounded-2 px-3 py-2 text-dark fw-medium" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faCompass} className="me-2" />
                            View All City Guides
                          </Link>
                        </div>
                      </div>
                      
                      {/* Bases Column */}
                      <div className="col-lg-4">
                        <h6 className="fw-bold" style={{ color: 'var(--primary-pink)' }}>Military Bases</h6>
                        <div className="d-flex flex-column gap-2">
                          {bases.map(base => (
                            <Link 
                              key={base.id} 
                              href={`/bases/${base.id}`} 
                              className="dropdown-item rounded-2 px-3 py-2 text-dark"
                              onClick={handleNavLinkClick}
                            >
                              <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                              {base.name}
                            </Link>
                          ))}
                          <div className="dropdown-divider my-2"></div>
                          <Link href="/bases" className="dropdown-item rounded-2 px-3 py-2 text-dark fw-medium" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faCompass} className="me-2" />
                            View All Base Guides
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              
              {/* Moving Resources Dropdown */}
              <li className="nav-item dropdown">
                <Link 
                  href="/resources" 
                  className="nav-link dropdown-toggle text-dark d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleNavLinkClick}
                >
                  Moving Resources
                  <FontAwesomeIcon icon={faChevronDown} className="ms-1 nav-dropdown-icon" />
                </Link>
                <div className="dropdown-menu dropdown-menu-lg p-0 border-0 shadow-lg rounded-3 overflow-hidden" style={{ width: '280px' }}>
                  <div className="p-3 bg-light border-bottom">
                    <h6 className="mb-0 fw-bold" style={{ color: 'var(--primary-pink)' }}>Resources</h6>
                  </div>
                  <div className="p-3">
                    <div className="d-flex flex-column gap-2">
                      <Link href="/guides" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faCompass} className="me-2" />
                        City Guides
                      </Link>
                      <Link href="/moving-tips" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faHouse} className="me-2" />
                        Moving Tips
                      </Link>
                      <Link href="/cost-of-living" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                        Cost of Living
                      </Link>
                      <div className="dropdown-divider my-2"></div>
                      <Link href="/about" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                        About OkinawaNow
                      </Link>
                      <Link href="/faq" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                        FAQ
                      </Link>
                      <Link href="/contact" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              
              {/* Our Services Link */}
              <li className="nav-item">
                <Link href="/services" className="nav-link text-dark" onClick={handleNavLinkClick}>
                  Our Services
                </Link>
              </li>

              {/* User Menu */}
              {user ? (
                <li className="nav-item dropdown ms-2">
                  <button 
                    className="btn profile-button rounded-pill d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ padding: '0.4rem 1rem' }}
                  >
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    <span className="d-none d-md-inline">{user.displayName || 'Account'}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ms-1 nav-dropdown-icon" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-0 border-0 shadow-lg rounded-3 overflow-hidden" style={{ width: '250px' }}>
                    <div className="p-3 bg-light border-bottom">
                      <h6 className="mb-0 fw-bold" style={{ color: 'var(--primary-pink)' }}>My Account</h6>
                    </div>
                    <div className="p-2">
                      <Link href="/favorites" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                        My Favorites
                      </Link>
                      <Link href="/tours" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                        My Tours
                      </Link>
                      
                      {isAdmin && (
                        <>
                          <div className="dropdown-divider my-2"></div>
                          <Link href="/admin" className="dropdown-item rounded-2 px-3 py-2 text-dark" onClick={handleNavLinkClick}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                            Admin Dashboard
                          </Link>
                        </>
                      )}
                      
                      <div className="dropdown-divider my-2"></div>
                      <button 
                        onClick={handleSignOut}
                        className="dropdown-item rounded-2 px-3 py-2 text-dark"
                      >
                        <FontAwesomeIcon icon={faSignOut} className="me-2" />
                        Sign Out
                      </button>
                    </div>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ms-2">
                  {!loading && (
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="btn rounded-pill"
                      style={{ backgroundColor: 'var(--primary-pink)', color: 'white' }}
                    >
                      Sign In
                    </button>
                  )}
                </li>
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
