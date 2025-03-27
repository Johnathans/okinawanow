'use client';

import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  AuthError,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign in successful:', user.email);

      // Special case for admin email - always redirect to admin
      if (user.email?.toLowerCase() === 'smithjohnathanr@gmail.com') {
        console.log('Admin email detected, redirecting to admin dashboard');
        router.push('/admin');
        return;
      }

      // For other users, check their role
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          router.push('/admin');
        } else if (userData.role === 'agency') {
          router.push('/agency-dashboard/properties');
        } else {
          router.push('/'); // Regular users go to homepage
        }
      } else {
        // Default to agency dashboard if no user document exists
        router.push('/agency-dashboard/properties');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user.uid);
      
      // Special case for admin email - always redirect to admin
      if (email.toLowerCase() === 'smithjohnathanr@gmail.com') {
        console.log('Admin email detected, redirecting to admin dashboard');
        router.push('/admin');
        return;
      }
      
      // For other users, check their role and profile
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      
      // Check if user has a profile
      const userProfileRef = doc(db, 'userProfiles', userCredential.user.uid);
      const userProfileSnap = await getDoc(userProfileRef);
      
      if (!userProfileSnap.exists()) {
        // User doesn't have a profile, redirect to profile setup
        router.push('/profile-setup');
        return;
      }
      
      // User has a profile, redirect based on role
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          router.push('/admin');
        } else if (userData.role === 'agency') {
          router.push('/agency-dashboard/properties');
        } else {
          router.push('/'); // Regular users go to homepage
        }
      } else {
        // Default to homepage if no user document exists
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const createTestAgency = async () => {
    setLoading(true);
    setError('');
    const testEmail = 'testagency@okinawanow.com';
    const testPassword = '***REMOVED***';

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      const user = userCredential.user;

      console.log('Created auth user:', user.uid);

      // Create agency profile in Firestore
      const agencyRef = doc(db, 'agencies', user.uid);
      const agencyData = {
        name: 'Test Agency',
        email: testEmail,
        phone: '+81-98-123-4567',
        address: 'Chatan, Okinawa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating agency doc:', agencyRef.path, 'with data:', agencyData);
      await setDoc(agencyRef, agencyData);
      console.log('Agency doc created successfully');
      
      // Set user role to agency
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: testEmail,
        displayName: 'Test Agency',
        role: 'agency',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log('User role set to agency');

      // Auto-fill the form
      setEmail(testEmail);
      setPassword(testPassword);
      
      console.log('Test agency created successfully:', user.uid);
      
      // Sign in immediately
      await signInWithEmailAndPassword(auth, testEmail, testPassword);
      router.push('/agency-dashboard/properties');
    } catch (error) {
      console.error('Error creating test agency:', error);
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message || 'Failed to create test agency');
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
                <h1 className="h3 text-center mb-4" style={{ color: '#e75d7c' }}>Agency Login</h1>
                
                {error && (
                  <div className="alert alert-danger mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 mb-3"
                    style={{
                      backgroundColor: '#e75d7c',
                      color: 'white'
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Log In'
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    Sign in with Google
                  </button>

                  {/* Development only - Create Test Agency button */}
                  {process.env.NODE_ENV === 'development' && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={createTestAgency}
                      disabled={loading}
                    >
                      Create Test Agency Account
                    </button>
                  )}
                </form>

                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link href="/register" style={{ color: 'var(--primary-pink)' }}>Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
