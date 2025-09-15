// services/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      appTitle: "Lista Tarefas Plus",
      emailPlaceholder: "E-mail",
      passwordPlaceholder: "Senha",
      signInEmail: "Entrar com E-mail",
      signUpEmail: "Criar conta (E-mail)",
      googleSignIn: "Entrar com Google",
      googleObs:
        "Obs: para Google Sign-In, configure os client IDs e redirect URIs no Google Cloud Console e no Firebase.",
      toggleTheme: "Trocar para modo {{mode}}",
    },
  },
  en: {
    translation: {
      appTitle: "Task List Plus",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      signInEmail: "Sign in with Email",
      signUpEmail: "Create account (Email)",
      googleSignIn: "Sign in with Google",
      googleObs:
        "Note: For Google Sign-In, configure client IDs and redirect URIs in Google Cloud Console and Firebase.",
      toggleTheme: "Switch to {{mode}} mode",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt", // idioma padrão
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
