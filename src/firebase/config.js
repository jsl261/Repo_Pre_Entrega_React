import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 1. Importa getFirestore

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
export const db = getFirestore(app); // 👈 2. Inicializa y exporta db