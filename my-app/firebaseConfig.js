// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiGtcQmys3VEltRguMna1ntzHKTHP2QIw",
  authDomain: "cp4mobile-d2ab7.firebaseapp.com",
  projectId: "cp4mobile-d2ab7",
  storageBucket: "cp4mobile-d2ab7.appspot.com",
  messagingSenderId: "763703324646",
  appId: "1:763703324646:web:01df53d7bf000209f4b027",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
