import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
initializeApp({
  credential: cert(require('../serviceAccountKey.json'))
});

async function createTestAgency() {
  const auth = getAuth();
  const db = getFirestore();

  try {
    // Create the user
    const userRecord = await auth.createUser({
      email: 'testagency@okinawanow.com',
      password: '***REMOVED***',
      displayName: 'Test Agency',
    });

    // Create agency profile in Firestore
    await db.collection('agencies').doc(userRecord.uid).set({
      name: 'Test Agency',
      email: 'testagency@okinawanow.com',
      phone: '+81-98-123-4567',
      address: 'Chatan, Okinawa',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    console.log('Successfully created test agency:', userRecord.uid);
  } catch (error) {
    console.error('Error creating test agency:', error);
  }
}

createTestAgency();
