"use client";

import {
    faGraduationCap,
    faShoppingBag,
    faUtensils,
    faLandmark,
    faMapMarkerAlt, 
    faClock, 
    faYen, 
    faPhone, 
    faGlobe, 
    faBus
} from "@fortawesome/free-solid-svg-icons";
import { City } from '@/types/city';
import { cities } from '@/data/cities';
import CityGuideLayout from '@/components/CityGuideLayout';
import ListingList from '@/components/ListingList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const attractions = [
    {
        name: "Tropical Beach",
        description: "A beautiful beach perfect for family outings and water activities. Features a long stretch of white sand, clear waters, and excellent facilities for picnics and BBQs.",
        image: "/images/attractions/tropical-beach.jpg",
        hours: "Always open",
        price: "Free",
        phone: "098-897-2121",
        website: "https://www.ginowan.jp/beach",
        location: "Ginowan Marina Area"
    },
    {
        name: "Ginowan Marina",
        description: "A scenic marina offering water sports and stunning sunset views. Popular spot for sailing, kayaking, and marine activities with equipment rentals available.",
        image: "/images/attractions/ginowan-marina.jpg",
        hours: "9:00-18:00",
        price: "Free entry (activity fees vary)",
        phone: "098-897-2111",
        website: "https://www.ginowan-marina.jp",
        location: "Ginowan Seaside"
    },
    {
        name: "Okinawa Convention Center",
        description: "A modern facility hosting major events, concerts, and exhibitions with ocean views. Features multiple halls and outdoor spaces for various events.",
        image: "/images/attractions/convention-center.jpg",
        hours: "9:00-21:00",
        price: "Varies by event",
        phone: "098-898-3000",
        website: "https://www.oki-conven.jp",
        location: "Central Ginowan"
    },
    {
        name: "Seaside Park",
        description: "A waterfront park offering walking trails, sports facilities, and playground equipment. Perfect for family outings and outdoor activities.",
        image: "/images/attractions/seaside-park.jpg",
        hours: "24/7",
        price: "Free",
        phone: "098-897-2751",
        website: "https://www.ginowan.jp/park",
        location: "Ginowan Coast"
    }
];

const amenities = [
    {
        name: "Dining",
        description: "Local and international cuisine options",
        icon: faUtensils,
        items: [
            "Seaside restaurants",
            "International cuisine",
            "Local food markets",
            "Traditional izakayas"
        ]
    },
    {
        name: "Shopping",
        description: "Modern retail and traditional markets",
        icon: faShoppingBag,
        items: [
            "Convex Ginowan",
            "Local shopping centers",
            "Traditional markets",
            "Specialty stores"
        ]
    },
    {
        name: "Education",
        description: "Educational institutions and facilities",
        icon: faGraduationCap,
        items: [
            "International schools",
            "Universities",
            "Language schools",
            "Cultural centers"
        ]
    },
    {
        name: "Healthcare",
        description: "Medical facilities and services",
        icon: faLandmark,
        items: [
            "Ginowan Hospital",
            "Medical clinics",
            "Dental offices",
            "Pharmacies"
        ]
    },
    {
        name: "Transportation",
        description: "Public and private transport options",
        icon: faBus,
        items: [
            "City bus routes",
            "Taxi services",
            "Car rentals",
            "Highway access"
        ]
    }
];

