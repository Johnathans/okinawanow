import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UseFavoritesProps {
  userId: string;
}

export const useFavorites = ({ userId }: UseFavoritesProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavorites(userData.favorites || []);
        } else {
          // Initialize empty favorites for new user
          await setDoc(userRef, { favorites: [] });
          setFavorites([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError('Failed to load favorites');
        setLoading(false);
      }
    };

    loadFavorites();
  }, [userId]);

  const toggleFavorite = async (listingId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Update local state optimistically
      const newFavorites = favorites.includes(listingId)
        ? favorites.filter(id => id !== listingId)
        : [...favorites, listingId];
      
      setFavorites(newFavorites);
      
      // Update Firestore
      await setDoc(userRef, { favorites: newFavorites }, { merge: true });
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update favorites');
      
      // Revert local state on error
      setFavorites(favorites);
    }
  };

  return {
    favorites,
    loading,
    error,
    toggleFavorite
  };
};
