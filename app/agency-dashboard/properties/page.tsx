'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faEye, faTrash, faBuilding, faMapMarkerAlt, faYen, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, storage } from '@/lib/firebase';

// Property type definition
interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  priceUSD: number;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  propertyType: string;
  images: string[];
  status: string;
  features: string[];
  baseProximity: {
    baseName: string;
    distanceKm: number;
    shuttleAvailable: boolean;
  }[];
  militaryInfo: {
    allowanceCompatible: boolean;
    militaryDiscount: number;
    sofaContractAccepted: boolean;
  };
  amenities: string[];
  agencyId: string;
  createdAt: string;
  updatedAt: string;
}

// Form state type
interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  priceUSD: number;
  bedrooms: number;
  bathrooms: number;
  floorArea: number;
  propertyType: string;
  status: string;
  features: string[];
  baseProximity: {
    baseName: string;
    distanceKm: number;
    shuttleAvailable: boolean;
  }[];
  militaryInfo: {
    allowanceCompatible: boolean;
    militaryDiscount: number;
    sofaContractAccepted: boolean;
  };
  amenities: string[];
}

const initialFormData: PropertyFormData = {
  title: '',
  description: '',
  location: '',
  price: 0,
  priceUSD: 0,
  bedrooms: 1,
  bathrooms: 1,
  floorArea: 0,
  propertyType: 'Apartment',
  status: 'Active',
  features: [],
  baseProximity: [],
  militaryInfo: {
    allowanceCompatible: true,
    militaryDiscount: 0,
    sofaContractAccepted: true
  },
  amenities: []
};

