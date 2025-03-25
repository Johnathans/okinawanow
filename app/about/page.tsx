"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHandshake,
  faGlobe,
  faHeart,
  faUsers,
  faStar
} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  const values = [
    {
      icon: faHome,
      title: "Local Expertise",
      description: "Deep understanding of Okinawa's housing market and military requirements"
    },
    {
      icon: faHandshake,
      title: "Trusted Service",
      description: "Building relationships through transparent and reliable service"
    },
    {
      icon: faGlobe,
      title: "Cultural Bridge",
      description: "Bridging cultural gaps between local landlords and international tenants"
    }
  ];

  const stats = [
    {
      number: "1000+",
      label: "Properties Listed",
      icon: faHome
    },
    {
      number: "500+",
      label: "Military Families Helped",
      icon: faUsers
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: faStar
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-4">About Okinawa Rentals</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Your trusted partner in finding the perfect home in Okinawa. We specialize in connecting 
            military families, expatriates, and locals with quality rental properties throughout the island.
          </p>
          <div 
            className="d-inline-block px-4 py-2 rounded-pill mb-5"
            style={{ backgroundColor: 'var(--light-pink)' }}
          >
            <span className="fw-medium" style={{ color: 'var(--primary-pink)' }}>
              Serving the Okinawa community since 2023
            </span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="h3 fw-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              We understand that moving to Okinawa can be both exciting and challenging. Our mission is to 
              make your transition smoother by providing:
            </p>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <span 
                  className="me-3 p-2 rounded-circle"
                  style={{ backgroundColor: 'var(--light-pink)' }}
                >
                  <FontAwesomeIcon 
                    icon={faHeart} 
                    style={{ color: 'var(--primary-pink)' }}
                  />
                </span>
                Personalized property recommendations
              </li>
              <li className="mb-3 d-flex align-items-center">
                <span 
                  className="me-3 p-2 rounded-circle"
                  style={{ backgroundColor: 'var(--light-pink)' }}
                >
                  <FontAwesomeIcon 
                    icon={faHandshake} 
                    style={{ color: 'var(--primary-pink)' }}
                  />
                </span>
                Clear communication between tenants and landlords
              </li>
              <li className="mb-3 d-flex align-items-center">
                <span 
                  className="me-3 p-2 rounded-circle"
                  style={{ backgroundColor: 'var(--light-pink)' }}
                >
                  <FontAwesomeIcon 
                    icon={faGlobe} 
                    style={{ color: 'var(--primary-pink)' }}
                  />
                </span>
                Local insights and community resources
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div 
              className="p-4 rounded-4"
              style={{ backgroundColor: 'var(--light-pink)' }}
            >
              <div className="row g-4">
                {stats.map((stat, index) => (
                  <div key={index} className="col-md-4 text-center">
                    <div 
                      className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        backgroundColor: 'white',
                        width: '64px',
                        height: '64px'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={stat.icon} 
                        size="lg"
                        style={{ color: 'var(--primary-pink)' }}
                      />
                    </div>
                    <div className="h3 fw-bold mb-1" style={{ color: 'var(--primary-pink)' }}>
                      {stat.number}
                    </div>
                    <div className="small">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-5">
          <h2 className="h3 fw-bold text-center mb-4">Our Values</h2>
          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4 text-center">
                    <div 
                      className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        backgroundColor: 'var(--light-pink)',
                        width: '56px',
                        height: '56px'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={value.icon}
                        style={{ color: 'var(--primary-pink)' }}
                      />
                    </div>
                    <h3 className="h5 mb-3">{value.title}</h3>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className="text-center p-5 rounded-4"
          style={{ backgroundColor: 'var(--light-pink)' }}
        >
          <h2 className="h3 fw-bold mb-4">Ready to Find Your Home in Okinawa?</h2>
          <p className="mb-4">
            Let us help you navigate the rental market and find the perfect property for your needs.
          </p>
          <a 
            href="/contact" 
            className="btn btn-lg px-4"
            style={{ 
              backgroundColor: 'var(--primary-pink)',
              color: 'white',
              borderRadius: '50px'
            }}
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </main>
  );
}
