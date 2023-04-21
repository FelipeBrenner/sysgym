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
      emailValid: "Must be a valid email",
      emailRequired: "Email is required",
      password: "Password",
      passwordRequired: "Password is required",
      createNewAccount: "Create new account",
      register: "Register",
      registerDescription: "Register on the platform",
      havingAccount: "Having an account",
      firebaseErrorUserNotFound: "User is not registered",
      firebaseErrorOperationNotAllowed:
        "Login has not been enabled for this project",
      firebaseErrorInvalidEmail: "Invalid email",
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
      emailValid: "Deve ser um email válido",
      emailRequired: "O email é obrigatório",
      password: "Senha",
      passwordRequired: "A senha é obrigatória",
      createNewAccount: "Criar nova conta",
      register: "Registrar",
      registerDescription: "Registre-se na plataforma",
      havingAccount: "Já tenho uma conta",
      firebaseErrorUserNotFound: "O usuário não está registrado",
      firebaseErrorOperationNotAllowed:
        "O login não foi ativado para este projeto",
      firebaseErrorInvalidEmail: "O email náo é válido",
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
