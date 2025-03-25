const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function migratePropertiesToListings() {
  try {
    // Get all documents from properties collection
    console.log('Fetching properties...');
    const propertiesSnapshot = await db.collection('properties').get();
    console.log(`Found ${propertiesSnapshot.size} properties to migrate`);
    
    // Create a batch for atomic operations
    let batch = db.batch();
    let operationCount = 0;
    const BATCH_SIZE = 500; // Firestore batch size limit
    
    for (const doc of propertiesSnapshot.docs) {
      const data = doc.data();
      
      // Create a new document in listings collection with the same ID
      const listingRef = db.collection('listings').doc(doc.id);
      batch.set(listingRef, {
        ...data,
        // Update any necessary field mappings here
        listingId: data.propertyId || doc.id,
        // Add any missing fields with default values
        baseInspected: data.baseInspected || false,
        moveInCosts: data.moveInCosts || {
          deposit: 0,
          keyMoney: 0,
          agencyFee: 0,
          guarantorFee: 0
        },
        utilitiesIncluded: data.utilitiesIncluded || false,
        interiorAmenities: data.interiorAmenities || [],
        bathroomAmenities: data.bathroomAmenities || [],
        kitchenAmenities: data.kitchenAmenities || [],
        securityAmenities: data.securityAmenities || [],
        buildingAmenities: data.buildingAmenities || [],
        utilityAmenities: data.utilityAmenities || [],
        locationFeatures: data.locationFeatures || [],
        createdBy: data.createdBy || '',
        updatedAt: data.updatedAt || new Date().toISOString()
      });
      
      // Delete the old document
      batch.delete(doc.ref);
      
      operationCount++;
      
      // If we've reached the batch size limit, commit and create a new batch
      if (operationCount === BATCH_SIZE) {
        console.log(`Committing batch of ${operationCount} operations...`);
        await batch.commit();
        batch = db.batch();
        operationCount = 0;
      }
    }
    
    // Commit any remaining operations
    if (operationCount > 0) {
      console.log(`Committing final batch of ${operationCount} operations...`);
      await batch.commit();
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migratePropertiesToListings();
