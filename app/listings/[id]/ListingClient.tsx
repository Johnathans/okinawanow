'use client';

import { Listing } from '@/types/listing';
import { User } from '@/types/user';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import AgencyCard from '@/components/AgencyCard';
import NearbyListings from '@/components/NearbyListings';
import { useFavorites } from '@/hooks/useFavorites';
import { useViewings } from '@/hooks/useViewings';
import { useAuth } from '@/hooks/useAuth';
import AmenitiesDisplay from '@/components/AmenitiesDisplay';
import Button from '@/components/Button';
import styles from './styles.module.css';

interface ListingClientProps {
  listing: Listing;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { hasFavorited, toggleFavorite } = useFavorites({
    listingId: listing.id || '',
    currentUser: user as User | null
  });

  const { hasRequested, toggleViewing } = useViewings({
    listingId: listing.id || '',
    currentUser: user as User | null
  });

  const location = useMemo(() => {
    return `${listing.city}${listing.prefecture ? `, ${listing.prefecture}` : ''}`;
  }, [listing.city, listing.prefecture]);

  const handleContactAgent = useCallback(() => {
    // Implement contact agent functionality
    console.log('Contact agent clicked');
  }, []);

  const handleTourRequest = useCallback(() => {
    if (!user) {
      router.push('/login?redirect=/listings/' + listing.id);
      return;
    }
    toggleViewing?.();
  }, [user, listing.id, router, toggleViewing]);

  const handleFavoriteClick = useCallback(() => {
    toggleFavorite?.();
  }, [toggleFavorite]);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/listings">Listings</Link> / <span>{listing.title}</span>
      </div>
      
      <ImageGallery images={listing.images} title={listing.title} />
      
      <div className={styles.content}>
        <div className={styles.mainColumn}>
          <div className={styles.listingHeader}>
            <h1 className={styles.title}>{listing.title}</h1>
            <div className={styles.location}>
              <i className="fa-solid fa-location-dot"></i>
              <span>{location}</span>
            </div>
          </div>
          
