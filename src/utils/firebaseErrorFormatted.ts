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
    default:
      return firebaseError.message;
  }
};
