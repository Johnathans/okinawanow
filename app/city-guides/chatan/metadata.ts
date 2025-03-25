import { Metadata } from 'next';
import { cities } from '@/data/cities';

export const generateMetadata = async (): Promise<Metadata> => {
    const city = cities.find(c => c.id === 'chatan');
    
    return {
        title: `${city?.name} Area Guide - Living in Chatan, Okinawa`,
        description: `Discover everything about living in ${city?.name}. Find rental properties, explore local amenities, and learn about this vibrant area near American Village and popular military bases.`,
        openGraph: {
            title: `${city?.name} Area Guide - Living in Chatan, Okinawa`,
            description: `Discover everything about living in ${city?.name}. Find rental properties, explore local amenities, and learn about this vibrant area near American Village and popular military bases.`,
        },
    };
};
