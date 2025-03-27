import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getServerConfig } from './env';

if (!getApps().length) {
  try {
    const config = getServerConfig();

    const serviceAccount = {
      type: 'service_account',
      project_id: config.projectId,
      private_key_id: config.privateKeyId,
      private_key: config.privateKey,
      client_email: config.clientEmail,
      client_id: config.clientId,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: config.clientCertUrl
    } as const;

    console.log('Initializing Firebase Admin with service account:', {
      project_id: serviceAccount.project_id,
      client_email: serviceAccount.client_email,
      private_key_id: serviceAccount.private_key_id,
      has_private_key: !!serviceAccount.private_key
    });

    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      projectId: config.projectId
    });

    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

export const adminApp = getApps()[0];
export const db = getFirestore(adminApp);
