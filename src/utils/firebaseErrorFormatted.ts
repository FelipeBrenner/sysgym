import { FirebaseError } from "firebase/app";
import { t } from "i18next";

export const firebaseErrorFormatted = (firebaseError: FirebaseError) => {
  switch (firebaseError.code) {
    case "auth/user-not-found":
      return t("firebaseErrorUserNotFound");
    case "auth/operation-not-allowed":
      return t("firebaseErrorOperationNotAllowed");
    case "auth/invalid-email":
      return t("firebaseErrorInvalidEmail");
    case "auth/wrong-password":
      return "A senha está incorreta";
    case "auth/weak-password":
      return "A senha está fraca";
    case "auth/email-already-in-use":
      return "Este email já está em uso";
    default:
      return firebaseError.message;
  }
};
