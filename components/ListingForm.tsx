import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faYen, faBed, faBath, faRuler, faBuilding, faImage, faShieldAlt, faCheck, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { type Listing, ListingType, ListingStatus } from '@/types/listing';

interface ListingFormProps {
  onSubmit: (listing: Listing) => Promise<void>;
  initialData?: Partial<Listing>;
  isLoading?: boolean;
  mode?: 'agency' | 'user';
}

const initialFormState: Partial<Listing> = {
  title: '',
  description: '',
  price: 0,
  location: '',
  listingType: ListingType.Apartment,
  bedrooms: 1,
  bathrooms: 1,
  floorArea: 0,
  images: [],
  status: ListingStatus.Active
};

const STEPS = [
  { id: 1, title: 'Basic Information', icon: faMapMarkerAlt },
  { id: 2, title: 'Property Details', icon: faBuilding },
  { id: 3, title: 'Location & Costs', icon: faYen },
  { id: 4, title: 'Amenities', icon: faShieldAlt },
  { id: 5, title: 'Images', icon: faImage },
  { id: 6, title: 'Review & Submit', icon: faCheck }
];

export default function ListingForm({ onSubmit, initialData, isLoading, mode }: ListingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Listing>>({
    ...initialFormState,
    ...initialData
  });
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageUpload = useCallback(async (files: FileList) => {
    const newFiles = Array.from(files);
    setImageFiles(prev => [...prev, ...newFiles]);
    
    // Update formData with placeholder URLs for now
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles.map(() => '')]
    }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData as Listing);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const renderStepContent = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3>Basic Information</h3>
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
                <label className="form-label">Listing Type</label>
                <select
                  className="form-select"
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  required
                >
                  {Object.values(ListingType).map(type => (
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
      case 2:
        return (
          <div>
            <h3>Property Details</h3>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Bedrooms</label>
                <input
                  type="number"
                  className="form-control"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Bathrooms</label>
                <input
                  type="number"
                  className="form-control"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Floor Area (m²)</label>
                <input
                  type="number"
                  className="form-control"
                  name="floorArea"
                  value={formData.floorArea}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Location</h3>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Amenities</h3>
            <div className="row g-3">
              {/* Amenities checkboxes will be added here */}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Images</h3>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
            </div>
            <div className="row g-3">
              {formData.images?.map((_, index) => (
                <div key={index} className="col-md-4">
                  <div className="position-relative">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h3>Review & Submit</h3>
            <div className="alert alert-info">
              Please review your listing details before submitting.
            </div>
          </div>
        );
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
    <form onSubmit={handleSubmit} className="listing-form">
      {/* Progress Steps */}
      <div className="progress-steps mb-4">
        {STEPS.map((step) => (
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

      {/* Form Content */}
      <div className="form-content mb-4">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Previous
        </button>
        
        {currentStep === STEPS.length ? (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Listing'}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextStep}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        )}
      </div>
    </form>
  );
}
