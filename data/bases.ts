export interface Base {
    id: string;
    name: string;
    propertyCount: number;
    image: string;
}

export const bases: Base[] = [
    {
        id: 'kadena',
        name: 'Kadena Air Base',
        propertyCount: 245,
        image: '/images/bases/kadena.jpg'
    },
    {
        id: 'foster',
        name: 'Camp Foster',
        propertyCount: 178,
        image: '/images/bases/foster.jpg'
    },
    {
        id: 'hansen',
        name: 'Camp Hansen',
        propertyCount: 92,
        image: '/images/bases/hansen.jpg'
    },
    {
        id: 'schwab',
        name: 'Camp Schwab',
        propertyCount: 64,
        image: '/images/bases/schwab.jpg'
    },
    {
        id: 'courtney',
        name: 'Camp Courtney',
        propertyCount: 85,
        image: '/images/bases/courtney.jpg'
    },
    {
        id: 'mcas-futenma',
        name: 'MCAS Futenma',
        propertyCount: 112,
        image: '/images/bases/futenma.jpg'
    },
    {
        id: 'kinser',
        name: 'Camp Kinser',
        propertyCount: 95,
        image: '/images/bases/kinser.jpg'
    },
    {
        id: 'torii',
        name: 'Torii Station',
        propertyCount: 73,
        image: '/images/bases/torii.jpg'
    }
];
