import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  // Load favorites when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        } else {
          // Initialize favorites array if user doc doesn't exist
          await setDoc(doc(db, 'users', user.uid), { favorites: [] });
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [user]);

  // Toggle favorite status
  const toggleFavorite = async (propertyId: string) => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    try {
      const newFavorites = favorites.includes(propertyId)
        ? favorites.filter(id => id !== propertyId)
        : [...favorites, propertyId];

      // Update local state immediately for better UX
      setFavorites(newFavorites);

      // Update in Firestore
      await setDoc(doc(db, 'users', user.uid), { 
        favorites: newFavorites 
      }, { merge: true });
    } catch (error) {
      console.error('Error updating favorites:', error);
      // Revert local state on error
      setFavorites(favorites);
    }
  };

  return { favorites, toggleFavorite };
}
