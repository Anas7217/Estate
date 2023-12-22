// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-da89f.firebaseapp.com",
  projectId: "estate-da89f",
  storageBucket: "estate-da89f.appspot.com",
  messagingSenderId: "656616451909",
  appId: "1:656616451909:web:beff5debd262df970f982c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);