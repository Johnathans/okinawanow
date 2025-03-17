import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';
import { getLocationDisplayName, getBaseDisplayName, getPropertyTypeDisplay, getBedroomDisplay, getPriceDisplay } from './utils';
import ListingsClient from './ListingsClient';

export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parts: string[] = [];
  const descParts: string[] = [];

  const city = searchParams?.city;
  if (city && typeof city === 'string') {
    const displayLocation = getLocationDisplayName(city);
    parts.push(`in ${displayLocation}`);
    descParts.push(`located in ${displayLocation}`);
  }

  const base = searchParams?.base;
  if (base && typeof base === 'string') {
    const displayBase = getBaseDisplayName(base);
    parts.push(`near ${displayBase}`);
    descParts.push(`near ${displayBase}`);
  }

  const propertyType = searchParams?.propertyType;
  if (propertyType && typeof propertyType === 'string') {
    const displayType = getPropertyTypeDisplay(propertyType);
    parts.unshift(displayType);
    descParts.push(`${displayType.toLowerCase()}`);
  } else {
    parts.unshift('Homes & Apartments');
    descParts.push('homes and apartments');
  }

  const beds = searchParams?.beds;
  if (beds && typeof beds === 'string') {
    const displayBeds = getBedroomDisplay(beds);
    parts.push(`with ${displayBeds}`);
    descParts.push(`with ${displayBeds}`);
  }

  const price = searchParams?.price;
  if (price && typeof price === 'string') {
    const displayPrice = getPriceDisplay(price);
    parts.push(`${displayPrice}`);
    descParts.push(`${displayPrice}`);
  }

  const title = parts.join(' ') + ' for Rent in Okinawa';
  const description = `Find ${descParts.join(', ')} for rent in Okinawa. Browse our selection of quality properties with detailed information and photos.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/images/og-listings.jpg'],
    }
  };
}

export default function ListingsPage() {
  return <ListingsClient />;
}
