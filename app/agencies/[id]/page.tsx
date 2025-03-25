"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
    faGlobe,
    faBuilding,
    faArrowLeft,
    faHome,
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import { agencies } from "@/data/agencies";
import { mockListings } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import { useState } from "react";

export default function AgencyProfilePage() {
    const params = useParams();
    const agencyId = params.id as string;
    const agency = agencies[agencyId];
    const [sortBy, setSortBy] = useState("latest");

    // Filter properties for this agency
    const agencyProperties = Object.values(mockListings).filter(
        property => property.agencyId === agencyId
    );

    // Sort properties based on selected option
    const sortedProperties = [...agencyProperties].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "bedrooms":
                return b.bedrooms - a.bedrooms;
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    if (!agency) {
        return (
            <div className="container py-5">
                <h1>Agency not found</h1>
                <Link href="/agencies" className="btn btn-primary">
                    Back to Agencies
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, var(--light-pink) 0%, #fff 100%)',
                paddingTop: '2.5rem',
                paddingBottom: '2.5rem'
            }}>
                <div className="container">
                    <Link 
                        href="/agencies" 
                        className="text-decoration-none d-inline-flex align-items-center mb-4 transition-all"
                        style={{ 
                            width: 'fit-content',
                            color: 'var(--primary-pink)',
                            opacity: 0.9
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Back to Agencies
                    </Link>

                    {/* Agency Header */}
                    <div className="bg-white rounded-4 p-4" style={{ border: '1px solid var(--light-pink)' }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="d-flex align-items-center gap-4">
                                    <div 
                                        className="bg-white rounded-3" 
                                        style={{ 
                                            width: '120px', 
                                            height: '120px',
                                            padding: '1rem',
                                            border: '1px solid var(--light-pink)'
                                        }}
                                    >
                                        <Image
                                            src={agency.image}
                                            alt={agency.name}
                                            width={88}
                                            height={88}
                                            style={{ objectFit: "contain" }}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <h1 className="h2 fw-bold mb-2" style={{ color: '#2d3436' }}>
                                            {agency.name}
                                        </h1>
                                        <div className="d-flex flex-wrap gap-3 mb-3">
                                            <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" style={{ color: 'var(--primary-pink)' }} />
                                                <span>{agency.location}</span>
                                            </div>
                                            {agency.propertyCount && (
                                                <div className="d-flex align-items-center" style={{ color: '#636e72' }}>
                                                    <FontAwesomeIcon icon={faBuilding} className="me-2" style={{ color: 'var(--primary-pink)' }} />
                                                    <span>{agency.propertyCount} Properties</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="mb-0" style={{ color: '#636e72' }}>{agency.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="d-grid gap-2">
                                    {agency.phone && (
                                        <a 
                                            href={`tel:${agency.phone}`}
                                            className="btn btn-primary"
                                            style={{
                                                backgroundColor: 'var(--primary-pink)',
                                                borderColor: 'var(--primary-pink)',
                                                padding: '0.8rem'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--dark-pink)';
                                                e.currentTarget.style.borderColor = 'var(--dark-pink)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--primary-pink)';
                                                e.currentTarget.style.borderColor = 'var(--primary-pink)';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                                            Call Now
                                        </a>
                                    )}
                                    <Link 
                                        href={`/contact?agency=${agency.id}`}
                                        className="btn btn-outline-primary"
                                        style={{
                                            color: 'var(--primary-pink)',
                                            borderColor: 'var(--primary-pink)',
                                            padding: '0.8rem'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--primary-pink)';
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = 'var(--primary-pink)';
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                        Send Message
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Left Column - Properties */}
                    <div className="col-lg-8">
                        {/* Available Rentals Section */}
                        <div className="bg-white rounded-4 p-4 mb-4" style={{ border: '1px solid var(--light-pink)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h4 fw-bold mb-0">Available Rentals</h2>
                                <div className="d-flex align-items-center gap-2">
                                    <label htmlFor="sortBy" className="mb-0" style={{ color: '#636e72' }}>Sort by:</label>
                                    <select
                                        id="sortBy"
                                        className="form-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        style={{
                                            borderColor: 'var(--light-pink)',
                                            color: '#2d3436',
                                            minWidth: '140px'
                                        }}
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="price-low">Price (Low to High)</option>
                                        <option value="price-high">Price (High to Low)</option>
                                        <option value="bedrooms">Bedrooms</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row g-4">
                                {sortedProperties.length > 0 ? (
                                    sortedProperties.map((property) => (
                                        <div key={property.id} className="col-md-6">
                                            <ListingCard listing={property} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <div className="text-center py-5" style={{ color: '#636e72' }}>
                                            <FontAwesomeIcon icon={faHome} style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-pink)' }} />
                                            <p className="mb-0">No properties available at the moment.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-4 p-4 mb-4" style={{ border: '1px solid var(--light-pink)' }}>
                            <h2 className="h4 fw-bold mb-4">About {agency.name}</h2>
                            <p style={{ 
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                color: '#636e72'
                            }}>
                                {agency.longDescription || agency.description}
                            </p>

                            {/* Agency Features */}
                            {agency.features && (
                                <div className="row g-3 mt-4">
                                    {agency.features.map((feature, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className="d-flex align-items-center gap-2">
                                                <FontAwesomeIcon 
                                                    icon={faCheck} 
                                                    style={{ color: 'var(--primary-pink)' }} 
                                                />
                                                <span>{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-4 p-4" style={{ border: '1px solid var(--light-pink)' }}>
                            <h2 className="h4 fw-bold mb-4">Location</h2>
                            <div style={{ height: '400px', backgroundColor: 'var(--light-pink)' }} className="rounded-3">
                                {/* Map will be implemented here */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Info */}
                    <div className="col-lg-4">
                        <div className="sticky-top" style={{ top: '2rem' }}>
                            {/* Contact Card */}
                            <div className="bg-white rounded-4 p-4 mb-4" style={{ border: '1px solid var(--light-pink)' }}>
                                <h3 className="h5 fw-bold mb-4">Contact Information</h3>
                                <div className="d-flex flex-column gap-4">
                                    {agency.phone && (
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'var(--light-pink)',
                                                    color: 'var(--primary-pink)'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPhone} style={{ width: '18px', height: '18px' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', color: '#636e72' }}>Phone</div>
                                                <a 
                                                    href={`tel:${agency.phone}`}
                                                    className="text-decoration-none fw-medium"
                                                    style={{ color: 'var(--primary-pink)' }}
                                                >
                                                    {agency.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {agency.website && (
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'var(--light-pink)',
                                                    color: 'var(--primary-pink)'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faGlobe} style={{ width: '18px', height: '18px' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', color: '#636e72' }}>Website</div>
                                                <a 
                                                    href={agency.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none fw-medium"
                                                    style={{ color: 'var(--primary-pink)' }}
                                                >
                                                    {agency.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {agency.email && (
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'var(--light-pink)',
                                                    color: 'var(--primary-pink)'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faEnvelope} style={{ width: '18px', height: '18px' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', color: '#636e72' }}>Email</div>
                                                <a 
                                                    href={`mailto:${agency.email}`}
                                                    className="text-decoration-none fw-medium"
                                                    style={{ color: 'var(--primary-pink)' }}
                                                >
                                                    {agency.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {agency.address && (
                                        <div className="d-flex align-items-start">
                                            <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'var(--light-pink)',
                                                    color: 'var(--primary-pink)',
                                                    marginTop: '4px'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ width: '18px', height: '18px' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', color: '#636e72' }}>Address</div>
                                                <div className="fw-medium">{agency.address}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Office Hours */}
                                {agency.officeHours && (
                                    <div className="mt-4 pt-4 border-top">
                                        <h4 className="h6 fw-bold mb-3">Office Hours</h4>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: '#636e72' }}>Weekdays</span>
                                                <span className="fw-medium">{agency.officeHours.weekday}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: '#636e72' }}>Saturday</span>
                                                <span className="fw-medium">{agency.officeHours.saturday}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: '#636e72' }}>Sunday</span>
                                                <span className="fw-medium">{agency.officeHours.sunday}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {agency.languages && (
                                    <div className="mt-4 pt-4 border-top">
                                        <h4 className="h6 fw-bold mb-3">Languages</h4>
                                        <div className="d-flex flex-wrap gap-2">
                                            {agency.languages.map((language, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-3 py-1 rounded-pill"
                                                    style={{
                                                        backgroundColor: 'var(--light-pink)',
                                                        color: 'var(--primary-pink)',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {language}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
