'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    onSnapshot,
    orderBy,
    limit 
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome,
    faUsers,
    faMessage,
    faCalendarAlt,
    faClock,
    faMapMarkerAlt,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    faBell,
    faChevronRight,
    faEdit,
    faEye,
    faYen,
    faChartLine,
    faCheck,
    faTimes
} from "@fortawesome/free-solid-svg-icons";

interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    status: 'Active' | 'Pending' | 'Sold';
    views: number;
    inquiries: number;
    lastUpdated: string;
}

interface TourRequest {
    id: string;
    propertyTitle: string;
    location: string;
    date: string;
    time: string;
    image: string;
    client: string;
    status: 'Confirmed' | 'Pending';
}

interface Inquiry {
    id: string;
    client: string;
    property: string;
    message: string;
    time: string;
    status: 'New' | 'Responded';
}

interface Activity {
    id: string;
    type: string;
    details: string;
    time: string;
}

export default function AgencyDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState<Property[]>([]);
    const [tourRequests, setTourRequests] = useState<TourRequest[]>([]);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [stats, setStats] = useState({
        activeListings: 0,
        totalClients: 0,
        newInquiries: 0,
        monthlyViews: 0
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchDashboardData(user.uid);
            } else {
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const fetchDashboardData = async (userId: string) => {
        try {
            // Fetch Properties
            const propertiesQuery = query(
                collection(db, 'listings'),
                where('agencyId', '==', userId),
                orderBy('lastUpdated', 'desc'),
                limit(5)
            );
            
            const propertiesUnsubscribe = onSnapshot(propertiesQuery, (snapshot) => {
                const propertiesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Property));
                setProperties(propertiesData);
                
                // Update stats
                setStats(prev => ({
                    ...prev,
                    activeListings: propertiesData.filter(p => p.status === 'Active').length
                }));
            });

            // Fetch Tour Requests
            const toursQuery = query(
                collection(db, 'tourRequests'),
                where('agencyId', '==', userId),
                where('status', '==', 'Pending'),
                orderBy('createdAt', 'desc'),
                limit(5)
            );

            const toursUnsubscribe = onSnapshot(toursQuery, (snapshot) => {
                const toursData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as TourRequest));
                setTourRequests(toursData);
            });

            // Fetch Inquiries
            const inquiriesQuery = query(
                collection(db, 'inquiries'),
                where('agencyId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(5)
            );

            const inquiriesUnsubscribe = onSnapshot(inquiriesQuery, (snapshot) => {
                const inquiriesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Inquiry));
                setInquiries(inquiriesData);
                
                // Update stats
                setStats(prev => ({
                    ...prev,
                    newInquiries: inquiriesData.filter(i => i.status === 'New').length
                }));
            });

            // Fetch Activities
            const activitiesQuery = query(
                collection(db, 'activities'),
                where('agencyId', '==', userId),
                orderBy('timestamp', 'desc'),
                limit(5)
            );

            const activitiesUnsubscribe = onSnapshot(activitiesQuery, (snapshot) => {
                const activitiesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Activity));
                setActivities(activitiesData);
            });

            // Fetch Stats
            const fetchStats = async () => {
                // Get total clients
                const clientsQuery = query(
                    collection(db, 'clients'),
                    where('agencyId', '==', userId)
                );
                const clientsSnap = await getDocs(clientsQuery);
                
                // Get monthly views
                const now = new Date();
                const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const viewsQuery = query(
                    collection(db, 'propertyViews'),
                    where('agencyId', '==', userId),
                    where('timestamp', '>=', firstDayOfMonth)
                );
                const viewsSnap = await getDocs(viewsQuery);

                setStats(prev => ({
                    ...prev,
                    totalClients: clientsSnap.size,
                    monthlyViews: viewsSnap.size
                }));
            };
            fetchStats();

            // Cleanup function
            return () => {
                propertiesUnsubscribe();
                toursUnsubscribe();
                inquiriesUnsubscribe();
                activitiesUnsubscribe();
            };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-vh-100">
            {/* Welcome Section */}
            <div className="py-4" style={{ backgroundColor: '#fdf2f4' }}>
                <div className="container">
                    <div className="d-flex align-items-center gap-3">
                        <div 
                            className="rounded-circle overflow-hidden flex-shrink-0"
                            style={{ width: '48px', height: '48px' }}
                        >
                            <Image
                                src={user?.photoURL || '/images/default-avatar.png'}
                                alt="Profile"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div>
                            <h1 className="h4 mb-0">Welcome Back, {user?.displayName || 'Agent'}</h1>
                            <p className="text-muted small mb-0">
                                Here's your property management overview
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                {/* Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div 
                            className="card border-0 h-100 shadow-sm rounded-4"
                            style={{ backgroundColor: '#fdf2f4' }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div 
                                        className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faHome} 
                                            style={{ 
                                                color: '#e75d7c',
                                                fontSize: '1.2rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-muted small">Active Listings</div>
                                        <div className="h4 mb-0">{stats.activeListings}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card border-0 h-100 shadow-sm rounded-4"
                            style={{ backgroundColor: '#fdf2f4' }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div 
                                        className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faUsers} 
                                            style={{ 
                                                color: '#e75d7c',
                                                fontSize: '1.2rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-muted small">Total Clients</div>
                                        <div className="h4 mb-0">{stats.totalClients}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card border-0 h-100 shadow-sm rounded-4"
                            style={{ backgroundColor: '#fdf2f4' }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div 
                                        className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faMessage} 
                                            style={{ 
                                                color: '#e75d7c',
                                                fontSize: '1.2rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-muted small">New Inquiries</div>
                                        <div className="h4 mb-0">{stats.newInquiries}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card border-0 h-100 shadow-sm rounded-4"
                            style={{ backgroundColor: '#fdf2f4' }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div 
                                        className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '40px', 
                                            height: '40px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faChartLine} 
                                            style={{ 
                                                color: '#e75d7c',
                                                fontSize: '1.2rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-muted small">Monthly Views</div>
                                        <div className="h4 mb-0">{stats.monthlyViews}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Main Content */}
                    <div className="col-lg-8">
                        {/* Tour Requests */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Tour Requests</h2>
                                    <Link 
                                        href="/agency-dashboard/tours"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#fdf2f4',
                                            color: '#e75d7c',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Client</th>
                                                <th>Property</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tourRequests.map((viewing) => (
                                                <tr key={viewing.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="ms-2">
                                                                {viewing.client}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{viewing.propertyTitle}</td>
                                                    <td>
                                                        <div className="small">
                                                            <div>{viewing.date}</div>
                                                            <div className="text-muted">{viewing.time}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span 
                                                            className="px-3 py-1 rounded-pill" 
                                                            style={{ 
                                                                backgroundColor: viewing.status === 'Confirmed' ? '#ebf9f1' : '#fdf2f4',
                                                                color: viewing.status === 'Confirmed' ? '#198754' : '#e75d7c',
                                                                border: `1px solid ${viewing.status === 'Confirmed' ? '#a3e0c0' : '#f4c6ce'}`,
                                                                fontSize: '0.875rem'
                                                            }}
                                                        >
                                                            {viewing.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button 
                                                                className="btn btn-sm"
                                                                style={{
                                                                    backgroundColor: '#fdf2f4',
                                                                    color: '#e75d7c',
                                                                    borderRadius: '8px'
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                                                Confirm
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-secondary ms-2"
                                                                style={{ borderRadius: '8px' }}
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="me-2" />
                                                                Decline
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Property Listings */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Property Listings</h2>
                                    <Link 
                                        href="/agency-dashboard/properties"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#fdf2f4',
                                            color: '#e75d7c',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {properties.map((property) => (
                                        <div 
                                            key={property.id}
                                            className="card border-0 shadow-sm rounded-4"
                                        >
                                            <div className="card-body p-3">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <div 
                                                            className="rounded-4 overflow-hidden"
                                                            style={{ width: '120px', height: '90px', position: 'relative' }}
                                                        >
                                                            <Image
                                                                src={property.image}
                                                                alt={property.title}
                                                                fill
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <h3 className="h6 mb-0">{property.title}</h3>
                                                            <span 
                                                                className="badge rounded-pill"
                                                                style={{
                                                                    backgroundColor: property.status === 'Active' ? '#fdf2f4' : '#f8f9fa',
                                                                    color: property.status === 'Active' ? '#e75d7c' : '#6c757d'
                                                                }}
                                                            >
                                                                {property.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-muted small mb-2">
                                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                                            {property.location}
                                                        </div>
                                                        <div className="d-flex gap-3 text-muted small">
                                                            <div>
                                                                <FontAwesomeIcon icon={faYen} className="me-1" />
                                                                {property.price.toLocaleString()}/month
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon icon={faEye} className="me-1" />
                                                                {property.views} views
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon icon={faMessage} className="me-1" />
                                                                {property.inquiries} inquiries
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link 
                                                            href={`/agency-dashboard/properties/${property.id}/edit`}
                                                            className="btn btn-sm mb-2 d-block"
                                                            style={{
                                                                backgroundColor: '#fdf2f4',
                                                                color: '#e75d7c',
                                                                borderRadius: '50px'
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                            Edit
                                                        </Link>
                                                        <Link 
                                                            href={`/agency-dashboard/properties/${property.id}/stats`}
                                                            className="btn btn-sm d-block"
                                                            style={{
                                                                backgroundColor: '#fdf2f4',
                                                                color: '#e75d7c',
                                                                borderRadius: '50px'
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faChartLine} className="me-1" />
                                                            Stats
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Viewings */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Upcoming Viewings</h2>
                                    <Link 
                                        href="/agency-dashboard/viewings"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#fdf2f4',
                                            color: '#e75d7c',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {tourRequests.map((viewing) => (
                                        <div 
                                            key={viewing.id}
                                            className="card border-0 shadow-sm rounded-4"
                                        >
                                            <div className="card-body p-3">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <div 
                                                            className="rounded-4 overflow-hidden"
                                                            style={{ width: '100px', height: '80px', position: 'relative' }}
                                                        >
                                                            <Image
                                                                src={viewing.image}
                                                                alt={viewing.propertyTitle}
                                                                fill
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <h3 className="h6 mb-0">{viewing.propertyTitle}</h3>
                                                            <span 
                                                                className="badge rounded-pill"
                                                                style={{
                                                                    backgroundColor: viewing.status === 'Confirmed' ? '#ebf9f1' : '#fdf2f4',
                                                                    color: viewing.status === 'Confirmed' ? '#198754' : '#e75d7c',
                                                                    border: `1px solid ${viewing.status === 'Confirmed' ? '#a3e0c0' : '#f4c6ce'}`,
                                                                    fontSize: '0.875rem'
                                                                }}
                                                            >
                                                                {viewing.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-muted small mb-2">
                                                            <FontAwesomeIcon icon={faUsers} className="me-1" />
                                                            {viewing.client}
                                                        </div>
                                                        <div className="d-flex gap-3 text-muted small">
                                                            <div>
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                                                {viewing.date}
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon icon={faClock} className="me-1" />
                                                                {viewing.time}
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                                                {viewing.location}
                                                            </div>
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
                        {/* New Inquiries */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">New Inquiries</h2>
                                    <Link 
                                        href="/agency-dashboard/inquiries"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#fdf2f4',
                                            color: '#e75d7c',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {inquiries.map((inquiry) => (
                                        <div 
                                            key={inquiry.id}
                                            className="d-flex align-items-center p-3 rounded-4"
                                            style={{
                                                backgroundColor: inquiry.status === 'New' ? '#fdf2f4' : 'transparent'
                                            }}
                                        >
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="fw-medium">{inquiry.client}</span>
                                                    <span className="text-muted small">{inquiry.time}</span>
                                                </div>
                                                <div className="text-muted small mb-1">{inquiry.property}</div>
                                                <div className="text-muted small">{inquiry.message}</div>
                                            </div>
                                            <FontAwesomeIcon 
                                                icon={faChevronRight} 
                                                className="ms-3"
                                                style={{ color: '#e75d7c' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Recent Activity</h2>
                                    <Link 
                                        href="/agency-dashboard/activity"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: '#fdf2f4',
                                            color: '#e75d7c',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {activities.map((activity) => (
                                        <div 
                                            key={activity.id}
                                            className="d-flex align-items-center p-3 rounded-4"
                                            style={{ backgroundColor: '#fdf2f4' }}
                                        >
                                            <div className="flex-grow-1">
                                                <div className="fw-medium mb-1">{activity.type}</div>
                                                <div className="text-muted small">{activity.details}</div>
                                                <div className="text-muted small mt-1">{activity.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
