import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faParking,
  faKitchen,
  faPaw,
  faUtensils,
  faCar,
  faPhone,
  faGlobe,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function TemporaryLodgingPage() {
  const lodgingOptions = [
    {
      id: 'westpac',
      name: 'Westpac Inn',
      location: 'Camp Foster',
      type: 'On-Base',
      description: 'Official military lodging facility on Camp Foster. Priority given to PCS status personnel.',
      priceRange: '$70-90/night',
      contact: {
        phone: '+81-98-970-5555',
        website: 'https://www.mcipac.marines.mil/lodging',
        address: 'Building 475, Camp Foster'
      },
      amenities: [
        { name: 'Free Wi-Fi', icon: faWifi },
        { name: 'Parking', icon: faParking },
        { name: 'Kitchenette', icon: faKitchen },
        { name: 'Pet Friendly', icon: faPaw }
      ],
      features: [
        'Priority for PCS families',
        'NEX and commissary nearby',
        'Shuttle service available',
        'Laundry facilities'
      ],
      notes: 'Book as early as possible, especially during peak PCS season (May-August)'
    },
    {
      id: 'shogun',
      name: 'Shogun Inn',
      location: 'Kadena Air Base',
      type: 'On-Base',
      description: 'Air Force Inns lodging facility on Kadena Air Base. Modern rooms with excellent amenities.',
      priceRange: '$75-95/night',
      contact: {
        phone: '+81-98-962-1100',
        website: 'https://www.18fss.com/lodging',
        address: 'Building 721, Kadena Air Base'
      },
      amenities: [
        { name: 'Free Wi-Fi', icon: faWifi },
        { name: 'Parking', icon: faParking },
        { name: 'Kitchenette', icon: faKitchen },
        { name: 'Restaurant', icon: faUtensils }
      ],
      features: [
        'BX and commissary nearby',
        'Fitness center access',
        'Business center',
        'Children\'s play area'
      ],
      notes: 'Accepts reservations up to 120 days in advance for PCS personnel'
    },
    {
      id: 'vessel',
      name: 'Vessel Hotel Campana',
      location: 'Chatan',
      type: 'Off-Base',
      description: 'Modern hotel near American Village with English-speaking staff and great ocean views.',
      priceRange: '¥12,000-18,000/night',
      contact: {
        phone: '+81-98-926-1111',
        website: 'https://www.vessel-hotel.jp/campana',
        address: '1-2-7 Mihama, Chatan'
      },
      amenities: [
        { name: 'Free Wi-Fi', icon: faWifi },
        { name: 'Parking', icon: faParking },
        { name: 'Restaurant', icon: faUtensils },
        { name: 'Car Rental', icon: faCar }
      ],
      features: [
        'Ocean view rooms available',
        'Walking distance to American Village',
        'Breakfast included',
        'Airport shuttle service'
      ],
      notes: 'Popular choice for families due to location and amenities'
    },
    {
      id: 'hilton',
      name: 'DoubleTree by Hilton Okinawa',
      location: 'Chatan',
      type: 'Off-Base',
      description: 'American hotel chain with familiar amenities and services. Popular with military families.',
      priceRange: '¥15,000-25,000/night',
      contact: {
        phone: '+81-98-923-1111',
        website: 'https://www.hilton.com/okinawa-chatan',
        address: '2-2-1 Mihama, Chatan'
      },
      amenities: [
        { name: 'Free Wi-Fi', icon: faWifi },
        { name: 'Parking', icon: faParking },
        { name: 'Restaurant', icon: faUtensils },
        { name: 'Pet Friendly', icon: faPaw }
      ],
      features: [
        'Military rates available',
        'English-speaking staff',
        'Pool and fitness center',
        'Room service'
      ],
      notes: 'Ask about military discounts when booking'
    }
  ];

  return (
    <main className="bg-white">
      <div className="container py-5">
        <h1 className="h2 mb-4">Temporary Lodging in Okinawa</h1>
        <p className="lead mb-5">
          Find comfortable temporary accommodation for your arrival in Okinawa. 
          We've listed both on-base and off-base options suitable for military families.
        </p>

        {/* Important Notice */}
        <div 
          className="alert mb-5"
          style={{ backgroundColor: 'var(--light-pink)' }}
        >
          <h2 className="h5 mb-3">Important TLF Information</h2>
          <ul className="mb-0">
            <li className="mb-2">Book TLF as early as possible, especially during peak PCS season (May-August)</li>
            <li className="mb-2">On-base lodging gives priority to PCS status personnel</li>
            <li className="mb-2">Keep your receipts for TLA claims</li>
            <li>Consider location relative to your assigned base</li>
          </ul>
        </div>

        {/* Lodging Cards */}
        <div className="row g-4">
          {lodgingOptions.map((lodge) => (
            <div key={lodge.id} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <span 
                        className="badge mb-2"
                        style={{ 
                          backgroundColor: lodge.type === 'On-Base' ? 'var(--primary-pink)' : '#6c757d'
                        }}
                      >
                        {lodge.type}
                      </span>
                      <h2 className="h4 mb-1">{lodge.name}</h2>
                      <p className="text-muted mb-0">{lodge.location}</p>
                    </div>
                    <div className="h5 mb-0">{lodge.priceRange}</div>
                  </div>

                  <p className="mb-4">{lodge.description}</p>

                  {/* Amenities */}
                  <h3 className="h6 mb-3">Amenities</h3>
                  <div className="row g-3 mb-4">
                    {lodge.amenities.map((amenity, index) => (
                      <div key={index} className="col-6 col-sm-3">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon 
                            icon={amenity.icon} 
                            className="me-2"
                            style={{ color: 'var(--primary-pink)' }}
                          />
                          <span className="small">{amenity.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <h3 className="h6 mb-3">Features</h3>
                  <ul className="list-unstyled mb-4">
                    {lodge.features.map((feature, index) => (
                      <li key={index} className="mb-2 small">
                        <span className="text-success me-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Contact */}
                  <h3 className="h6 mb-3">Contact Information</h3>
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon 
                          icon={faPhone} 
                          className="me-2"
                          style={{ color: 'var(--primary-pink)' }}
                        />
                        <a 
                          href={`tel:${lodge.contact.phone}`}
                          className="small text-decoration-none"
                          style={{ color: 'inherit' }}
                        >
                          {lodge.contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon 
                          icon={faGlobe} 
                          className="me-2"
                          style={{ color: 'var(--primary-pink)' }}
                        />
                        <a 
                          href={lodge.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="small text-decoration-none"
                          style={{ color: 'inherit' }}
                        >
                          Website
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon 
                          icon={faLocationDot} 
                          className="me-2"
                          style={{ color: 'var(--primary-pink)' }}
                        />
                        <span className="small">{lodge.contact.address}</span>
                      </div>
                    </div>
                  </div>

                  {lodge.notes && (
                    <div className="mt-4">
                      <p className="small text-muted mb-0">
                        <strong>Note:</strong> {lodge.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TLA Information */}
        <div className="mt-5 p-4 rounded" style={{ backgroundColor: 'var(--light-pink)' }}>
          <h2 className="h5 mb-4">About Temporary Lodging Allowance (TLA)</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <h3 className="h6 mb-3">What TLA Covers</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Lodging expenses
                </li>
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Meal allowance
                </li>
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Incidental expenses
                </li>
                <li className="small">
                  <span className="text-success me-2">✓</span>
                  Typically up to 30 days
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="h6 mb-3">Required Documentation</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Lodging receipts
                </li>
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Orders
                </li>
                <li className="mb-2 small">
                  <span className="text-success me-2">✓</span>
                  Housing search documentation
                </li>
                <li className="small">
                  <span className="text-success me-2">✓</span>
                  TLA approval forms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
