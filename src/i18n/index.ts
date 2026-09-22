import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
export type Language = "pt" | "en";
export const normalizeLanguage = (language?: string): Language =>
  language?.split("-")[0] === "en" ? "en" : "pt";
function syncDocument(language: string) {
  document.documentElement.lang =
    normalizeLanguage(language) === "pt" ? "pt-BR" : "en";
  document.documentElement.dir = i18n.dir(language);
}
i18n.on("languageChanged", syncDocument);
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { pt: { translation: pt }, en: { translation: en } },
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "elevarte-language",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initAsync: false,
  });
export default i18n;
