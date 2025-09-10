// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  appId: "SEU_APP_ID",
  // outros campos se houver
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);