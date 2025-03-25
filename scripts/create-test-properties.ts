import { db } from '../lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

async function createTestProperties() {
  try {
    const snapshot = await db.collection('properties').where('agencyId', '==', 'test-agency').get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Cleaned up existing test properties');

    const testProperties = [
      {
        title: "Modern 2BR Apartment in Chatan",
        location: "chatan",
        price: 180000,
        beds: 2,
        baths: 1,
        sqm: 75,
        images: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
        ],
        propertyType: "apartment",
        description: "Stunning 2-bedroom apartment in the heart of Chatan. Features modern appliances, spacious living area, and a balcony with ocean views. Walking distance to American Village and Araha Beach. Perfect for military families!",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer", "Storage"],
          kitchen: ["Full Kitchen", "IH Stove"],
          building: ["Elevator", "Auto-lock", "Parking"],
          security: ["Intercom"]
        },
        petPolicy: ["cats"],
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
        agencyId: "test-agency",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Spacious 3BR House near Foster",
        location: "ginowan",
        price: 220000,
        beds: 3,
        baths: 2,
        sqm: 120,
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
          "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        propertyType: "house",
        description: "Beautiful 3-bedroom house just minutes from Camp Foster. Features a modern kitchen, large yard, and parking for 2 cars. Quiet neighborhood with easy access to shopping and restaurants.",
        amenities: {
          interior: ["Air Conditioning", "Storage", "Washer/Dryer"],
          kitchen: ["Full Kitchen", "Gas Stove", "Dishwasher"],
          building: ["Parking", "Garden"],
          security: ["Security System"]
        },
        petPolicy: ["cats", "dogs"],
        nearestBase: "Camp Foster",
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
        agencyId: "test-agency",
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
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
          "https://images.unsplash.com/photo-1598928636598-d45c28f15fad?w=800"
        ],
        propertyType: "apartment",
        description: "Perfect starter home near Sunabe Seawall. Walking distance to cafes, restaurants, and diving spots. Ideal for singles or couples.",
        amenities: {
          interior: ["Air Conditioning", "Washer/Dryer"],
          kitchen: ["IH Stove", "Mini Kitchen"],
          building: ["Bicycle Parking"],
          security: ["Intercom"]
        },
        petPolicy: ["no pets"],
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
        agencyId: "test-agency",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const property of testProperties) {
      const docRef = await db.collection('properties').add(property);
      console.log('Created test property with ID:', docRef.id);
    }

    console.log('Successfully created test properties!');
  } catch (error) {
    console.error('Error:', error);
  }
}

createTestProperties();
