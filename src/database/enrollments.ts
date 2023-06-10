import { db } from "@services";
import { IEnrollment } from "@types";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const enrollmentsCollection = collection(db, "enrollments");

export const getEnrollment = async (cpf?: string) => {
  const q = query(enrollmentsCollection, where("cpf", "==", cpf));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data())[0];
};

export const createEnrollment = async (enrollment: IEnrollment) => {
  await setDoc(doc(db, "enrollments", enrollment.cpf), enrollment);
};

export const updateEnrollment = async (enrollment: IEnrollment) => {
  const enrollmentDoc = doc(db, "enrollments", enrollment.cpf);
  await updateDoc(enrollmentDoc, enrollment);
};

export const enrollmentsDatabase = {
  getEnrollment,
  createEnrollment,
  updateEnrollment,
};