export default function GinowanPage() {
    const city = cities.find(c => c.id === 'ginowan') as City;

    if (!city) {
        return <div>City not found</div>;
    }

    return (
        <CityGuideLayout city={city}>
            <div className="row g-4">
                <div className="col-lg-8">
                    {/* Overview Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-4" style={{ color: 'var(--primary-pink)' }}>About {city.name}</h2>
                            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                {city.description}
                            </p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--light-pink)' }}>
                                        <h3 className="h5 mb-3">Why Choose {city.name}?</h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2">✓ Central location</li>
                                            <li className="mb-2">✓ Beach access</li>
                                            <li className="mb-2">✓ Modern amenities</li>
                                            <li>✓ Family-friendly</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--light-pink)' }}>
                                        <h3 className="h5 mb-3">Quick Facts</h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2">🏘️ {city.propertyCount} Properties</li>
                                            <li className="mb-2">🚗 20min to Airport</li>
                                            <li className="mb-2">🏥 3 Major Hospitals</li>
                                            <li>🏫 4 International Schools</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-4" style={{ color: 'var(--primary-pink)' }}>
                                Local Amenities
                            </h2>
                            <div className="row g-4">
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="p-4 rounded-4 h-100" style={{ backgroundColor: 'var(--light-pink)' }}>
                                            <div className="d-flex align-items-center mb-3">
                                                <FontAwesomeIcon 
                                                    icon={amenity.icon} 
                                                    className="me-3"
                                                    style={{ 
                                                        color: 'var(--primary-pink)',
                                                        width: '24px',
                                                        height: '24px'
                                                    }}
                                                />
                                                <h3 className="h5 mb-0">{amenity.name}</h3>
                                            </div>
                                            <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                                                {amenity.description}
                                            </p>
                                            <ul className="list-unstyled mb-0" style={{ fontSize: '0.95rem' }}>
                                                {amenity.items.map((item, idx) => (
                                                    <li key={idx} className="mb-2">
                                                        <span className="me-2" style={{ color: 'var(--primary-pink)' }}>•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Properties Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h4 mb-0" style={{ color: 'var(--primary-pink)' }}>
                                    Available Properties
                                </h2>
                                <button 
                                    className="btn"
                                    style={{
                                        backgroundColor: 'var(--light-pink)',
                                        color: 'var(--primary-pink)'
                                    }}
                                    onClick={() => window.location.href = `/listings?city=${city.id}`}
                                >
                                    View All
                                </button>
                            </div>
                            <ListingList cityId={city.id} limit={3} />
                        </div>
                    </div>

                    {/* Attractions Section */}
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-4" style={{ color: 'var(--primary-pink)' }}>
                                Popular Attractions
                            </h2>
                            <div className="row g-4">
                                {attractions.map((attraction, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm rounded-4">
                                            <div style={{ position: 'relative', height: '200px' }}>
                                                <Image
                                                    src={attraction.image}
                                                    alt={attraction.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    style={{ objectFit: 'cover' }}
                                                    className="rounded-top-4"
                                                />
                                            </div>
                                            <div className="card-body p-3">
                                                <h3 className="h5 mb-3">{attraction.name}</h3>
                                                <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                                                    {attraction.description}
                                                </p>
                                                <div className="d-flex flex-column gap-2 text-muted" style={{ fontSize: '0.9rem' }}>
                                                    <div>
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                                        {attraction.location}
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faClock} className="me-2" />
                                                        {attraction.hours}
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faYen} className="me-2" />
                                                        {attraction.price}
                                                    </div>
                                                    {attraction.phone && (
                                                        <div>
                                                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                                                            {attraction.phone}
                                                        </div>
                                                    )}
                                                    {attraction.website && (
                                                        <a 
                                                            href={attraction.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none"
                                                            style={{ color: 'var(--primary-pink)' }}
                                                        >
                                                            <FontAwesomeIcon icon={faGlobe} className="me-2" />
                                                            Visit Website
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '2rem' }}>
                        {/* Quick Contact */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <h3 className="h5 mb-4">Interested in {city.name}?</h3>
                                <form>
                                    <div className="mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Your Name"
                                            style={{ borderRadius: '50px' }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Email Address"
                                            style={{ borderRadius: '50px' }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea 
                                            className="form-control" 
                                            rows={4}
                                            placeholder="Your Message"
                                            style={{ borderRadius: '20px' }}
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn w-100"
                                        style={{
                                            backgroundColor: 'var(--primary-pink)',
                                            color: 'white',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <h3 className="h5 mb-4">Emergency Contacts</h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-3">
                                        <strong>Police:</strong> 110
                                    </li>
                                    <li className="mb-3">
                                        <strong>Fire/Ambulance:</strong> 119
                                    </li>
                                    <li className="mb-3">
                                        <strong>City Office:</strong> 098-893-4411
                                    </li>
                                    <li>
                                        <strong>Tourist Information:</strong> 098-897-2121
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CityGuideLayout>
    );
}