'use client';

import React from 'react';
import { UserContactPreferences } from '@/types/profile';

interface ContactPreferencesProps {
  onNext: (data: UserContactPreferences) => void;
  onBack: () => void;
  initialData?: UserContactPreferences;
}

export default function ContactPreferences({
  onNext,
  onBack,
  initialData,
}: ContactPreferencesProps) {
  const [formData, setFormData] = React.useState<UserContactPreferences>({
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    lineId: initialData?.lineId || '',
    whatsappNumber: initialData?.whatsappNumber || '',
    preferredContactMethods: initialData?.preferredContactMethods || [],
    preferredContactTimes: initialData?.preferredContactTimes || [],
    preferredLanguages: initialData?.preferredLanguages || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Initialize arrays if undefined
    const methods = formData.preferredContactMethods || [];
    const times = formData.preferredContactTimes || [];
    const languages = formData.preferredLanguages || [];

    // Validate required fields
    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }

    // Validate at least one contact method
    if (!methods.length) {
      alert('Please select at least one preferred contact method');
      return;
    }

    // Validate at least one preferred time
    if (!times.length) {
      alert('Please select at least one preferred contact time');
      return;
    }

    // Validate at least one language
    if (!languages.length) {
      alert('Please select at least one preferred language');
      return;
    }

    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h3 className="h5 mb-4">Contact Preferences</h3>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Email Address *</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+81"
            />
          </div>

          {/* LINE ID */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">LINE ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.lineId}
              onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
            />
          </div>

          {/* WhatsApp */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">WhatsApp Number</label>
            <input
              type="tel"
              className="form-control"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="+81"
            />
          </div>

          {/* Preferred Contact Methods */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">
              Preferred Contact Methods *
            </label>
            <div className="d-flex flex-wrap gap-2">
              {(['email', 'phone', 'line', 'whatsapp'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`btn ${
                    (formData.preferredContactMethods || []).includes(method)
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const methods = formData.preferredContactMethods || [];
                    const newMethods = methods.includes(method)
                      ? methods.filter((m) => m !== method)
                      : [...methods, method];
                    setFormData({ ...formData, preferredContactMethods: newMethods });
                  }}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Contact Times */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">
              Preferred Contact Times *
            </label>
            <div className="d-flex flex-wrap gap-2">
              {(['morning', 'afternoon', 'evening'] as const).map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`btn ${
                    (formData.preferredContactTimes || []).includes(time)
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const times = formData.preferredContactTimes || [];
                    const newTimes = times.includes(time)
                      ? times.filter((t) => t !== time)
                      : [...times, time];
                    setFormData({ ...formData, preferredContactTimes: newTimes });
                  }}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Languages */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">
              Preferred Languages *
            </label>
            <div className="d-flex flex-wrap gap-2">
              {(['english', 'japanese'] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`btn ${
                    (formData.preferredLanguages || []).includes(language)
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => {
                    const languages = formData.preferredLanguages || [];
                    const newLanguages = languages.includes(language)
                      ? languages.filter((l) => l !== language)
                      : [...languages, language];
                    setFormData({ ...formData, preferredLanguages: newLanguages });
                  }}
                >
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary flex-grow-1"
              onClick={onBack}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary flex-grow-1">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
