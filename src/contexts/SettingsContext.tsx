import { ThemeType } from "@theme";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";

export type LanguageType = "en" | "br";

export interface Settings {
  theme: ThemeType;
  language: LanguageType;
}

export interface SettingsContextValue {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: Settings = {
  theme: "dark",
  language: "br",
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  setSettings: () => {},
});

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings",
    initialSettings
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(settings.language);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      setSettings,
    }),
    [settings, setSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
