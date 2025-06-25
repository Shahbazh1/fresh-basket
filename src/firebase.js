// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbKdiUMLlCmTLwetnd-4G2MrSZHVbGCo8",
  authDomain: "fresh-basket-d671c.firebaseapp.com",
  projectId: "fresh-basket-d671c",
  storageBucket: "fresh-basket-d671c.appspot.com", // 🔁 fixed `.app` to `.appspot.com`
  messagingSenderId: "555283321601",
  appId: "1:555283321601:web:fdf4fe455fb59388f40100"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
