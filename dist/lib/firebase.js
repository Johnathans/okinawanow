"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging = exports.auth = exports.db = exports.app = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var messaging_1 = require("firebase/messaging");
var firebaseConfig = {
    // Your Firebase config here
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
// Initialize Firebase
var app = (0, app_1.getApps)().length === 0 ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApps)()[0];
exports.app = app;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var messaging = typeof window !== 'undefined' ? (0, messaging_1.getMessaging)(app) : null;
exports.messaging = messaging;
