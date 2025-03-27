'use client';

import React from 'react';
import styles from './AmenitiesDisplay.module.css';

// Define the possible amenities structures
interface AmenitiesCategorized {
  interior?: string[];
  bathroom?: string[];
  kitchen?: string[];
  building?: string[];
  utility?: string[];
  security?: string[];
  location?: string[];
  [key: string]: string[] | undefined;
}

interface AmenitiesDisplayProps {
  amenities: string[] | AmenitiesCategorized;
}

const AmenitiesDisplay: React.FC<AmenitiesDisplayProps> = ({ amenities }) => {
  // Handle the case where amenities is an array (flat structure)
  if (Array.isArray(amenities)) {
    if (amenities.length === 0) {
      return null;
    }
    
    return (
      <div className={styles.container}>
        <div className={styles.amenityCategory}>
          <h3 className={styles.categoryTitle}>Amenities</h3>
          <ul className={styles.amenityList}>
            {amenities.map((item, index) => (
              <li key={index} className={styles.amenityItem}>
                <span className={styles.checkmark}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  // Handle the case where amenities is an object (categorized structure)
  // Check if there are any amenities
  const hasAmenities = Object.values(amenities).some(
    (category) => category && category.length > 0
  );

  if (!hasAmenities) {
    return null;
  }

  // Category display names
  const categoryNames: { [key: string]: string } = {
    interior: 'Interior',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    building: 'Building',
    utility: 'Utilities',
    security: 'Security',
    location: 'Location',
  };

  return (
    <div className={styles.container}>
      {Object.entries(amenities).map(([category, items]) => {
        if (!items || items.length === 0) return null;
        
        return (
          <div key={category} className={styles.amenityCategory}>
            <h3 className={styles.categoryTitle}>{categoryNames[category] || category}</h3>
            <ul className={styles.amenityList}>
              {items.map((item, index) => (
                <li key={index} className={styles.amenityItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AmenitiesDisplay;
