import { db } from '../lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

async function addMoreListings() {
  try {
    const newListings = [
      {
        title: "Luxury 3BR Penthouse with Ocean View",
        location: "chatan",
        price: 280000,
        beds: 3,
        baths: 2,
        sqm: 140,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800"
        ],
        propertyType: "apartment",
        description: "Stunning penthouse apartment with panoramic ocean views. Features high-end appliances, spacious balcony, and modern design throughout. Walking distance to American Village.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage", "Hardwood Floors"],
          kitchen: ["Full Kitchen", "IH Stove", "Dishwasher"],
          building: ["Elevator", "Auto-lock", "Parking"],
          security: ["Security Camera", "Intercom"]
        },
        petPolicy: ["cats", "dogs"],
        nearestBase: "Kadena AB",
        baseInspectionStatus: true,
        distanceToBase: 2.5,
        baseShuttleAvailable: true,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 1,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Traditional Japanese House with Garden",
        location: "yomitan",
        price: 190000,
        beds: 4,
        baths: 2,
        sqm: 160,
        images: [
          "https://images.unsplash.com/photo-1580237541049-2d715a09486e?w=800",
          "https://images.unsplash.com/photo-1580237541123-ef772346a816?w=800"
        ],
        propertyType: "house",
        description: "Beautiful traditional Japanese home with modern amenities. Features a peaceful garden, tatami rooms, and western-style kitchen. Perfect for families seeking authentic Japanese living.",
        amenities: {
          interior: ["Air Conditioning", "Storage", "Traditional Features"],
          kitchen: ["Full Kitchen", "Gas Stove"],
          building: ["Garden", "Parking"],
          security: ["Security System"]
        },
        petPolicy: ["cats"],
        nearestBase: "Torii Station",
        baseInspectionStatus: true,
        distanceToBase: 3.8,
        baseShuttleAvailable: false,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 2,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Modern Studio near Araha Beach",
        location: "chatan",
        price: 95000,
        beds: 1,
        baths: 1,
        sqm: 45,
        images: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
          "https://images.unsplash.com/photo-1598928636598-d45c28f15fad?w=800"
        ],
        propertyType: "apartment",
        description: "Cozy studio apartment just steps from Araha Beach. Perfect for singles or couples. Features modern appliances and a small balcony with partial ocean views.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer"],
          kitchen: ["IH Stove", "Mini Kitchen"],
          building: ["Bicycle Parking", "Auto-lock"],
          security: ["Intercom"]
        },
        petPolicy: ["no pets"],
        nearestBase: "Kadena AB",
        baseInspectionStatus: true,
        distanceToBase: 3.2,
        baseShuttleAvailable: true,
        status: "active",
        negotiable: false,
        moveInCosts: {
          deposit: 1,
          keyMoney: 0,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Family-Friendly 4BR House",
        location: "kitanakagusuku",
        price: 250000,
        beds: 4,
        baths: 2.5,
        sqm: 180,
        images: [
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
        ],
        propertyType: "house",
        description: "Spacious family home in quiet neighborhood. Large yard, modern kitchen, and plenty of storage. Close to schools and shopping centers.",
        amenities: {
          interior: ["Air Conditioning", "Storage", "Washer/Dryer"],
          kitchen: ["Full Kitchen", "Gas Stove", "Dishwasher"],
          building: ["Parking", "Garden"],
          security: ["Security System"]
        },
        petPolicy: ["cats", "dogs"],
        nearestBase: "Camp Foster",
        baseInspectionStatus: true,
        distanceToBase: 4.5,
        baseShuttleAvailable: false,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 2,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Renovated 2BR near Rycom",
        location: "kitanakagusuku",
        price: 150000,
        beds: 2,
        baths: 1,
        sqm: 85,
        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800"
        ],
        propertyType: "apartment",
        description: "Recently renovated apartment near AEON Mall Rycom. Features new appliances, modern design, and convenient location for shopping and dining.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage"],
          kitchen: ["Full Kitchen", "IH Stove"],
          building: ["Elevator", "Parking"],
          security: ["Auto-lock", "Intercom"]
        },
        petPolicy: ["cats"],
        nearestBase: "Camp Foster",
        baseInspectionStatus: true,
        distanceToBase: 5.1,
        baseShuttleAvailable: true,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 1,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Luxury 2BR with City Views",
        location: "naha",
        price: 170000,
        beds: 2,
        baths: 1,
        sqm: 90,
        images: [
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
          "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800"
        ],
        propertyType: "apartment",
        description: "High-floor apartment with stunning city views. Modern design, high-end finishes, and excellent amenities. Close to Naha's best shopping and dining.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage", "Hardwood Floors"],
          kitchen: ["Full Kitchen", "IH Stove", "Dishwasher"],
          building: ["Elevator", "Auto-lock", "Gym"],
          security: ["24/7 Security", "Security Camera", "Intercom"]
        },
        petPolicy: ["no pets"],
        nearestBase: "Camp Kinser",
        baseInspectionStatus: true,
        distanceToBase: 6.8,
        baseShuttleAvailable: false,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 2,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Cozy 1BR near Sunabe",
        location: "chatan",
        price: 110000,
        beds: 1,
        baths: 1,
        sqm: 50,
        images: [
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
          "https://images.unsplash.com/photo-1600566752229-34f1b33c6f5d?w=800"
        ],
        propertyType: "apartment",
        description: "Perfect starter home near Sunabe Seawall. Walking distance to cafes, restaurants, and diving spots. Ideal for singles or couples.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer"],
          kitchen: ["IH Stove", "Mini Kitchen"],
          building: ["Bicycle Parking"],
          security: ["Intercom"]
        },
        petPolicy: ["cats"],
        nearestBase: "Kadena AB",
        baseInspectionStatus: true,
        distanceToBase: 2.8,
        baseShuttleAvailable: true,
        status: "active",
        negotiable: false,
        moveInCosts: {
          deposit: 1,
          keyMoney: 0,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Spacious 3BR Townhouse",
        location: "urasoe",
        price: 200000,
        beds: 3,
        baths: 2,
        sqm: 130,
        images: [
          "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
          "https://images.unsplash.com/photo-1600573472602-49c2a9f6b3fd?w=800"
        ],
        propertyType: "townhouse",
        description: "Modern townhouse with plenty of space for family living. Features include a private entrance, small yard, and dedicated parking.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage"],
          kitchen: ["Full Kitchen", "Gas Stove", "Dishwasher"],
          building: ["Parking", "Private Entrance"],
          security: ["Security System"]
        },
        petPolicy: ["cats", "dogs"],
        nearestBase: "Camp Kinser",
        baseInspectionStatus: true,
        distanceToBase: 3.5,
        baseShuttleAvailable: false,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 2,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Modern 2BR with Base Access",
        location: "okinawa-city",
        price: 160000,
        beds: 2,
        baths: 1,
        sqm: 80,
        images: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        propertyType: "apartment",
        description: "Contemporary apartment with easy base access. Features modern amenities and a convenient location near Gate 2 Street.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage"],
          kitchen: ["Full Kitchen", "IH Stove"],
          building: ["Elevator", "Parking"],
          security: ["Auto-lock", "Security Camera"]
        },
        petPolicy: ["no pets"],
        nearestBase: "Kadena AB",
        baseInspectionStatus: true,
        distanceToBase: 1.5,
        baseShuttleAvailable: true,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 1,
          keyMoney: 1,
          agencyFee: 1,
          guarantorFee: 0.5
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "5BR Luxury Villa with Pool",
        location: "onna",
        price: 450000,
        beds: 5,
        baths: 3,
        sqm: 250,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
        ],
        propertyType: "house",
        description: "Exclusive villa in Onna Village with private pool and ocean views. Perfect for luxury living or executive housing.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage", "Home Theater"],
          kitchen: ["Gourmet Kitchen", "Gas Stove", "Double Dishwasher"],
          building: ["Pool", "Garden", "Multiple Parking"],
          security: ["Gated Community", "Security System", "CCTV"]
        },
        petPolicy: ["cats", "dogs"],
        nearestBase: "Camp Hansen",
        baseInspectionStatus: true,
        distanceToBase: 8.5,
        baseShuttleAvailable: false,
        status: "active",
        negotiable: true,
        moveInCosts: {
          deposit: 2,
          keyMoney: 2,
          agencyFee: 1,
          guarantorFee: 1
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const listing of newListings) {
      await db.collection('properties').add(listing);
      console.log(`Added listing: ${listing.title}`);
    }

    console.log('Successfully added all new listings!');
  } catch (error) {
    console.error('Error:', error);
  }
}

addMoreListings();
