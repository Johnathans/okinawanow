// Google Maps configuration
export const googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  defaultCenter: { lat: 26.3344, lng: 127.7994 }, // Centered on Okinawa
  defaultZoom: 11,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#e75d7c" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#fdf2f4" }]
    }
  ]
};

// Map styling to match our brand theme
export const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#fdf2f4' }] // Using our light pink background color
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e75d7c' }] // Using our primary pink color
  },
  // Add more custom styles as needed
];

export const defaultMapOptions: google.maps.MapOptions = {
  center: { lat: 26.3344, lng: 127.8056 }, // Centered on Okinawa
  zoom: 11,
  styles: mapStyles,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: true,
};

export const loaderOptions: LoaderOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places']
};
