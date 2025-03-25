import { Metadata } from 'next';

export const generateMetadata = async ({ params }: {
    params: { id: string }
}): Promise<Metadata> => {
    return {
        title: `Property Details - ${params.id}`,
        description: `View detailed information about this rental property in Okinawa, including photos, amenities, and contact information.`,
        openGraph: {
            title: `Property Details - ${params.id}`,
            description: `View detailed information about this rental property in Okinawa, including photos, amenities, and contact information.`,
            type: 'article',
        }
    };
};
