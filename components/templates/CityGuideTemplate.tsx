"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faQuestionCircle,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Place {
    title: string;
    image: string;
    description: string;
}

interface Agency {
    name: string;
    image: string;
    description: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface Highlight {
    icon: IconDefinition;
    text: string;
}

interface CityGuideProps {
    cityName: string;
    heroImage: string;
    description: string;
    highlights: Highlight[];
    nearestBases: string[];
    nearestCities: string[];
    places: Place[];
    faqs: FAQ[];
    agencies: Agency[];
}

export default function CityGuideTemplate({
    cityName,
    heroImage,
    description,
    highlights,
    nearestBases,
    nearestCities,
    places,
    faqs,
    agencies,
}: CityGuideProps) {
    return (
        <div>
            {/* Hero Section */}
            <div className="position-relative" style={{ height: '60vh', minHeight: '400px' }}>
                <Image
                    src={heroImage}
                    alt={`${cityName} City`}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="position-absolute w-100 h-100" style={{ 
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
                    display: 'flex',
                    alignItems: 'flex-end'
                }}>
                    <div className="container pb-5 text-white">
                        <h1 className="display-4 fw-bold mb-3">{cityName}</h1>
                        <p className="lead mb-4" style={{ maxWidth: '600px' }}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row">
                    {/* Left Column - Main Content */}
                    <div className="col-lg-8">
                        {/* Quick Highlights */}
                        <div className="row mb-5">
                            {highlights.map((highlight, idx) => (
                                <div key={idx} className="col-4 col-md-2">
                                    <div className="p-3" style={{ 
                                        background: 'var(--light-pink)',
                                        borderRadius: '12px',
                                        color: 'var(--primary-pink)'
                                    }}>
                                        <FontAwesomeIcon icon={highlight.icon} size="2x" className="mb-2" />
                                        <div className="small fw-bold">{highlight.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Nearest Bases & City Guides */}
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <div className="p-4" style={{ background: 'var(--light-pink)', borderRadius: '16px' }}>
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-pink)' }}>Nearest Military Bases</h5>
                                    {nearestBases.map((base, idx) => (
                                        <Link 
                                            key={idx} 
                                            href="#" 
                                            className="d-block mb-2 text-decoration-none"
                                            style={{ color: 'var(--primary-pink)' }}
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                            {base}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-4" style={{ background: 'var(--light-pink)', borderRadius: '16px' }}>
                                    <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-pink)' }}>Nearby Cities</h5>
                                    {nearestCities.map((city, idx) => (
                                        <Link 
                                            key={idx} 
                                            href={`/city-guides/${city.toLowerCase()}`} 
                                            className="d-block mb-2 text-decoration-none"
                                            style={{ color: 'var(--primary-pink)' }}
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                            {city}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Places of Interest */}
                        <h2 className="fw-bold mb-4" style={{ color: 'var(--primary-pink)' }}>Places of Interest</h2>
                        <div className="row g-4 mb-5">
                            {places.map((place, idx) => (
                                <div key={idx} className="col-md-6">
                                    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                                        <div style={{ height: '200px', position: 'relative' }}>
                                            <Image
                                                src={place.image}
                                                alt={place.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="fw-bold mb-2">{place.title}</h5>
                                            <p className="text-muted mb-0">{place.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="p-4 mb-5" style={{ background: 'var(--light-pink)', borderRadius: '16px' }}>
                            <h2 className="fw-bold mb-4" style={{ color: 'var(--primary-pink)' }}>Common Questions</h2>
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="mb-4">
                                    <h5 className="fw-bold mb-2" style={{ fontSize: '1.1rem', color: 'var(--primary-pink)' }}>
                                        <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                                        {faq.question}
                                    </h5>
                                    <p className="ms-4 mb-0" style={{ color: '#666' }}>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Agencies */}
                    <div className="col-lg-4">
                        <div className="sticky-top" style={{ top: '2rem' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 style={{ 
                                    color: 'var(--primary-pink)',
                                    fontSize: '1.25rem',
                                    fontWeight: '400',
                                    margin: 0
                                }}>Local Housing Agencies</h2>
                                <Link 
                                    href="/agencies" 
                                    className="btn btn-sm"
                                    style={{
                                        backgroundColor: 'var(--light-pink)',
                                        color: 'var(--primary-pink)',
                                        borderRadius: '50px',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    View All 15+ Agencies
                                </Link>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                {agencies.map((agency, idx) => (
                                    <div key={idx} className="card border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                        <div className="row g-0">
                                            <div className="col-5">
                                                <div style={{ height: '140px', position: 'relative' }}>
                                                    <Image
                                                        src={agency.image}
                                                        alt={agency.name}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="card-body p-3">
                                                    <h5 className="fw-bold mb-2" style={{ fontSize: '1rem' }}>{agency.name}</h5>
                                                    <p className="text-muted small mb-2">{agency.description}</p>
                                                    <button 
                                                        className="btn btn-sm w-100" 
                                                        style={{ 
                                                            backgroundColor: 'var(--primary-pink)', 
                                                            color: 'white',
                                                            borderRadius: '6px',
                                                            padding: '0.5rem'
                                                        }}
                                                    >
                                                        Contact Agency
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
