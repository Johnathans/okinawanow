import { db } from './firebase';
import {
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  serverTimestamp, 
  setDoc, 
  updateDoc, 
  where 
} from 'firebase/firestore';
import { Listing } from '@/types/listing';

export async function syncListingWithProperty(
  listingId: string, 
  listingData: Partial<Listing>,
  userId: string,
  userRole: 'single_listing' | 'agency'
) {
  try {
    // Get the listing document
    const listingRef = doc(db, 'listings', listingId);
    const listingDoc = await getDoc(listingRef);

    if (!listingDoc.exists()) {
      throw new Error('Listing not found');
    }

    // Find the corresponding property
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, where('id', '==', listingData.id));
    const propertySnapshot = await getDocs(q);

    if (propertySnapshot.empty) {
      // Create new property if none exists
      await addDoc(listingsRef, {
        ...listingData,
        status: 'active',
        createdBy: userId,
        agencyId: userRole === 'agency' ? userId : null,
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing property
      const propertyDoc = propertySnapshot.docs[0];
      await updateDoc(doc(db, 'listings', propertyDoc.id), {
        ...listingData,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error syncing listing with property:', error);
    throw error;
  }
}

export async function createListingWithProperty(
  listingData: Listing,
  userId: string,
  userRole: 'single_listing' | 'agency'
) {
  try {
    // Create listing
    const listingRef = await addDoc(collection(db, 'listings'), {
      ...listingData,
      status: 'active',
      createdBy: userId,
      agencyId: userRole === 'agency' ? userId : null,
      createdAt: serverTimestamp()
    });

    // Create corresponding property
    await addDoc(collection(db, 'listings'), {
      ...listingData,
      id: listingRef.id,
      status: 'active',
      createdBy: userId,
      agencyId: userRole === 'agency' ? userId : null,
      createdAt: serverTimestamp()
    });

    return listingRef.id;
  } catch (error) {
    console.error('Error creating listing with property:', error);
    throw error;
  }
}

export async function cleanupOrphanedProperties() {
  try {
    const listingsRef = collection(db, 'listings');
    const propertiesSnapshot = await getDocs(listingsRef);

    for (const propertyDoc of propertiesSnapshot.docs) {
      const property = propertyDoc.data();
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, where('propertyId', '==', property.id));
      const listingSnapshot = await getDocs(q);

      if (listingSnapshot.empty) {
        // Delete orphaned property
        const propertyRef = doc(db, 'listings', propertyDoc.id);
        await deleteDoc(propertyRef);
      }
    }
  } catch (error) {
    console.error('Error cleaning up orphaned properties:', error);
    throw error;
  }
}

export const syncListing = async (listingData: Listing) => {
  try {
    // Find the corresponding listing
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, where('id', '==', listingData.id));
    const listingSnapshot = await getDocs(q);

    if (listingSnapshot.empty) {
      // Create new listing if none exists
      await addDoc(listingsRef, {
        ...listingData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      // Update existing listing
      const listingDoc = listingSnapshot.docs[0];
      await updateDoc(doc(db, 'listings', listingDoc.id), {
        ...listingData,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error syncing listing:', error);
    throw error;
  }
};

export const syncListingWithListing = async (id: string, data: any, userId: string, role: string) => {
  try {
    // Update the listing
    await updateDoc(doc(db, 'listings', id), {
      ...data,
      updatedAt: new Date().toISOString(),
      updatedBy: userId
    });
  } catch (error) {
    console.error('Error syncing listing:', error);
    throw error;
  }
};

export const getListingsByAgency = async (agencyId: string): Promise<Listing[]> => {
  try {
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, where('agencyId', '==', agencyId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Listing));
  } catch (error) {
    console.error('Error getting listings:', error);
    throw error;
  }
};
