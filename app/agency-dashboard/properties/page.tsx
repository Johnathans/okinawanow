'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMapMarkerAlt,
  faBuilding,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Listing, ListingType, ListingStatus, PetPolicy, INTERIOR_AMENITIES, BATHROOM_AMENITIES, KITCHEN_AMENITIES, BUILDING_AMENITIES, UTILITY_AMENITIES, SECURITY_AMENITIES, LOCATION_FEATURES } from '@/types/listing';

const initialFormData: Partial<Listing> = {
  listingId: '',
  title: '',
  description: '',
  price: 0,
  priceUSD: 0,
  listingType: ListingType.Apartment,
  status: ListingStatus.Active,
  negotiable: false,
  bedrooms: 0,
  bathrooms: 0,
  floorArea: 0,
  parkingSpaces: 0,
  availableFrom: new Date().toISOString(),
  leaseTerm: '',
  location: '',
  city: '',
  nearestBase: '',
  baseInspected: false,
  baseProximity: [],
  moveInCosts: {
    deposit: 0,
    keyMoney: 0,
    agencyFee: 0,
    guarantorFee: 0
  },
  utilitiesIncluded: false,
  interiorAmenities: [],
  bathroomAmenities: [],
  kitchenAmenities: [],
  buildingAmenities: [],
  utilityAmenities: [],
  securityAmenities: [],
  locationFeatures: [],
  images: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: ''
};

