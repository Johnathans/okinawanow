import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { City } from '@/types/city';
import { cities } from "@/data/cities";
import Image from "next/image";
import CityGuideLayout from '@/components/CityGuideLayout';
import ListingList from '@/components/ListingList';

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
    { icon: "", text: "85 Available Properties" },
    { icon: "", text: "25min to Naha Airport" },
    { icon: "", text: "2 Major Hospitals" },
    { icon: "", text: "4 International Schools" },
    { icon: "", text: "3 Public Beaches" },
    { icon: "", text: "5 Shopping Centers" },
    { icon: "", text: "Regular Bus Service" },
    { icon: "", text: "100+ Restaurants" }
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

export default function ChatanGuidePage() {
    const city = cities.find(c => c.id === 'chatan') as City;

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
                                                    {highlight}
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
                            <ListingList cityId="chatan" limit={3} />
                        </div>
                    </div>

                    {/* Attractions Section */}
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-4" style={{ color: 'var(--primary-pink)' }}>Popular Attractions</h2>
                            <div className="row g-4">
                                {attractions.map((attraction, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                            <div className="position-relative" style={{ height: '200px' }}>
                                                <Image
                                                    src={attraction.image}
                                                    alt={attraction.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="card-body p-3">
                                                <h3 className="h5 mb-2">{attraction.name}</h3>
                                                <p className="text-muted small mb-3">{attraction.description}</p>
                                                <div className="small">
                                                    <div className="mb-1">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-muted" />
                                                        {attraction.location}
                                                    </div>
                                                    <div className="mb-1">
                                                        <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                                                        {attraction.phone}
                                                    </div>
                                                    {attraction.website && (
                                                        <div>
                                                            <FontAwesomeIcon icon={faGlobe} className="me-2 text-muted" />
                                                            <a href={attraction.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                                Visit Website
                                                            </a>
                                                        </div>
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
            </div>
        </CityGuideLayout>
    );
}
