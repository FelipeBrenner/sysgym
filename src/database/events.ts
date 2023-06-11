import { db } from "@services";
import { ICalendarEvent } from "@types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const eventsCollection = collection(db, "events");

export const getEventsByUser = async (userId: string) => {
  const q = query(eventsCollection, where("userId", "==", userId));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data()) ?? [];
};

export const getAllEvents = async () => {
  const data = await getDocs(eventsCollection);
  return data.docs.map((doc) => doc.data()) ?? [];
};

export const setEvent = async (event: ICalendarEvent) => {
  await setDoc(doc(db, "events", event.id), event);
};

export const updateEvent = async (id: string, event: Record<string, any>) => {
  await updateDoc(doc(db, "events", id), event);
};

export const deleteEvent = async (id: string) => {
  await deleteDoc(doc(db, "events", id));
};

export const eventsDatabase = {
  getEventsByUser,
  getAllEvents,
  setEvent,
  updateEvent,
  deleteEvent,
};
