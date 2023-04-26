import { DatabaseContext } from "@contexts";
import { useContext } from "react";

export const useDatabase = () => useContext(DatabaseContext);
