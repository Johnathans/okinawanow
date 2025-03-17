import { db } from '../lib/firebase-admin';

async function createTestListing() {
  try {
    const testListings = [
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
        url: "https://example.com/test",
        source: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active",
        views: 0,
        favorites: 0
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
        url: "https://example.com/test2",
        source: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active",
        views: 0,
        favorites: 0
      }
    ];

    // First clean up any existing test listings
    const snapshot = await db.collection('listings').where('source', '==', 'test').get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Cleaned up existing test listings');

    // Add new test listings
    for (const listing of testListings) {
      const docRef = await db.collection('listings').add(listing);
      console.log('Created test listing with ID:', docRef.id);
    }
  } catch (error) {
    console.error('Error creating test listings:', error);
  }
}

createTestListing();
