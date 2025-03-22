import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faYen, faBed, faBath, faRuler } from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyType } from '@/types/property';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PropertyFormProps {
  onSubmit: (property: Property) => Promise<void>;
  initialData?: Partial<Property>;
  mode: string;
  isLoading?: boolean;
}

const initialFormState: Partial<Property> = {
  title: '',
  description: '',
  price: 0,
  location: '',
  propertyType: PropertyType.Apartment,
  bedrooms: 1,
  bathrooms: 1,
  floorArea: 0,
  images: [],
  amenities: [],
  features: []
};

const STEPS = [
  { id: 1, title: 'Basic Information', icon: faMapMarkerAlt },
  { id: 2, title: 'Property Details', icon: faBuilding },
  { id: 3, title: 'Location & Costs', icon: faYen },
  { id: 4, title: 'Amenities', icon: faShieldAlt },
  { id: 5, title: 'Images', icon: faImage },
  { id: 6, title: 'Review & Submit', icon: faCheck }
];

export default function PropertyForm({ onSubmit, initialData, mode, isLoading }: PropertyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    ...initialFormState,
    ...initialData
  });
  const [error, setError] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  const handleImageUpload = useCallback(async (files: FileList) => {
    const uploadPromises = Array.from(files).map(async file => {
      const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    const urls = await Promise.all(uploadPromises);
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...urls]
    }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Property);
  };

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
              >
                Submit Listing
                <FontAwesomeIcon icon={faCheck} className="ms-2" />
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
      `}</style>
    </div>
  );
}
