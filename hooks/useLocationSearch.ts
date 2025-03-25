import { useState, useCallback } from 'react';
import { CITY_DESCRIPTIONS, BASE_DESCRIPTIONS } from '@/constants/locationDescriptions';
import { LocationOption, City, Base } from '@/types/location';

const formatLocationName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const useLocationSearch = () => {
  const [suggestions, setSuggestions] = useState<LocationOption[]>([]);

  const searchLocations = useCallback((query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const matchedLocations: LocationOption[] = [];

    // Search cities
    Object.entries(CITY_DESCRIPTIONS).forEach(([city, description]) => {
      if (city.includes(normalizedQuery)) {
        matchedLocations.push({
          value: city as City,
          label: formatLocationName(city),
          type: 'city',
          description
        });
      }
    });

    // Search bases
    Object.entries(BASE_DESCRIPTIONS).forEach(([base, description]) => {
      if (base.includes(normalizedQuery)) {
        matchedLocations.push({
          value: base as Base,
          label: formatLocationName(base),
          type: 'base',
          description
        });
      }
    });

    setSuggestions(matchedLocations);
  }, []);

  return {
    suggestions,
    searchLocations
  };
};
