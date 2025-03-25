import { City } from "@/types/city";

export const chatan: City = {
  id: "chatan",
  name: "Chatan",
  description: "A vibrant coastal town known for American Village and beautiful beaches.",
  propertyCount: 45,
  image: "/images/cities/araha-beach.jpg",
  overview: {
    population: 30000,
    nearestBases: ["Kadena Air Base", "Camp Foster"],
    averageRent: 150000,
    commuteTimes: {
      "Kadena Air Base": 10,
      "Camp Foster": 15,
      "Camp Lester": 20,
      "MCAS Futenma": 25
    },
    familyFriendlyScore: 4.5
  },
  highlights: [
    {
      title: "American Village",
      description: "A popular shopping and entertainment district with a distinctly American atmosphere, featuring the iconic Ferris wheel, numerous restaurants, and boutique shops.",
      icon: "shopping-bag"
    },
    {
      title: "Araha Beach",
      description: "A beautiful family-friendly beach park with calm waters, playground equipment, and BBQ areas. Perfect for weekend family outings and water activities.",
      icon: "umbrella-beach"
    },
    {
      title: "Mihama Shopping District",
      description: "A popular shopping district with a mix of local boutiques, restaurants, and souvenir shops.",
      icon: "shopping-bag"
    }
  ],
  neighborhoods: [
    {
      name: "American Village Area",
      description: "Popular entertainment district with shopping and dining.",
      bestFor: ["Young professionals", "Singles", "Couples without children"],
      priceRange: "¥150,000 - ¥250,000"
    },
    {
      name: "Araha Beach Area",
      description: "Beachfront residential area with parks.",
      bestFor: ["Families", "Beach lovers", "Those seeking a quieter lifestyle"],
      priceRange: "¥180,000 - ¥300,000"
    }
  ],
  amenities: {
    schools: {
      international: ["Amerasian School In Okinawa"],
      japanese: ["Chatan Elementary School", "Chatan Junior High School"],
      dodea: ["Kadena Elementary School", "Kadena Middle School", "Kadena High School"]
    },
    shopping: [
      {
        name: "American Village",
        type: "Shopping Complex",
        description: "Modern shopping complex with fashion boutiques, restaurants, and entertainment facilities."
      },
      {
        name: "AEON Mall Chatan",
        type: "Shopping Mall",
        description: "Large shopping mall with grocery store, clothing shops, and food court. Very foreigner-friendly."
      },
      {
        name: "Hamby Town",
        type: "Shopping District",
        description: "Local shopping area with supermarkets, drug stores, and various service shops."
      }
    ],
    healthcare: [
      {
        name: "Chubu Hospital",
        type: "General Hospital",
        englishSupport: true,
        description: "Major hospital with English-speaking staff and comprehensive medical services."
      },
      {
        name: "American Medical Center",
        type: "Clinic",
        englishSupport: true,
        description: "English-speaking clinic offering primary care and specialist referrals."
      }
    ],
    recreation: [
      {
        name: "Araha Beach Park",
        type: "Beach/Park",
        description: "Popular beach park with walking paths, playground, and sports facilities."
      },
      {
        name: "Sunset Beach",
        type: "Beach",
        description: "Beautiful beach known for its stunning sunsets and water activities."
      },
      {
        name: "Chatan Park",
        type: "Park",
        description: "Large park with sports facilities, walking trails, and children's play areas."
      }
    ]
  },
  coordinates: {
    lat: 26.3008,
    lng: 127.7542
  },
  transportation: {
    publicTransit: {
      available: true,
      description: "Regular bus service connecting to major bases and shopping areas. Less frequent than in larger cities.",
      commonRoutes: [
        "Naha Airport - American Village",
        "Kadena Gate 1 - American Village",
        "American Village - Camp Foster"
      ]
    },
    parking: "Abundant parking available at most apartments and shopping areas. Some apartments include one parking space in rent.",
    biking: "Bike-friendly with dedicated paths along major roads and beach areas. Popular mode of transportation.",
    walking: "Very walkable within districts. Safe sidewalks and pedestrian crossings throughout populated areas."
  },
  lifestyle: {
    community: "Strong military and expat presence with a welcoming local community. Active Facebook groups and community events.",
    dining: [
      {
        name: "Rose Garden",
        cuisine: "Chinese",
        priceRange: "¥¥",
        description: "Popular Chinese restaurant with English menu and great family portions."
      },
      {
        name: "Seaside Italian",
        cuisine: "Italian",
        priceRange: "¥¥¥",
        description: "Upscale Italian restaurant with ocean views and romantic atmosphere."
      },
      {
        name: "Yoshihachi",
        cuisine: "Japanese",
        priceRange: "¥¥",
        description: "Local favorite for sushi and traditional Japanese dishes. English menu available."
      }
    ],
    entertainment: [
      {
        name: "DMM Kariyushi Aquarium",
        type: "Aquarium",
        description: "Modern aquarium featuring digital art and marine life exhibits."
      },
      {
        name: "Round One",
        type: "Entertainment Center",
        description: "Large gaming and entertainment center with bowling, arcade, and karaoke."
      }
    ],
    outdoorActivities: [
      {
        name: "Sunset Beach",
        type: "Water Sports",
        description: "Popular spot for SUP, kayaking, and snorkeling. Equipment rental available."
      },
      {
        name: "Seawall",
        type: "Walking/Jogging",
        description: "Popular 2km walking and jogging path along the coast with beautiful ocean views."
      }
    ]
  },
  practicalInfo: {
    internet: {
      providers: ["AU Hikari", "OCN", "WiMAX"],
      averageSpeed: "1Gbps fiber-optic available in most areas"
    },
    utilities: {
      electricity: "Okinawa Electric Power Company (OEPC). Average monthly cost: ¥8,000-15,000",
      water: "Monthly cost: ¥3,000-5,000",
      gas: "Propane gas common. Monthly cost: ¥3,000-6,000"
    },
    safety: {
      crimeRate: "Low crime rate. Safe for families and single residents.",
      emergencyServices: [
        "Chatan Police Station",
        "Chatan Fire Station",
        "US Military Police (for SOFA status personnel)"
      ],
      tips: [
        "Register with your base housing office",
        "Join local Facebook community groups",
        "Keep emergency numbers handy",
        "Be aware of typhoon procedures"
      ]
    },
    weather: {
      summer: "Hot and humid (June-September). Average temperature 26-32°C",
      winter: "Mild (December-February). Average temperature 16-22°C",
      rainfall: "Significant rainfall during rainy season (May-June)",
      typhoonImpact: "Typhoon season June-November. Good infrastructure and support systems in place."
    }
  },
  prosCons: {
    pros: [
      "Central location near multiple bases",
      "Excellent shopping and entertainment options",
      "Beautiful beaches and parks",
      "Strong expat community",
      "Many English-friendly businesses",
      "Great food scene"
    ],
    cons: [
      "Higher rent compared to some areas",
      "Can be crowded during peak tourist seasons",
      "Traffic congestion during rush hours",
      "Limited parking in some areas",
      "Some areas can be noisy due to proximity to bases"
    ]
  },
  reviews: {
    overall: 4.5,
    testimonials: [
      {
        author: "Sarah M.",
        rating: 5,
        comment: "Perfect for military families! Close to everything and very welcoming community.",
        date: "2024-02-15",
        residencyLength: "2 years"
      },
      {
        author: "Mike R.",
        rating: 4,
        comment: "Great location but rent is a bit high. The convenience makes up for it though.",
        date: "2024-01-20",
        residencyLength: "1.5 years"
      },
      {
        author: "Jennifer K.",
        rating: 5,
        comment: "Love the beach access and family-friendly atmosphere. So many activities for kids!",
        date: "2023-12-10",
        residencyLength: "3 years"
      }
    ]
  }
};
