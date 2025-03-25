import React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { UserProfile } from '@/types/profile';

interface FormData {
  firstName: string;
  lastName: string;
  occupation: string;
  familySize: number;
  militaryStatus: 'active' | 'dependent' | 'civilian' | 'contractor';
  petInfo: {
    hasPets: boolean;
    petTypes?: string[];
    petCount?: number;
  };
  email: string;
  password: string;
  confirmPassword: string;
}

interface PersonalInfoProps {
  onNext: (data: FormData) => void;
  onBack?: () => void;
  initialData?: Partial<FormData>;
}

interface CustomCSSProperties extends React.CSSProperties {
  '--bs-focus-border-color'?: string;
  '--bs-focus-box-shadow'?: string;
  '--bs-btn-hover-bg'?: string;
  '--bs-btn-hover-border-color'?: string;
}

const inputStyle: CustomCSSProperties = {
  borderColor: '#f4c6ce',
  '--bs-focus-border-color': '#e75d7c',
  '--bs-focus-box-shadow': '0 0 0 0.25rem rgba(231, 93, 124, 0.25)',
};

const buttonStyle: CustomCSSProperties = {
  backgroundColor: '#e75d7c',
  borderColor: '#e75d7c',
  '--bs-btn-hover-bg': '#d64d6c',
  '--bs-btn-hover-border-color': '#d64d6c',
};

const buttonOutlineStyle: CustomCSSProperties = {
  borderColor: '#e75d7c',
  color: '#e75d7c',
};

const buttonOutlineStyleActive: CustomCSSProperties = {
  backgroundColor: '#e75d7c',
  borderColor: '#e75d7c',
  color: '#fff',
};

export default function PersonalInfo({ onNext, onBack, initialData }: PersonalInfoProps) {
  const [formData, setFormData] = React.useState<FormData>({
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    occupation: initialData?.occupation || '',
    familySize: initialData?.familySize || 1,
    militaryStatus: initialData?.militaryStatus || 'civilian',
    petInfo: {
      hasPets: initialData?.petInfo?.hasPets || false,
      petTypes: initialData?.petInfo?.petTypes || [],
      petCount: initialData?.petInfo?.petCount || 0,
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => {
        const parentData = prev[parent as keyof typeof prev] as Record<string, any> || {};
        return {
          ...prev,
          [parent]: {
            ...parentData,
            [child]: value,
          },
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
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
                style={inputStyle}
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
                style={inputStyle}
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
              style={inputStyle}
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
              style={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>

          {/* Military Status */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Military Status</label>
            <select
              className="form-select"
              value={formData.militaryStatus}
              onChange={handleChange}
              name="militaryStatus"
              required
              style={inputStyle}
            >
              {['active', 'dependent', 'civilian', 'contractor'].map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
                style={formData.petInfo.hasPets ? buttonStyle : buttonOutlineStyle}
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
                style={!formData.petInfo.hasPets ? buttonStyle : buttonOutlineStyle}
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
                          formData.petInfo.petTypes?.includes(type)
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => {
                          const newTypes = formData.petInfo.petTypes?.includes(type)
                            ? formData.petInfo.petTypes?.filter((t) => t !== type)
                            : [...(formData.petInfo.petTypes || []), type];
                          setFormData((prev) => ({
                            ...prev,
                            petInfo: {
                              ...prev.petInfo,
                              hasPets: true,
                              petTypes: newTypes
                            }
                          }));
                        }}
                        style={formData.petInfo.petTypes?.includes(type) ? buttonStyle : buttonOutlineStyle}
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
                    style={inputStyle}
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

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
              style={inputStyle}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              required
              style={inputStyle}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-outline-primary px-4 py-2"
              style={buttonOutlineStyle}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 text-white"
              style={buttonStyle}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
