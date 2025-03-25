export interface City {
    id: string;
    name: string;
    description: string;
    propertyCount: number;
    image: string;
    // Detailed information
    overview: {
        population: number;
        nearestBases: string[];
        averageRent: number; // in yen
        commuteTimes: {
            [key: string]: number; // base name -> minutes
        };
        familyFriendlyScore: number; // 1-5
    };
    highlights: {
        title: string;
        description: string;
        icon: string;
    }[];
    neighborhoods: {
        name: string;
        description: string;
        bestFor: string[];
        priceRange: string;
    }[];
    amenities: {
        schools: {
            international: string[];
            japanese: string[];
            dodea: string[];
        };
        shopping: {
            name: string;
            type: string;
            description: string;
        }[];
        healthcare: {
            name: string;
            type: string; // hospital, clinic, etc.
            englishSupport: boolean;
            description: string;
        }[];
        recreation: {
            name: string;
            type: string; // park, beach, sports facility, etc.
            description: string;
        }[];
    };
    transportation: {
        publicTransit: {
            available: boolean;
            description: string;
            commonRoutes: string[];
        };
        parking: string;
        biking: string;
        walking: string;
    };
    lifestyle: {
        community: string; // Description of local community and expat presence
        dining: {
            name: string;
            cuisine: string;
            priceRange: string;
            description: string;
        }[];
        entertainment: {
            name: string;
            type: string;
            description: string;
        }[];
        outdoorActivities: {
            name: string;
            type: string;
            description: string;
        }[];
    };
    practicalInfo: {
        internet: {
            providers: string[];
            averageSpeed: string;
        };
        utilities: {
            electricity: string;
            water: string;
            gas: string;
        };
        safety: {
            crimeRate: string;
            emergencyServices: string[];
            tips: string[];
        };
        weather: {
            summer: string;
            winter: string;
            rainfall: string;
            typhoonImpact: string;
        };
    };
    prosCons: {
        pros: string[];
        cons: string[];
    };
    reviews: {
        overall: number; // 1-5
        testimonials: {
            author: string;
            rating: number;
            comment: string;
            date: string;
            residencyLength: string;
        }[];
    };
    coordinates: {
        lat: number;
        lng: number;
    };
}
