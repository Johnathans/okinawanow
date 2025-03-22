'use client';

import React, { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '@/lib/firebase-auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

type AuthMode = 'signin' | 'signup' | 'reset';

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export default function AuthModal({ show, onClose, onSuccess }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUpWithEmail(formData.email, formData.password, formData.displayName);
        router.push('/profile-setup');
      } else if (mode === 'signin') {
        await signInWithEmail(formData.email, formData.password);
        router.push('/profile-setup');
      } else if (mode === 'reset') {
        await resetPassword(formData.email);
        alert('Password reset email sent! Check your inbox.');
      }
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      onSuccess?.();
      onClose();
      router.push('/profile-setup');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess?.();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Facebook');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div 
        className="modal fade show" 
        style={{ display: 'block', zIndex: 1045 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
              <h5 className="modal-title">
                {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body px-4">
              {error && <div className="alert alert-danger">{error}</div>}

              <button
                className="btn btn-outline-dark w-100 mb-3"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faGoogle} className="me-2" />
                Continue with Google
              </button>

              <button
                className="btn btn-outline-dark w-100 mb-3"
                onClick={handleFacebookSignIn}
                disabled={loading}
              >
                <FontAwesomeIcon icon={faFacebook} className="me-2" />
                Continue with Facebook
              </button>

              <div className="position-relative text-center my-3">
                <hr className="text-muted" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                  or
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {mode !== 'reset' && (
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {mode === 'signin'
                    ? 'Sign In'
                    : mode === 'signup'
                    ? 'Sign Up'
                    : 'Reset Password'}
                </button>
              </form>

              <div className="mt-3 text-center">
                {mode === 'signin' ? (
                  <>
                    <p className="mb-1">
                      <button
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => setMode('reset')}
                      >
                        Forgot password?
                      </button>
                    </p>
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <button
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => setMode('signup')}
                      >
                        Sign up
                      </button>
                    </p>
                  </>
                ) : mode === 'signup' ? (
                  <p className="mb-0">
                    Already have an account?{' '}
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setMode('signin')}
                    >
                      Sign in
                    </button>
                  </p>
                ) : (
                  <p className="mb-0">
                    Remember your password?{' '}
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setMode('signin')}
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
