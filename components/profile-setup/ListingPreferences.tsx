'use client';

import React from 'react';
import { UserPropertyPreferences, PropertyType, MilitaryBase, PropertyFeature } from '@/types/profile';

interface ListingPreferencesProps {
  onNext: (data: UserPropertyPreferences) => void;
  initialData?: UserPropertyPreferences;
}

export default function ListingPreferences({ onNext, initialData }: ListingPreferencesProps) {
  const [formData, setFormData] = React.useState<UserPropertyPreferences>({
    type: initialData?.type || [],
    minBedrooms: initialData?.minBedrooms || 2,
    maxBedrooms: initialData?.maxBedrooms || 4,
    nearBase: initialData?.nearBase || [],
    maxBudget: initialData?.maxBudget || 150000,
    desiredFeatures: initialData?.desiredFeatures || [],
  });

  const propertyTypes: PropertyType[] = ['house', 'apartment', 'duplex'];
  const militaryBases: MilitaryBase[] = [
    'Kadena Air Base',
    'Camp Foster',
    'Camp Kinser',
    'Camp Hansen',
    'Camp Schwab',
    'Camp McTureous',
    'Camp Courtney',
    'Camp Shields',
    'Camp Lester',
    'White Beach Naval Facility',
    'Torii Station',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <div className="container">
        {/* Property Types */}
        <div className="mb-4">
          <label className="form-label fw-medium mb-2">Property Type</label>
          <div className="d-flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`btn ${
                  formData.type?.includes(type) ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => {
                  const newTypes = formData.type?.includes(type)
                    ? formData.type?.filter((t) => t !== type)
                    : [...(formData.type || []), type];
                  setFormData({ ...formData, type: newTypes });
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Property Size */}
        <div className="mb-4">
          <label className="form-label fw-medium mb-2">Property Size</label>
          <div className="d-flex flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <label className="form-label fw-medium me-2">Min Bedrooms:</label>
              <select
                className="form-select"
                value={formData.minBedrooms}
                onChange={(e) => setFormData({ ...formData, minBedrooms: Number(e.target.value) })}
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center">
              <label className="form-label fw-medium me-2">Max Bedrooms:</label>
              <select
                className="form-select"
                value={formData.maxBedrooms}
                onChange={(e) => setFormData({ ...formData, maxBedrooms: Number(e.target.value) })}
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Military Bases */}
        <div className="mb-4">
          <label className="form-label fw-medium mb-2">Near Military Base</label>
          <div className="d-flex flex-wrap gap-2">
            {militaryBases.map((base) => (
              <button
                key={base}
                type="button"
                className={`btn ${
                  formData.nearBase?.includes(base) ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => {
                  const newBases = formData.nearBase?.includes(base)
                    ? formData.nearBase?.filter((b) => b !== base)
                    : [...(formData.nearBase || []), base];
                  setFormData({ ...formData, nearBase: newBases });
                }}
              >
                {base.replace('Camp ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="form-label fw-medium mb-2">Maximum Budget</label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="range"
              className="form-range flex-grow-1"
              min="50000"
              max="300000"
              step="10000"
              value={formData.maxBudget || 150000}
              onChange={(e) => setFormData({ ...formData, maxBudget: Number(e.target.value) })}
            />
            <span className="badge bg-primary">¥{(formData.maxBudget || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
}
