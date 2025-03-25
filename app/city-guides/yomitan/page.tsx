"use client";

import { City } from '@/types/city';
import { cities } from '@/data/cities';
import Image from 'next/image';
import CityGuideLayout from '@/components/CityGuideLayout';
import ListingList from '@/components/ListingList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faYen, faPhone, faGlobe, faUtensils, faShoppingBag, faGraduationCap, faHospital, faBus } from '@fortawesome/free-solid-svg-icons';

const attractions = [
    {
        name: "Yomitan Pottery Village",
        description: "A cultural hub showcasing traditional Okinawan pottery. Home to numerous pottery studios, workshops, and galleries where visitors can watch artisans at work.",
        image: "/images/attractions/pottery-village.jpg",
        hours: "9:00-18:00 (varies by studio)",
        price: "Free entry (workshop fees vary)",
        phone: "098-958-1111",
        website: "https://www.yomitan-yugama.jp",
        location: "Zakimi, Yomitan"
    },
    {
        name: "Zakimi Castle Ruins",
        description: "A UNESCO World Heritage site offering panoramic views of the East China Sea. This 15th-century castle showcases traditional Okinawan architecture.",
        image: "/images/attractions/zakimi-castle.jpg",
        hours: "9:00-17:30",
        price: "¥400",
        phone: "098-958-3141",
        website: "https://www.yomitan.jp/zakimi",
        location: "Zakimi, Yomitan"
    },
    {
        name: "Nirai Beach",
        description: "A pristine beach known for its crystal-clear waters and coral reefs. Perfect for snorkeling, swimming, and sunset viewing.",
        image: "/images/attractions/nirai-beach.jpg",
        hours: "Always open",
        price: "Free",
        phone: "098-958-2200",
        website: "https://www.yomitan.jp/beaches",
        location: "Nirai, Yomitan"
    },
    {
        name: "Yomitan Sports Park",
        description: "A comprehensive recreational facility featuring sports fields, walking trails, and playground equipment. Popular among families and fitness enthusiasts.",
        image: "/images/attractions/sports-park.jpg",
        hours: "6:00-22:00",
        price: "Free",
        phone: "098-958-3333",
        website: "https://www.yomitan.jp/sports",
        location: "Central Yomitan"
    }
];

const amenities = [
    {
        name: "Dining",
        description: "Traditional Okinawan cuisine and local specialties",
        icon: faUtensils,
        items: [
            "Yachimun no Sato pottery cafes",
            "Local izakayas and soba shops",
            "Seaside restaurants",
            "Fresh seafood markets"
        ]
    },
    {
        name: "Shopping",
        description: "Traditional crafts and local products",
        icon: faShoppingBag,
        items: [
            "Yomitan Pottery Village",
            "Local farmers markets",
            "Traditional craft shops",
            "Souvenir stores"
        ]
    },
    {
        name: "Education",
        description: "Educational facilities and cultural centers",
        icon: faGraduationCap,
        items: [
            "Public schools",
            "Cultural learning centers",
            "Pottery workshops",
            "Community centers"
        ]
    },
    {
        name: "Healthcare",
        description: "Medical facilities and wellness centers",
        icon: faHospital,
        items: [
            "Yomitan Clinic",
            "Family medical centers",
            "Dental clinics",
            "Local pharmacies"
        ]
    },
    {
        name: "Transportation",
        description: "Local transportation options",
        icon: faBus,
        items: [
            "Regular bus services",
            "Taxi stands",
            "Rental car services",
            "Bicycle rentals"
        ]
    }
];

export default function YomitanPage() {
    const city = cities.find(c => c.id === 'yomitan') as City;

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
                                            <li className="mb-2">✓ Rich cultural heritage</li>
                                            <li className="mb-2">✓ Traditional pottery</li>
                                            <li className="mb-2">✓ Beautiful beaches</li>
                                            <li>✓ Peaceful lifestyle</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--light-pink)' }}>
                                        <h3 className="h5 mb-3">Quick Facts</h3>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2">🏘️ {city.propertyCount} Properties</li>
                                            <li className="mb-2">🚗 30min to Airport</li>
                                            <li className="mb-2">🏥 2 Major Hospitals</li>
                                            <li>🏫 3 International Schools</li>
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
                                        <strong>City Office:</strong> 098-958-1111
                                    </li>
                                    <li>
                                        <strong>Tourist Information:</strong> 098-958-2200
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
