'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { googleMapsConfig } from '@/config/googleMaps';

// Define interfaces
interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  nearestBase?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationCoordinates {
  [key: string]: Coordinates;
}

interface ListingsMapProps {
  listings: Array<{
    id: number;
    title: string;
    location: string;
    price: number;
    latitude?: number;
    longitude?: number;
  }>;
}

// Define location coordinates
const locationCoordinates: LocationCoordinates = {
  'chatan': { lat: 26.3116, lng: 127.7544 },
  'kadena': { lat: 26.3516, lng: 127.7478 },
  'ginowan': { lat: 26.2815, lng: 127.7785 },
  'naha': { lat: 26.2124, lng: 127.6809 },
  'yomitan': { lat: 26.3959, lng: 127.7444 },
  'uruma': { lat: 26.3791, lng: 127.8571 },
  'okinawa-city': { lat: 26.3344, lng: 127.7994 },
  'urasoe': { lat: 26.2460, lng: 127.7216 },
  'nago': { lat: 26.5917, lng: 127.9774 },
  'onna': { lat: 26.4973, lng: 127.8535 }
};

const ListingsMap = ({ listings }: ListingsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if API key is available
    if (!googleMapsConfig.apiKey) {
      console.error('Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file');
      return;
    }

    const loader = new Loader({
      apiKey: googleMapsConfig.apiKey,
      version: "weekly"
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: googleMapsConfig.defaultCenter,
        zoom: googleMapsConfig.defaultZoom,
        styles: googleMapsConfig.styles
      });
      setMap(map);
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
    });
  }, []);

  useEffect(() => {
    if (!map || !listings) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = listings.map(listing => {
      const coordinates = listing.latitude && listing.longitude ? { lat: listing.latitude, lng: listing.longitude } : locationCoordinates[listing.location];
      if (!coordinates) {
        console.log(`No coordinates found for location: ${listing.location}`);
        return null;
      }

      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: listing.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#e75d7c",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        }
      });

      // Add click listener
      marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px; color: #e75d7c;">${listing.title}</h3>
              <p style="margin: 0;">¥${listing.price.toLocaleString()}/month</p>
            </div>
          `
        });
        infoWindow.open(map, marker);
      });

      return marker;
    }).filter((marker): marker is google.maps.Marker => marker !== null);

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
    }
  }, [map, listings]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%'
      }} 
    />
  );
}

export default ListingsMap;
