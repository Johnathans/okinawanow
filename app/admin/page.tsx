'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faUsers, 
  faUserTie,
  faChartLine,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalAgencies: 0,
    newListingsThisMonth: 0
  });

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Simple check - if user exists and email matches
    if (!user) {
      setLocalLoading(false);
      return;
    }

    console.log('Checking admin access for:', user.email);
    
    if (user.email?.toLowerCase() !== 'smithjohnathanr@gmail.com') {
      console.log('Not admin, redirecting to home');
      router.push('/');
      return;
    }

    console.log('Admin access confirmed');
    setIsAdmin(true);
    setLocalLoading(false);
    
    // Set some dummy stats for now
    setStats({
      totalProperties: 15,
      totalUsers: 42,
      totalAgencies: 3,
      newListingsThisMonth: 5
    });
  }, [user, router, authLoading]);

  if (authLoading || localLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Verifying admin access...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <div className="container mt-5">Redirecting...</div>;
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Admin Dashboard</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Properties</h6>
                  <h3 className="mb-0">{stats.totalProperties}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(231, 93, 124, 0.1)' }}>
                  <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--primary-pink)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Users</h6>
                  <h3 className="mb-0">{stats.totalUsers}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(231, 93, 124, 0.1)' }}>
                  <FontAwesomeIcon icon={faUsers} style={{ color: 'var(--primary-pink)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Agencies</h6>
                  <h3 className="mb-0">{stats.totalAgencies}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(231, 93, 124, 0.1)' }}>
                  <FontAwesomeIcon icon={faUserTie} style={{ color: 'var(--primary-pink)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">New Listings (Month)</h6>
                  <h3 className="mb-0">{stats.newListingsThisMonth}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(231, 93, 124, 0.1)' }}>
                  <FontAwesomeIcon icon={faChartLine} style={{ color: 'var(--primary-pink)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Access Cards */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Properties</h5>
              <p className="card-text text-muted">View, add, edit, or remove property listings.</p>
              <div className="d-flex">
                <Link href="/admin/properties" className="btn btn-outline-secondary me-2">
                  View All Properties
                </Link>
                <Link href="/admin/listings/create" className="btn" style={{ backgroundColor: 'var(--primary-pink)', color: 'white' }}>
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Add New
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text text-muted">View and manage user accounts and roles.</p>
              <Link href="/admin/users" className="btn btn-outline-secondary">
                View All Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Agencies</h5>
              <p className="card-text text-muted">View agencies and access their dashboards.</p>
              <Link href="/admin/agencies" className="btn btn-outline-secondary">
                View All Agencies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
