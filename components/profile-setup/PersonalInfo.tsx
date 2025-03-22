import React, { useState } from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { UserProfile } from '@/types/profile';

interface FormData extends UserProfile {
  email: string;
  password: string;
  confirmPassword: string;
}

interface PersonalInfoProps {
  onNext: (data: FormData) => void;
  onBack?: () => void;
  initialData?: Partial<FormData>;
}

export default function PersonalInfo({ onNext, onBack, initialData }: PersonalInfoProps) {
  const [formData, setFormData] = React.useState<FormData>({
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    occupation: initialData?.occupation || '',
    familySize: initialData?.familySize || 1,
    petInfo: initialData?.petInfo || { hasPets: false, petTypes: [], petCount: 0 },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h3 className="h5 mb-4">Personal Information</h3>

          {/* Name Fields */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-medium mb-2">First Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                required
                style={{
                  borderColor: '#f4c6ce',
                  '--bs-focus-border-color': '#e75d7c',
                  '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
                } as any}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium mb-2">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                required
                style={{
                  borderColor: '#f4c6ce',
                  '--bs-focus-border-color': '#e75d7c',
                  '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
                } as any}
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Occupation</label>
            <input
              type="text"
              className="form-control"
              value={formData.occupation}
              onChange={handleChange}
              name="occupation"
              required
              style={{
                borderColor: '#f4c6ce',
                '--bs-focus-border-color': '#e75d7c',
                '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
              } as any}
            />
          </div>

          {/* Family Size */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Family Size (including yourself)</label>
            <select
              className="form-select"
              value={formData.familySize}
              onChange={handleChange}
              name="familySize"
              required
              style={{
                borderColor: '#f4c6ce',
                '--bs-focus-border-color': '#e75d7c',
                '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
              } as any}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>

          {/* Pet Information */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-3">Do you have any pets?</label>
            <div className="d-flex gap-3 mb-3">
              <button
                type="button"
                className={`btn ${formData.petInfo.hasPets ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    petInfo: { ...formData.petInfo, hasPets: true },
                  })
                }
                style={formData.petInfo.hasPets ? {
                  backgroundColor: '#e75d7c',
                  borderColor: '#e75d7c',
                  color: '#fff',
                } : {
                  borderColor: '#e75d7c',
                  color: '#e75d7c',
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn ${!formData.petInfo.hasPets ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    petInfo: { hasPets: false, petTypes: [], petCount: 0 },
                  })
                }
                style={!formData.petInfo.hasPets ? {
                  backgroundColor: '#e75d7c',
                  borderColor: '#e75d7c',
                  color: '#fff',
                } : {
                  borderColor: '#e75d7c',
                  color: '#e75d7c',
                }}
              >
                No
              </button>
            </div>

            {formData.petInfo.hasPets && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-medium mb-2">Pet Types</label>
                  <div className="d-flex flex-wrap gap-2">
                    {['Dog', 'Cat', 'Bird', 'Fish', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`btn ${
                          formData.petInfo.petTypes.includes(type)
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => {
                          const newTypes = formData.petInfo.petTypes.includes(type)
                            ? formData.petInfo.petTypes.filter((t) => t !== type)
                            : [...formData.petInfo.petTypes, type];
                          setFormData({
                            ...formData,
                            petInfo: { ...formData.petInfo, petTypes: newTypes },
                          });
                        }}
                        style={formData.petInfo.petTypes.includes(type) ? {
                          backgroundColor: '#e75d7c',
                          borderColor: '#e75d7c',
                          color: '#fff',
                        } : {
                          borderColor: '#e75d7c',
                          color: '#e75d7c',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label fw-medium mb-2">Number of Pets</label>
                  <select
                    className="form-select"
                    value={formData.petInfo.petCount}
                    onChange={handleChange}
                    name="petInfo.petCount"
                    style={{
                      borderColor: '#f4c6ce',
                      '--bs-focus-border-color': '#e75d7c',
                      '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
                    } as any}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Pet' : 'Pets'}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-outline-primary px-4 py-2"
              style={{
                borderColor: '#e75d7c',
                color: '#e75d7c',
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 text-white"
              style={{
                backgroundColor: '#e75d7c',
                borderColor: '#e75d7c',
                '--bs-btn-hover-bg': '#d64d6c',
                '--bs-btn-hover-border-color': '#d64d6c',
              } as any}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
