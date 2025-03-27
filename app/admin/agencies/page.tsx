'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faUserTie,
  faEye,
  faExternalLinkAlt,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Agency {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  listingCount?: number;
}

export default function AdminAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!user) {
      setLoading(false);
      return;
    }

    console.log('Checking admin access for agencies page:', user.email);
    
    if (user.email?.toLowerCase() !== 'smithjohnathanr@gmail.com') {
      console.log('Not admin, redirecting to home from agencies page');
      setError('You do not have admin privileges');
      router.push('/');
      return;
    }
    
    console.log('Admin access confirmed for agencies page');
    // Fetch agencies
    fetchAgencies();
  }, [user, router]);

  const fetchAgencies = async () => {
    try {
      console.log('Fetching agencies...');
      
      // Get all users with role 'agency'
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'agency'));
      console.log('Querying users with role agency');
      const usersSnapshot = await getDocs(usersQuery);
      console.log('Users with role agency:', usersSnapshot.docs.length);
      
      const agencyIds = usersSnapshot.docs.map(doc => doc.id);
      
      // Also check the agencies collection directly for any agencies that might not have the role set
      console.log('Querying agencies collection directly');
      const agenciesCollection = collection(db, 'agencies');
      const agenciesSnapshot = await getDocs(agenciesCollection);
      console.log('Agencies in collection:', agenciesSnapshot.docs.length);
      
      // Combine both sets of IDs, removing duplicates
      const allAgencyIds = [...new Set([
        ...agencyIds,
        ...agenciesSnapshot.docs.map(doc => doc.id)
      ])];
      console.log('Total unique agency IDs:', allAgencyIds.length);
      
      // Get agency details from agencies collection
      const agenciesData: Agency[] = [];
      
      for (const agencyId of allAgencyIds) {
        console.log('Processing agency ID:', agencyId);
        try {
          // Get agency details
          const agencyRef = doc(db, 'agencies', agencyId);
          const agencySnap = await getDoc(agencyRef);
          
          if (agencySnap.exists()) {
            const agencyData = agencySnap.data();
            
            // Get listing count
            const listingsQuery = query(collection(db, 'listings'), where('agencyId', '==', agencyId));
            const listingsSnapshot = await getDocs(listingsQuery);
            
            agenciesData.push({
              id: agencyId,
              name: agencyData.name || 'Unnamed Agency',
              email: agencyData.email || '',
              phone: agencyData.phone || '',
              address: agencyData.address || '',
              createdAt: agencyData.createdAt || '',
              updatedAt: agencyData.updatedAt || '',
              listingCount: listingsSnapshot.size
            });
          }
        } catch (agencyError) {
          console.error(`Error processing agency ${agencyId}:`, agencyError);
          // Continue with next agency
        }
      }
      
      console.log('Finished processing agencies, total:', agenciesData.length);
      setAgencies(agenciesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agencies:', error);
      
      // Create a dummy agency for testing if no agencies were found
      if (process.env.NODE_ENV === 'development') {
        console.log('Creating dummy test agency for development');
        setAgencies([{
          id: 'test-agency-id',
          name: 'Test Agency (Dev)',
          email: 'test@example.com',
          phone: '+81-98-123-4567',
          address: 'Chatan, Okinawa',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          listingCount: 0
        }]);
      }
      
      setError('An error occurred while fetching agencies. Check console for details.');
      setLoading(false);
    }
  };

  // Function to access agency dashboard as admin
  const accessAgencyDashboard = (agencyId: string) => {
    console.log('Accessing agency dashboard for:', agencyId);
    
    // For the test agency, we'll handle it differently
    if (agencyId === 'test-agency-id') {
      console.log('Setting up test agency mode');
      // Store impersonation data in sessionStorage
      sessionStorage.setItem('adminAccessToken', user?.uid || 'admin');
      sessionStorage.setItem('impersonatingAgency', agencyId);
      sessionStorage.setItem('testAgencyMode', 'true');
      
      // Navigate directly to the agency dashboard
      window.location.href = '/agency-dashboard';
      return;
    }
    
    // For regular agencies, use the impersonation route
    window.open(`/admin/impersonate-agency/${agencyId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading agencies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
          <div className="mt-2">
            <button 
              className="btn btn-sm btn-primary" 
              onClick={() => {
                setError(null);
                fetchAgencies();
              }}
            >
              Try Again
            </button>
            <button 
              className="btn btn-sm btn-secondary ms-2" 
              onClick={() => {
                // Create a dummy agency for testing
                setAgencies([{
                  id: 'test-agency-id',
                  name: 'Test Agency (Dev)',
                  email: 'test@example.com',
                  phone: '+81-98-123-4567',
                  address: 'Chatan, Okinawa',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  listingCount: 0
                }]);
                setError(null);
              }}
            >
              Use Test Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Agency Management</h1>
        <Link href="/admin" className="btn btn-outline-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faBuilding} className="text-primary" />
                </div>
                <div>
                  <h5 className="card-title mb-0">{agencies.length}</h5>
                  <p className="card-text text-muted">Total Agencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faUserTie} className="text-success" />
                </div>
                <div>
                  <h5 className="card-title mb-0">
                    {agencies.filter(agency => agency.listingCount && agency.listingCount > 0).length}
                  </h5>
                  <p className="card-text text-muted">Active Agencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle p-3 me-3" style={{ backgroundColor: 'rgba(231, 93, 124, 0.1)' }}>
                  <FontAwesomeIcon icon={faEye} style={{ color: 'var(--primary-pink)' }} />
                </div>
                <div>
                  <h5 className="card-title mb-0">
                    {agencies.reduce((total, agency) => total + (agency.listingCount || 0), 0)}
                  </h5>
                  <p className="card-text text-muted">Total Listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Agency Accounts</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Agency</th>
                  <th>Contact</th>
                  <th>Listings</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agencies.length > 0 ? (
                  agencies.map(agency => (
                    <tr key={agency.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              backgroundColor: 'var(--light-pink)',
                              color: 'var(--primary-pink)'
                            }}
                          >
                            <FontAwesomeIcon icon={faBuilding} />
                          </div>
                          <div>
                            <p className="mb-0 fw-medium">{agency.name}</p>
                            <small className="text-muted">{agency.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="mb-1">
                            <FontAwesomeIcon icon={faEnvelope} className="text-muted me-2" size="sm" />
                            {agency.email}
                          </div>
                          {agency.phone && (
                            <div className="mb-1">
                              <FontAwesomeIcon icon={faPhone} className="text-muted me-2" size="sm" />
                              {agency.phone}
                            </div>
                          )}
                          {agency.address && (
                            <div>
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-2" size="sm" />
                              {agency.address}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {agency.listingCount || 0} listings
                        </span>
                      </td>
                      <td>{agency.createdAt ? new Date(agency.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => accessAgencyDashboard(agency.id)}
                          title="Access agency dashboard"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="me-1" />
                          Access Dashboard
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No agencies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
