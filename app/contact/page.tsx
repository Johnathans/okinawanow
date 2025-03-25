"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faComments,
  faHome,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactReasons = [
    {
      icon: faHome,
      title: "Property Inquiries",
      description: "Questions about specific listings or property requirements"
    },
    {
      icon: faComments,
      title: "General Support",
      description: "Help with using our platform or general inquiries"
    },
    {
      icon: faQuestion,
      title: "Other Questions",
      description: "Any other questions about living in Okinawa"
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Thank you for your message. We'll get back to you soon!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setFormStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-4">Contact Us</h1>
          <p className="lead mb-0 mx-auto" style={{ maxWidth: '700px' }}>
            Have questions about finding your perfect home in Okinawa? We're here to help!
          </p>
        </div>

        {/* Contact Reasons */}
        <div className="row g-4 mb-5">
          {contactReasons.map((reason, index) => (
            <div key={index} className="col-md-4">
              <div 
                className="p-4 h-100 rounded-4 text-center"
                style={{ backgroundColor: 'var(--light-pink)' }}
              >
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'white',
                    width: '48px',
                    height: '48px'
                  }}
                >
                  <FontAwesomeIcon 
                    icon={reason.icon}
                    style={{ color: 'var(--primary-pink)' }}
                  />
                </div>
                <h3 className="h5 mb-2">{reason.title}</h3>
                <p className="small mb-0">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  {/* Form Status Messages */}
                  {formStatus.type && (
                    <div
                      className={`alert ${
                        formStatus.type === "success" ? "alert-success" : "alert-danger"
                      } mb-4`}
                      role="alert"
                    >
                      {formStatus.message}
                    </div>
                  )}

                  {/* Name */}
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label small fw-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      style={{ 
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid var(--medium-pink)'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label small fw-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      style={{ 
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid var(--medium-pink)'
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label htmlFor="subject" className="form-label small fw-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      required
                      style={{ 
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid var(--medium-pink)'
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label small fw-medium">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={6}
                      required
                      style={{ 
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid var(--medium-pink)'
                      }}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-lg px-4"
                    disabled={isSubmitting}
                    style={{ 
                      backgroundColor: 'var(--primary-pink)',
                      color: 'white',
                      borderRadius: '50px'
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Contact Information</h2>

                {/* Email */}
                <div className="d-flex align-items-start mb-4">
                  <div 
                    className="rounded-circle p-2 me-3"
                    style={{ backgroundColor: 'var(--light-pink)' }}
                  >
                    <FontAwesomeIcon 
                      icon={faEnvelope}
                      style={{ color: 'var(--primary-pink)' }}
                    />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Email</h3>
                    <p className="text-muted mb-0">okinawarentals@gmail.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="d-flex align-items-start mb-4">
                  <div 
                    className="rounded-circle p-2 me-3"
                    style={{ backgroundColor: 'var(--light-pink)' }}
                  >
                    <FontAwesomeIcon 
                      icon={faPhone}
                      style={{ color: 'var(--primary-pink)' }}
                    />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Phone</h3>
                    <p className="text-muted mb-0">098-123-4567</p>
                  </div>
                </div>

                {/* Location */}
                <div className="d-flex align-items-start mb-4">
                  <div 
                    className="rounded-circle p-2 me-3"
                    style={{ backgroundColor: 'var(--light-pink)' }}
                  >
                    <FontAwesomeIcon 
                      icon={faMapMarkerAlt}
                      style={{ color: 'var(--primary-pink)' }}
                    />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Location</h3>
                    <p className="text-muted mb-0">Chatan, Okinawa, Japan</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle p-2 me-3"
                    style={{ backgroundColor: 'var(--light-pink)' }}
                  >
                    <FontAwesomeIcon 
                      icon={faClock}
                      style={{ color: 'var(--primary-pink)' }}
                    />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">Business Hours</h3>
                    <p className="text-muted mb-0">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted mb-0">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Notice */}
            <div 
              className="mt-4 p-4 rounded-4"
              style={{ backgroundColor: 'var(--light-pink)' }}
            >
              <h3 className="h6 fw-bold mb-2">Quick Response Time</h3>
              <p className="small mb-0">
                We aim to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
