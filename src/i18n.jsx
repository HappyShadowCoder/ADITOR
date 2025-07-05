import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      files: "Files",
      button_checkcode: "Check Code",
      button_execute: "Execute",
      button_ask_gemini: "Ask Gemini",
      button_404: "Lost In Space? 404 (Trial)",
      button_hear_page: "Welcome Message",
      button_settings: "Settings",
      lost_in_space: "Lost In Space",

      back: "Back to Future",
    },
  },
  hi: {
  translation: {
    files: "फ़ाइलें",
    button_checkcode: "कोड जांचें",
    button_execute: "चलाएं",
    button_ask_gemini: "जेमिनी से पूछें",
    button_404: "अंतरिक्ष में खो गए? -> 404",
    button_hear_page: "पृष्ठ सुनें",
    lost_in_space: "अंतरिक्ष में खो गए",
    back: "भविष्य में वापसी",
  },
},
  fr: {
  translation: {
    files: "Fichiers",
    button_checkcode: "Vérifier le code",
    button_execute: "Exécuter",
    button_ask_gemini: "Demander à Gemini",
    button_404: "Perdu dans l’espace ? -> 404",
    button_hear_page: "Écouter la page",
    lost_in_space: "Perdu dans l’espace",
    back: "Retour vers le futur",
  },
},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
