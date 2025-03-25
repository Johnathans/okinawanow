'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const stats = [
    { icon: faBuilding, title: '6 Cities', subtitle: 'Unique locations to explore', count: '6', href: '#all-cities' },
    { icon: faMapMarkerAlt, title: '250+ Listings', subtitle: 'Available properties', count: '253', href: '/listings' },
    { icon: faUsers, title: '15+ Agencies', subtitle: 'Ready to help you', count: '15', href: '/agencies' }
];

export default function StatsSection() {
    return (
        <div className="row g-4">
            {stats.map((stat, index) => (
                <div key={index} className="col-md-4">
                    <Link 
                        href={stat.href}
                        className="text-decoration-none"
                    >
                        <div 
                            className="h-100 p-4 rounded-4"
                            style={{
                                backgroundColor: 'var(--light-pink)',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-circle me-3"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <FontAwesomeIcon 
                                        icon={stat.icon}
                                        style={{ 
                                            fontSize: '20px',
                                            color: 'var(--primary-pink)'
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="h5 mb-1" style={{ color: 'var(--primary-pink)' }}>
                                        {stat.title}
                                    </h3>
                                    <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
