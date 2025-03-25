"use client";

import Link from "next/link";
import { cities } from "@/data/cities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function CityGuidesMegaMenu({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div 
            className="position-absolute w-100 start-0 py-4"
            style={{ 
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderTop: '1px solid var(--light-grey)',
                top: '100%',
                zIndex: 1000
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--light-pink)' }}>
                            <h5 className="mb-2 text-dark">Explore Okinawa</h5>
                            <p className="mb-0" style={{ fontSize: '0.9rem', color: '#636e72' }}>
                                Discover the perfect area for your new home in Okinawa. Each area guide includes local insights, amenities, and nearby bases.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="row g-2">
                            {cities.map((city) => (
                                <div key={city.id} className="col-lg-4 col-6">
                                    <Link 
                                        href={`/area-guides/${city.id}`}
                                        className="text-decoration-none"
                                        onClick={onClose}
                                    >
                                        <div 
                                            className="d-flex align-items-center gap-2 p-2 rounded-3 transition-all"
                                            style={{ color: '#2d3436' }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--light-pink)';
                                                e.currentTarget.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'var(--primary-pink)' }} />
                                            <span className="fw-medium">{city.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
