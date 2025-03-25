const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

async function syncListings() {
  try {
    const cred = await signInWithEmailAndPassword(auth, 'testagency@okinawanow.com', '***REMOVED***');
    const agencyId = cred.user.uid;
    console.log('Logged in as:', agencyId);

    // Get all properties
    const propertiesRef = collection(db, 'properties');
    const propertiesSnap = await getDocs(propertiesRef);
    const properties = propertiesSnap.docs
      .filter(doc => doc.data().agencyId === agencyId)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    console.log('\nProperties:', properties.length);
    properties.forEach(p => console.log(`- ${p.id}: ${p.title}`));

    // Get all listings
    const listingsRef = collection(db, 'listings');
    const listingsSnap = await getDocs(listingsRef);
    const listings = listingsSnap.docs
      .filter(doc => doc.data().agencyId === agencyId)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    console.log('\nListings:', listings.length);
    listings.forEach(l => console.log(`- ${l.id}: ${l.title}`));

    // Delete orphaned listings
    console.log('\nDeleting orphaned listings...');
    const propertyIds = new Set(properties.map(p => p.id));
    for (const listing of listings) {
      if (!propertyIds.has(listing.propertyId)) {
        console.log(`Deleting listing ${listing.id} (${listing.title})`);
        await deleteDoc(doc(db, 'listings', listing.id));
      }
    }

    // Create missing listings
    console.log('\nCreating missing listings...');
    const listingPropertyIds = new Set(listings.map(l => l.propertyId));
    for (const property of properties) {
      if (!listingPropertyIds.has(property.id)) {
        console.log(`Creating listing for property ${property.id} (${property.title})`);
        const listingData = {
          title: property.title,
          description: property.description,
          location: property.location,
          price: property.price,
          priceUSD: property.priceUSD,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          floorArea: property.floorArea,
          propertyType: property.propertyType,
          images: property.images,
          status: property.status,
          features: property.features,
          baseProximity: property.baseProximity,
          militaryInfo: property.militaryInfo,
          amenities: property.amenities,
          agencyId: property.agencyId,
          propertyId: property.id,
          createdAt: property.createdAt,
          updatedAt: property.updatedAt
        };
        await addDoc(collection(db, 'listings'), listingData);
      }
    }

    console.log('\nSync complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

syncListings();
