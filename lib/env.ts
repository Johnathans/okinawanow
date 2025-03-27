const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  if (key.includes('\\n')) {
    return key.replace(/\\n/g, '\n');
  }
  if (!key.includes('BEGIN PRIVATE KEY')) {
    return `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`;
  }
  return key;
};

export const getServerConfig = () => {
  // Debug logging
  console.log('Environment variables check:', {
    hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length,
    hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });

  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const privateKeyId = process.env.FIREBASE_PRIVATE_KEY_ID;
  const clientId = process.env.FIREBASE_CLIENT_ID;
  const clientCertUrl = process.env.FIREBASE_CLIENT_CERT_URL;

  if (!privateKey) throw new Error('FIREBASE_PRIVATE_KEY environment variable is missing or invalid');
  if (!clientEmail) throw new Error('FIREBASE_CLIENT_EMAIL environment variable is missing');
  if (!projectId) throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable is missing');
  if (!privateKeyId) throw new Error('FIREBASE_PRIVATE_KEY_ID environment variable is missing');
  if (!clientId) throw new Error('FIREBASE_CLIENT_ID environment variable is missing');
  if (!clientCertUrl) throw new Error('FIREBASE_CLIENT_CERT_URL environment variable is missing');

  return {
    privateKey,
    clientEmail,
    projectId,
    privateKeyId,
    clientId,
    clientCertUrl
  };
};
