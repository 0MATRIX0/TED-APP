// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYVztALmAqnvdk-WefpmpwVTGbAAuSrUc",
    authDomain: "ted-ispeak-ai.firebaseapp.com",
    projectId: "ted-ispeak-ai",
    storageBucket: "ted-ispeak-ai.appspot.com",
    messagingSenderId: "432845431971",
    appId: "1:432845431971:web:88ba51ab82b9fb26c48b16",
    measurementId: "G-BJHY5PB4L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Export the Firebase services for use in your app
export const FIREBASE_APP = app;
export const FIREBASE_AUTH = auth; // Use this auth instance in your app
export const FIREBASE_DB = db;
