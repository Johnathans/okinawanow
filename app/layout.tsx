// app/layout.tsx
import { Raleway } from "next/font/google";
import { Metadata, Viewport } from 'next';
import Script from "next/script";
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Providers from './providers';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/forms.css";
import "@/config/fontawesome";
import "./globals.scss";

const raleway = Raleway({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "OkinawaNow - Find Your Perfect Rental",
        template: "%s | OkinawaNow",
    },
    description: "Find military-friendly housing in Okinawa with OkinawaNow. Browse properties, connect with landlords, and find your perfect home.",
    keywords: [
        "Okinawa housing",
        "military housing Okinawa",
        "rental properties Okinawa",
        "Kadena housing",
        "Foster housing",
        "Okinawa apartments",
        "Okinawa houses",
        "military-friendly rentals",
        "Okinawa real estate",
        "housing near military bases"
    ],
    authors: [{ name: "OkinawaNow" }],
    creator: "OkinawaNow",
    publisher: "OkinawaNow",
    openGraph: {
        title: "OkinawaNow - Find Your Perfect Rental",
        description: "Discover military-friendly housing in Okinawa. Browse rental properties near bases, explore local areas, and find your perfect home in Japan.",
        url: "https://okinawanow.com",
        siteName: "OkinawaNow",
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={raleway.className}>
            <body className="d-flex flex-column min-vh-100">
                <Providers>
                    <AuthProvider>
                        <div className="min-vh-100 d-flex flex-column">
                            <Navbar />
                            <main className="flex-grow-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster position="top-center" />
                    </AuthProvider>
                </Providers>

                {/* Google Maps API */}
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                    strategy="beforeInteractive"
                />

                {/* Load Bootstrap JS Bundle (includes Popper) */}
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                    crossOrigin="anonymous"
                />
                
                {/* Custom script for mobile menu handling */}
                <Script id="mobile-menu-fix">
                    {`
                    document.addEventListener('DOMContentLoaded', function() {
                        // Initialize all dropdowns
                        var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
                        var dropdownList = dropdownElementList.map(function(dropdownToggleEl) {
                            return new bootstrap.Dropdown(dropdownToggleEl);
                        });
                        
                        // Handle mobile menu
                        var handleMobileDropdowns = function() {
                            if (window.innerWidth < 992) {
                                // For mobile: prevent default behavior and manually toggle dropdown
                                document.querySelectorAll('.dropdown-toggle').forEach(function(element) {
                                    element.addEventListener('click', function(e) {
                                        if (window.innerWidth < 992) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            
                                            // Toggle dropdown manually
                                            var parent = this.closest('.dropdown');
                                            var menu = parent.querySelector('.dropdown-menu');
                                            
                                            if (menu.classList.contains('show')) {
                                                menu.classList.remove('show');
                                            } else {
                                                // Close all other dropdowns
                                                document.querySelectorAll('.dropdown-menu.show').forEach(function(openMenu) {
                                                    if (openMenu !== menu) {
                                                        openMenu.classList.remove('show');
                                                    }
                                                });
                                                menu.classList.add('show');
                                            }
                                        }
                                    });
                                });
                            }
                        };
                        
                        // Run on page load
                        handleMobileDropdowns();
                        
                        // Run when window is resized
                        window.addEventListener('resize', function() {
                            handleMobileDropdowns();
                        });
                    });
                    `}
                </Script>
            </body>
        </html>
    );
}
