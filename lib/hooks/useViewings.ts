import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Viewing {
  id: string;
  listingId: string;
  userId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

interface UseViewingsProps {
  userId: string;
}

export const useViewings = ({ userId }: UseViewingsProps) => {
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadViewings = async () => {
      try {
        const viewingsRef = collection(db, 'viewings');
        const q = query(viewingsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const loadedViewings: Viewing[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedViewings.push({
            id: doc.id,
            ...data,
            date: data.date.toDate(),
          } as Viewing);
        });
        
        setViewings(loadedViewings);
        setLoading(false);
      } catch (err) {
        console.error('Error loading viewings:', err);
        setError('Failed to load viewings');
        setLoading(false);
      }
    };

    loadViewings();
  }, [userId]);

  const scheduleViewing = async ({
    listingId,
    date,
    time,
    notes
  }: {
    listingId: string;
    date: Date;
    time: string;
    notes?: string;
  }) => {
    try {
      const viewingsRef = collection(db, 'viewings');
      const newViewing = {
        listingId,
        userId,
        date: Timestamp.fromDate(date),
        time,
        status: 'pending',
        notes,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(viewingsRef, newViewing);
      
      setViewings([...viewings, {
        id: docRef.id,
        ...newViewing,
        date,
      } as Viewing]);
      
      return docRef.id;
    } catch (err) {
      console.error('Error scheduling viewing:', err);
      setError('Failed to schedule viewing');
      throw err;
    }
  };

  return {
    viewings,
    loading,
    error,
    scheduleViewing
  };
};
