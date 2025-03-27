'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function AdminSetupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsAdmin(userData.role === 'admin');
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          setMessage('Error checking user role. Please try again.');
        }
      }
    };

    if (!loading && user) {
      checkUserRole();
    } else if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const makeAdmin = async () => {
    if (!user) return;
    
    setUpdating(true);
    setMessage('');
    
    try {
      const userRef = doc(db, 'users', user.uid);
      
      // First check if the document exists
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        // Update existing document
        await updateDoc(userRef, {
          role: 'admin',
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create a new document
        await updateDoc(userRef, {
          displayName: user.displayName || '',
          email: user.email || '',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      setIsAdmin(true);
      setMessage('Success! You are now an admin. Please log out and log back in for the changes to take effect.');
    } catch (error) {
      console.error('Error making user admin:', error);
      setMessage('Error updating user role. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fdf2f4' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fdf2f4' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 text-center mb-4" style={{ color: 'var(--primary-pink)' }}>Admin Setup</h1>
                
                {message && (
                  <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {message}
                  </div>
                )}
                
                {user && (
                  <div className="mb-4">
                    <p>Logged in as: <strong>{user.email}</strong></p>
                    <p>Current role: <strong>{isAdmin ? 'Admin' : 'User'}</strong></p>
                  </div>
                )}
                
                {!isAdmin ? (
                  <button
                    className="btn w-100 mb-3"
                    style={{
                      backgroundColor: 'var(--primary-pink)',
                      color: 'white'
                    }}
                    onClick={makeAdmin}
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Setting Admin Role...
                      </>
                    ) : (
                      'Make Me Admin'
                    )}
                  </button>
                ) : (
                  <div className="alert alert-success">
                    <p className="mb-0">You are already an admin! You can access the admin dashboard.</p>
                  </div>
                )}
                
                <div className="d-flex justify-content-between mt-4">
                  <a href="/" className="btn btn-outline-secondary">
                    Back to Home
                  </a>
                  
                  {isAdmin && (
                    <a href="/admin" className="btn btn-primary" style={{ backgroundColor: 'var(--primary-pink)', borderColor: 'var(--primary-pink)' }}>
                      Go to Admin Dashboard
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
