import { LoaderOptions } from '@googlemaps/js-api-loader';

// Map styling to match our brand theme
export const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#fdf2f4' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e75d7c' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#e75d7c' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#fce8f6' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#e75d7c' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#e75d7c' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e75d7c' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e75d7c' }]
  }
];

export const defaultMapOptions: google.maps.MapOptions = {
  center: { lat: 26.3344, lng: 127.8056 }, // Centered on Okinawa
  zoom: 11,
  styles: mapStyles,
  mapTypeControl: true,
  mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    position: google.maps.ControlPosition.TOP_RIGHT
  },
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: google.maps.ControlPosition.RIGHT_TOP
  },
  streetViewControl: true,
  streetViewControlOptions: {
    position: google.maps.ControlPosition.RIGHT_TOP
  },
  zoomControl: true,
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_TOP
  },
  scaleControl: true,
  rotateControl: true,
  clickableIcons: true,
  disableDefaultUI: false,
  gestureHandling: 'cooperative'
};

export const loaderOptions: LoaderOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: process.env.NEXT_PUBLIC_GOOGLE_MAPS_VERSION || 'weekly',
  libraries: (process.env.NEXT_PUBLIC_GOOGLE_MAPS_LIBRARIES?.split(',') || ['places', 'geometry', 'drawing']) as any
};

export const militaryBases = {
  'Kadena Air Base': { lat: 26.3516, lng: 127.7478 },
  'Camp Foster': { lat: 26.3116, lng: 127.7544 },
  'Camp Kinser': { lat: 26.2815, lng: 127.7216 },
  'Camp Hansen': { lat: 26.4973, lng: 127.8535 },
  'Camp Schwab': { lat: 26.5252, lng: 128.0386 },
  'Camp McTureous': { lat: 26.3959, lng: 127.8571 },
  'Camp Courtney': { lat: 26.3791, lng: 127.8571 },
  'Camp Shields': { lat: 26.3959, lng: 127.8056 },
  'Camp Lester': { lat: 26.3116, lng: 127.7478 },
  'White Beach Naval Facility': { lat: 26.3116, lng: 127.9090 },
  'Torii Station': { lat: 26.3636, lng: 127.7704 }
} as const;

export const cities = {
  'Chatan': { lat: 26.3116, lng: 127.7544 },
  'Kadena': { lat: 26.3516, lng: 127.7478 },
  'Ginowan': { lat: 26.2815, lng: 127.7785 },
  'Naha': { lat: 26.2124, lng: 127.6809 },
  'Yomitan': { lat: 26.3959, lng: 127.7444 },
  'Uruma': { lat: 26.3791, lng: 127.8571 },
  'Okinawa City': { lat: 26.3344, lng: 127.7994 },
  'Urasoe': { lat: 26.2460, lng: 127.7216 },
  'Nago': { lat: 26.5917, lng: 127.9774 },
  'Onna': { lat: 26.4973, lng: 127.8535 }
} as const;
