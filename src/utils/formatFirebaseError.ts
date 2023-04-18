import { FirebaseError } from "firebase/app";

export const formatFirebaseError = (firebaseError: FirebaseError) => {
  switch (firebaseError.code) {
    case "auth/user-not-found":
      return "User is not registered";
    case "auth/operation-not-allowed":
      return "Login has not been enabled for this project";
    default:
      return firebaseError.message;
  }
};
