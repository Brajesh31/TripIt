// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKsfor Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi6KkAhhNRkgHN8L-X8g6t2_4pujPKvQI",
  authDomain: "trip-it-598cd.firebaseapp.com",
  projectId: "trip-it-598cd",
  storageBucket: "trip-it-598cd.firebasestorage.app",
  messagingSenderId: "19412458038",
  appId: "1:19412458038:web:6ed0ba29781d9a879ad697",
  measurementId: "G-BVKZBCQ1NY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);