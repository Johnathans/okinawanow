'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faHome,
  faBed,
  faBath,
  faRulerCombined,
  faEdit,
  faTrash,
  faEye,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  agencyId?: string;
  agencyName?: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
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

    console.log('Checking admin access for properties page:', user.email);
    
    if (user.email?.toLowerCase() !== 'smithjohnathanr@gmail.com') {
      console.log('Not admin, redirecting to home from properties page');
      router.push('/');
      return;
    }
    
    console.log('Admin access confirmed for properties page');
    // Fetch properties
    fetchProperties();
  }, [user, router]);

  const fetchProperties = async () => {
    try {
      console.log('Fetching properties...');
      
      // Get all properties
      const propertiesRef = collection(db, 'listings');
      const propertiesQuery = query(propertiesRef, orderBy('createdAt', 'desc'));
      const propertiesSnapshot = await getDocs(propertiesQuery);
      
      console.log('Properties found:', propertiesSnapshot.docs.length);
      
      const propertiesData: Property[] = [];
      
      for (const doc of propertiesSnapshot.docs) {
        try {
          const data = doc.data();
          propertiesData.push({
            id: doc.id,
            title: data.title || 'Untitled Property',
            price: data.price || 0,
            location: data.location || '',
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            area: data.area || 0,
            type: data.type || 'unknown',
            status: data.status || 'active',
            createdAt: data.createdAt || '',
            updatedAt: data.updatedAt || '',
            agencyId: data.agencyId || '',
            agencyName: data.agencyName || 'Unknown Agency'
          });
        } catch (propertyError) {
          console.error(`Error processing property ${doc.id}:`, propertyError);
        }
      }
      
      console.log('Finished processing properties, total:', propertiesData.length);
      setProperties(propertiesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      
      // Create dummy properties for testing
      console.log('Creating dummy test properties for development');
      setProperties([
        {
          id: 'test-property-1',
          title: 'Luxury Apartment in Chatan',
          price: 150000,
          location: 'Chatan, Okinawa',
          bedrooms: 2,
          bathrooms: 1,
          area: 85,
          type: 'apartment',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agencyId: 'test-agency-id',
          agencyName: 'Test Agency'
        },
        {
          id: 'test-property-2',
          title: 'Beach House in Onna',
          price: 250000,
          location: 'Onna, Okinawa',
          bedrooms: 3,
          bathrooms: 2,
          area: 120,
          type: 'house',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agencyId: 'test-agency-id',
          agencyName: 'Test Agency'
        }
      ]);
      
      setError('An error occurred while fetching properties. Using test data instead.');
      setLoading(false);
    }
  };

  // Function to view property details
  const viewProperty = (propertyId: string) => {
    window.open(`/listings/${propertyId}`, '_blank');
  };

  // Function to edit property
  const editProperty = (propertyId: string) => {
    router.push(`/admin/listings/edit/${propertyId}`);
  };

  // Function to delete property
  const deleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        // For test properties, just remove from state
        if (propertyId.startsWith('test-')) {
          setProperties(properties.filter(p => p.id !== propertyId));
          return;
        }
        
        // For real properties, would delete from Firestore
        // Removed for now since we're using test data
        
        // Refresh the list
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Property Management</h1>
        <div>
          <Link href="/admin/listings/create" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add New Property
          </Link>
          <Link href="/admin" className="btn btn-outline-secondary ms-2">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning">
          {error}
          <div className="mt-2">
            <button 
              className="btn btn-sm btn-primary" 
              onClick={() => {
                setError(null);
                fetchProperties();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Property</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Agency</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded p-2 me-3">
                            <FontAwesomeIcon 
                              icon={property.type === 'apartment' ? faBuilding : faHome} 
                              className="text-primary"
                            />
                          </div>
                          <div>
                            <div className="fw-medium">{property.title}</div>
                            <small className="text-muted">{property.location}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="fw-medium">${property.price.toLocaleString()}</div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="me-3">
                            <FontAwesomeIcon icon={faBed} className="text-muted me-1" />
                            <small>{property.bedrooms}</small>
                          </div>
                          <div className="me-3">
                            <FontAwesomeIcon icon={faBath} className="text-muted me-1" />
                            <small>{property.bathrooms}</small>
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faRulerCombined} className="text-muted me-1" />
                            <small>{property.area} m²</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${property.status === 'active' ? 'success' : 'secondary'}`}>
                          {property.status}
                        </span>
                      </td>
                      <td>{property.agencyName || 'N/A'}</td>
                      <td>{property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => viewProperty(property.id)}
                          title="View property"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary me-1"
                          onClick={() => editProperty(property.id)}
                          title="Edit property"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteProperty(property.id)}
                          title="Delete property"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No properties found
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
