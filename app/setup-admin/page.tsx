'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

export default function SetupAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('smithjohnathanr@gmail.com');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const setupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Find the user with this email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage(`No user found with email ${email}. Please make sure the user has registered.`);
        setLoading(false);
        return;
      }

      // Update the user role to admin
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, 'users', userDoc.id);
      
      await updateDoc(userRef, {
        role: 'admin',
        updatedAt: new Date().toISOString()
      });

      setMessage(`Success! User ${email} has been set as an admin. Please log out and log back in for the changes to take effect.`);
    } catch (error) {
      console.error('Error setting admin role:', error);
      setMessage('An error occurred while setting the admin role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fdf2f4' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 text-center mb-4" style={{ color: 'var(--primary-pink)' }}>Setup Admin User</h1>
                
                {message && (
                  <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {message}
                  </div>
                )}

                <form onSubmit={setupAdmin}>
                  <div className="mb-4">
                    <label className="form-label">Admin Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <small className="text-muted">Enter the email of the user you want to make an admin</small>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 mb-3"
                    style={{
                      backgroundColor: 'var(--primary-pink)',
                      color: 'white'
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Setting Admin Role...
                      </>
                    ) : (
                      'Set as Admin'
                    )}
                  </button>
                </form>

                <div className="text-center mt-3">
                  <a href="/" className="btn btn-link" style={{ color: 'var(--primary-pink)' }}>
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
