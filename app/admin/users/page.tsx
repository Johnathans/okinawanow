'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, updateDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faUsers, 
  faUserShield,
  faUserTie,
  faEdit,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  email: string;
  displayName?: string;
  role?: string;
  createdAt?: string;
  photoURL?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!user) {
      router.push('/login');
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDocs(query(collection(db, 'users'), where('email', '==', 'smithjohnathanr@gmail.com')));
        
        if (userSnap.empty) {
          setError('You do not have admin privileges');
          router.push('/');
          return;
        }
        
        // Fetch users
        fetchUsers();
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('An error occurred while checking admin status');
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      
      // Sort users by creation date (newest first)
      usersData.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('An error occurred while fetching users');
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: newRole } 
          : user
      ));
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('An error occurred while updating user role');
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin':
        return <FontAwesomeIcon icon={faUserShield} className="text-danger" />;
      case 'agency':
        return <FontAwesomeIcon icon={faUserTie} className="text-primary" />;
      case 'paid':
        return <FontAwesomeIcon icon={faCheck} className="text-success" />;
      default:
        return <FontAwesomeIcon icon={faUser} className="text-secondary" />;
    }
  };

  if (loading) {
    return (
      <div className="container-fluid px-4 py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4 py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">User Management</h1>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faUsers} className="text-primary" />
                </div>
                <div>
                  <h5 className="card-title mb-0">{users.length}</h5>
                  <p className="card-text text-muted">Total Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faUserShield} className="text-danger" />
                </div>
                <div>
                  <h5 className="card-title mb-0">{users.filter(user => user.role === 'admin').length}</h5>
                  <p className="card-text text-muted">Admins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faUserTie} className="text-info" />
                </div>
                <div>
                  <h5 className="card-title mb-0">{users.filter(user => user.role === 'agency').length}</h5>
                  <p className="card-text text-muted">Agencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faCheck} className="text-success" />
                </div>
                <div>
                  <h5 className="card-title mb-0">{users.filter(user => user.role === 'paid').length}</h5>
                  <p className="card-text text-muted">Paid Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">User Accounts</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {user.photoURL ? (
                            <img 
                              src={user.photoURL} 
                              alt={user.displayName || user.email} 
                              className="rounded-circle me-2"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div 
                              className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: 'var(--light-pink)',
                                color: 'var(--primary-pink)'
                              }}
                            >
                              {getRoleIcon(user.role)}
                            </div>
                          )}
                          <div>
                            <p className="mb-0 fw-medium">{user.displayName || 'No Name'}</p>
                            <small className="text-muted">{user.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <div className="dropdown">
                          <button 
                            className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                            type="button" 
                            id={`roleDropdown-${user.id}`} 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                          >
                            {user.role || 'user'}
                          </button>
                          <ul className="dropdown-menu" aria-labelledby={`roleDropdown-${user.id}`}>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={() => updateUserRole(user.id, 'user')}
                              >
                                user
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={() => updateUserRole(user.id, 'paid')}
                              >
                                paid
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={() => updateUserRole(user.id, 'agency')}
                              >
                                agency
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={() => updateUserRole(user.id, 'admin')}
                              >
                                admin
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No users found.
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
