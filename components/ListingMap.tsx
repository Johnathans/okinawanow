'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { type Listing } from '@/types/listing';

interface ListingMapProps {
  listing: Listing;
  className?: string;
  style?: React.CSSProperties;
}

export default function ListingMap({ listing, className = '', style = {} }: ListingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        // Add ", Okinawa, Japan" to improve geocoding accuracy
        const fullAddress = `${listing.location}, Okinawa, Japan`;

        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results && results[0] && mapRef.current) {
            const position = results[0].geometry.location;
            
            // Create map
            const map = new google.maps.Map(mapRef.current, {
              center: position,
              zoom: 15,
              mapTypeControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }]
                }
              ]
            });
            mapInstanceRef.current = map;

            // Add marker
            const marker = new google.maps.Marker({
              position,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#e75d7c',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
              }
            });
            markerRef.current = marker;

            // Add circle to show area
            new google.maps.Circle({
              strokeColor: '#e75d7c',
              strokeOpacity: 0.2,
              strokeWeight: 2,
              fillColor: '#e75d7c',
              fillOpacity: 0.1,
              map,
              center: position,
              radius: 300 // 300 meters
            });
          }
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (mapRef.current) {
      initMap();
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [listing.location]);

  return (
    <div 
      ref={mapRef} 
      className={className}
      style={{ 
        minHeight: '300px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        ...style 
      }} 
    />
  );
}
