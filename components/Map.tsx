"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  markers: Array<{
    id: string;
    lat: number;
    lng: number;
    price: number;
  }>;
  hoveredListing?: string;
  center: {
    lat: number;
    lng: number;
  };
}

const Map = ({ markers, hoveredListing, center }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          setError('Google Maps API key is missing');
          return;
        }

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
        });

        await loader.load();

        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#333333" }]
            }
          ]
        });

        mapInstanceRef.current = map;
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      Object.values(markersRef.current).forEach(marker => marker.setMap(null));
      markersRef.current = {};
    };
  }, [center]);

  useEffect(() => {
    if (!mapInstanceRef.current || isLoading) return;

    // Remove old markers
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (!markers.find(m => m.id === id)) {
        marker.setMap(null);
        delete markersRef.current[id];
      }
    });

    // Add or update markers
    markers.forEach(marker => {
      if (!marker.lat || !marker.lng) return;

      const isHovered = marker.id === hoveredListing;
      const position = { lat: marker.lat, lng: marker.lng };
      
      if (markersRef.current[marker.id]) {
        const existingMarker = markersRef.current[marker.id];
        existingMarker.setPosition(position);
        existingMarker.setLabel({
          text: `¥${marker.price.toLocaleString()}`,
          color: isHovered ? '#ffffff' : '#e75d7c',
          fontSize: '14px',
          fontWeight: '600'
        });
        existingMarker.setIcon({
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          fillColor: isHovered ? '#e75d7c' : '#ffffff',
          fillOpacity: 1,
          strokeColor: '#e75d7c',
          strokeWeight: 2,
          labelOrigin: new google.maps.Point(0, -25)
        });
      } else {
        const newMarker = new google.maps.Marker({
          position,
          map: mapInstanceRef.current,
          label: {
            text: `¥${marker.price.toLocaleString()}`,
            color: isHovered ? '#ffffff' : '#e75d7c',
            fontSize: '14px',
            fontWeight: '600'
          },
          icon: {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: isHovered ? '#e75d7c' : '#ffffff',
            fillOpacity: 1,
            strokeColor: '#e75d7c',
            strokeWeight: 2,
            labelOrigin: new google.maps.Point(0, -25)
          }
        });
        markersRef.current[marker.id] = newMarker;
      }
    });
  }, [markers, hoveredListing]);

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px'
      }}
    >
      <div 
        ref={mapRef}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5'
        }}
      />
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
            <span className="visually-hidden">Loading map...</span>
          </div>
        </div>
      )}
      {error && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <div className="text-muted">
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
