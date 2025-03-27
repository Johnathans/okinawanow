import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types/user';

interface UseFavoritesParamsForListing {
  listingId: string;
  currentUser?: User | null;
  userId?: never;
}

interface UseFavoritesParamsForUser {
  userId: string;
  listingId?: never;
  currentUser?: never;
}

type UseFavoritesParams = UseFavoritesParamsForListing | UseFavoritesParamsForUser;

export const useFavorites = (params: UseFavoritesParams) => {
  const [hasFavorited, setHasFavorited] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // For single listing favorite status
  useEffect(() => {
    if ('listingId' in params && params.listingId && params.currentUser) {
      const fetchFavoriteStatus = async () => {
        try {
          const favoriteRef = doc(db, 'users', params.currentUser!.uid, 'favorites', params.listingId);
          const favoriteDoc = await getDoc(favoriteRef);
          
          setHasFavorited(favoriteDoc.exists());
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      };

      fetchFavoriteStatus();
    }
  }, [params]);

  // For user's favorites list
  useEffect(() => {
    if ('userId' in params && params.userId) {
      const fetchFavorites = async () => {
        try {
          const favoritesRef = collection(db, 'users', params.userId, 'favorites');
          const favoritesSnapshot = await getDocs(favoritesRef);
          const favoritesList = favoritesSnapshot.docs.map(doc => doc.id);
          
          setFavorites(favoritesList);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };

      fetchFavorites();
    }
  }, [params]);

  const toggleFavorite = useCallback(async (listingIdParam?: string) => {
    // For single listing
    if ('listingId' in params && params.currentUser) {
      try {
        const favoriteRef = doc(db, 'users', params.currentUser.uid, 'favorites', params.listingId);
        const favoriteDoc = await getDoc(favoriteRef);

        if (favoriteDoc.exists()) {
          await deleteDoc(favoriteRef);
          setHasFavorited(false);
        } else {
          await setDoc(favoriteRef, {
            listingId: params.listingId,
            userId: params.currentUser.uid,
            createdAt: new Date().toISOString()
          });
          setHasFavorited(true);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    } 
    // For user's favorites list
    else if ('userId' in params && params.userId && listingIdParam) {
      try {
        const favoriteRef = doc(db, 'users', params.userId, 'favorites', listingIdParam);
        const favoriteDoc = await getDoc(favoriteRef);

        if (favoriteDoc.exists()) {
          await deleteDoc(favoriteRef);
          setFavorites(prev => prev.filter(id => id !== listingIdParam));
        } else {
          await setDoc(favoriteRef, {
            listingId: listingIdParam,
            userId: params.userId,
            createdAt: new Date().toISOString()
          });
          setFavorites(prev => [...prev, listingIdParam]);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  }, [params]);

  return {
    hasFavorited,
    favorites,
    toggleFavorite
  };
};
