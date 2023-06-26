// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFiij7VVdu4_OqGWee9YBEK3C0qYFUKnw",
  authDomain: "house-marketplace-app-5b735.firebaseapp.com",
  projectId: "house-marketplace-app-5b735",
  storageBucket: "house-marketplace-app-5b735.appspot.com",
  messagingSenderId: "1018623228497",
  appId: "1:1018623228497:web:f34e382e74001fcec89670",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
