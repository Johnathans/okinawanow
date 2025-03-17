# OkinawaNow - Property Rental Platform

A modern property rental platform built with Next.js, specifically designed for the Okinawa market. The platform helps connect property owners with tenants, focusing on military personnel and local residents.

## Features

- Property listings with detailed information
- Interactive map integration with Google Maps
- Advanced search and filtering options
- City and military base-specific searches
- Responsive design for all devices
- Real-time updates with Firebase

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Bootstrap 5, Custom CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Maps**: Google Maps API
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/okinawanow.git
cd okinawanow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
