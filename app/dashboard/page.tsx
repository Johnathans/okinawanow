'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, 
    faHeart, 
    faMessage, 
    faCalendarAlt,
    faClock,
    faMapMarkerAlt,
    faBell,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

// This would come from your API/database
const savedProperties = [
    {
        id: 'prop1',
        title: 'Modern Apartment in Chatan',
        location: 'Chatan',
        price: 150000,
        image: '/images/properties/chatan-1.jpg',
        savedDate: '2025-03-01'
    },
    {
        id: 'prop2',
        title: 'Family Home in Yomitan',
        location: 'Yomitan',
        price: 200000,
        image: '/images/properties/yomitan-1.jpg',
        savedDate: '2025-03-05'
    }
];

const upcomingViewings = [
    {
        id: 'view1',
        propertyTitle: 'Beachfront Studio',
        location: 'Chatan',
        date: '2025-03-10',
        time: '14:00',
        image: '/images/properties/chatan-3.jpg',
        agent: 'Sarah Wilson'
    },
    {
        id: 'view2',
        propertyTitle: 'Modern Family Home',
        location: 'Kitanakagusuku',
        date: '2025-03-12',
        time: '11:00',
        image: '/images/properties/kitanakagusuku-1.jpg',
        agent: 'John Smith'
    }
];

const recentMessages = [
    {
        id: 'msg1',
        from: 'Sarah Wilson',
        message: 'Your viewing for Beachfront Studio is confirmed',
        time: '2 hours ago',
        unread: true
    },
    {
        id: 'msg2',
        from: 'Property Support',
        message: 'New properties matching your criteria',
        time: '1 day ago',
        unread: false
    }
];

const notifications = [
    {
        id: 'notif1',
        title: 'Price Update',
        message: 'Price reduced for Modern Apartment in Chatan',
        time: '3 hours ago',
        type: 'price'
    },
    {
        id: 'notif2',
        title: 'New Property',
        message: 'New listing added in Yomitan matching your preferences',
        time: '1 day ago',
        type: 'new'
    }
];

interface UserData extends User {
  role?: string;
  displayName: string;
  email: string;
  uid: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/login');
                return;
            }

            // Get user role from Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                setUser({
                    ...currentUser,
                    role: userDoc.data().role
                } as UserData);
            } else {
                setUser(currentUser as UserData);
            }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const stats = [
        { icon: faHome, label: 'Saved Properties', value: '12' },
        { icon: faCalendarAlt, label: 'Upcoming Viewings', value: '3' },
        { icon: faMessage, label: 'Unread Messages', value: '2' },
        { icon: faHeart, label: 'Favorite Searches', value: '5' }
    ];

    return (
        <div className="bg-white min-vh-100">
            {/* Welcome Section */}
            <div className="py-4" style={{ backgroundColor: 'var(--light-pink)' }}>
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
                            <h1 className="h4 mb-0">Welcome Back, {user?.displayName || 'User'}</h1>
                            <p className="text-muted small mb-0">
                                Here's what's happening with your property search
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                {/* Stats */}
                <div className="row g-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-md-3">
                            <div 
                                className="card border-0 h-100 shadow-sm rounded-4"
                                style={{ backgroundColor: 'var(--light-pink)' }}
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
                                                icon={stat.icon} 
                                                style={{ 
                                                    color: 'var(--primary-pink)',
                                                    fontSize: '1.2rem'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className="text-muted small">{stat.label}</div>
                                            <div className="h4 mb-0">{stat.value}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row g-4">
                    {/* Main Content */}
                    <div className="col-lg-8">
                        {/* Upcoming Viewings */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Upcoming Viewings</h2>
                                    <Link 
                                        href="/dashboard/viewings"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: 'var(--light-pink)',
                                            color: 'var(--primary-pink)',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {upcomingViewings.map((viewing) => (
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
                                                        <h3 className="h6 mb-1">{viewing.propertyTitle}</h3>
                                                        <div className="text-muted small mb-2">
                                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                                            {viewing.location}
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
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button 
                                                            className="btn btn-sm"
                                                            style={{
                                                                backgroundColor: 'var(--light-pink)',
                                                                color: 'var(--primary-pink)',
                                                                borderRadius: '50px'
                                                            }}
                                                        >
                                                            Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Saved Properties */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Saved Properties</h2>
                                    <Link 
                                        href="/dashboard/saved"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: 'var(--light-pink)',
                                            color: 'var(--primary-pink)',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="row g-4">
                                    {savedProperties.map((property) => (
                                        <div key={property.id} className="col-md-6">
                                            <Link 
                                                href={`/listings/${property.id}`}
                                                className="card h-100 border-0 shadow-sm rounded-4 text-decoration-none"
                                            >
                                                <div 
                                                    className="position-relative rounded-top-4"
                                                    style={{ height: '160px' }}
                                                >
                                                    <Image
                                                        src={property.image}
                                                        alt={property.title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        className="rounded-top-4"
                                                    />
                                                    <div 
                                                        className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill"
                                                        style={{ 
                                                            backgroundColor: 'var(--primary-pink)',
                                                            color: 'white',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        ¥{property.price.toLocaleString()}/month
                                                    </div>
                                                </div>
                                                <div className="card-body p-3">
                                                    <h3 className="h6 mb-2" style={{ color: 'var(--dark-grey)' }}>
                                                        {property.title}
                                                    </h3>
                                                    <div className="text-muted small">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                                        {property.location}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        {/* Messages */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Recent Messages</h2>
                                    <Link 
                                        href="/dashboard/messages"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: 'var(--light-pink)',
                                            color: 'var(--primary-pink)',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {recentMessages.map((message) => (
                                        <div 
                                            key={message.id}
                                            className="d-flex align-items-center p-3 rounded-4"
                                            style={{
                                                backgroundColor: message.unread ? 'var(--light-pink)' : 'transparent'
                                            }}
                                        >
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span className="fw-medium">{message.from}</span>
                                                    <span className="text-muted small">{message.time}</span>
                                                </div>
                                                <div className="text-muted small">{message.message}</div>
                                            </div>
                                            <FontAwesomeIcon 
                                                icon={faChevronRight} 
                                                className="ms-3"
                                                style={{ color: 'var(--primary-pink)' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="h5 mb-0">Notifications</h2>
                                    <Link 
                                        href="/dashboard/notifications"
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: 'var(--light-pink)',
                                            color: 'var(--primary-pink)',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {notifications.map((notification) => (
                                        <div 
                                            key={notification.id}
                                            className="d-flex align-items-center p-3 rounded-4"
                                            style={{ backgroundColor: 'var(--light-pink)' }}
                                        >
                                            <div 
                                                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px',
                                                    backgroundColor: 'white'
                                                }}
                                            >
                                                <FontAwesomeIcon 
                                                    icon={faBell} 
                                                    style={{ 
                                                        color: 'var(--primary-pink)',
                                                        fontSize: '1.2rem'
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="fw-medium mb-1">{notification.title}</div>
                                                <div className="text-muted small">{notification.message}</div>
                                                <div className="text-muted small mt-1">{notification.time}</div>
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
