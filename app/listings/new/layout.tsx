import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create a New Listing',
    description: 'List your property on OkinawaNow. Reach military families and expatriates looking for housing in Okinawa.',
    openGraph: {
        title: 'Create a New Listing',
        description: 'List your property on OkinawaNow. Reach military families and expatriates looking for housing in Okinawa.',
        type: 'website',
    }
};

export default function NewListingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
