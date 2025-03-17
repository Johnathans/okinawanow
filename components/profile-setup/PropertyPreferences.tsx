'use client';

import React from 'react';
import { UserPropertyPreferences, PropertyType, MilitaryBase, PropertyFeature } from '@/types/profile';

interface PropertyPreferencesProps {
  onNext: (data: UserPropertyPreferences) => void;
  initialData?: UserPropertyPreferences;
}

export default function PropertyPreferences({ onNext, initialData }: PropertyPreferencesProps) {
  const [formData, setFormData] = React.useState<UserPropertyPreferences>({
    type: initialData?.type || [],
    bedrooms: initialData?.bedrooms || 2,
    nearBase: initialData?.nearBase || [],
    maxBudget: initialData?.maxBudget || 150000,
    desiredFeatures: initialData?.desiredFeatures || [],
    moveInDate: initialData?.moveInDate || '',
  });

  const propertyTypes: PropertyType[] = ['house', 'apartment', 'duplex'];
  const militaryBases: MilitaryBase[] = [
    'Kadena',
    'Foster',
    'Kinser',
    'Hansen',
    'Schwab',
    'McTureous',
    'Courtney',
  ];
  const features: PropertyFeature[] = [
    'parking',
    'pets_allowed',
    'furnished',
    'yard',
    'balcony',
    'internet_ready',
    'american_appliances',
    'japanese_appliances',
    'english_support',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const formatFeatureLabel = (feature: string) => {
    return feature
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          {/* Welcome Message */}
          <div className="text-center mb-5">
            <h2 className="h3 mb-2 fw-bold">Congratulations on Your Journey to Okinawa!</h2>
            <p className="text-muted mb-0">Let's help you find the perfect home in paradise.</p>
          </div>

          {/* Property Type */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Property Type (select all that apply)</label>
            <div className="d-flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`btn ${
                    formData.type.includes(type) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const newTypes = formData.type.includes(type)
                      ? formData.type.filter((t) => t !== type)
                      : [...formData.type, type];
                    setFormData({ ...formData, type: newTypes });
                  }}
                >
                  {formatFeatureLabel(type)}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Number of Bedrooms</label>
            <select
              className="form-select"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>
          </div>

          {/* Military Bases */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Preferred Base Location (select all that apply)</label>
            <div className="d-flex flex-wrap gap-2">
              {militaryBases.map((base) => (
                <button
                  key={base}
                  type="button"
                  className={`btn ${
                    formData.nearBase.includes(base) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const newBases = formData.nearBase.includes(base)
                      ? formData.nearBase.filter((b) => b !== base)
                      : [...formData.nearBase, base];
                    setFormData({ ...formData, nearBase: newBases });
                  }}
                >
                  {base}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Maximum Monthly Budget (¥)</label>
            <input
              type="range"
              className="form-range"
              min="50000"
              max="300000"
              step="10000"
              value={formData.maxBudget}
              onChange={(e) => setFormData({ ...formData, maxBudget: Number(e.target.value) })}
            />
            <div className="text-center">
              <span className="badge bg-primary">¥{formData.maxBudget.toLocaleString()}</span>
            </div>
          </div>

          {/* Desired Features */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Desired Features (select all that apply)</label>
            <div className="d-flex flex-wrap gap-2">
              {features.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  className={`btn ${
                    formData.desiredFeatures.includes(feature) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const newFeatures = formData.desiredFeatures.includes(feature)
                      ? formData.desiredFeatures.filter((f) => f !== feature)
                      : [...formData.desiredFeatures, feature];
                    setFormData({ ...formData, desiredFeatures: newFeatures });
                  }}
                >
                  {formatFeatureLabel(feature)}
                </button>
              ))}
            </div>
          </div>

          {/* Move-in Date */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Desired Move-in Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.moveInDate}
              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
