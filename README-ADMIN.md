# OkinawaNow Admin Setup

This document provides instructions for setting up an admin user for the OkinawaNow application.

## Setting Up the Admin User

To set up an admin user with the email `smithjohnathanr@gmail.com`, follow these steps:

1. First, create a regular user account with this email through the normal registration process on the website.

2. Then, you'll need to set up Firebase Admin SDK credentials:

   - Go to the Firebase Console (https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file as `service-account.json` in the root directory of your project

3. Run the admin user setup script:

   ```bash
   # Navigate to your project directory
   cd /path/to/okinawanow

   # Install ts-node if you haven't already
   npm install -g ts-node

   # Run the admin setup script
   ts-node scripts/set-admin-user.ts
   ```

4. The script will find the user with the email `smithjohnathanr@gmail.com` and set their role to `admin` in both Firebase Authentication (custom claims) and Firestore.

5. Once completed, you should be able to access the admin dashboard at `/admin`.

## Admin Features

As an admin user, you have access to:

1. **Dashboard** - Overview of site statistics
2. **Listings Management** - Create, edit, and delete any property listings
3. **User Management** - View and manage user accounts
4. **Inquiries** - View and respond to user inquiries
5. **Settings** - Configure site settings

## Troubleshooting

If you encounter any issues:

1. Make sure the `service-account.json` file is correctly placed in the project root
2. Verify that the user with email `smithjohnathanr@gmail.com` exists in your Firebase Authentication
3. Check the Firebase rules to ensure admins have the necessary permissions
4. Review the console output for any error messages

For additional help, refer to the Firebase documentation on custom claims and admin setup.
