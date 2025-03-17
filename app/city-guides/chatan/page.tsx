"use client";

import {
    faHome,
    faTree,
    faShoppingBag,
    faUtensils,
    faUmbrellaBeach
} from "@fortawesome/free-solid-svg-icons";
import CityGuideTemplate from "@/components/templates/CityGuideTemplate";
import { cities } from '@/data/cities';
import CityGuideLayout from '@/components/CityGuideLayout';
import PropertyList from '@/components/PropertyList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faYen, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { generateMetadata } from './metadata';

const attractions = [
    {
        name: "American Village",
        description: "A vibrant entertainment complex featuring the iconic Ferris wheel, diverse shopping options, and waterfront dining. Perfect for experiencing Okinawa's unique blend of American and Japanese culture.",
        image: "/images/attractions/american-village.jpg",
        hours: "Most shops 10:00-22:00",
        price: "Free entry",
        phone: "098-926-4444",
        website: "https://www.okinawa-americanvillage.com",
        location: "Mihama, Chatan"
    },
    {
        name: "Sunset Beach",
        description: "A picturesque beach known for its stunning sunsets, water activities, and beachside cafes. Popular spot for both relaxation and water sports.",
        image: "/images/attractions/sunset-beach.jpg",
        hours: "Always open",
        price: "Free",
        phone: "098-926-2222",
        website: "https://www.chatan.jp/beaches",
        location: "Mihama, Chatan"
    },
    {
        name: "Depot Island",
        description: "A seaside shopping complex with unique boutiques, restaurants, and entertainment venues. Features regular live music performances and seasonal events.",
        image: "/images/attractions/depot-island.jpg",
        hours: "11:00-23:00",
        price: "Free entry",
        phone: "098-926-3333",
        website: "https://www.depot-island.com",
        location: "Mihama, Chatan"
    },
    {
        name: "Araha Beach",
        description: "A family-friendly beach with calm waters, playground facilities, and a beautiful park. Perfect for picnics, jogging, and casual beach activities.",
        image: "/images/attractions/araha-beach.jpg",
        hours: "Always open",
        price: "Free",
        phone: "098-926-1111",
        website: "https://www.chatan.jp/araha",
        location: "Araha, Chatan"
    }
];

const quickFacts = [
    { icon: "🏘️", text: "85 Available Properties" },
    { icon: "🚗", text: "25min to Naha Airport" },
    { icon: "🏥", text: "2 Major Hospitals" },
    { icon: "🏫", text: "4 International Schools" },
    { icon: "🌊", text: "3 Public Beaches" },
    { icon: "🏪", text: "5 Shopping Centers" },
    { icon: "🚌", text: "Regular Bus Service" },
    { icon: "🍽️", text: "100+ Restaurants" }
];

const highlights = [
    "Strategic beachfront location",
    "Modern shopping complexes",
    "Active international community",
    "Excellent dining options",
    "Regular cultural events",
    "Family-friendly facilities",
    "Convenient transportation",
    "Vibrant nightlife"
];

const nearestBases = ["Kadena Air Base", "Camp Foster", "Camp Hansen"];
const nearestCities = ["Okinawa City", "Ginowan", "Uruma", "Yomitan"];

const places = [
    {
        title: "American Village",
        image: "/images/american_village.jpg",
        description: "A lively shopping and entertainment district.",
    },
    {
        title: "Chatan Park",
        image: "/images/chatan_park.jpg",
        description: "A popular park for outdoor activities and family gatherings.",
    },
    {
        title: "Local Market",
        image: "/images/local_market.jpg",
        description: "A bustling market showcasing local produce and crafts.",
    },
];

const faqs = [
    {
        question: "What is the cost of living in Chatan?",
        answer:
            "Chatan offers a moderate cost of living with a variety of housing options, affordable amenities, and a vibrant community.",
    },
    {
        question: "How is the transportation system in Chatan?",
        answer:
            "Chatan is well-served by public buses and taxis, making commuting simple and convenient.",
    },
    {
        question: "What recreational activities are available in Chatan?",
        answer:
            "From beautiful beaches and parks to the lively American Village, Chatan offers plenty of shopping, dining, and entertainment options.",
    },
];

