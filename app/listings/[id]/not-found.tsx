'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Listing Not Found</h1>
        <p className={styles.message}>
          Sorry, we couldn't find the listing you're looking for. It may have been removed or is no longer available.
        </p>
        <div className={styles.actions}>
          <Link href="/listings" className={styles.primaryButton}>
            Browse all listings
          </Link>
          <Link href="/" className={styles.secondaryLink}>
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}
