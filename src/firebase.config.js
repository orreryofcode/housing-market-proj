import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA21aggYE9I98Rmdwk9O9TDvLMBCJIhySA",
  authDomain: "house-marketplace-app-91f1a.firebaseapp.com",
  projectId: "house-marketplace-app-91f1a",
  storageBucket: "house-marketplace-app-91f1a.appspot.com",
  messagingSenderId: "539611670437",
  appId: "1:539611670437:web:cdb76fbb7fbae67011aa4c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
