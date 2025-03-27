"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faMapMarkerAlt, 
  faList, 
  faImage, 
  faCheck, 
  faArrowLeft, 
  faArrowRight, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '@/contexts/AuthContext';

export default function AdminCreateListingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        propertyType: "House",
        squareMeters: "",
        leaseTerm: "12 months",
        availabilityDate: "",
        location: "Chatan",
        nearestBase: "Kadena Air Base",
        baseInspected: "Yes",
        description: "",
        bedrooms: "1",
        bathrooms: "1",
        parkingSpaces: "0",
        petPolicy: [] as string[],
        amenities: [] as string[],
        images: [] as string[],
    });

    const propertyTypes = ["House", "Apartment", "Condo", "Townhouse"];
    const leaseTerms = ["6 months", "12 months", "24 months"];
    const bedroomOptions = ["1", "2", "3", "4", "5", "6"];
    const bathroomOptions = ["1", "1.5", "2", "2.5", "3"];
    const parkingOptions = ["0", "1", "2", "3", "4"];
    const petOptions = ["Cats Allowed", "Dogs Allowed"];
    const baseInspectionOptions = ["Yes", "No"];

    const okinawaBases = [
        "Kadena Air Base",
        "Camp Foster",
        "Camp Hansen",
        "Camp Schwab",
        "Camp Courtney",
        "Camp McTureous",
        "Camp Kinser",
        "Torii Station",
        "White Beach Naval Facility",
        "MCAS Futenma",
    ];

    const locationOptions = [
        "Chatan",
        "Ginowan",
        "Kadena",
        "Kin Town",
        "Kitanakagusuku",
        "Okinawa City",
        "Uruma",
        "Yomitan",
    ];

    const amenitiesList = [
        "Air Conditioning",
        "Ceiling Fans",
        "Fireplace",
        "Hardwood Floors",
        "Walk-in Closet",
        "Washer/Dryer",
        "Balcony/Patio",
        "Fenced Yard",
        "Private Entrance",
        "Covered Parking",
        "Swimming Pool",
        "Gym/Fitness Center",
        "Business Center",
        "Clubhouse",
        "Playground",
        "Garage Parking",
        "Gated Community",
        "Security System",
        "Ocean View",
        "Mountain View",
    ];

    const formatJapanesePrice = (value: string): string => {
        // Remove all non-digits
        const digits = value.replace(/\\D/g, '');
        
        if (digits.length <= 4) {
            // Less than 5 digits, no comma needed
            return digits;
        } else if (digits.length === 5) {
            // 5 digits: comma after second digit (e.g., 12,345)
            return digits.slice(0, 2) + ',' + digits.slice(2);
        } else if (digits.length === 6) {
            // 6 digits: comma after third digit (e.g., 123,456)
            return digits.slice(0, 3) + ',' + digits.slice(3);
        } else {
            // Limit to 6 digits
            return digits.slice(0, 6);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        
        if (name === "price") {
            const formattedValue = formatJapanesePrice(value);
            setFormData(prev => ({ ...prev, [name]: formattedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "petPolicy" | "amenities"
    ) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((item) => item !== value)
                : [...prev[field], value],
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setFormData({ ...formData, images: [...formData.images, ...fileArray] });
        }
    };

    const removeImage = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Create listing
            const listingRef = await addDoc(collection(db, 'listings'), {
                ...formData,
                status: 'active',
                createdBy: user?.uid || '',
                createdAt: serverTimestamp()
            });

            router.push("/admin");
        } catch (error) {
            console.error('Error creating listing:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        // Check if user is authenticated and is an admin
        if (!user) {
            router.push('/login');
            return;
        }

        const checkAdminStatus = async () => {
            try {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                const userRole = userDoc.data()?.role;
                
                if (userRole !== 'admin') {
                    router.push('/');
                    return;
                }
                
                setIsLoading(false);
            } catch (err) {
                console.error('Error checking admin status:', err);
                router.push('/');
            }
        };

        checkAdminStatus();
    }, [user, router]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status" style={{ color: 'var(--primary-pink)' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <div className="py-4" style={{ 
                background: 'var(--light-pink)',
                borderBottom: '1px solid var(--medium-pink)'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="mb-0 fw-bold" style={{ 
                                color: 'black',
                                fontSize: 'calc(1.5rem + 0.6vw)',
                                lineHeight: '1.2'
                            }}>Create New Listing</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-lg py-4">
                <style jsx global>{`
                    .form-control:focus,
                    .form-select:focus {
                        border-color: var(--primary-pink);
                        box-shadow: 0 0 0 0.2rem rgba(231, 93, 124, 0.25);
                    }
                    .form-check-input:checked {
                        background-color: var(--primary-pink);
                        border-color: var(--primary-pink);
                    }
                    .form-label {
                        color: var(--dark);
                        font-size: 0.95rem;
                        margin-bottom: 0.5rem;
                    }
                    .form-control,
                    .form-select {
                        border: 1px solid var(--light-pink);
                        color: var(--dark);
                        padding: 0.75rem;
                    }
                    .form-control::placeholder {
                        color: var(--medium-grey);
                    }
                    .form-check-label {
                        color: var(--dark);
                    }
                    .step-indicator {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: var(--light-pink);
                        color: var(--primary-pink);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                    }
                    .step-indicator.active {
                        background-color: var(--primary-pink);
                        color: white;
                    }
                `}</style>

                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`step-indicator me-3 ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                                        <div>Basic Information</div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`step-indicator me-3 ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                                        <div>Property Details</div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`step-indicator me-3 ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                                        <div>Features & Amenities</div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className={`step-indicator me-3 ${currentStep >= 4 ? 'active' : ''}`}>4</div>
                                        <div>Images & Submit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {/* Step 1: Basic Information */}
                                    {currentStep === 1 && (
                                        <div>
                                            <h4 className="mb-4">Basic Information</h4>
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label">Listing Title*</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="e.g., Modern Apartment in Chatan"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="price" className="form-label">Monthly Rent (¥)*</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">¥</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="price"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        placeholder="e.g., 120,000"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="propertyType" className="form-label">Property Type*</label>
                                                <select
                                                    className="form-select"
                                                    id="propertyType"
                                                    name="propertyType"
                                                    value={formData.propertyType}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {propertyTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="squareMeters" className="form-label">Size (m²)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="squareMeters"
                                                    name="squareMeters"
                                                    value={formData.squareMeters}
                                                    onChange={handleChange}
                                                    placeholder="e.g., 85"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="leaseTerm" className="form-label">Lease Term*</label>
                                                <select
                                                    className="form-select"
                                                    id="leaseTerm"
                                                    name="leaseTerm"
                                                    value={formData.leaseTerm}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {leaseTerms.map((term) => (
                                                        <option key={term} value={term}>
                                                            {term}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="availabilityDate" className="form-label">Availability Date*</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="availabilityDate"
                                                    name="availabilityDate"
                                                    value={formData.availabilityDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Property Details */}
                                    {currentStep === 2 && (
                                        <div>
                                            <h4 className="mb-4">Property Details</h4>
                                            <div className="mb-3">
                                                <label htmlFor="location" className="form-label">Location*</label>
                                                <select
                                                    className="form-select"
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {locationOptions.map((city) => (
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nearestBase" className="form-label">Nearest Military Base*</label>
                                                <select
                                                    className="form-select"
                                                    id="nearestBase"
                                                    name="nearestBase"
                                                    value={formData.nearestBase}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {okinawaBases.map((base) => (
                                                        <option key={base} value={base}>
                                                            {base}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="baseInspected" className="form-label">Base Inspected?*</label>
                                                <select
                                                    className="form-select"
                                                    id="baseInspected"
                                                    name="baseInspected"
                                                    value={formData.baseInspected}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {baseInspectionOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="bedrooms" className="form-label">Bedrooms*</label>
                                                <select
                                                    className="form-select"
                                                    id="bedrooms"
                                                    name="bedrooms"
                                                    value={formData.bedrooms}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {bedroomOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="bathrooms" className="form-label">Bathrooms*</label>
                                                <select
                                                    className="form-select"
                                                    id="bathrooms"
                                                    name="bathrooms"
                                                    value={formData.bathrooms}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {bathroomOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="parkingSpaces" className="form-label">Parking Spaces*</label>
                                                <select
                                                    className="form-select"
                                                    id="parkingSpaces"
                                                    name="parkingSpaces"
                                                    value={formData.parkingSpaces}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    {parkingOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Description*</label>
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    placeholder="Describe the property in detail..."
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Features & Amenities */}
                                    {currentStep === 3 && (
                                        <div>
                                            <h4 className="mb-4">Features & Amenities</h4>
                                            <div className="mb-4">
                                                <label className="form-label d-block">Pet Policy</label>
                                                <div className="row">
                                                    {petOptions.map((option) => (
                                                        <div className="col-md-6" key={option}>
                                                            <div className="form-check mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`pet-${option}`}
                                                                    value={option}
                                                                    checked={formData.petPolicy.includes(option)}
                                                                    onChange={(e) => handleCheckboxChange(e, "petPolicy")}
                                                                />
                                                                <label className="form-check-label" htmlFor={`pet-${option}`}>
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="form-label d-block">Amenities</label>
                                                <div className="row">
                                                    {amenitiesList.map((amenity) => (
                                                        <div className="col-md-6" key={amenity}>
                                                            <div className="form-check mb-2">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`amenity-${amenity}`}
                                                                    value={amenity}
                                                                    checked={formData.amenities.includes(amenity)}
                                                                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                                                                />
                                                                <label className="form-check-label" htmlFor={`amenity-${amenity}`}>
                                                                    {amenity}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Images & Submit */}
                                    {currentStep === 4 && (
                                        <div>
                                            <h4 className="mb-4">Images & Submit</h4>
                                            <div className="mb-4">
                                                <label htmlFor="images" className="form-label">Upload Images</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="images"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                />
                                                <small className="text-muted d-block mt-1">
                                                    You can upload multiple images at once. Maximum 10 images.
                                                </small>
                                            </div>

                                            {formData.images.length > 0 && (
                                                <div className="mb-4">
                                                    <label className="form-label">Preview</label>
                                                    <div className="row g-2">
                                                        {formData.images.map((image, index) => (
                                                            <div className="col-md-3" key={index}>
                                                                <div className="position-relative">
                                                                    <Image
                                                                        src={image}
                                                                        alt={`Property image ${index + 1}`}
                                                                        width={200}
                                                                        height={150}
                                                                        className="img-thumbnail"
                                                                        style={{ objectFit: 'cover' }}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                                                        onClick={() => removeImage(index)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="alert alert-info">
                                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                                Please review all information before submitting. Once submitted, your listing will be active immediately.
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between mt-4">
                                        {currentStep > 1 ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={prevStep}
                                            >
                                                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                                Previous
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}

                                        {currentStep < 4 ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={nextStep}
                                                style={{ 
                                                    backgroundColor: 'var(--primary-pink)',
                                                    borderColor: 'var(--primary-pink)'
                                                }}
                                            >
                                                Next
                                                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="btn btn-success"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                                                        Submit Listing
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
