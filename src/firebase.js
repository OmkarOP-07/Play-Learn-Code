// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzViItHG4fkfVbrfT2iLakLQC-wxOph3g",
  authDomain: "gamified-coding-platform-ded31.firebaseapp.com",
  projectId: "gamified-coding-platform-ded31",
  storageBucket: "gamified-coding-platform-ded31.firebasestorage.app",
  messagingSenderId: "28556292724",
  appId: "1:28556292724:web:4345bc657e7d9dc45b1721"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };