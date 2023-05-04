import { useSettings } from "@hooks";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Typography } from "@mui/material";
import { ThemeType } from "@theme";
import { useTranslation } from "react-i18next";
import * as Styles from "./ThemeButtons.styles";

export const ThemeButtons = () => {
  const { t } = useTranslation();
  const { settings, setSettings } = useSettings();

  const themes = [
    {
      label: t("light"),
      value: "light",
      icon: LightModeIcon,
    },
    {
      label: t("dark"),
      value: "dark",
      icon: DarkModeIcon,
    },
  ];

  const handleChange = (theme: ThemeType) => {
    setSettings({
      ...settings,
      theme,
    });
  };

  return (
    <Styles.Container>
      {themes.map((theme) => {
        const { label, icon: Icon, value } = theme;

        return (
          <div key={value}>
            <Styles.IconBox
              onClick={() => handleChange(value as ThemeType)}
              selected={settings.theme === value}
            >
              <Icon color={settings.theme === value ? "primary" : "disabled"} />
            </Styles.IconBox>
            <Typography align="center" variant="subtitle2">
              {label}
            </Typography>
          </div>
        );
      })}
    </Styles.Container>
  );
};
