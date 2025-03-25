// Helper functions for formatting display names
export function getLocationDisplayName(location: string): string {
  return location.charAt(0).toUpperCase() + location.slice(1);
}

export function getBaseDisplayName(base: string): string {
  return base.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function getPropertyTypeDisplay(type: string): string {
  switch (type.toLowerCase()) {
    case 'house':
      return 'Houses';
    case 'apartment':
      return 'Apartments';
    case 'mansion':
      return 'Mansions';
    default:
      return 'Homes & Apartments';
  }
}

export function getBedroomDisplay(beds: string): string {
  const num = parseInt(beds);
  return `${num}+ ${num === 1 ? 'Bedroom' : 'Bedrooms'}`;
}

export function getPriceDisplay(price: string): string {
  const [min, max] = price.split('-').map(Number);
  if (!max) {
    return `¥${min.toLocaleString()}+`;
  }
  return `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`;
}
