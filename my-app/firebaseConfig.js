// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxxxxx-xxxxxxxxxxxxxx",
  authDomain: "mobile-12345.firebaseapp.com",
  projectId: "mobile-12345",
  storageBucket: "mobile-12345.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { serverTimestamp };
