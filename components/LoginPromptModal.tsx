'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  actionType: 'favorite' | 'tour';
}

export default function LoginPromptModal({ isOpen, onClose, message, actionType }: LoginPromptModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1050,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3 p-4 position-relative"
        style={{ 
          maxWidth: '400px',
          width: '90%',
          transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'transform 0.3s ease-in-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="btn position-absolute"
          onClick={onClose}
          style={{
            top: '10px',
            right: '10px',
            padding: '4px',
            color: 'var(--medium-pink)'
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Content */}
        <div className="text-center mb-4">
          <h4 className="mb-3" style={{ color: 'var(--primary-pink)' }}>
            {actionType === 'favorite' ? 'Save to Favorites' : 'Request a Tour'}
          </h4>
          <p className="mb-4" style={{ color: '#666' }}>{message}</p>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button
            className="btn w-50"
            onClick={onClose}
            style={{
              border: '1px solid var(--medium-pink)',
              color: 'var(--primary-pink)',
              backgroundColor: 'white',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--light-pink)';
              e.currentTarget.style.borderColor = 'var(--primary-pink)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = 'var(--medium-pink)';
            }}
          >
            Cancel
          </button>
          <a
            href="/login"
            className="btn w-50"
            style={{
              backgroundColor: 'var(--primary-pink)',
              color: 'white',
              border: '1px solid var(--primary-pink)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dark-pink)';
              e.currentTarget.style.borderColor = 'var(--dark-pink)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-pink)';
              e.currentTarget.style.borderColor = 'var(--primary-pink)';
            }}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
