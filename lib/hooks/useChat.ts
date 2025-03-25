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

interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
}

export const useChat = (chatId: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const q = query(
                collection(db, 'chats', chatId, 'messages'),
                orderBy('createdAt', 'desc'),
                limit(50)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as ChatMessage[];
                setMessages(newMessages);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
        }
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
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return { messages, loading, error, sendMessage };
};
