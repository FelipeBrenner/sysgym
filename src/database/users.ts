import { db } from "@services";
import { IUser } from "@types";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export const getUser = async (id: string) => {
  const q = query(usersCollection, where("id", "==", id));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data())[0] as IUser;
};

export const getUsers = async () => {
  const data = await getDocs(usersCollection);
  return data.docs.map((doc) => doc.data()) as IUser[];
};

export const createUser = async (user: IUser) => {
  await setDoc(doc(db, "users", user.id), user);
};

export const updateUser = async (user: IUser) => {
  const userDoc = doc(db, "users", user.id);
  await updateDoc(userDoc, user);
};

export const usersDatabase = {
  getUser,
  getUsers,
  createUser,
  updateUser,
};
