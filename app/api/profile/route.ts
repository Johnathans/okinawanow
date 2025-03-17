import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '@/types/profile';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/lib/firebase-admin';

// Helper function to verify Firebase ID token
async function verifyAuthToken(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth(adminApp).verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(userDoc.data());
  } catch (error) {
    console.error('Error getting profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const userRef = doc(db, 'users', userId);

    // Only allow updating specific fields
    const allowedFields = ['firstName', 'lastName', 'phoneNumber', 'preferences'];
    const updateData = Object.keys(data)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {} as Record<string, any>);

    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await verifyAuthToken(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    let profile: UserProfile;
    try {
      profile = await req.json();
    } catch (error) {
      return NextResponse.json({ 
        error: 'Bad Request', 
        details: 'Invalid JSON in request body' 
      }, { status: 400 });
    }

    // Validate profile data
    if (!profile || typeof profile !== 'object') {
      return NextResponse.json({ 
        error: 'Bad Request', 
        details: 'Profile data must be an object' 
      }, { status: 400 });
    }

    // Validate that the profile belongs to the authenticated user
    if (profile.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized - ID mismatch' }, { status: 401 });
    }

    try {
      // First check if the user exists in Firestore
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return NextResponse.json({ 
          error: 'User not found', 
          details: 'User must be created in Firestore first' 
        }, { status: 404 });
      }

      // Save to userProfiles collection
      const docRef = doc(db, 'userProfiles', userId);
      const profileData = {
        ...profile,
        updatedAt: new Date().toISOString(),
      };
      
      await setDoc(docRef, profileData);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Profile saved successfully',
        profile: profileData
      });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      return NextResponse.json({ 
        error: 'Database Error', 
        details: error instanceof Error ? error.message : 'Unknown database error' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in profile API route:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
