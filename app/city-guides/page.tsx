import Link from "next/link";
import { City } from '@/types/city';
import { cities } from "@/data/cities";
import CityCard from "@/components/CityCard";
import CityGuideCard from "@/components/CityGuideCard";
import StatsSection from "@/components/StatsSection";

export default function CitiesPage() {
    // Featured cities (Chatan, Yomitan, Kitanakagusuku)
    const allCities = cities as City[];
    const featuredCities = allCities
        .filter(city => ['chatan', 'yomitan', 'kitanakagusuku'].includes(city.id))
        .sort((a, b) => 
            ['chatan', 'yomitan', 'kitanakagusuku'].indexOf(a.id) - 
            ['chatan', 'yomitan', 'kitanakagusuku'].indexOf(b.id)
        );

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="position-relative py-5">
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ 
                        backgroundColor: 'var(--light-pink)',
                        opacity: 0.8,
                        zIndex: 1
                    }}
                />
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{
                        backgroundImage: 'url(/images/attractions/okinawa-aerial.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.1,
                        zIndex: 0
                    }}
                />
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--primary-pink)' }}>
                                Find Your Perfect Neighborhood
                            </h1>
                            <p className="lead mb-4" style={{ color: 'var(--dark-grey)' }}>
                                Explore comprehensive guides to Okinawa's most desirable areas. 
                                From local insights to property availability, we'll help you find your ideal location.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <Link 
                                    href="/listings"
                                    className="btn btn-lg px-4"
                                    style={{
                                        backgroundColor: 'var(--primary-pink)',
                                        color: 'white',
                                        borderRadius: '50px'
                                    }}
                                >
                                    View All Listings
                                </Link>
                                <Link 
                                    href="#featured"
                                    className="btn btn-lg px-4"
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'var(--primary-pink)',
                                        borderRadius: '50px'
                                    }}
                                >
                                    Explore Cities
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-5 bg-white">
                <div className="container">
                    <StatsSection />
                </div>
            </div>

            {/* Featured Cities */}
            <div id="featured" className="py-5 bg-white">
                <div className="container">
                    <div className="row align-items-end mb-4">
                        <div className="col">
                            <h2 className="h3 mb-1" style={{ color: 'var(--primary-pink)' }}>Featured Cities</h2>
                            <p className="text-muted mb-0">Discover our most popular locations</p>
                        </div>
                        <div className="col-auto">
                            <Link 
                                href="#all-cities"
                                className="btn"
                                style={{
                                    backgroundColor: 'var(--light-pink)',
                                    color: 'var(--primary-pink)',
                                    borderRadius: '50px'
                                }}
                            >
                                View All Cities
                            </Link>
                        </div>
                    </div>
                    <div className="row g-4">
                        {featuredCities.map((city) => (
                            <div key={city.id} className="col-md-4">
                                <CityCard city={city} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div id="all-cities" className="py-5" style={{ backgroundColor: 'var(--light-pink)' }}>
                <div className="container-fluid px-4">
                    <div className="text-center mb-5">
                        <h2 className="h3 mb-2" style={{ color: 'var(--primary-pink)' }}>Explore All Cities</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Discover detailed guides for each city, including local insights, 
                            available properties, and neighborhood information
                        </p>
                    </div>

                    <div className="row g-4">
                        {allCities.map((city) => (
                            <div key={city.id} className="col-md-6 col-lg-4">
                                <CityGuideCard city={city} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="h3 mb-4" style={{ color: 'var(--primary-pink)' }}>
                                Ready to Find Your New Home?
                            </h2>
                            <div className="d-flex justify-content-center gap-3">
                                <Link 
                                    href="/listings"
                                    className="btn btn-lg px-4"
                                    style={{
                                        backgroundColor: 'var(--primary-pink)',
                                        color: 'white',
                                        borderRadius: '50px'
                                    }}
                                >
                                    Browse Properties
                                </Link>
                                <Link 
                                    href="/contact"
                                    className="btn btn-lg px-4"
                                    style={{
                                        backgroundColor: 'var(--light-pink)',
                                        color: 'var(--primary-pink)',
                                        borderRadius: '50px'
                                    }}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
