'use client';

import { CITY_DESCRIPTIONS, BASE_DESCRIPTIONS } from '@/constants/locationDescriptions';

interface LocationDescriptionProps {
  city?: string | null;
  base?: string | null;
}

export default function LocationDescription({ city, base }: LocationDescriptionProps) {
  const description = city ? 
    CITY_DESCRIPTIONS[city.toLowerCase()] :
    base ? 
      BASE_DESCRIPTIONS[base.toLowerCase()] :
      "Discover your perfect home in Okinawa, where tropical paradise meets modern living. Browse our selection of properties across the island, from bustling city centers to peaceful coastal communities.";

  const title = city ? 
    `Living in ${city.charAt(0).toUpperCase() + city.slice(1)}` :
    base ? 
      `Living near ${base.charAt(0).toUpperCase() + base.slice(1)}` :
      'Living in Okinawa';

  return (
    <div className="bg-white border-top py-4">
      <div className="container-fluid px-3">
        <h2 className="h5 mb-3">{title}</h2>
        <p className="mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '800px' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
