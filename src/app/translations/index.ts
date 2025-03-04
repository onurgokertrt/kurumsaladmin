import { Language } from "../types/language"

const translations: Record<Language, Record<string, string>> = {
  en: {
    required: "This field is required",
    email: "Invalid email address!",
  },
  tr: {
    required: "Bu alan zorunludur",
    email: "Geçersiz e-posta adresi!",
  },
};

export default translations;
