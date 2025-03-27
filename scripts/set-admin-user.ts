import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

// The email address to set as admin
const ADMIN_EMAIL = 'smithjohnathanr@gmail.com';

async function main() {
  try {
    // Initialize Firebase Admin
    const serviceAccountPath = path.resolve(process.cwd(), './service-account.json');
    
    if (!fs.existsSync(serviceAccountPath)) {
      console.error('Service account file not found at:', serviceAccountPath);
      console.error('Please place your Firebase service account JSON file in the project root directory.');
      process.exit(1);
    }
    
    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf8')
    );
    
    const app = initializeApp({
      credential: cert(serviceAccount as any)
    });
    
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    // Find the user by email
    try {
      const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log('Found user:', userRecord.uid);
      
      // Update the user's custom claims to include admin role
      await auth.setCustomUserClaims(userRecord.uid, { admin: true });
      
      // Also update the user document in Firestore
      const userRef = db.collection('users').doc(userRecord.uid);
      await userRef.set({
        role: 'admin',
        email: ADMIN_EMAIL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      console.log(`Successfully set ${ADMIN_EMAIL} as admin`);
    } catch (error) {
      console.error('Error finding user:', error);
      console.log('The user might not exist yet. Please create an account first with this email.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
