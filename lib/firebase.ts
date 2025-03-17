import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBEQ7AWZ09yYaIbokQ2_lTVAAM2ovhTGGQ',
  authDomain: 'okinawa-now.firebaseapp.com',
  projectId: 'okinawa-now',
  storageBucket: 'okinawa-now.appspot.com',
  messagingSenderId: '752162265538',
  appId: '1:752162265538:web:7ede2394280f69fec15e5b',
  measurementId: 'G-CNWYP2HP64'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
