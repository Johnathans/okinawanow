"use client";

import Link from "next/link";
import { cities } from "@/data/cities";
import { bases } from "@/data/bases";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ListingsMegaMenu({ isOpen, onClose }: Props) {
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
            <style jsx global>{`
                .menu-item {
                    transition: all 0.15s ease;
                    transform: translateX(0);
                }
                .menu-item:hover {
                    transform: translateX(2px);
                }
                .menu-link {
                    display: block;
                    text-decoration: none;
                }
            `}</style>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5 className="mb-3 text-dark">Quick Links</h5>
                        <div className="d-flex flex-column gap-3">
                            <Link 
                                href="/listings"
                                className="menu-link"
                                onClick={onClose}
                            >
                                <div className="menu-item d-flex align-items-center gap-3 p-3 rounded-3"
                                    style={{ 
                                        backgroundColor: 'var(--light-pink)',
                                        color: '#2d3436'
                                    }}
                                >
                                    <div>
                                        <div className="fw-medium mb-1">All Listings</div>
                                        <div style={{ fontSize: '0.875rem', color: '#636e72' }}>
                                            Browse all available properties
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5 className="mb-3 text-dark">Browse by City</h5>
                        <div className="row g-2">
                            {cities.map((city) => (
                                <div key={city.id} className="col-6">
                                    <Link 
                                        href={`/listings?location=${city.id}`}
                                        className="menu-link"
                                        onClick={onClose}
                                    >
                                        <div 
                                            className="menu-item d-flex align-items-center gap-2 p-2 rounded-3"
                                            style={{ color: '#2d3436' }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--light-pink)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <span className="fw-medium">{city.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <h5 className="mb-3 text-dark">Browse by Base</h5>
                        <div className="row g-2">
                            {bases.map((base) => (
                                <div key={base.id} className="col-6">
                                    <Link 
                                        href={`/listings?nearestBase=${base.id}`}
                                        className="menu-link"
                                        onClick={onClose}
                                    >
                                        <div 
                                            className="menu-item d-flex align-items-center gap-2 p-2 rounded-3"
                                            style={{ color: '#2d3436' }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--light-pink)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <span className="fw-medium">{base.name}</span>
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
