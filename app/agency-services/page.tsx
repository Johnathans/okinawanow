import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faSync,
    faLanguage,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const AgencyServicesPage = () => {
    const features = [
        {
            title: "Military-Focused Marketing",
            description: "We rank highly for key military relocation searches, ensuring your properties reach the right audience at the right time.",
            icon: faSearch,
            stats: [
                { value: "10K+", label: "Monthly Military Visitors" },
                { value: "Top 3", label: "Google Rankings" },
                { value: "85%", label: "Military Tenant Rate" }
            ]
        },
        {
            title: "Automated Listing Management",
            description: "Your listings sync automatically between your website and Okinawa Rentals, saving you time and ensuring accuracy.",
            icon: faSync,
            stats: [
                { value: "Real-time", label: "Sync Speed" },
                { value: "100%", label: "Data Accuracy" },
                { value: "24/7", label: "Availability" }
            ]
        },
        {
            title: "English Support Services",
            description: "We handle English communication, property showings, and tenant inquiries on your behalf.",
            icon: faLanguage,
            stats: [
                { value: "1hr", label: "Response Time" },
                { value: "7 Days", label: "Support Coverage" },
                { value: "100%", label: "English Coverage" }
            ]
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="position-relative bg-light" style={{ overflow: 'hidden' }}>
                <div className="position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block">
                    <div className="position-relative h-100">
                        <Image
                            src="/images/dashboard-preview.png"
                            alt="Agency Dashboard Preview"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-start"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100" 
                            style={{ 
                                background: 'linear-gradient(to right, var(--light) 0%, transparent 100%)',
                                zIndex: 1 
                            }} 
                        />
                    </div>
                </div>
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row min-vh-75 align-items-center">
                        <div className="col-lg-6 py-5">
                            <h1 className="display-4 fw-bold mb-4">
                                Connect with Military Tenants
                            </h1>
                            <p className="lead mb-4">
                                Join Okinawa's leading platform for military housing. We help agencies reach military personnel, automate listings, and provide English support services.
                            </p>
                            <div className="d-flex gap-3">
                                <Link 
                                    href="/list-a-rental" 
                                    className="btn btn-lg px-4"
                                    style={{
                                        backgroundColor: 'var(--primary-pink)',
                                        color: 'white'
                                    }}
                                >
                                    Get Started
                                </Link>
                                <Link 
                                    href="#learn-more" 
                                    className="btn btn-lg btn-outline px-4"
                                    style={{
                                        borderColor: 'var(--primary-pink)',
                                        color: 'var(--primary-pink)'
                                    }}
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center text-center g-4">
                        <div className="col-sm-4">
                            <div className="d-flex flex-column">
                                <span className="h1 fw-bold mb-1" style={{ color: 'var(--primary-pink)' }}>50+</span>
                                <span className="text-muted">Partner Agencies</span>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="d-flex flex-column">
                                <span className="h1 fw-bold mb-1" style={{ color: 'var(--primary-pink)' }}>10K+</span>
                                <span className="text-muted">Monthly Visitors</span>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="d-flex flex-column">
                                <span className="h1 fw-bold mb-1" style={{ color: 'var(--primary-pink)' }}>85%</span>
                                <span className="text-muted">Military Tenants</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-5" id="learn-more">
                <div className="container">
                    {features.map((feature, index) => (
                        <div key={index} className={`row align-items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'} g-5 py-5`}>
                            <div className="col-lg-6">
                                <div className="d-flex align-items-center mb-4">
                                    <FontAwesomeIcon 
                                        icon={feature.icon} 
                                        className="me-3"
                                        style={{ 
                                            color: 'var(--primary-pink)',
                                            fontSize: '2rem'
                                        }}
                                    />
                                    <h2 className="h3 mb-0">{feature.title}</h2>
                                </div>
                                <p className="lead mb-4">{feature.description}</p>
                                <div className="row g-4">
                                    {feature.stats.map((stat, i) => (
                                        <div key={i} className="col-sm-4">
                                            <div className="border rounded p-3 text-center h-100">
                                                <div className="h4 mb-1" style={{ color: 'var(--primary-pink)' }}>
                                                    {stat.value}
                                                </div>
                                                <div className="small text-muted">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="position-relative" style={{ height: '400px' }}>
                                    <Image
                                        src={`/images/feature-${index + 1}.png`}
                                        alt={feature.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="rounded shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="display-6 fw-bold mb-4">Ready to Grow Your Business?</h2>
                            <p className="lead mb-4">
                                Join Okinawa's leading platform for military housing and start connecting with qualified tenants today.
                            </p>
                            <Link 
                                href="/list-a-rental" 
                                className="btn btn-lg d-inline-flex align-items-center gap-2 px-4"
                                style={{
                                    backgroundColor: 'var(--primary-pink)',
                                    color: 'white'
                                }}
                            >
                                Get Started
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgencyServicesPage;
