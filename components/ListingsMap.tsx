import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { type Listing } from '@/types/listing';

interface ListingsMapProps {
  listings: Listing[];
  onListingClick?: (listing: Listing) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ListingsMap({ listings, onListingClick, className = '', style = {} }: ListingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

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

        if (!mapRef.current) return;

        // Create map centered on first listing or default to Okinawa
        const defaultCenter = { lat: 26.3344, lng: 127.8056 }; // Okinawa coordinates
        const map = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 11,
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

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for each listing
        listings.forEach(listing => {
          const fullAddress = `${listing.location}, Okinawa, Japan`;
          geocoder.geocode({ address: fullAddress }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const position = results[0].geometry.location;
              
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

              // Add click listener
              if (onListingClick) {
                marker.addListener('click', () => {
                  onListingClick(listing);
                });
              }

              // Add info window
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="max-width: 200px;">
                    <h6 style="margin: 0 0 8px;">${listing.title}</h6>
                    <p style="margin: 0 0 8px;">¥${listing.price.toLocaleString()}</p>
                    <p style="margin: 0;">${listing.bedrooms} BR · ${listing.bathrooms} Bath · ${listing.floorArea}m²</p>
                  </div>
                `
              });

              marker.addListener('mouseover', () => {
                infoWindow.open(map, marker);
              });

              marker.addListener('mouseout', () => {
                infoWindow.close();
              });

              markersRef.current.push(marker);
            }
          });
        });

        // Fit bounds to show all markers
        if (markersRef.current.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markersRef.current.forEach(marker => {
            bounds.extend(marker.getPosition()!);
          });
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [listings, onListingClick]);

  return (
    <div 
      ref={mapRef} 
      className={className}
      style={{ 
        minHeight: '400px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        ...style 
      }} 
    />
  );
}