export default function PropertiesPage() {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const router = useRouter(); 
  const [properties, setProperties] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<Partial<Listing>>(initialFormData);

  const handleError = (error: Error, message: string) => {
    console.error(message, error);
    setError(message);
  };

  const loadProperties = useCallback(async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('You must be logged in to view properties');
      }

      setLoading(true);
      const listingsRef = collection(db, 'listings');
      const snapshot = await getDocs(listingsRef);
      const propertyList = snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id } as Listing))
        .filter(property => property.agencyId === auth.currentUser?.uid);
      setProperties(propertyList);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error, 'Failed to load properties');
      } else {
        setError('An unknown error occurred while loading properties');
      }
    } finally {
      setLoading(false);
    }
  }, []); // Remove auth from dependencies as it's a stable reference

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleEditProperty = (property: Listing) => {
    setSelectedProperty(property);
    setFormData(property);
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['price', 'priceUSD', 'bedrooms', 'bathrooms', 'floorArea', 'parkingSpaces'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else if (name === 'listingType') {
      setFormData(prev => ({
        ...prev,
        listingType: value as ListingType
      }));
    } else if (name === 'status') {
      setFormData(prev => ({
        ...prev,
        status: value as ListingStatus
      }));
    } else if (name === 'baseInspected' || name === 'utilitiesIncluded' || name === 'negotiable') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmenityChange = (category: keyof Pick<Listing, 'interiorAmenities' | 'bathroomAmenities' | 'kitchenAmenities' | 'buildingAmenities' | 'utilityAmenities' | 'securityAmenities' | 'locationFeatures'>, value: string) => {
    const amenities = value.split(',').map(a => a.trim()).filter(Boolean);
    
    switch (category) {
      case 'interiorAmenities':
        setFormData(prev => ({
          ...prev,
          interiorAmenities: amenities.filter(a => INTERIOR_AMENITIES.includes(a as typeof INTERIOR_AMENITIES[number])) as typeof INTERIOR_AMENITIES[number][]
        }));
        break;
      case 'bathroomAmenities':
        setFormData(prev => ({
          ...prev,
          bathroomAmenities: amenities.filter(a => BATHROOM_AMENITIES.includes(a as typeof BATHROOM_AMENITIES[number])) as typeof BATHROOM_AMENITIES[number][]
        }));
        break;
      case 'kitchenAmenities':
        setFormData(prev => ({
          ...prev,
          kitchenAmenities: amenities.filter(a => KITCHEN_AMENITIES.includes(a as typeof KITCHEN_AMENITIES[number])) as typeof KITCHEN_AMENITIES[number][]
        }));
        break;
      case 'buildingAmenities':
        setFormData(prev => ({
          ...prev,
          buildingAmenities: amenities.filter(a => BUILDING_AMENITIES.includes(a as typeof BUILDING_AMENITIES[number])) as typeof BUILDING_AMENITIES[number][]
        }));
        break;
      case 'utilityAmenities':
        setFormData(prev => ({
          ...prev,
          utilityAmenities: amenities.filter(a => UTILITY_AMENITIES.includes(a as typeof UTILITY_AMENITIES[number])) as typeof UTILITY_AMENITIES[number][]
        }));
        break;
      case 'securityAmenities':
        setFormData(prev => ({
          ...prev,
          securityAmenities: amenities.filter(a => SECURITY_AMENITIES.includes(a as typeof SECURITY_AMENITIES[number])) as typeof SECURITY_AMENITIES[number][]
        }));
        break;
      case 'locationFeatures':
        setFormData(prev => ({
          ...prev,
          locationFeatures: amenities.filter(a => LOCATION_FEATURES.includes(a as typeof LOCATION_FEATURES[number])) as typeof LOCATION_FEATURES[number][]
        }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) {
        throw new Error('You must be logged in to save a property');
      }

      setLoading(true);
      const propertyData: Partial<Listing> = {
        ...formData,
        agencyId: auth.currentUser.uid,
        updatedAt: new Date().toISOString()
      };

      if (!selectedProperty?.id) {
        // Create new property
        propertyData.createdAt = new Date().toISOString();
        propertyData.createdBy = auth.currentUser.uid;
        await addDoc(collection(db, 'listings'), propertyData);
      } else {
        // Update existing property
        await updateDoc(doc(db, 'listings', selectedProperty.id), propertyData);
      }

      await loadProperties();
      setShowModal(false);
      setFormData(initialFormData);
      setSelectedProperty(null);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error, 'Failed to save property');
      } else {
        setError('An unknown error occurred while saving the property');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!propertyId) return; // Early return if no ID
    
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'listings', propertyId));
      await loadProperties();
    } catch (error) {
      if (error instanceof Error) {
        handleError(error, 'Failed to delete property');
      } else {
        setError('An unknown error occurred while deleting the property');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
        <button
          onClick={handleAddProperty}
          className="bg-[#df2bb3] hover:bg-[#c0249a] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Property
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#df2bb3]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {property.images && property.images[0] ? (
                <div className="relative h-48">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#df2bb3] font-bold text-lg">
                    ¥{property.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">
                    ${property.priceUSD.toLocaleString()} USD
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => property.id && handleDeleteProperty(property.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.listingType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {selectedProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Property ID</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="listingId"
                    value={selectedProperty?.listingId || formData.listingId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="title"
                    value={selectedProperty?.title || formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control"
                    name="description"
                    value={selectedProperty?.description || formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Price (¥)</label>
                    <input 
                      type="number"
                      className="form-control"
                      name="price"
                      value={selectedProperty?.price || formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price (USD)</label>
                    <input 
                      type="number"
                      className="form-control"
                      name="priceUSD"
                      value={selectedProperty?.priceUSD || formData.priceUSD}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Property Type</label>
                    <select 
                      className="form-select"
                      name="listingType"
                      value={selectedProperty?.listingType || formData.listingType}
                      onChange={handleInputChange}
                      required
                    >
                      {Object.values(ListingType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      name="status"
                      value={selectedProperty?.status || formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      {Object.values(ListingStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="location"
                      value={selectedProperty?.location || formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="city"
                      value={selectedProperty?.city || formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nearest Base</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="nearestBase"
                      value={selectedProperty?.nearestBase || formData.nearestBase}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Base Inspected</label>
                    <select 
                      className="form-select"
                      name="baseInspected"
                      value={String(selectedProperty?.baseInspected || formData.baseInspected)}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Interior Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="interiorAmenities"
                    value={
                      selectedProperty?.interiorAmenities?.join(', ') || 
                      formData.interiorAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('interiorAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Bathroom Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="bathroomAmenities"
                    value={
                      selectedProperty?.bathroomAmenities?.join(', ') || 
                      formData.bathroomAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('bathroomAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Kitchen Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="kitchenAmenities"
                    value={
                      selectedProperty?.kitchenAmenities?.join(', ') || 
                      formData.kitchenAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('kitchenAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Building Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="buildingAmenities"
                    value={
                      selectedProperty?.buildingAmenities?.join(', ') || 
                      formData.buildingAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('buildingAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Utility Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="utilityAmenities"
                    value={
                      selectedProperty?.utilityAmenities?.join(', ') || 
                      formData.utilityAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('utilityAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Security Amenities</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="securityAmenities"
                    value={
                      selectedProperty?.securityAmenities?.join(', ') || 
                      formData.securityAmenities?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('securityAmenities', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location Features</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="locationFeatures"
                    value={
                      selectedProperty?.locationFeatures?.join(', ') || 
                      formData.locationFeatures?.join(', ') || 
                      ''
                    }
                    onChange={(e) => handleAmenityChange('locationFeatures', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setFormData(initialFormData);
                      setSelectedProperty(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#df2bb3] hover:bg-[#c0249a] text-white px-4 py-2 rounded-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      'Save Property'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
