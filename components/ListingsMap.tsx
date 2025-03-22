'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/types/property';
import { mapStyles } from '@/config/googleMaps';

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
  onMarkerClick?: (listing: Listing) => void;
  selectedListing?: Listing | null;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

const defaultCenter = { lat: 26.3344, lng: 127.8056 }; // Okinawa
const defaultZoom = 12;

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

const ListingsMap = ({
  listings,
  onMarkerClick,
  selectedListing,
  center = defaultCenter,
  zoom = defaultZoom
}: ListingsMapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [infoWindowListing, setInfoWindowListing] = useState<Listing | null>(null);

  const options = useMemo(() => ({
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
  }), []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (selectedListing) {
      setInfoWindowListing(selectedListing);
      if (mapRef.current && selectedListing.location) {
        const coordinates = locationCoordinates[selectedListing.location];
        if (coordinates) {
          mapRef.current.panTo({ lat: coordinates.lat, lng: coordinates.lng });
          mapRef.current.setZoom(15);
        }
      }
    }
  }, [selectedListing]);

  const handleMarkerClick = useCallback((listing: Listing) => {
    setInfoWindowListing(listing);
    onMarkerClick?.(listing);
  }, [onMarkerClick]);

  const handleInfoWindowClose = useCallback(() => {
    setInfoWindowListing(null);
  }, []);

  const markers = useMemo(() => {
    return listings.map(listing => {
      const coordinates = listing.latitude && listing.longitude ? { lat: listing.latitude, lng: listing.longitude } : locationCoordinates[listing.location];
      if (!coordinates) {
        console.log(`No coordinates found for location: ${listing.location}`);
        return null;
      }

      return (
        <Marker
          key={listing.id}
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          onClick={() => handleMarkerClick(listing)}
          icon={{
            url: '/images/marker.svg',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      );
    }).filter(Boolean);
  }, [listings, handleMarkerClick]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers}
      {infoWindowListing && (
        <InfoWindow
          position={{
            lat: locationCoordinates[infoWindowListing.location].lat,
            lng: locationCoordinates[infoWindowListing.location].lng
          }}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="p-2">
            <h6 className="mb-1">{infoWindowListing.title}</h6>
            <p className="mb-1">¥{infoWindowListing.price.toLocaleString()}/month</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default ListingsMap;
