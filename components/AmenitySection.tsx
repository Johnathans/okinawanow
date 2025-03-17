'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faShower, faKitchen, faBuilding,
  faPlug, faShield, faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { Property } from '@/types/property';

interface AmenitySectionProps {
  amenities: Property;
  readOnly?: boolean;
}

const getIcon = (title: string) => {
  switch (title) {
    case 'Interior':
      return faHome;
    case 'Bathroom':
      return faShower;
    case 'Kitchen':
      return faKitchen;
    case 'Building':
      return faBuilding;
    case 'Utilities':
      return faPlug;
    case 'Security':
      return faShield;
    case 'Location':
      return faLocationDot;
    default:
      return faHome;
  }
};

const AmenitySection: React.FC<AmenitySectionProps> = ({
  amenities,
  readOnly = false
}) => {
  const sections = [
    { title: 'Interior', items: amenities.interiorAmenities || [] },
    { title: 'Bathroom', items: amenities.bathroomAmenities || [] },
    { title: 'Kitchen', items: amenities.kitchenAmenities || [] },
    { title: 'Building', items: amenities.buildingAmenities || [] },
    { title: 'Utilities', items: amenities.utilityAmenities || [] },
    { title: 'Security', items: amenities.securityAmenities || [] },
    { title: 'Location', items: amenities.locationFeatures || [] }
  ];

  return (
    <div className="amenities-section">
      {sections.map(section => section.items.length > 0 && (
        <div key={section.title} className="mb-4">
          <h6 className="d-flex align-items-center gap-2 mb-3">
            <FontAwesomeIcon icon={getIcon(section.title)} className="text-primary" />
            {section.title}
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {section.items.map((item, index) => (
              <span key={index} className="badge bg-light text-dark">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmenitySection;
