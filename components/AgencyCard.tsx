'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './AgencyCard.module.css';
import { useState } from 'react';

interface AgencyCardProps {
  name: string;
  logo: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
}

export default function AgencyCard({
  name,
  logo,
  description,
  phone,
  email,
  website
}: AgencyCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.agencyCard}>
      <div className={styles.agencyHeader}>
        <div className={styles.logoContainer}>
          {!imageError ? (
            <Image 
              src={logo} 
              alt={`${name} logo`}
              width={60}
              height={60}
              className={styles.logo}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.defaultLogo}>
              <i className="fa-solid fa-building"></i>
            </div>
          )}
        </div>
        <div>
          <h3 className={styles.agencyName}>{name}</h3>
          <p className={styles.agencyDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <i className="fa-solid fa-phone"></i>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
        <div className={styles.contactItem}>
          <i className="fa-solid fa-envelope"></i>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        {website && (
          <div className={styles.contactItem}>
            <i className="fa-solid fa-globe"></i>
            <a href={website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Link href="/contact" className={styles.contactButton}>
          Contact Agent
        </Link>
      </div>
    </div>
  );
}
