import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "usehooks-ts";

export interface Settings {
  theme: "light" | "dark";
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

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings",
    initialSettings
  );

  useEffect(() => {
    const restoredSettings = restoreSettings();

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
