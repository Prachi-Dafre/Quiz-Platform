// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase config (from Firebase Console → Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyCsejuznGWOw96t4iJuPk-Z1Ef6f0AZnt8",
  authDomain: "quiz-platform-d0db3.firebaseapp.com",
  projectId: "quiz-platform-d0db3",
  storageBucket: "quiz-platform-d0db3.firebasestorage.app",
  messagingSenderId: "232962045334",
  appId: "1:232962045334:web:16c820dd945323b43d59b7",
  measurementId: "G-PKB8JQ2E5H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
