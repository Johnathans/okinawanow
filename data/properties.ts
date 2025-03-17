import { Property } from "@/types/property";

export const properties: Record<string, Property> = {
    "modern-chatan-2br": {
        id: "modern-chatan-2br",
        title: "Modern 2BR Apartment in Chatan",
        description: "Spacious 2-bedroom apartment with ocean views, perfect for military families.",
        location: "Chatan",
        price: 150000,
        bedrooms: 2,
        bathrooms: 1,
        images: ["/images/properties/modern-chatan-2br-1.jpg"],
        agencyId: "token-housing",
        amenities: [
            "Ocean View",
            "Parking",
            "AC",
            "Internet Ready"
        ],
        squareMeters: 75,
        available: true,
        featured: true
    },
    "sunabe-family-home": {
        id: "sunabe-family-home",
        title: "Sunabe Family Home",
        description: "Beautiful 3-bedroom house near Sunabe Seawall.",
        location: "Chatan",
        price: 180000,
        bedrooms: 3,
        bathrooms: 2,
        images: ["/images/properties/sunabe-family-home-1.jpg"],
        agencyId: "gato-housing",
        amenities: [
            "Garden",
            "Parking",
            "AC",
            "Internet Ready"
        ],
        squareMeters: 120,
        available: true,
        featured: true
    },
    "american-village-apt": {
        id: "american-village-apt",
        title: "American Village Apartment",
        description: "Convenient 1-bedroom apartment near American Village.",
        location: "Chatan",
        price: 120000,
        bedrooms: 1,
        bathrooms: 1,
        images: ["/images/properties/american-village-apt-1.jpg"],
        agencyId: "ryo-housing",
        amenities: [
            "Balcony",
            "Parking",
            "AC",
            "Internet Ready"
        ],
        squareMeters: 45,
        available: true,
        featured: false
    }
};
