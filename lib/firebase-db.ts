import { db } from './firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '@/types/profile';

export const saveUserProfile = async (profile: UserProfile) => {
  if (!profile.id) {
    throw new Error('Profile ID is required');
  }

  try {
    const userProfileRef = doc(db, 'userProfiles', profile.id);
    const profileToSave = {
      ...profile,
      updatedAt: serverTimestamp(),
      createdAt: profile.createdAt || serverTimestamp(),
    };
    
    await setDoc(userProfileRef, profileToSave, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const userProfileRef = doc(db, 'userProfiles', userId);
    const userProfileSnap = await getDoc(userProfileRef);
    
    if (userProfileSnap.exists()) {
      const data = userProfileSnap.data() as UserProfile;
      return {
        ...data,
        id: userId, // Ensure ID is always set
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};
