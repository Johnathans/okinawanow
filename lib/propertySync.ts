import { 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  serverTimestamp, 
  updateDoc, 
  where 
} from 'firebase/firestore';
import { db } from './firebase';
import { Property } from '@/types/property';

export async function syncPropertyWithListing(
  propertyId: string, 
  propertyData: Partial<Property>,
  userId: string,
  userRole: 'single_listing' | 'agency'
) {
  try {
    // Get the property document
    const propertyRef = doc(db, 'properties', propertyId);
    const propertyDoc = await getDoc(propertyRef);

    if (!propertyDoc.exists()) {
      throw new Error('Property not found');
    }

    // Find the corresponding listing
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, where('propertyId', '==', propertyId));
    const listingSnapshot = await getDocs(q);

    if (listingSnapshot.empty) {
      // Create new listing if none exists
      await addDoc(listingsRef, {
        ...propertyData,
        propertyId,
        status: 'active',
        createdBy: userId,
        agencyId: userRole === 'agency' ? userId : null,
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing listing
      const listingDoc = listingSnapshot.docs[0];
      await updateDoc(doc(db, 'listings', listingDoc.id), {
        ...propertyData,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error syncing property with listing:', error);
    throw error;
  }
}

export async function createPropertyWithListing(
  propertyData: Property,
  userId: string,
  userRole: 'single_listing' | 'agency'
) {
  try {
    // Create property
    const propertyRef = await addDoc(collection(db, 'properties'), {
      ...propertyData,
      status: 'active',
      createdBy: userId,
      agencyId: userRole === 'agency' ? userId : null,
      createdAt: serverTimestamp()
    });

    // Create corresponding listing
    await addDoc(collection(db, 'listings'), {
      ...propertyData,
      propertyId: propertyRef.id,
      status: 'active',
      createdBy: userId,
      agencyId: userRole === 'agency' ? userId : null,
      createdAt: serverTimestamp()
    });

    return propertyRef.id;
  } catch (error) {
    console.error('Error creating property with listing:', error);
    throw error;
  }
}

export async function cleanupOrphanedListings() {
  try {
    const listingsRef = collection(db, 'listings');
    const listingsSnapshot = await getDocs(listingsRef);

    for (const listingDoc of listingsSnapshot.docs) {
      const listing = listingDoc.data();
      const propertyRef = doc(db, 'properties', listing.propertyId);
      const propertyDoc = await getDoc(propertyRef);

      if (!propertyDoc.exists()) {
        // Delete orphaned listing
        await deleteDoc(doc(db, 'listings', listingDoc.id));
      }
    }
  } catch (error) {
    console.error('Error cleaning up orphaned listings:', error);
    throw error;
  }
}
