const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function syncListings() {
  try {
    console.log('Reading listings from all.json...');
    const allListings = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/all.json'), 'utf8'));
    console.log(`Found ${allListings.length} listings to sync`);

    const batch = db.batch();
    const listingsCollection = db.collection('listings');

    for (const listing of allListings) {
      const listingId = `${listing.source}_${listing.id}`;
      console.log(`Preparing to sync listing ${listingId}...`);

      // Clean up the data
      const cleanTitle = listing.title?.replace(/<[^>]*>/g, '').trim() || 'Untitled Property';
      const cleanDescription = listing.description?.replace(/<[^>]*>/g, '').trim() || '';
      const cleanPropertyType = listing.propertyType?.toLowerCase() || 'unknown';
      const cleanLocation = listing.location?.toLowerCase() || 'unknown';

      // Create a clean listing object
      const cleanListing = {
        id: listingId,
        title: cleanTitle,
        location: cleanLocation,
        price: listing.price || 0,
        beds: listing.beds || null,
        baths: listing.baths || null,
        sqm: listing.sqm || null,
        images: Array.isArray(listing.images) ? listing.images : [],
        propertyType: cleanPropertyType,
        description: cleanDescription,
        url: listing.url || '',
        source: listing.source || 'unknown',
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
        status: 'active',
        views: 0,
        favorites: 0,
      };

      // Add to batch
      const docRef = listingsCollection.doc(listingId);
      batch.set(docRef, cleanListing);
    }

    // Commit the batch
    console.log('Committing all listings to Firestore...');
    await batch.commit();
    console.log('All listings synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing listings:', error);
    process.exit(1);
  }
}

syncListings();
