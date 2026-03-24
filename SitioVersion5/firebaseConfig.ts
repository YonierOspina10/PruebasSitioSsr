// Import Firebase modules for app initialization and Firestore access
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Declare a variable to hold the Firestore instance
let db: any = null;

/**
 * Initializes Firestore using environment variables from Vite.
 * This version does not depend on any runtime configuration injected into `window`.
 */
export async function initFirestore() {
  // Step 1: Load Firebase configuration from environment variables
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Firebase API key
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Firebase authentication domain
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // Firebase project ID
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Cloud Storage bucket
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Firebase Cloud Messaging sender ID
    appId: import.meta.env.VITE_FIREBASE_APP_ID, // Firebase App ID
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Firebase Analytics measurement ID (optional)
  };

  // Step 2: Validate configuration before initializing Firebase
  if (config.apiKey && config.projectId) {
    try {
      // Check if a Firebase app instance already exists to avoid reinitialization
      const existingApp = getApps()[0];

      // Use the existing app instance or initialize a new one
      const app =
        existingApp ||
        initializeApp({
          apiKey: config.apiKey,
          authDomain: config.authDomain,
          projectId: config.projectId,
          storageBucket: config.storageBucket,
          messagingSenderId: config.messagingSenderId,
          appId: config.appId,
          measurementId: config.measurementId,
        });

      // Initialize Firestore using the Firebase app instance
      db = getFirestore(app);

      // Expose Firestore globally for optional access elsewhere in the app
      (window as any).db = db;
      return db;
    } catch (e) {
      console.error("Error initializing Firestore:", e);
    }
  } else {
    console.warn("Firestore inactive or missing valid environment configuration:", config);
  }

  // Return null if initialization fails
  return null;
}

// Export the Firestore instance for global access
export { db };

// FILE DOCUMENTED
