'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={styles.noImages}>
        <div className={styles.placeholder}>
          <i className="fa-solid fa-image"></i>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const openModal = (index: number) => {
    setActiveImage(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  // Main image is the first one
  const mainImage = images[0];
  
  // Secondary images are the rest (up to 3 more)
  const secondaryImages = images.slice(1, 5);
  
  // Calculate how many more images beyond what we show
  const moreImagesCount = Math.max(0, images.length - 5);

  return (
    <>
      <div className={styles.gallery}>
        {/* Main large image */}
        <div 
          className={styles.mainImage}
          onClick={() => openModal(0)}
        >
          <Image
            src={mainImage}
            alt={`${title} - Main Image`}
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Grid of smaller images */}
        <div className={styles.secondaryImages}>
          {secondaryImages.map((image, index) => (
            <div 
              key={index} 
              className={styles.secondaryImage}
              onClick={() => openModal(index + 1)}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
          
          {/* Show "more images" overlay on the last visible image if there are more */}
          {moreImagesCount > 0 && secondaryImages.length > 0 && (
            <div 
              className={styles.moreImages}
              onClick={() => openModal(4)}
            >
              <span>+{moreImagesCount} more</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal Gallery */}
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            
            <div className={styles.modalImageContainer}>
              <Image
                src={images[activeImage]}
                alt={`${title} - Image ${activeImage + 1}`}
                fill
                className={styles.modalImage}
              />
              
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => navigateImage('prev')}
                aria-label="Previous image"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={() => navigateImage('next')}
                aria-label="Next image"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            
            <div className={styles.imageCounter}>
              {activeImage + 1} / {images.length}
            </div>
            
            <div className={styles.thumbnailStrip}>
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${index === activeImage ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
