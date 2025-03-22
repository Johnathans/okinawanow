"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faSort,
    faSortUp,
    faSortDown,
    faChevronRight,
    faSearch,
    faBuilding,
    faHandshake,
    faLanguage
} from "@fortawesome/free-solid-svg-icons";
import { agencies } from "@/data/agencies";

type SortKey = "name" | "location";
type SortOrder = "asc" | "desc";

export default function AgenciesPage() {
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const getSortIcon = (key: SortKey) => {
        if (sortKey !== key) return faSort;
        return sortOrder === "asc" ? faSortUp : faSortDown;
    };

    const filteredAndSortedAgencies = Object.values(agencies)
        .filter(agency => 
            agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agency.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortKey].toLowerCase();
            const bValue = b[sortKey].toLowerCase();
            return sortOrder === "asc" 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });

    return (
        <>
            {/* Hero Section */}
            <div 
                className="py-5 mb-5" 
                style={{ 
                    background: 'var(--light-pink)',
                    borderRadius: '0 0 40px 40px'
                }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--dark-grey)' }}>
                                Find Your Perfect Housing Agency
                            </h1>
                            <p className="lead mb-4" style={{ color: 'var(--dark-grey)' }}>
                                Connect with trusted housing agencies that understand military life in Okinawa. 
                                Get personalized support for your housing search.
                            </p>
                            
                            {/* Search Bar */}
                            <div className="position-relative">
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text border-0 bg-white">
                                        <FontAwesomeIcon icon={faSearch} className="text-muted" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-0 py-3"
                                        placeholder="Search by name, location, or address..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ boxShadow: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Stats & Features */}
                        <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="card border-0 bg-white bg-opacity-90 p-4" style={{ borderRadius: '16px' }}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-pink)', width: '48px', height: '48px' }}>
                                                <FontAwesomeIcon icon={faBuilding} style={{ color: 'white', fontSize: '1.25rem' }} />
                                            </div>
                                            <h3 className="h5 mb-0 ms-3" style={{ color: 'var(--dark-grey)' }}>{Object.keys(agencies).length} Agencies</h3>
                                        </div>
                                        <p className="mb-0 small" style={{ color: 'var(--dark-grey)' }}>
                                            Trusted housing agencies across Okinawa
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card border-0 bg-white bg-opacity-90 p-4" style={{ borderRadius: '16px' }}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-pink)', width: '48px', height: '48px' }}>
                                                <FontAwesomeIcon icon={faLanguage} style={{ color: 'white', fontSize: '1.25rem' }} />
                                            </div>
                                            <h3 className="h5 mb-0 ms-3" style={{ color: 'var(--dark-grey)' }}>Bilingual Support</h3>
                                        </div>
                                        <p className="mb-0 small" style={{ color: 'var(--dark-grey)' }}>
                                            English & Japanese speaking staff
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card border-0 bg-white bg-opacity-90 p-4" style={{ borderRadius: '16px' }}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-pink)', width: '48px', height: '48px' }}>
                                                <FontAwesomeIcon icon={faHandshake} style={{ color: 'white', fontSize: '1.25rem' }} />
                                            </div>
                                            <h3 className="h5 mb-0 ms-3" style={{ color: 'var(--dark-grey)' }}>Military-Friendly</h3>
                                        </div>
                                        <p className="mb-0 small" style={{ color: 'var(--dark-grey)' }}>
                                            Specialized in military housing allowance & requirements
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container pb-5">
                {/* Results Count */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="text-muted mb-0">
                        Showing {filteredAndSortedAgencies.length} agencies
                        {searchTerm && " matching your search"}
                    </p>
                </div>

                {/* Agencies List */}
                <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                    {/* Header */}
                    <div className="card-header bg-white py-4 border-0">
                        <div className="row align-items-center mx-2">
                            <div className="col-5">
                                <button 
                                    className="btn btn-link text-decoration-none p-0"
                                    onClick={() => handleSort("name")}
                                    style={{ color: 'var(--primary-pink)' }}
                                >
                                    <span className="fw-bold">Agency Name</span>
                                    <FontAwesomeIcon 
                                        icon={getSortIcon("name")} 
                                        className="ms-2"
                                        style={{ width: '12px' }}
                                    />
                                </button>
                            </div>
                            <div className="col-3">
                                <button 
                                    className="btn btn-link text-decoration-none p-0"
                                    onClick={() => handleSort("location")}
                                    style={{ color: 'var(--primary-pink)' }}
                                >
                                    <span className="fw-bold">Location</span>
                                    <FontAwesomeIcon 
                                        icon={getSortIcon("location")} 
                                        className="ms-2"
                                        style={{ width: '12px' }}
                                    />
                                </button>
                            </div>
                            <div className="col-4">
                                <span className="fw-bold" style={{ color: 'var(--primary-pink)' }}>Address</span>
                            </div>
                        </div>
                    </div>

                    {/* List Items */}
                    <div className="card-body p-0">
                        {filteredAndSortedAgencies.length > 0 ? (
                            filteredAndSortedAgencies.map((agency, index) => (
                                <Link 
                                    href={`/agencies/${agency.id}`}
                                    key={agency.id}
                                    className="text-decoration-none"
                                >
                                    <div 
                                        className={`row align-items-center mx-2 py-4 ${index !== filteredAndSortedAgencies.length - 1 ? 'border-bottom' : ''} p-4 rounded cursor-pointer hover:bg-pink-50`}
                                        style={{ 
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <div className="col-5">
                                            <h3 className="h6 mb-0" style={{ color: 'var(--primary-pink)' }}>
                                                {agency.name}
                                            </h3>
                                        </div>
                                        <div className="col-3">
                                            <div className="d-flex align-items-center text-muted">
                                                <FontAwesomeIcon 
                                                    icon={faMapMarkerAlt} 
                                                    className="me-2" 
                                                    style={{ color: 'var(--primary-pink)' }} 
                                                />
                                                {agency.location}
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex align-items-center justify-content-between">
                                            <span className="text-muted">{agency.address}</span>
                                            <FontAwesomeIcon 
                                                icon={faChevronRight} 
                                                style={{ color: 'var(--primary-pink)' }} 
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted mb-0">No agencies found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .agency-row:hover {
                    background-color: var(--light-pink) !important;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}
