"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { mapStyles, loaderOptions } from '@/config/googleMaps';

interface MapProps {
  markers: Array<{
    id: string;
    lat: number;
    lng: number;
    price: number;
  }>;
  hoveredListing?: string | null;
  center: google.maps.LatLngLiteral;
  zoom?: number;
  style?: React.CSSProperties;
}

const Map = ({ markers, hoveredListing, center, zoom = 12, style }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          console.error('Google Maps API key is missing');
          setIsLoading(false);
          return;
        }

        const loader = new Loader(loaderOptions);

        await loader.load();

        if (!mapRef.current) return;

        const newMap = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: mapStyles
        });
        setMap(newMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading map:', error);
        setIsLoading(false);
      }
    };

    initMap();
  }, [center, zoom]);

  // Handle markers
  const initializeMarkers = useCallback(() => {
    if (!map || !markers.length) return;

    // Clear existing markers
    mapMarkers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = markers.map(marker => {
      const isHovered = marker.id === hoveredListing;
      const position = { lat: marker.lat, lng: marker.lng };
      
      return new google.maps.Marker({
        position,
        map,
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
    });

    setMapMarkers(newMarkers);
  }, [map, markers, hoveredListing, mapMarkers]);

  useEffect(() => {
    if (!isLoading && map) {
      initializeMarkers();
    }
  }, [isLoading, map, initializeMarkers]);

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      mapMarkers.forEach(marker => marker.setMap(null));
    };
  }, [mapMarkers]);

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        ...style
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
    </div>
  );
};

export default Map;
