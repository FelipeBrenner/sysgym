import { db } from "@services";
import { IEnrollment } from "@types";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const enrollmentsCollection = collection(db, "enrollments");

export const getEnrollment = async (id?: string) => {
  const q = query(enrollmentsCollection, where("id", "==", id));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data())[0];
};

export const updateEnrollment = async (enrollment: IEnrollment) => {
  await setDoc(doc(db, "enrollments", enrollment.id), enrollment);
};

export const enrollmentsDatabase = {
  getEnrollment,
  updateEnrollment,
};
