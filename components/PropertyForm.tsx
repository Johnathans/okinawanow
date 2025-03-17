'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBuilding, faYen, faCalendar,
  faShieldAlt, faImage, faArrowRight, faArrowLeft,
  faCreditCard, faCheck
} from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Property, PropertyType, PropertyStatus, PetPolicy,
  INTERIOR_AMENITIES, BATHROOM_AMENITIES, KITCHEN_AMENITIES, 
  BUILDING_AMENITIES, UTILITY_AMENITIES, SECURITY_AMENITIES,
  LOCATION_FEATURES } from '../types/property';
import AmenitySection from './AmenitySection';

const LISTING_PRICE = 5000; // ¥5,000 - we'll move this to env later

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Property) => Promise<void>;
  isLoading?: boolean;
  mode: 'single_listing' | 'agency';
}

const initialFormState: Partial<Property> = {
  title: '',
  description: '',
  price: 0,
  priceUSD: 0,
  propertyType: PropertyType.Apartment,
  status: PropertyStatus.Active,
  negotiable: false,
  bedrooms: 1,
  bathrooms: 1,
  floorArea: 0,
  parkingSpaces: 0,
  availableFrom: '',
  leaseTerm: '12 months',
  location: '',
  city: 'chatan',
  nearestBase: 'Kadena Air Base',
  baseInspected: false,
  moveInCosts: {
    deposit: 0,
    keyMoney: 0,
    agencyFee: 0,
    guarantorFee: 0
  },
  utilitiesIncluded: false,
  petPolicy: [],
  interiorAmenities: [],
  bathroomAmenities: [],
  kitchenAmenities: [],
  buildingAmenities: [],
  utilityAmenities: [],
  securityAmenities: [],
  locationFeatures: [],
  images: []
};

const STEPS = [
  { id: 1, title: 'Basic Information', icon: faHome },
  { id: 2, title: 'Property Details', icon: faBuilding },
  { id: 3, title: 'Location & Costs', icon: faYen },
  { id: 4, title: 'Amenities', icon: faShieldAlt },
  { id: 5, title: 'Images', icon: faImage },
  { id: 6, title: 'Review & Submit', icon: faCheck }
];

export default function PropertyForm({
  initialData,
  onSubmit,
  isLoading = false,
  mode
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    ...initialFormState,
    ...initialData
  });
  const [error, setError] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [name]: e.target.checked
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
      
      // Create preview URLs
      const fileUrls = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...fileUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'single_listing') {
        if (paymentStatus === 'pending') {
          setPaymentStatus('processing');
          // TODO: Integrate Stripe here
          // For now, we'll just simulate payment
          await new Promise(resolve => setTimeout(resolve, 1000));
          setPaymentStatus('completed');
        }
        
        if (paymentStatus !== 'completed') {
          return;
        }
      }

      await onSubmit(formData as Property);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      if (mode === 'single_listing') {
        setPaymentStatus('pending');
      }
    }
  };

  const renderPaymentStep = () => {
    if (mode !== 'single_listing' || currentStep !== STEPS.length) {
      return null;
    }

    return (
      <div className="payment-info alert alert-info mb-4">
        <h5 className="mb-3">Payment Required</h5>
        <p className="mb-2">To publish your listing, a one-time fee of ¥{LISTING_PRICE.toLocaleString()} is required.</p>
        <ul className="mb-0">
          <li>Your listing will be visible to all users</li>
          <li>Includes property inspection verification</li>
          <li>Direct messaging with potential tenants</li>
          <li>30-day listing period</li>
        </ul>
        {paymentStatus === 'processing' && (
          <div className="mt-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span className="visually-hidden">Processing payment...</span>
            </div>
            Processing your payment...
          </div>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Property Type</label>
                <select
                  className="form-select"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  {Object.values(PropertyType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Price (¥)</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        );

      // ... More steps to be added
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="property-form py-4">
      {/* Progress Steps */}
      <div className="progress-steps mb-4">
        {STEPS.map((step, index) => (
          <div 
            key={step.id}
            className={`step ${currentStep >= step.id ? 'active' : ''}`}
          >
            <div className="step-icon">
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <div className="step-label">{step.title}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center">
            <FontAwesomeIcon 
              icon={STEPS[currentStep - 1].icon} 
              className="me-2" 
              style={{ color: '#e75d7c' }} 
            />
            <h5 className="mb-0">{STEPS[currentStep - 1].title}</h5>
          </div>
          
          {renderStepContent()}
          {renderPaymentStep()}

          <div className="card-footer d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={prevStep}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Previous
              </button>
            )}
            
            {currentStep < STEPS.length ? (
              <button
                type="button"
                className="btn btn-primary ms-auto"
                onClick={nextStep}
              >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary ms-auto"
                disabled={isLoading || (mode === 'single_listing' && paymentStatus === 'processing')}
              >
                {isLoading ? 'Submitting...' : 
                  mode === 'single_listing' && paymentStatus === 'pending' ? `Pay ¥${LISTING_PRICE.toLocaleString()} & Submit` : 
                  'Submit Listing'}
                <FontAwesomeIcon 
                  icon={mode === 'single_listing' && paymentStatus === 'pending' ? faCreditCard : faCheck} 
                  className="ms-2" 
                />
              </button>
            )}
          </div>
        </div>
      </form>

      <style jsx>{`
        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          max-width: 800px;
        }
        
        .step {
          flex: 1;
          text-align: center;
          position: relative;
          color: var(--medium-pink);
        }
        
        .step:not(:last-child):after {
          content: '';
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--medium-pink);
        }
        
        .step.active {
          color: var(--primary-pink);
        }
        
        .step.active:after {
          background: var(--primary-pink);
        }
        
        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--light-pink);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          border: 2px solid currentColor;
        }
        
        .step.active .step-icon {
          background: var(--primary-pink);
          color: white;
        }
        
        .step-label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .payment-info {
          background-color: var(--light-pink);
          border-color: var(--primary-pink);
          color: var(--bs-dark);
        }
        
        .payment-info ul {
          list-style-type: none;
          padding-left: 0;
        }
        
        .payment-info ul li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        
        .payment-info ul li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--primary-pink);
        }
      `}</style>
    </div>
  );
}
