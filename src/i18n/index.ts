import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export const resources: Resource = {
  en: {
    translation: {
      general: "General",
      home: "Home",
      schedule: "Schedule",
      chat: "Chat",
      personal: "Personal",
      assessments: "Assessments",
      login: "Login",
      loginDescription: "Sign in on the platform",
      email: "Email",
      password: "Password",
      createNewAccount: "Create new account",
      register: "Register",
      registerDescription: "Register on the platform",
      havingAccount: "Having an account",
      or: "OR",
      logout: "Logout",
      colorScheme: "Color Scheme",
      language: "Language",
      languageChanged: "Language changed",
      profile: "Profile",
    },
  },
  br: {
    translation: {
      general: "Geral",
      home: "Home",
      schedule: "Agenda",
      chat: "Chat",
      personal: "Pessoal",
      assessments: "Avaliações",
      login: "Entrar",
      loginDescription: "Entrar na plataforma",
      email: "Email",
      password: "Senha",
      createNewAccount: "Criar nova conta",
      register: "Registrar",
      registerDescription: "Registre-se na plataforma",
      havingAccount: "Já tenho uma conta",
      or: "OU",
      logout: "Logout",
      colorScheme: "Esquema de Cores",
      language: "Linguagem",
      languageChanged: "Linguagem alterada",
      profile: "Perfil",
    },
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "br"],
  resources,
});
