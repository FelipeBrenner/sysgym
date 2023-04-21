import { Language, Theme } from "@components";
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

export interface Settings {
  theme: Theme;
  language: Language;
}

export interface SettingsContextValue {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: Settings = {
  theme: "light",
  language: "en",
};

export const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData: string | null =
      globalThis.localStorage.getItem("settings");

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        theme: globalThis.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
        language: "en",
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  setSettings: () => {},
});

export const SettingsProvider = (props: SettingsProviderProps) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings",
    initialSettings
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    const restoredSettings = restoreSettings();

    i18n.changeLanguage(restoredSettings?.language);

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
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