          <div className={styles.quickInfo}>
            <div className={styles.price}>
              <div className={styles.priceJPY}>{formatPrice(listing.price)}</div>
              {listing.priceUSD && (
                <div className={styles.priceUSD}>
                  ${listing.priceUSD.toLocaleString('en-US')} USD
                </div>
              )}
            </div>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="fa-solid fa-bed"></i>
                <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
              </div>
              <div className={styles.feature}>
                <i className="fa-solid fa-bath"></i>
                <span>{listing.bathrooms} {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
              </div>
              <div className={styles.feature}>
                <i className="fa-solid fa-ruler-combined"></i>
                <span>{listing.squareMeters} m²</span>
              </div>
              {(listing.parkingSpaces || 0) > 0 && (
                <div className={styles.feature}>
                  <i className="fa-solid fa-car"></i>
                  <span>{listing.parkingSpaces} {listing.parkingSpaces === 1 ? 'Parking Space' : 'Parking Spaces'}</span>
                </div>
              )}
              {listing.listingType && (
                <div className={styles.feature}>
                  <i className="fa-solid fa-home"></i>
                  <span>{listing.listingType.charAt(0).toUpperCase() + listing.listingType.slice(1)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <div className={styles.description}>
              {listing.description || 'No description provided.'}
            </div>
          </div>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Property Details</h2>
            <div className={styles.detailsGrid}>
              {(listing.yearBuilt || 0) > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Year Built</span>
                  <span className={styles.detailValue}>{listing.yearBuilt}</span>
                </div>
              )}
              {listing.availableFrom && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Available From</span>
                  <span className={styles.detailValue}>{new Date(listing.availableFrom).toLocaleDateString()}</span>
                </div>
              )}
              {listing.leaseTerm && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Lease Term</span>
                  <span className={styles.detailValue}>{listing.leaseTerm}</span>
                </div>
              )}
              {listing.utilitiesIncluded !== undefined && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Utilities</span>
                  <span className={styles.detailValue}>{listing.utilitiesIncluded ? 'Included' : 'Not Included'}</span>
                </div>
              )}
              {listing.baseInspected !== undefined && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Base Inspected</span>
                  <span className={styles.detailValue}>{listing.baseInspected ? 'Yes' : 'No'}</span>
                </div>
              )}
            </div>
          </div>
          
          {listing.amenities && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <AmenitiesDisplay amenities={listing.amenities} />
            </div>
          )}
          
          {listing.nearbyBases && listing.nearbyBases.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Nearby Military Bases</h2>
              <div className={styles.baseGrid}>
                {listing.nearbyBases.map((base, index) => (
                  <div key={index} className={styles.baseItem}>
                    <div className={styles.baseName}>{base.name}</div>
                    <div className={styles.baseDistance}>{base.distance} km away</div>
                    {base.shuttleAvailable && (
                      <div className={styles.baseShuttle}>
                        <i className="fa-solid fa-bus"></i>
                        <span>Shuttle service available</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.sideColumn}>
          <div className={styles.actionButtons}>
            <Button 
              variant="primary"
              size="medium"
              fullWidth
              onClick={handleContactAgent}
            >
              Contact Agent
            </Button>
            <Button 
              variant="secondary"
              size="medium"
              fullWidth
              onClick={handleFavoriteClick}
              className={hasFavorited ? styles.favorited : ''}
            >
              {hasFavorited ? 'Saved' : 'Save to Favorites'}
            </Button>
            <Button 
              variant="secondary"
              size="medium"
              fullWidth
              onClick={handleTourRequest}
              className={hasRequested ? styles.requested : ''}
            >
              {hasRequested ? 'Tour Requested' : 'Request a Tour'}
            </Button>
          </div>
          
          {listing.agency && (
            <AgencyCard 
              name={listing.agency.name || 'Agency'}
              logo={listing.agency.logo || '/images/default-agency-logo.png'}
              description={listing.agency.description || 'Contact this agency for more information about this listing.'}
              phone={listing.agency.phone || 'N/A'}
              email={listing.agency.email || 'N/A'}
              website={listing.agency.website}
            />
          )}
          
          {!listing.agency && listing.agencyId && (
            <div className={styles.sideSection}>
              <h3 className={styles.sideSectionTitle}>Contact Information</h3>
              <p>Please contact the property manager for more information.</p>
            </div>
          )}
          
          <div className={styles.sideSection}>
            <h3 className={styles.sideSectionTitle}>Move-in Costs</h3>
            <div className={styles.moveInCosts}>
              <div className={styles.costItem}>
                <span className={styles.costLabel}>First Month's Rent</span>
                <span className={styles.costValue}>{formatPrice(listing.price)}</span>
              </div>
              {(listing.securityDeposit || 0) > 0 && (
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Security Deposit</span>
                  <span className={styles.costValue}>{formatPrice(listing.securityDeposit || 0)}</span>
                </div>
              )}
              {(listing.keyMoney || 0) > 0 && (
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Key Money</span>
                  <span className={styles.costValue}>{formatPrice(listing.keyMoney || 0)}</span>
                </div>
              )}
              {(listing.agencyFee || 0) > 0 && (
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Agency Fee</span>
                  <span className={styles.costValue}>{formatPrice(listing.agencyFee || 0)}</span>
                </div>
              )}
              {(listing.guarantorFee || 0) > 0 && (
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Guarantor Fee</span>
                  <span className={styles.costValue}>{formatPrice(listing.guarantorFee || 0)}</span>
                </div>
              )}
              <div className={styles.costItem}>
                <span className={styles.costLabel}>Total Move-in Cost</span>
                <span className={styles.costTotal}>
                  {formatPrice(
                    listing.price + 
                    (listing.securityDeposit || 0) + 
                    (listing.keyMoney || 0) + 
                    (listing.agencyFee || 0) + 
                    (listing.guarantorFee || 0)
                  )}
                </span>
              </div>
            </div>
          </div>
          
          {listing.baseInspected && (
            <div className={styles.baseInspected}>
              <i className="fa-solid fa-check-circle"></i>
              <span>Base Housing Office Inspected</span>
            </div>
          )}
          
          {listing.petPolicy && listing.petPolicy.length > 0 && (
            <div className={styles.sideSection}>
              <h3 className={styles.sideSectionTitle}>Pet Policy</h3>
              <ul className={styles.petPolicy}>
                {listing.petPolicy.map((policy, index) => (
                  <li key={index} className={styles.petPolicyItem}>
                    <i className="fa-solid fa-paw"></i>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.nearbySection}>
        <NearbyListings currentListingId={listing.id || ''} city={listing.city || ''} />
      </div>
    </div>
  );
};

export default ListingClient;
