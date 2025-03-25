'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWifi, faParking, faPaw, faSnowflake, 
  faCouch, faElevator, faBox, faShieldAlt,
  faWater, faDumbbell, faSwimmer, faBicycle,
  faMailBulk, faVideo, faEarthAsia, faLock
} from '@fortawesome/free-solid-svg-icons';
import { type Listing } from '@/types/listing';

interface AmenitySectionProps {
  amenities: Listing['amenities'];
}

const AmenitySection: React.FC<AmenitySectionProps> = ({
  amenities
}) => {
  const amenityIcons = {
    internet: faWifi,
    parking: faParking,
    petFriendly: faPaw,
    airConditioning: faSnowflake,
    furnished: faCouch,
    elevator: faElevator,
    storage: faBox,
    securitySystem: faShieldAlt,
    washingMachine: faWater,
    gym: faDumbbell,
    pool: faSwimmer,
    bicycleStorage: faBicycle,
    mailbox: faMailBulk,
    videoIntercom: faVideo,
    earthquake: faEarthAsia,
    autoLock: faLock
  };

  const amenityLabels = {
    internet: 'Internet',
    parking: 'Parking',
    petFriendly: 'Pet Friendly',
    airConditioning: 'Air Conditioning',
    furnished: 'Furnished',
    elevator: 'Elevator',
    storage: 'Storage',
    securitySystem: 'Security System',
    washingMachine: 'Washing Machine',
    gym: 'Gym',
    pool: 'Pool',
    bicycleStorage: 'Bicycle Storage',
    mailbox: 'Mailbox',
    videoIntercom: 'Video Intercom',
    earthquake: 'Earthquake Resistant',
    autoLock: 'Auto Lock'
  };

  return (
    <div className="amenities-section">
      <div className="row g-3">
        {Object.entries(amenityIcons).map(([key, icon]) => (
          amenities?.[key as keyof typeof amenities] && (
            <div key={key} className="col-6 col-md-4 col-lg-3">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon 
                  icon={icon} 
                  className="text-primary me-2" 
                  style={{ width: '1rem' }} 
                />
                <span>{amenityLabels[key as keyof typeof amenityLabels]}</span>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default AmenitySection;
