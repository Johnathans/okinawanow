// app/layout.tsx
import { Raleway } from "next/font/google";
import { Metadata, Viewport } from 'next';
import Script from "next/script";
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/bootstrap.scss";
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
                <AuthProvider>
                    <div className="min-vh-100 d-flex flex-column">
                        <Navbar />
                        <main className="flex-grow-1">{children}</main>
                        <Footer />
                    </div>
                </AuthProvider>

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
            </body>
        </html>
    );
}