export default function PropertiesPage() {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [agencyName, setAgencyName] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [agencyLoading, setAgencyLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const [authLoading, setAuthLoading] = React.useState(true);

  const [formData, setFormData] = React.useState<PropertyFormData>(initialFormData);
  const [formErrors, setFormErrors] = React.useState<Partial<Record<keyof PropertyFormData, string>>>({});
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  const loadProperties = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch properties
      const propertiesRef = collection(db, 'properties');
      const q = query(propertiesRef, where('agencyId', '==', userId));
      console.log('Querying properties for agency:', userId);
      const propertiesSnap = await getDocs(q);
      console.log('Found properties:', propertiesSnap.docs.length);
      propertiesSnap.docs.forEach(doc => {
        console.log('Property:', doc.id, doc.data());
      });
      const propertiesData = propertiesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      console.log('Setting properties:', propertiesData.length);
      setProperties(propertiesData);
    } catch (error) {
      console.error('Error loading properties:', error);
      setError('Failed to load properties: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log('Properties page mounted');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.uid);
      if (user) {
        try {
          // Fetch agency name
          const agencyRef = doc(db, 'agencies', user.uid);
          const agencySnap = await getDoc(agencyRef);
          if (agencySnap.exists()) {
            console.log('Found agency:', agencySnap.data().name);
            setAgencyName(agencySnap.data().name);
          } else {
            console.log('No agency found for:', user.uid);
          }
          
          // Load properties
          await loadProperties(user.uid);
        } catch (error) {
          console.error('Error fetching agency data:', error);
          setError('Failed to fetch agency data: ' + (error as any).message);
        } finally {
          setAgencyLoading(false);
        }
      } else {
        console.log('No user logged in');
        setAgencyName('');
        setProperties([]);
        setAgencyLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Reload properties when auth changes
  React.useEffect(() => {
    const user = auth.currentUser;
    console.log('Auth effect - current user:', user?.uid);
    if (user) {
      loadProperties(user.uid);
    }
  }, [auth.currentUser?.uid]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state initialized:', user?.uid);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addSampleData = async () => {
    if (!auth.currentUser) {
      setError('Please log in first');
      return;
    }
    
    console.log('Current user ID:', auth.currentUser.uid);
    setLoading(true);
    setError(null);

    try {
      // Debug: List all listings before cleanup
      console.log('Before cleanup:');
      await listAllListings();

      // First clean up mock listings
      await deleteAllListings();
      
      // Debug: List all listings after mock cleanup
      console.log('After mock cleanup:');
      await listAllListings();

      const listingsRef = collection(db, 'listings');
      const propertiesRef = collection(db, 'properties');

      // Then clean up this agency's data
      console.log('Cleaning up existing agency data...');
      const q = query(propertiesRef, where('agencyId', '==', auth.currentUser.uid));
      const propertiesSnap = await getDocs(q);
      for (const doc of propertiesSnap.docs) {
        console.log('Deleting property:', doc.id);
        await deleteDoc(doc.ref);
        await deleteDoc(doc(listingsRef, doc.id));
      }
      console.log('Agency data cleanup complete');

      // Debug: List all listings after agency cleanup
      console.log('After agency cleanup:');
      await listAllListings();

      // Sample property templates
      const templates = [
        {
          title: 'Modern Apartment near Camp Foster',
          description: 'Spacious and modern apartment perfect for military families',
          location: 'Chatan, Okinawa',
          price: 150000,
          priceUSD: 1000,
          propertyType: 'Apartment',
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
          ]
        },
        {
          title: 'Ocean View House in American Village',
          description: 'Beautiful house with stunning ocean views',
          location: 'American Village, Okinawa',
          price: 200000,
          priceUSD: 1350,
          propertyType: 'House',
          images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=800&q=80'
          ]
        },
        {
          title: 'Family Home near Kadena',
          description: 'Perfect family home close to Kadena Air Base',
          location: 'Kadena, Okinawa',
          price: 180000,
          priceUSD: 1200,
          propertyType: 'House',
          images: [
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
          ]
        }
      ];

      const addedProperties = [];
      
      // Generate properties based on templates
      for (let i = 0; i < 6; i++) {
        const template = templates[i % templates.length];
        const property = {
          ...template,
          bedrooms: Math.floor(Math.random() * 3) + 2,
          bathrooms: Math.floor(Math.random() * 2) + 1,
          floorArea: Math.floor(Math.random() * 50) + 70,
          status: 'Active',
          features: ['Parking', 'Air Conditioning', 'Internet'],
          baseProximity: [
            {
              baseName: template.location.includes('Foster') ? 'Camp Foster' : 
                       template.location.includes('Kadena') ? 'Kadena Air Base' : 'Camp Kinser',
              distanceKm: Math.floor(Math.random() * 3) + 1,
              shuttleAvailable: Math.random() > 0.5
            }
          ],
          militaryInfo: {
            allowanceCompatible: true,
            militaryDiscount: Math.floor(Math.random() * 5) + 3,
            sofaContractAccepted: true
          },
          amenities: ['Central AC', 'Dishwasher', 'Internet Ready'],
          agencyId: auth.currentUser.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Add to properties collection
        console.log('Adding property based on template:', template.title);
        const propertyDoc = await addDoc(collection(db, 'properties'), property);
        console.log('Added property:', propertyDoc.id);
        
        // Add to listings collection
        await setDoc(doc(collection(db, 'listings'), propertyDoc.id), {
          ...property,
          id: propertyDoc.id
        });
        console.log('Added listing:', propertyDoc.id);
        
        addedProperties.push({ id: propertyDoc.id, ...property });
      }
      
      setProperties(addedProperties);
      setError(null);
      console.log('Sample data added successfully');
    } catch (error: any) {
      console.error('Error adding sample data:', error);
      setError('Failed to add sample data: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteAllListings = async () => {
    if (!auth.currentUser) {
      setError('Please log in first');
      return;
    }
    
    setLoading(true);
    setError(null);
    console.log('Starting complete deletion of all listings and properties...');

    try {
      // First, list all current data
      console.log('Current data before deletion:');
      await listAllListings();

      // Delete all listings
      const listingsRef = collection(db, 'listings');
      const listingsSnap = await getDocs(listingsRef);
      
      console.log('\nDeleting all listings...');
      for (const doc of listingsSnap.docs) {
        console.log('Deleting listing:', doc.id);
        await deleteDoc(doc.ref);
      }

      // Delete all properties
      const propertiesRef = collection(db, 'properties');
      const propertiesSnap = await getDocs(propertiesRef);
      
      console.log('\nDeleting all properties...');
      for (const doc of propertiesSnap.docs) {
        console.log('Deleting property:', doc.id);
        await deleteDoc(doc.ref);
      }
      
      // List final data after deletion
      console.log('\nFinal data after deletion:');
      await listAllListings();
      
      console.log('Complete deletion finished');
      setError(null);
    } catch (error: any) {
      console.error('Error in complete deletion:', error);
      setError('Failed to delete data: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteNonAgencyListings = async () => {
    if (!auth.currentUser) {
      setError('Please log in first');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Delete listings not belonging to current agency
      const listingsRef = collection(db, 'listings');
      const listingsSnap = await getDocs(listingsRef);
      
      console.log('\nDeleting non-agency listings...');
      for (const doc of listingsSnap.docs) {
        const data = doc.data();
        if (data.agencyId !== auth.currentUser.uid) {
          console.log('Deleting listing:', doc.id);
          await deleteDoc(doc.ref);
        }
      }

      // Delete properties not belonging to current agency
      const propertiesRef = collection(db, 'properties');
      const propertiesSnap = await getDocs(propertiesRef);
      
      console.log('\nDeleting non-agency properties...');
      for (const doc of propertiesSnap.docs) {
        const data = doc.data();
        if (data.agencyId !== auth.currentUser.uid) {
          console.log('Deleting property:', doc.id);
          await deleteDoc(doc.ref);
        }
      }

      // Refresh properties list
      const q = query(propertiesRef, where('agencyId', '==', auth.currentUser.uid));
      const updatedPropertiesSnap = await getDocs(q);
      const updatedPropertiesData = updatedPropertiesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      setProperties(updatedPropertiesData);
      
      setError(null);
    } catch (error: any) {
      console.error('Error deleting non-agency data:', error);
      setError('Failed to delete data: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const listAllListings = async () => {
    try {
      console.log('Starting listAllListings...');
      
      if (!auth.currentUser) {
        console.error('No user logged in during listAllListings');
        setError('Please log in first');
        return;
      }

      console.log('Listing all documents in the listings and properties collections:');
      console.log('Current user:', auth.currentUser.uid);
      
      // List all listings
      const listingsRef = collection(db, 'listings');
      const listingsSnap = await getDocs(listingsRef);
      
      console.log(`\nListings collection (${listingsSnap.size} total):`);
      listingsSnap.docs.forEach(doc => {
        const data = doc.data();
        console.log(`\nListing ${doc.id}:`, {
          title: data.title,
          agencyId: data.agencyId || 'NO AGENCY ID',
          location: data.location,
          price: data.price,
          status: data.status,
          createdAt: data.createdAt
        });
      });

      // List all properties
      const propertiesRef = collection(db, 'properties');
      const propertiesSnap = await getDocs(propertiesRef);
      
      console.log(`\nProperties collection (${propertiesSnap.size} total):`);
      propertiesSnap.docs.forEach(doc => {
        const data = doc.data();
        console.log(`\nProperty ${doc.id}:`, {
          title: data.title,
          agencyId: data.agencyId || 'NO AGENCY ID',
          location: data.location,
          price: data.price,
          status: data.status,
          createdAt: data.createdAt
        });
      });

      // Check for orphaned documents
      const orphanedListings = listingsSnap.docs.filter(doc => {
        const propertyExists = propertiesSnap.docs.some(p => p.id === doc.id);
        return !propertyExists;
      });

      const orphanedProperties = propertiesSnap.docs.filter(doc => {
        const listingExists = listingsSnap.docs.some(l => l.id === doc.id);
        return !listingExists;
      });

      if (orphanedListings.length > 0) {
        console.log('\nWarning: Found orphaned listings (no corresponding property):', 
          orphanedListings.map(doc => doc.id));
      }

      if (orphanedProperties.length > 0) {
        console.log('\nWarning: Found orphaned properties (no corresponding listing):', 
          orphanedProperties.map(doc => doc.id));
      }

      // Show summary
      console.log('\nSummary:');
      console.log('- Total listings:', listingsSnap.size);
      console.log('- Total properties:', propertiesSnap.size);
      console.log('- Orphaned listings:', orphanedListings.length);
      console.log('- Orphaned properties:', orphanedProperties.length);

    } catch (error) {
      console.error('Error in listAllListings:', error);
      setError('Failed to list data: ' + (error as any).message || 'Unknown error');
    }
  };

  const generateProperty = (index: number) => {
    const isApartment = index % 2 === 0;
    const locations = ['Chatan', 'Mihama', 'Okinawa City', 'Naha', 'Ginowan', 'Yomitan'];
    const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa'];
    const features = [
      'Ocean View', 'Balcony', 'Parking', 'Security System', 'Pet-friendly', 'Elevator',
      'Garden', 'Garage', 'Private Yard', 'Recently Renovated', 'Pool', 'Gym'
    ];
    const amenities = [
      'Central AC', 'Dishwasher', 'Built-in Closets', 'Internet Ready', 'Cable TV Ready',
      'Modern Kitchen', 'Storage Room', 'Laundry Room', 'High-Speed Internet', 'Smart Home Features'
    ];
    const bases = [
      { name: 'Camp Foster', maxDistance: 5 },
      { name: 'Kadena Air Base', maxDistance: 7 },
      { name: 'Camp Kinser', maxDistance: 6 },
      { name: 'Camp Hansen', maxDistance: 15 },
      { name: 'MCAS Futenma', maxDistance: 4 }
    ];

    // Generate random values
    const location = locations[Math.floor(Math.random() * locations.length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const bedrooms = Math.floor(Math.random() * 3) + 2; // 2-4 bedrooms
    const bathrooms = Math.floor(Math.random() * 2) + 1.5; // 1.5-2.5 bathrooms
    const price = Math.floor(Math.random() * 100000) + 100000; // 100,000¥ - 200,000¥
    const priceUSD = Math.floor(price / 150); // Approximate USD conversion

    // Select random features and amenities
    const selectedFeatures = features
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 3);
      
    const selectedAmenities = amenities
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 3);

    // Generate base proximity data
    const selectedBases = bases
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 1)
      .map(base => ({
        baseName: base.name,
        distanceKm: Number((Math.random() * base.maxDistance).toFixed(1)),
        shuttleAvailable: Math.random() > 0.5
      }));

    return {
      title: `${propertyType} in ${location} - ${bedrooms} BR`,
      description: `Beautiful ${bedrooms}-bedroom ${propertyType.toLowerCase()} perfect for military families. Features include ${selectedFeatures.join(', ').toLowerCase()}.`,
      location: `${location}, Okinawa`,
      price,
      priceUSD,
      bedrooms,
      bathrooms,
      floorArea: Math.floor(Math.random() * 50) + 70, // 70-120 m²
      propertyType,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000'
      ],
      status: Math.random() > 0.8 ? 'Pending' : 'Active',
      features: selectedFeatures,
      baseProximity: selectedBases,
      militaryInfo: {
        allowanceCompatible: true,
        militaryDiscount: Math.floor(Math.random() * 10) + 5, // 5-15% discount
        sofaContractAccepted: true
      },
      amenities: selectedAmenities,
      agencyId: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setShowForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('militaryInfo.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          militaryInfo: {
            ...prev.militaryInfo,
            [field]: checkbox.checked
          }
        }));
      }
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else if (name === 'features' || name === 'amenities') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim()).filter(Boolean)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // Handle base proximity
  const handleAddBase = () => {
    setFormData(prev => ({
      ...prev,
      baseProximity: [
        ...prev.baseProximity,
        {
          baseName: '',
          distanceKm: 0,
          shuttleAvailable: false
        }
      ]
    }));
  };

  const handleBaseChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      baseProximity: prev.baseProximity.map((base, i) => 
        i === index ? { ...base, [field]: value } : base
      )
    }));
  };

  const handleRemoveBase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      baseProximity: prev.baseProximity.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof PropertyFormData, string>> = {};

    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.location) errors.location = 'Location is required';
    if (formData.price <= 0) errors.price = 'Price must be greater than 0';
    if (formData.priceUSD <= 0) errors.priceUSD = 'USD price must be greater than 0';
    if (formData.bedrooms <= 0) errors.bedrooms = 'Number of bedrooms must be greater than 0';
    if (formData.bathrooms <= 0) errors.bathrooms = 'Number of bathrooms must be greater than 0';
    if (formData.floorArea <= 0) errors.floorArea = 'Floor area must be greater than 0';
    if (!formData.propertyType) errors.propertyType = 'Property type is required';
    if (formData.baseProximity.length === 0) errors.baseProximity = 'At least one base proximity is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!auth.currentUser) {
      setError('Please log in first');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `properties/${auth.currentUser.uid}/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      const propertyData = {
        ...formData,
        images: imageUrls,
        agencyId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Create or update property
      let propertyId: string;
      if (selectedProperty) {
        propertyId = selectedProperty.id;
        await updateDoc(doc(db, 'properties', propertyId), propertyData);
      } else {
        const docRef = await addDoc(collection(db, 'properties'), propertyData);
        propertyId = docRef.id;
      }

      // Create or update corresponding listing
      const listingData = {
        ...propertyData,
        propertyId
      };

      const listingsRef = collection(db, 'listings');
      const listingsQuery = query(listingsRef, where('propertyId', '==', propertyId));
      const listingsSnap = await getDocs(listingsQuery);

      if (!listingsSnap.empty) {
        await updateDoc(doc(listingsRef, listingsSnap.docs[0].id), listingData);
      } else {
        await addDoc(listingsRef, listingData);
      }

      // Reload properties
      await loadProperties(auth.currentUser.uid);
      setShowForm(false);
      setFormData(initialFormData);
      setImageFiles([]);
    } catch (error) {
      console.error('Error saving property:', error);
      setError('Failed to save property: ' + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle property deletion
  const handleDeleteProperty = async (propertyId: string) => {
    if (!auth.currentUser) {
      setError('Please log in first');
      return;
    }

    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Delete property
      await deleteDoc(doc(db, 'properties', propertyId));

      // Delete corresponding listing
      const listingsRef = collection(db, 'listings');
      const listingsQuery = query(listingsRef, where('propertyId', '==', propertyId));
      const listingsSnap = await getDocs(listingsQuery);
      
      for (const doc of listingsSnap.docs) {
        await deleteDoc(doc.ref);
      }

      // Reload properties
      await loadProperties(auth.currentUser.uid);
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Add a timeout to reset loading state if stuck
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
        setError('Operation timed out. Please try again.');
      }, 30000); // 30 seconds timeout
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading]);

  if (authLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border mb-3" role="status" style={{ color: '#e75d7c', width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-warning">
          Please log in to view your properties.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border mb-3" role="status" style={{ color: '#e75d7c', width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Processing... This may take a few moments.</p>
          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="display-6 mb-1" style={{ color: '#e75d7c' }}>
                {agencyLoading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </div>
                ) : (
                  agencyName || 'Welcome'
                )}
              </h1>
              <p className="text-muted">
                {properties.length === 0 ? 
                  'Start adding properties to showcase them to military families' :
                  `Managing ${properties.length} ${properties.length === 1 ? 'property' : 'properties'}`
                }
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger me-2"
                onClick={async () => {
                  try {
                    await deleteNonAgencyListings();
                  } catch (error) {
                    console.error('Error:', error);
                    setError('Failed: ' + (error as any).message || 'Unknown error');
                  }
                }}
                disabled={loading}
              >
                Delete Non-Agency Data
              </button>
              <button
                className="btn btn-outline-info"
                onClick={async () => {
                  try {
                    console.log('Starting debug listing process...');
                    await listAllListings();
                  } catch (error) {
                    console.error('Error in debug listing process:', error);
                    setError('Failed to list data: ' + (error as any).message || 'Unknown error');
                  }
                }}
                disabled={loading}
              >
                Debug: List All Listings
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: '#e75d7c',
                  color: 'white',
                  borderRadius: '8px'
                }}
                onClick={handleAddProperty}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4" style={{ color: '#e75d7c' }}>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </div>
          <h3 className="h5 mb-2">No Properties Listed</h3>
          <p className="text-muted mb-4">
            Add your first property to start connecting with military families
          </p>
          <button
            className="btn"
            style={{
              backgroundColor: '#e75d7c',
              color: 'white',
              borderRadius: '8px'
            }}
            onClick={handleAddProperty}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Your First Property
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {properties.map((property) => (
            <div key={property.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <div style={{ height: '240px', position: 'relative' }}>
                    <img
                      src={property.images[0] || '/images/placeholder.jpg'}
                      alt={property.title}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      className="rounded-top"
                    />
                  </div>
                  <div 
                    className="position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill"
                    style={{
                      backgroundColor: property.status === 'Active' ? '#ebf9f1' : property.status === 'Pending' ? '#fdf2f4' : '#f8f9fa',
                      color: property.status === 'Active' ? '#198754' : property.status === 'Pending' ? '#e75d7c' : '#6c757d',
                      border: `1px solid ${property.status === 'Active' ? '#a3e0c0' : property.status === 'Pending' ? '#f4c6ce' : '#dee2e6'}`,
                      fontSize: '0.875rem'
                    }}
                  >
                    {property.status}
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="h5 mb-1">{property.title}</h3>
                  <div className="d-flex align-items-center text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    {property.location}
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                      <FontAwesomeIcon icon={faYen} className="me-1 text-muted" />
                      <span className="fw-bold">{property.price.toLocaleString()}</span>
                    </div>
                    {property.priceUSD && (
                      <div>
                        <FontAwesomeIcon icon={faDollarSign} className="me-1 text-muted" />
                        <span className="fw-bold">{property.priceUSD.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    {property.baseProximity.map((base, index) => (
                      <div key={index} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faBuilding} className="text-muted" />
                        <span>{base.baseName} ({base.distanceKm}km)</span>
                        {base.shuttleAvailable && (
                          <span className="badge" style={{ backgroundColor: '#fdf2f4', color: '#e75d7c' }}>
                            Shuttle
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-top">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm flex-grow-1"
                        style={{
                          backgroundColor: '#fdf2f4',
                          color: '#e75d7c',
                          borderRadius: '8px'
                        }}
                        onClick={() => handleEditProperty(property)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-2" />
                        Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ 
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px'
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        style={{ borderRadius: '8px' }}
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Property Form Modal */}
      {showForm && (
        <div 
          className="modal fade show" 
          style={{ 
            display: 'block', 
            backgroundColor: 'rgba(0,0,0,0.5)' 
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {selectedProperty ? 'Edit Property' : 'Add New Property'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                    />
                    {formErrors.title && (
                      <div className="text-danger">{formErrors.title}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows={3} 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                    />
                    {formErrors.description && (
                      <div className="text-danger">{formErrors.description}</div>
                    )}
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label">Price (JPY)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleInputChange} 
                      />
                      {formErrors.price && (
                        <div className="text-danger">{formErrors.price}</div>
                      )}
                    </div>
                    <div className="col">
                      <label className="form-label">Price (USD)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="priceUSD" 
                        value={formData.priceUSD} 
                        onChange={handleInputChange} 
                      />
                      {formErrors.priceUSD && (
                        <div className="text-danger">{formErrors.priceUSD}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                    />
                    {formErrors.location && (
                      <div className="text-danger">{formErrors.location}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Images</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      multiple 
                      onChange={handleImageChange} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      name="status" 
                      value={formData.status} 
                      onChange={handleInputChange} 
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                    </select>
                    {formErrors.status && (
                      <div className="text-danger">{formErrors.status}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Features</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="features" 
                      value={formData.features.join(', ')} 
                      onChange={handleInputChange} 
                      placeholder="Separate with commas" 
                    />
                    {formErrors.features && (
                      <div className="text-danger">{formErrors.features}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Military Information</label>
                    <div className="card" style={{ backgroundColor: '#fdf2f4' }}>
                      <div className="card-body">
                        <div className="form-check mb-2">
                          <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="allowanceCompatible" 
                            name="militaryInfo.allowanceCompatible" 
                            checked={formData.militaryInfo.allowanceCompatible} 
                            onChange={handleInputChange} 
                          />
                          <label className="form-check-label" htmlFor="allowanceCompatible">
                            Housing Allowance Compatible
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="sofaContract" 
                            name="militaryInfo.sofaContractAccepted" 
                            checked={formData.militaryInfo.sofaContractAccepted} 
                            onChange={handleInputChange} 
                          />
                          <label className="form-check-label" htmlFor="sofaContract">
                            SOFA Contract Accepted
                          </label>
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Military Discount (%)</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="militaryInfo.militaryDiscount" 
                            value={formData.militaryInfo.militaryDiscount} 
                            onChange={handleInputChange} 
                          />
                          {formErrors.militaryInfo?.militaryDiscount && (
                            <div className="text-danger">{formErrors.militaryInfo?.militaryDiscount}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Base Proximity</label>
                    <div className="card">
                      <div className="card-body">
                        {formData.baseProximity.map((base, index) => (
                          <div key={index} className="mb-2">
                            <select 
                              className="form-select mb-2" 
                              name={`baseProximity.${index}.baseName`} 
                              value={base.baseName} 
                              onChange={(e) => handleBaseChange(index, 'baseName', e.target.value)} 
                            >
                              <option value="">Select Base</option>
                              <option value="Camp Foster">Camp Foster</option>
                              <option value="Kadena Air Base">Kadena Air Base</option>
                              <option value="Camp Kinser">Camp Kinser</option>
                            </select>
                            <div className="input-group mb-2">
                              <input 
                                type="number" 
                                className="form-control" 
                                name={`baseProximity.${index}.distanceKm`} 
                                value={base.distanceKm} 
                                onChange={(e) => handleBaseChange(index, 'distanceKm', parseFloat(e.target.value))} 
                                placeholder="Distance (km)" 
                              />
                              <div className="input-group-text">km</div>
                            </div>
                            <div className="form-check">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id={`shuttleAvailable-${index}`} 
                                name={`baseProximity.${index}.shuttleAvailable`} 
                                checked={base.shuttleAvailable} 
                                onChange={(e) => handleBaseChange(index, 'shuttleAvailable', e.target.checked)} 
                              />
                              <label className="form-check-label" htmlFor={`shuttleAvailable-${index}`}>
                                Shuttle Available
                              </label>
                            </div>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveBase(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#fdf2f4',
                            color: '#e75d7c'
                          }}
                          onClick={handleAddBase}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-1" />
                          Add Another Base
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amenities</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="amenities" 
                      value={formData.amenities.join(', ')} 
                      onChange={handleInputChange} 
                      placeholder="Separate with commas" 
                    />
                    {formErrors.amenities && (
                      <div className="text-danger">{formErrors.amenities}</div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#e75d7c',
                    color: 'white'
                  }}
                  disabled={submitting}
                >
                  {selectedProperty ? 'Save Changes' : 'Add Property'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
