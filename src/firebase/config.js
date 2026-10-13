// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXk3LUOSgggcIUCosXKH9Aa6FPtrOf7fg",
  authDomain: "rincon-del-crochet.firebaseapp.com",
  projectId: "rincon-del-crochet",
  storageBucket: "rincon-del-crochet.firebasestorage.app",
  messagingSenderId: "943877042077",
  appId: "1:943877042077:web:fb13888966869b33ed4974",
  measurementId: "G-6791RJ6XSF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);