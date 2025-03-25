import { db } from '../lib/firebase-admin';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface BaseListing {
  id: string;
  title: string;
  location: string;
  price: number;
  beds?: number | null;
  baths?: number | null;
  sqm?: number | null;
  images: string[];
  propertyType: string;
  description?: string | null;
  url: string;
  source: string;
}

interface ScrapedListing extends BaseListing {
  updatedAt: string;
}

interface FirestoreListing extends BaseListing {
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'pending';
  views: number;
  favorites: number;
}

async function importListings() {
  try {
    // Read the scraped listings
    const allListingsPath = join(process.cwd(), 'data', 'all.json');
    const listingsData = await readFile(allListingsPath, 'utf8');
    const listings = JSON.parse(listingsData) as ScrapedListing[];

    console.log(`Found ${listings.length} listings to import`);

    // Get existing listings from these sources
    const listingsRef = db.collection('listings');
    const existingSnapshot = await listingsRef.where('source', 'in', ['ace', 'central']).get();

    // Delete existing listings from these sources
    const deletePromises = existingSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    console.log(`Deleted ${existingSnapshot.size} existing listings`);

    // Import new listings
    const importPromises = listings.map(listing => {
      // Convert the listing to match our Firestore schema
      const firestoreListing: FirestoreListing = {
        id: listing.id,
        title: listing.title,
        location: listing.location,
        price: listing.price,
        beds: listing.beds ?? null,
        baths: listing.baths ?? null,
        sqm: listing.sqm ?? null,
        images: listing.images,
        propertyType: listing.propertyType,
        description: listing.description ?? null,
        url: listing.url,
        source: listing.source,
        createdAt: new Date(),
        updatedAt: new Date(listing.updatedAt),
        status: 'active',
        views: 0,
        favorites: 0,
      };

      return listingsRef.add(firestoreListing);
    });

    await Promise.all(importPromises);
    console.log(`Successfully imported ${listings.length} listings`);

  } catch (error) {
    console.error('Error importing listings:', error);
    process.exit(1);
  }
}

importListings();
