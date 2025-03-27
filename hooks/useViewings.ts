'use client';

import { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { toast } from 'react-hot-toast';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDoc, setDoc, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

// Interface for a viewing record
interface Viewing {
  id: string;
  listingId: string;
  userId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

// For single listing viewing status
interface UseViewingsParamsForListing {
  listingId: string;
  currentUser?: User | null;
  userId?: never;
}

// For user's viewings list
interface UseViewingsParamsForUser {
  userId: string;
  listingId?: never;
  currentUser?: never;
}

type UseViewingsParams = UseViewingsParamsForListing | UseViewingsParamsForUser;

export const useViewings = (params: UseViewingsParams) => {
  // State for single listing viewing status
  const [hasRequested, setHasRequested] = useState(false);
  
  // State for user's viewings list
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect for single listing viewing status
  useEffect(() => {
    if ('listingId' in params && params.listingId && params.currentUser) {
      const fetchViewingStatus = async () => {
        try {
          const viewingRef = doc(db, 'users', params.currentUser!.uid, 'viewings', params.listingId);
          const viewingDoc = await getDoc(viewingRef);
          
          setHasRequested(viewingDoc.exists());
        } catch (error) {
          console.error('Error checking viewing status:', error);
        }
      };

      fetchViewingStatus();
    }
  }, [params]);

  // Effect for user's viewings list
  useEffect(() => {
    if ('userId' in params && params.userId) {
      const loadViewings = async () => {
        try {
          const viewingsRef = collection(db, 'viewings');
          const q = query(viewingsRef, where('userId', '==', params.userId));
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
    }
  }, [params]);

  // Function for toggling viewing status for a single listing
  const toggleViewing = useCallback(async () => {
    if ('listingId' in params && params.currentUser) {
      if (!params.listingId || !params.currentUser) {
        toast.error('You must be logged in to request a tour');
        return;
      }

      try {
        const viewingRef = doc(db, 'users', params.currentUser.uid, 'viewings', params.listingId);
        const viewingDoc = await getDoc(viewingRef);

        if (viewingDoc.exists()) {
          await deleteDoc(viewingRef);
          setHasRequested(false);
          toast.success('Tour request cancelled');
        } else {
          await setDoc(viewingRef, {
            listingId: params.listingId,
            userId: params.currentUser.uid,
            createdAt: new Date().toISOString(),
            status: 'pending'
          });
          setHasRequested(true);
          toast.success('Tour requested successfully');
        }
      } catch (error) {
        console.error('Error toggling viewing:', error);
        toast.error('Something went wrong');
      }
    }
  }, [params]);

  // Function for scheduling a viewing
  const scheduleViewing = useCallback(async ({
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
    if ('userId' in params && params.userId) {
      try {
        const viewingsRef = collection(db, 'viewings');
        const newViewing = {
          listingId,
          userId: params.userId,
          date: Timestamp.fromDate(date),
          time,
          status: 'pending' as 'pending' | 'confirmed' | 'cancelled',
          notes,
          createdAt: Timestamp.now()
        };
        
        const docRef = await addDoc(viewingsRef, newViewing);
        
        const addedViewing: Viewing = {
          id: docRef.id,
          ...newViewing,
          date,
        };
        
        setViewings(prev => [...prev, addedViewing]);
        return addedViewing;
      } catch (err) {
        console.error('Error scheduling viewing:', err);
        setError('Failed to schedule viewing');
        throw err;
      }
    }
  }, [params]);

  // Return different values based on the params type
  if ('listingId' in params) {
    return {
      hasRequested,
      toggleViewing
    };
  } else {
    return {
      viewings,
      loading,
      error,
      scheduleViewing
    };
  }
};
