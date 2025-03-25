'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaExpand } from 'react-icons/fa';

interface ListingGalleryProps {
    images: string[];
}

const ListingGallery = ({ images }: ListingGalleryProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    // Ensure we have exactly 5 images for the grid, repeat if necessary
    const displayImages = [...images];
    while (displayImages.length < 5) {
        displayImages.push(...images);
    }
    const gridImages = displayImages.slice(0, 5);

    return (
        <>
            <div className="position-relative">
                {/* Main Image Grid */}
                <div className="row g-2" style={{ height: '500px' }}>
                    {/* Featured Large Image */}
                    <div className="col-6 h-100">
                        <div 
                            className="position-relative h-100 rounded overflow-hidden"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setSelectedImage(0);
                                setShowModal(true);
                            }}
                        >
                            <Image
                                src={gridImages[0]}
                                alt="Property featured image"
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                            <div 
                                className="position-absolute w-100 h-100 top-0 start-0 hover-overlay"
                                style={{
                                    background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2))',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Right Side Grid */}
                    <div className="col-6 h-100">
                        <div className="row g-2 h-100">
                            {gridImages.slice(1).map((image, index) => (
                                <div key={index} className="col-6" style={{ height: '50%' }}>
                                    <div 
                                        className="position-relative h-100 rounded overflow-hidden"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setSelectedImage(index + 1);
                                            setShowModal(true);
                                        }}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Property image ${index + 2}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div 
                                            className="position-absolute w-100 h-100 top-0 start-0 hover-overlay"
                                            style={{
                                                background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2))',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* View All Photos Button */}
                <button
                    className="btn position-absolute"
                    style={{
                        right: '20px',
                        bottom: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        color: 'var(--primary-pink)',
                        zIndex: 1
                    }}
                    onClick={() => {
                        setSelectedImage(0);
                        setShowModal(true);
                    }}
                >
                    <FaExpand className="me-2" />
                    View All Photos
                </button>
            </div>

            {/* Full Screen Modal */}
            {showModal && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        zIndex: 1050
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div 
                        className="position-relative"
                        style={{
                            width: '90vw',
                            height: '80vh'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedImage]}
                            alt={`Property image ${selectedImage + 1}`}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                        
                        {/* Thumbnails */}
                        <div 
                            className="position-absolute w-100 bottom-0 mb-4 px-4"
                            style={{
                                overflowX: 'auto',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <div className="d-flex gap-2 justify-content-center">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="position-relative"
                                        style={{
                                            width: '80px',
                                            height: '60px',
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid var(--primary-pink)' : '2px solid transparent',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            className="btn position-absolute top-0 end-0 m-3 text-white"
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%'
                            }}
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .hover-overlay:hover {
                    opacity: 1 !important;
                }
            `}</style>
        </>
    );
};

export default ListingGallery;
