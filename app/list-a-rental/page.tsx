"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHome,
  faImages,
  faChartLine,
  faUserShield,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";

export default function ListARentalPage() {
  const benefits = [
    {
      icon: faHome,
      title: "Wide Exposure",
      description: "Reach thousands of potential tenants, including military families and expatriates"
    },
    {
      icon: faImages,
      title: "Professional Listings",
      description: "Showcase your property with high-quality photos and detailed descriptions"
    },
    {
      icon: faChartLine,
      title: "Market Insights",
      description: "Access local market data and pricing recommendations"
    },
    {
      icon: faUserShield,
      title: "Verified Tenants",
      description: "Connect with pre-screened, qualified tenants"
    }
  ];

  const plans = [
    {
      name: "Single Rental",
      price: "¥700",
      description: "Perfect for individual property owners",
      features: [
        "30-day listing duration",
        "Up to 10 photos",
        "Property description in English & Japanese",
        "Email support",
        "Basic analytics"
      ],
      recommended: false,
      href: "/register"
    },
    {
      name: "Agency Plan",
      price: "¥8,900",
      description: "Ideal for property managers & agencies",
      features: [
        "Multiple property listings",
        "Unlimited photos",
        "Featured placement",
        "Priority support",
        "Advanced analytics dashboard",
        "Custom agency profile"
      ],
      recommended: true,
      href: "/register"
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-4">List Your Rental Property</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Join Okinawa's premier rental platform and connect with quality tenants, 
            including military families and expatriates.
          </p>
          <div 
            className="d-inline-block px-4 py-2 rounded-pill"
            style={{ backgroundColor: 'var(--light-pink)' }}
          >
            <span className="fw-medium" style={{ color: 'var(--primary-pink)' }}>
              Trusted by 500+ Property Owners
            </span>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="row g-4 mb-5">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="text-center p-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'var(--light-pink)',
                    width: '64px',
                    height: '64px'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={benefit.icon}
                    style={{ color: 'var(--primary-pink)' }}
                    size="lg"
                  />
                </div>
                <h3 className="h5 mb-2">{benefit.title}</h3>
                <p className="text-muted small mb-0">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="row justify-content-center g-4 mb-5">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-6 col-lg-5">
              <div 
                className={`card h-100 border-0 shadow-sm ${
                  plan.recommended ? 'shadow-lg' : ''
                }`}
                style={
                  plan.recommended 
                    ? { borderTop: '3px solid var(--primary-pink)' }
                    : {}
                }
              >
                {plan.recommended && (
                  <div 
                    className="position-absolute top-0 start-50 translate-middle px-4 py-1 rounded-pill"
                    style={{ 
                      backgroundColor: 'var(--primary-pink)',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}
                  >
                    Recommended
                  </div>
                )}
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3 fw-bold mb-1">{plan.name}</h2>
                    <p className="text-muted mb-3">{plan.description}</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <span 
                        className="display-5 fw-bold"
                        style={{ color: 'var(--primary-pink)' }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-muted ms-2">/month</span>
                    </div>
                  </div>
                  
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-3 d-flex align-items-center">
                        <FontAwesomeIcon 
                          icon={faCheck}
                          className="me-2"
                          style={{ color: 'var(--primary-pink)' }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <Link
                      href={plan.href}
                      className={`btn btn-lg px-4 w-100 ${
                        plan.recommended ? '' : 'btn-outline'
                      }`}
                      style={
                        plan.recommended 
                          ? {
                              backgroundColor: 'var(--primary-pink)',
                              color: 'white',
                              borderRadius: '50px'
                            }
                          : {
                              borderColor: 'var(--primary-pink)',
                              color: 'var(--primary-pink)',
                              borderRadius: '50px'
                            }
                      }
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div 
          className="text-center p-5 rounded-4"
          style={{ backgroundColor: 'var(--light-pink)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <div 
                className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: 'white',
                  width: '80px',
                  height: '80px'
                }}
              >
                <FontAwesomeIcon 
                  icon={faHandshake}
                  style={{ color: 'var(--primary-pink)' }}
                  size="2x"
                />
              </div>
              <h2 className="h3 fw-bold mb-3">Ready to List Your Property?</h2>
              <p className="mb-4">
                Join hundreds of successful property owners who trust Okinawa Rentals. 
                Our platform makes it easy to connect with quality tenants and manage your listings effectively.
              </p>
              <Link
                href="/register"
                className="btn btn-lg px-4"
                style={{ 
                  backgroundColor: 'var(--primary-pink)',
                  color: 'white',
                  borderRadius: '50px'
                }}
              >
                Create Your Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
