// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd2uoXN0uT0EEyu6_aP1Sl9R9ducFfcbg",
  authDomain: "netflix-gpt-a0d31.firebaseapp.com",
  projectId: "netflix-gpt-a0d31",
  storageBucket: "netflix-gpt-a0d31.firebasestorage.app",
  messagingSenderId: "175894867501",
  appId: "1:175894867501:web:6f4c0ace57ef0d528312a4",
  measurementId: "G-HMLBCN82HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();