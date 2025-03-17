import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    orderBy, 
    where,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export const useViewings = (userId: string, isAgent: boolean) => {
    const [viewings, setViewings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query viewings based on user role
        const q = query(
            collection(db, 'viewings'),
            isAgent 
                ? where('agentId', '==', userId)
                : where('userId', '==', userId),
            orderBy('scheduledFor', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newViewings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setViewings(newViewings);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId, isAgent]);

    const scheduleViewing = async (viewingData: {
        propertyId: string;
        userId: string;
        agentId: string;
        scheduledFor: Date;
    }) => {
        try {
            await addDoc(collection(db, 'viewings'), {
                ...viewingData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error scheduling viewing:', error);
        }
    };

    const updateViewingStatus = async (viewingId: string, status: 'confirmed' | 'cancelled' | 'completed') => {
        try {
            await updateDoc(doc(db, 'viewings', viewingId), {
                status,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating viewing status:', error);
        }
    };

    return { viewings, loading, scheduleViewing, updateViewingStatus };
};
