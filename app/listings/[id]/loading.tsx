'use client';

import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}></div>
          <div className={styles.secondaryImages}>
            <div className={styles.secondaryImage}></div>
            <div className={styles.secondaryImage}></div>
            <div className={styles.secondaryImage}></div>
            <div className={styles.secondaryImage}></div>
          </div>
        </div>
        
        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.titleSkeleton}></div>
            <div className={styles.locationSkeleton}></div>
            
            <div className={styles.infoBar}>
              <div className={styles.priceSkeleton}></div>
              <div className={styles.featuresSkeleton}>
                <div className={styles.featureSkeleton}></div>
                <div className={styles.featureSkeleton}></div>
                <div className={styles.featureSkeleton}></div>
              </div>
            </div>
            
            <div className={styles.section}>
              <div className={styles.sectionTitleSkeleton}></div>
              <div className={styles.paragraphSkeleton}></div>
              <div className={styles.paragraphSkeleton}></div>
            </div>
            
            <div className={styles.section}>
              <div className={styles.sectionTitleSkeleton}></div>
              <div className={styles.amenitiesGridSkeleton}>
                <div className={styles.amenityCategorySkeleton}></div>
                <div className={styles.amenityCategorySkeleton}></div>
                <div className={styles.amenityCategorySkeleton}></div>
              </div>
            </div>
          </div>
          
          <div className={styles.sideColumn}>
            <div className={styles.actionsSkeleton}></div>
            <div className={styles.agencySkeleton}></div>
            <div className={styles.sideSectionSkeleton}></div>
            <div className={styles.sideSectionSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
