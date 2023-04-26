import { db } from "@services";
import { User } from "@types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const getUser = async (id: string) => {
  const q = query(usersCollectionRef, where("id", "==", id));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data())[0] as User;
};

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => doc.data());
};

export const createUser = async (user: User) => {
  await addDoc(usersCollectionRef, user);
};

export const updateUser = async (user: User) => {
  const userDoc = doc(db, "users", user.id);
  await updateDoc(userDoc, user);
};
