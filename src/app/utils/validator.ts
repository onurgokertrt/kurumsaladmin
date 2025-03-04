import validator from "validator";
import { ValidationError } from "../types/validation"
import { Language } from "../types/language"
import translations from "../translations"

const validateLogin = (data: any, lang: Language = "tr"): ValidationError[] => {
  const errors: ValidationError[] = [];
  const t = translations[lang] || translations["tr"]

  // Captcha Validation
  if (!data.captchaToken || validator.isEmpty(data.captchaToken)) {
    errors.push({ field: "token", message: t.required })
  }

  // Password Validation
  if (!data.password || validator.isEmpty(data.password)) {
    errors.push({ field: "password", message: t.required })
  }

  // Email Validation
  if (!data.username || validator.isEmpty(data.username)) {
    errors.push({ field: "email", message: t.required })
  }

  return errors;
};

export { validateLogin }
