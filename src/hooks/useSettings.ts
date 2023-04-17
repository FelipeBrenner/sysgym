import { SettingsContext, SettingsContextValue } from "@contexts";
import { useContext } from "react";

export const useSettings = (): SettingsContextValue =>
  useContext(SettingsContext);
