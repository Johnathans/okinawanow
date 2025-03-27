'use client';

import { ReactNode, useEffect, useState } from 'react';
import { app } from '@/lib/firebase';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Firebase is already initialized in @/lib/firebase
    setIsFirebaseInitialized(true);
  }, []);

  if (!isFirebaseInitialized) {
    return <div>Loading...</div>;
  }

  return children;
}
