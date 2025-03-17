import { db } from '../lib/firebase-admin';

async function cleanupTestListings() {
  try {
    const snapshot = await db.collection('listings').where('source', '==', 'test').get();
    
    console.log(`Found ${snapshot.size} test listings to delete`);
    
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Successfully deleted all test listings');
  } catch (error) {
    console.error('Error cleaning up test listings:', error);
  }
}

cleanupTestListings();
