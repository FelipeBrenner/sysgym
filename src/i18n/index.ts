import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export const resources: Resource = {
  en: {
    translation: {
      home: {
        title: "Home",
      },
      schedule: {
        title: "Schedule",
      },
      chat: {
        title: "Chat",
      },
      assessments: {
        title: "Assessments",
      },
      profile: {
        title: "Profile",
        basicDetails: "Basic details",
        deleteAccount: "Delete account",
        deleteAccountDescription:
          "Delete your account and all of your source data. This is irreversible.",
      },
      general: "General",
      personal: "Personal",
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

      users: "Users",
      change: "Change",
      edit: "Edit",
      save: "Save",
      light: "Light",
      dark: "Dark",
      english: "English",
      portuguese: "Portuguese",
    },
  },
  br: {
    translation: {
      home: {
        title: "Home",
      },
      schedule: {
        title: "Agenda",
      },
      chat: {
        title: "Chat",
      },
      assessments: {
        title: "Avaliações",
      },
      profile: {
        title: "Perfil",
        basicDetails: "Detalhes básicos",
        deleteAccount: "Excluir conta",
        deleteAccountDescription:
          "Exclua sua conta e todos os seus dados de origem. Isso é irreversível.",
      },
      general: "Geral",
      personal: "Pessoal",
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
      users: "Usuários",
      change: "Alterar",
      edit: "Editar",
      save: "Salvar",
      light: "Claro",
      dark: "Escuro",
      english: "Inglês",
      portuguese: "Português",
    },
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "br"],
  resources,
});
