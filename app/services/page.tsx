import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome,
    faSearch,
    faHandshake,
    faLanguage,
    faShieldAlt,
    faUserClock
} from '@fortawesome/free-solid-svg-icons';

const ServicesPage = () => {
    const services = [
        {
            icon: faHome,
            title: "Property Listings",
            description: "Access our extensive database of high-quality rental properties across Okinawa, carefully curated to meet military housing standards."
        },
        {
            icon: faSearch,
            title: "Property Search Assistance",
            description: "Get personalized help finding the perfect home that matches your preferences, budget, and location requirements."
        },
        {
            icon: faHandshake,
            title: "Agency Partnerships",
            description: "Work with our network of trusted housing agencies that specialize in serving the military community in Okinawa."
        },
        {
            icon: faLanguage,
            title: "Bilingual Support",
            description: "Navigate the rental process smoothly with our bilingual support services, bridging any language barriers."
        },
        {
            icon: faShieldAlt,
            title: "Military Housing Compliance",
            description: "All our listed properties meet military housing standards and are approved for service members."
        },
        {
            icon: faUserClock,
            title: "24/7 Online Access",
            description: "Browse, save, and manage your property searches anytime, anywhere through our user-friendly platform."
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-4">Our Services</h1>
                <p className="lead text-muted">
                    Making your transition to Okinawa easier with comprehensive housing solutions
                </p>
            </div>

            <div className="row g-4">
                {services.map((service, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <FontAwesomeIcon 
                                        icon={service.icon} 
                                        className="fa-2x"
                                        style={{ color: 'var(--primary-pink)' }}
                                    />
                                </div>
                                <h3 className="h5 text-center mb-3">{service.title}</h3>
                                <p className="text-muted mb-0 text-center">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
