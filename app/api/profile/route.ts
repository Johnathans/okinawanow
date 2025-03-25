import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/lib/firebase-admin';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Helper function to verify Firebase ID token
async function verifyAuthToken(req: NextRequest): Promise<string | null> {
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

    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');

    if (!userIdParam) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userDoc = await getDoc(doc(db, 'users', userIdParam));
    
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data() as UserProfile;
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user profile' },
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

    const body = await req.json();
    const { profile } = body as { profile: Partial<UserProfile> };

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile data is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName'];
    const missingFields = requiredFields.filter(field => !profile[field as keyof UserProfile]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    await setDoc(doc(db, 'users', userId), {
      ...profile,
      id: userId,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user profile' },
      { status: 500 }
    );
  }
}

const allowedFields = ['firstName', 'lastName', 'phoneNumber', 'preferences'] as const;
type AllowedField = typeof allowedFields[number];

export async function PATCH(request: NextRequest) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json() as Partial<UserProfile>;
    const userRef = doc(db, 'users', userId);

    // Only allow updating specific fields
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key as AllowedField))
    ) as Pick<UserProfile, AllowedField>;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
