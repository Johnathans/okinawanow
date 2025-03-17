'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '@/lib/firebase-auth';
import { useRouter } from 'next/navigation';

type AuthMode = 'signin' | 'signup' | 'reset';

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AuthModal({ show, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      onClose();
      router.push('/profile-setup');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUpWithEmail(email, password, displayName);
        router.push('/profile-setup');
      } else if (mode === 'signin') {
        await signInWithEmail(email, password);
        router.push('/profile-setup');
      } else if (mode === 'reset') {
        await resetPassword(email);
        alert('Password reset email sent! Check your inbox.');
      }
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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

              <div className="position-relative text-center my-3">
                <hr className="text-muted" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                  or
                </span>
              </div>

              <form onSubmit={handleEmailAuth}>
                {mode === 'signup' && (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
