import { useState, useEffect } from 'react';
import { 
    collection, 
    query, 
    orderBy, 
    limit, 
    onSnapshot,
    addDoc,
    serverTimestamp,
    where
} from 'firebase/firestore';
import { db } from '../firebase';

export const useChat = (chatId: string) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(newMessages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [chatId]);

    const sendMessage = async (content: string, senderId: string) => {
        try {
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
                content,
                senderId,
                createdAt: serverTimestamp(),
                read: false
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return { messages, loading, sendMessage };
};
