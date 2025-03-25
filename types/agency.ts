export interface Agency {
    id: string;
    name: string;
    image: string;
    description: string;
    longDescription?: string;
    location: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    areas?: string[];
    propertyCount?: number;
    features?: string[];
    officeHours?: {
        weekday: string;
        saturday: string;
        sunday: string;
    };
    languages?: string[];
    services?: {
        title: string;
        description: string;
        icon?: string;
    }[];
    militaryServices?: {
        title: string;
        description: string;
    }[];
    team?: {
        name: string;
        role: string;
        image: string;
        languages?: string[];
    }[];
    reviews?: {
        author: string;
        rating: number;
        text: string;
        date: string;
        verified?: boolean;
    }[];
    stats?: {
        totalRentals?: number;
        militaryTenants?: number;
        satisfactionRate?: number;
        responseTime?: string;
    };
    certifications?: string[];
    coordinates?: {
        lat: number;
        lng: number;
    };
}
