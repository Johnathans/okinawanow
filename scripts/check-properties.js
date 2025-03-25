const admin = require('firebase-admin');

const serviceAccount = require('../service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkProperties() {
  try {
    const snapshot = await db.collection('properties').get();
    console.log(`Total properties in database: ${snapshot.size}`);
    
    // Group by location
    const locationCounts = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const location = data.location || 'unknown';
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
    
    console.log('\nProperties by location:');
    Object.entries(locationCounts).forEach(([location, count]) => {
      console.log(`${location}: ${count}`);
    });
  } catch (error) {
    console.error('Error checking properties:', error);
  }
}

checkProperties();
