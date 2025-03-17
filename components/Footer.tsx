'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isListingsPage = pathname.startsWith('/listings');

  return (
    <footer className="bg-white border-top py-5">
      <div className={`${isListingsPage ? 'container-fluid px-4' : 'container'}`}>
        <div className="row g-4">
          <div className="col-lg-4">
            <Link href="/" className="d-flex align-items-center text-decoration-none mb-3">
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
            <p className="text-muted mb-4">
              Military-friendly housing solutions in Okinawa. 
              English support available for all services.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" style={{ color: 'var(--primary-pink)' }}>
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" style={{ color: 'var(--primary-pink)' }}>
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" style={{ color: 'var(--primary-pink)' }}>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5 style={{ color: 'var(--primary-pink)' }}>Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <Link href="/properties" style={{ color: '#666' }}>
                  Properties
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/map" style={{ color: '#666' }}>
                  Map
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about" style={{ color: '#666' }}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5 style={{ color: 'var(--primary-pink)' }}>Support</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <Link href="/contact" style={{ color: '#666' }}>
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" style={{ color: '#666' }}>
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy" style={{ color: '#666' }}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h5 style={{ color: 'var(--primary-pink)' }}>Newsletter</h5>
            <p style={{ color: '#666' }}>
              Subscribe to get updates on new properties and guides.
            </p>
            <div className="input-group mt-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  color: '#333'
                }}
              />
              <button 
                className="btn"
                type="button"
                style={{
                  backgroundColor: 'var(--primary-pink)',
                  color: 'white'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-top mt-5 pt-4" style={{ borderColor: '#eee !important' }}>
          <div className="row">
            <div className="col-md-6">
              <p style={{ color: '#666', margin: 0 }}>
                &copy; {new Date().getFullYear()} OkinawaNow. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <Link href="/privacy" className="me-3" style={{ color: '#666' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: '#666' }}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
