"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Listing } from '@/types/listing'; 
import Image from "next/image";
import { FaHome, FaMapMarkerAlt, FaList, FaImage, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

interface UserData extends User {
    role?: string;
}

export default function PostListingPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        propertyType: "House",
        sqft: "",
        leaseTerm: "12 months",
        availabilityDate: "",
        city: "chatan",
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

    const cityOptions = [
        "chatan",
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
    ];

    const formatJapanesePrice = (value: string): string => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        
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
            // 1. Create listing
            const listingRef = await addDoc(collection(db, 'listings'), {
                ...formData,
                status: 'active',
                createdBy: user?.uid || '',
                agencyId: user?.role === "agency" ? user.uid : null,
                createdAt: serverTimestamp()
            });

            // 2. Create corresponding listing
            await addDoc(collection(db, 'listings'), {
                ...formData,
                listingId: listingRef.id,
                status: 'active',
                createdBy: user?.uid || '',
                agencyId: user?.role === "agency" ? user.uid : null,
                createdAt: serverTimestamp()
            });

            router.push("/listings");
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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/login');
                return;
            }

            // Get user role from Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userRef);
            const userRole = userDoc.data()?.role;

            // Only allow paid users and agencies
            if (userRole !== 'paid' && userRole !== 'agency') {
                router.push('/pricing');
                return;
            }

            // Convert Firebase User to UserData, handling null values
            const userData: UserData = {
                ...currentUser,
                role: userRole,
                displayName: currentUser.displayName || '',
                email: currentUser.email || '',
                uid: currentUser.uid
            };

            setUser(userData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status" style={{ color: '#e75d7c' }}>
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
                            }}>Create Your Listing</h1>
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
                    .step-indicator.completed {
                        background-color: var(--primary-pink);
                        color: white;
                    }
                    .step-line {
                        flex: 1;
                        height: 2px;
                        background-color: var(--light-pink);
                        margin: 0 10px;
                    }
                    .step-line.completed {
                        background-color: var(--primary-pink);
                    }
                `}</style>

                {/* Progress Steps */}
                <div className="d-flex align-items-center mb-4">
                    <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                        <FaHome />
                    </div>
                    <div className={`step-line ${currentStep > 1 ? 'completed' : ''}`}></div>
                    <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                        <FaMapMarkerAlt />
                    </div>
                    <div className={`step-line ${currentStep > 2 ? 'completed' : ''}`}></div>
                    <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                        <FaList />
                    </div>
                    <div className={`step-line ${currentStep > 3 ? 'completed' : ''}`}></div>
                    <div className={`step-indicator ${currentStep >= 4 ? 'active' : ''}`}>
                        <FaImage />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <div>
                                        <h3 className="h5 mb-4" style={{ color: 'var(--primary-pink)' }}>Basic Information</h3>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label htmlFor="title" className="form-label">Listing Title</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    className="form-control"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="e.g., Modern 3BR House near Kadena"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="price" className="form-label">Price (per month)</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">¥</span>
                                                    <input
                                                        type="text"
                                                        id="price"
                                                        name="price"
                                                        className="form-control"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        placeholder="85,000"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="propertyType" className="form-label">Property Type</label>
                                                <select
                                                    id="propertyType"
                                                    name="propertyType"
                                                    className="form-select"
                                                    value={formData.propertyType}
                                                    onChange={handleChange}
                                                >
                                                    {propertyTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                                                <select
                                                    id="bedrooms"
                                                    name="bedrooms"
                                                    className="form-select"
                                                    value={formData.bedrooms}
                                                    onChange={handleChange}
                                                >
                                                    {bedroomOptions.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                                                <select
                                                    id="bathrooms"
                                                    name="bathrooms"
                                                    className="form-select"
                                                    value={formData.bathrooms}
                                                    onChange={handleChange}
                                                >
                                                    {bathroomOptions.map((num) => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Location */}
                                {currentStep === 2 && (
                                    <div>
                                        <h3 className="h5 mb-4" style={{ color: 'var(--primary-pink)' }}>Location Details</h3>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <select
                                                    id="city"
                                                    name="city"
                                                    className="form-select"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                >
                                                    {cityOptions.map((city) => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="nearestBase" className="form-label">Nearest Base</label>
                                                <select
                                                    id="nearestBase"
                                                    name="nearestBase"
                                                    className="form-select"
                                                    value={formData.nearestBase}
                                                    onChange={handleChange}
                                                >
                                                    {okinawaBases.map((base) => (
                                                        <option key={base} value={base}>{base}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="baseInspected" className="form-label">Base Inspected</label>
                                                <select
                                                    id="baseInspected"
                                                    name="baseInspected"
                                                    className="form-select"
                                                    value={formData.baseInspected}
                                                    onChange={handleChange}
                                                >
                                                    {baseInspectionOptions.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="sqft" className="form-label">Square Footage</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        id="sqft"
                                                        name="sqft"
                                                        className="form-control"
                                                        value={formData.sqft}
                                                        onChange={handleChange}
                                                        placeholder="e.g., 1200"
                                                        required
                                                    />
                                                    <span className="input-group-text">sq ft</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Features & Amenities */}
                                {currentStep === 3 && (
                                    <div>
                                        <h3 className="h5 mb-4" style={{ color: 'var(--primary-pink)' }}>Features & Amenities</h3>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label d-block">Pet Policy</label>
                                                <div className="d-flex gap-3">
                                                    {petOptions.map((option) => (
                                                        <div key={option} className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                id={`pet-${option}`}
                                                                name="petPolicy"
                                                                value={option}
                                                                checked={formData.petPolicy.includes(option)}
                                                                onChange={(e) => handleCheckboxChange(e, "petPolicy")}
                                                                className="form-check-input"
                                                            />
                                                            <label htmlFor={`pet-${option}`} className="form-check-label">
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Amenities</label>
                                                <div className="row g-2">
                                                    {amenitiesList.map((amenity) => (
                                                        <div key={amenity} className="col-lg-4 col-md-6">
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`amenity-${amenity}`}
                                                                    name="amenities"
                                                                    value={amenity}
                                                                    checked={formData.amenities.includes(amenity)}
                                                                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                                                                    className="form-check-input"
                                                                />
                                                                <label htmlFor={`amenity-${amenity}`} className="form-check-label">
                                                                    {amenity}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Property Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="form-control"
                                                    rows={4}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder="Describe your property in detail..."
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Images */}
                                {currentStep === 4 && (
                                    <div>
                                        <h3 className="h5 mb-4" style={{ color: 'var(--primary-pink)' }}>Property Images</h3>
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center justify-content-center p-4" 
                                                 style={{ 
                                                     border: '2px dashed var(--light-pink)',
                                                     borderRadius: '0.5rem',
                                                     backgroundColor: 'var(--light-pink)',
                                                     cursor: 'pointer'
                                                 }}>
                                                <div className="text-center">
                                                    <FaImage className="mb-2" style={{ fontSize: '2rem', color: 'var(--primary-pink)' }} />
                                                    <input
                                                        type="file"
                                                        id="images"
                                                        name="images"
                                                        className="d-none"
                                                        onChange={handleImageUpload}
                                                        multiple
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor="images" className="d-block" style={{ cursor: 'pointer', color: 'var(--primary-pink)' }}>
                                                        <strong>Click to upload</strong> or drag and drop
                                                    </label>
                                                    <p className="small text-muted mb-0">Maximum file size: 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        {formData.images.length > 0 && (
                                            <div className="row g-3">
                                                {formData.images.map((src, index) => (
                                                    <div key={index} className="col-md-4">
                                                        <div className="position-relative" style={{ height: '200px' }}>
                                                            <Image
                                                                src={src}
                                                                alt={`Property ${index + 1}`}
                                                                fill
                                                                style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                                                onClick={() => removeImage(index)}
                                                                style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}
                                                            >
                                                                <FaTimes />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="d-flex justify-content-between mt-4 pt-4" style={{ borderTop: '1px solid var(--light-pink)' }}>
                                    {currentStep > 1 ? (
                                        <button
                                            type="button"
                                            className="btn btn-outline"
                                            onClick={prevStep}
                                            style={{ 
                                                borderColor: 'var(--primary-pink)',
                                                color: 'var(--primary-pink)'
                                            }}
                                        >
                                            <FaArrowLeft className="me-2" />
                                            Previous
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}
                                    
                                    {currentStep < 4 ? (
                                        <button
                                            type="button"
                                            className="btn text-white"
                                            onClick={nextStep}
                                            style={{ backgroundColor: 'var(--primary-pink)' }}
                                        >
                                            Next
                                            <FaArrowRight className="ms-2" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn text-white"
                                            style={{ 
                                                backgroundColor: 'var(--primary-pink)',
                                                opacity: user?.role === 'paid' || user?.role === 'agency' ? 1 : 0.7 
                                            }}
                                            disabled={!(user?.role === 'paid' || user?.role === 'agency')}
                                        >
                                            <FaCheck className="me-2" />
                                            {user?.role === 'paid' || user?.role === 'agency' ? "Post Listing" : "Upgrade to Post"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Preview Card */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm position-sticky" style={{ top: '2rem' }}>
                            <div className="card-body p-4">
                                <h4 className="h6 mb-4" style={{ color: 'var(--primary-pink)' }}>Listing Preview</h4>
                                
                                {formData.images.length > 0 ? (
                                    <div className="position-relative mb-3" style={{ height: '200px' }}>
                                        <Image
                                            src={formData.images[0]}
                                            alt="Property Preview"
                                            fill
                                            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                                        />
                                    </div>
                                ) : (
                                    <div 
                                        className="d-flex align-items-center justify-content-center mb-3" 
                                        style={{ 
                                            height: '200px',
                                            backgroundColor: 'var(--light-pink)',
                                            borderRadius: '0.5rem'
                                        }}
                                    >
                                        <FaImage style={{ fontSize: '3rem', color: 'var(--primary-pink)' }} />
                                    </div>
                                )}

                                <h5 className="h6 mb-2">{formData.title || "Your Listing Title"}</h5>
                                <p className="small text-muted mb-2">
                                    <FaMapMarkerAlt className="me-1" />
                                    {formData.city}, near {formData.nearestBase}
                                </p>
                                <p className="h5 mb-3" style={{ color: 'var(--primary-pink)' }}>
                                    ¥{formData.price || "0"}<span className="small text-muted">/month</span>
                                </p>

                                <div className="d-flex gap-3 small text-muted mb-3">
                                    <span>{formData.bedrooms} bed</span>
                                    <span>{formData.bathrooms} bath</span>
                                    <span>{formData.sqft} sqft</span>
                                </div>

                                <p className="small text-muted mb-0" style={{ 
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {formData.description || "Add a description to see how your listing will appear to potential tenants..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