const agencies = [
    {
        name: "Okinawa Homes Agency",
        image: "/images/agency1.jpg",
        description: "Specializing in rental properties throughout Chatan and surrounding areas.",
    },
    {
        name: "Chatan Realty",
        image: "/images/agency2.jpg",
        description: "Experts in local rentals and property management in Chatan.",
    },
];

export default function ChatanGuidePage() {
    const city = cities.find(c => c.id === 'chatan')!;

    return (
        <CityGuideLayout city={city}>
            <div className="row g-4">
                <div className="col-lg-8">
                    {/* Overview Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-4" style={{ color: 'var(--primary-pink)' }}>Living in Chatan</h2>
                            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                Chatan is a vibrant coastal town that perfectly blends modern convenience with beachside living. 
                                Known for its iconic American Village, beautiful beaches, and diverse dining scene, it's a favorite 
                                among both locals and expatriates. The town offers an excellent balance of entertainment, shopping, 
                                and peaceful residential areas, making it ideal for families, professionals, and retirees alike.
                            </p>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--light-pink)' }}>
                                        <h3 className="h5 mb-3">Why Choose Chatan?</h3>
                                        <ul className="list-unstyled mb-0">
                                            {highlights.map((highlight, index) => (
                                                <li key={index} className="mb-2">
                                                    ✓ {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--light-pink)' }}>
                                        <h3 className="h5 mb-3">Quick Facts</h3>
                                        <ul className="list-unstyled mb-0">
                                            {quickFacts.map((fact, index) => (
                                                <li key={index} className="mb-2">
                                                    {fact.icon} {fact.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Properties Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h4 mb-0" style={{ color: 'var(--primary-pink)' }}>
                                    Featured Properties in Chatan
                                </h2>
                                <button 
                                    className="btn"
                                    style={{
                                        backgroundColor: 'var(--light-pink)',
                                        color: 'var(--primary-pink)',
                                        borderRadius: '50px'
                                    }}
                                >
                                    View All Properties
                                </button>
                            </div>
                            <PropertyList cityId="chatan" limit={3} />
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
                                            <img
                                                src={attraction.image}
                                                alt={attraction.name}
                                                className="card-img-top rounded-top-4"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
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
                                <h3 className="h5 mb-4">Interested in Chatan?</h3>
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
                                            placeholder="Your Email"
                                            style={{ borderRadius: '50px' }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea 
                                            className="form-control" 
                                            rows={3}
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
                                        Get More Information
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Neighborhood Stats */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <h3 className="h5 mb-4">Neighborhood Stats</h3>
                                <div className="d-flex flex-column gap-3">
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted">Safety Rating</span>
                                            <span className="fw-medium">95%</span>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div 
                                                className="progress-bar" 
                                                style={{ 
                                                    width: '95%',
                                                    backgroundColor: 'var(--primary-pink)'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted">Family Friendly</span>
                                            <span className="fw-medium">90%</span>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div 
                                                className="progress-bar" 
                                                style={{ 
                                                    width: '90%',
                                                    backgroundColor: 'var(--primary-pink)'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted">Nightlife</span>
                                            <span className="fw-medium">85%</span>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div 
                                                className="progress-bar" 
                                                style={{ 
                                                    width: '85%',
                                                    backgroundColor: 'var(--primary-pink)'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted">Public Transport</span>
                                            <span className="fw-medium">80%</span>
                                        </div>
                                        <div className="progress" style={{ height: '6px' }}>
                                            <div 
                                                className="progress-bar" 
                                                style={{ 
                                                    width: '80%',
                                                    backgroundColor: 'var(--primary-pink)'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Preview */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <h3 className="h5 mb-3">Location</h3>
                                <div 
                                    className="rounded-4 overflow-hidden mb-3"
                                    style={{ height: '200px' }}
                                >
                                    {/* Replace with actual map component */}
                                    <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                                        Map Preview
                                    </div>
                                </div>
                                <button 
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: 'var(--light-pink)',
                                        color: 'var(--primary-pink)',
                                        borderRadius: '50px'
                                    }}
                                >
                                    Open in Google Maps
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CityGuideLayout>
    );
}
