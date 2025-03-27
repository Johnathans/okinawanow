'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          We encountered an error while loading this listing.
        </p>
        <div className={styles.actions}>
          <button 
            onClick={reset}
            className={styles.resetButton}
          >
            Try again
          </button>
          <Link href="/listings" className={styles.backLink}>
            Return to listings
          </Link>
        </div>
      </div>
    </div>
  );
}
