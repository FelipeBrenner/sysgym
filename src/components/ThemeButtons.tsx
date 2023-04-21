import { useSettings } from "@hooks";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Typography } from "@mui/material";

export type Theme = "light" | "dark";

const themes = [
  {
    label: "Light",
    value: "light",
    icon: LightModeIcon,
  },
  {
    label: "Dark",
    value: "dark",
    icon: DarkModeIcon,
  },
];

export const ThemeButtons = () => {
  const { settings, setSettings } = useSettings();

  const handleChange = (theme: Theme) => {
    setSettings({
      ...settings,
      theme,
    });
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        m: -1,
      }}
    >
      {themes.map((theme) => {
        const { label, icon: Icon, value } = theme;

        return (
          <div key={value}>
            <Box
              onClick={() => handleChange(value as Theme)}
              sx={{
                borderColor:
                  settings.theme === value ? "primary.main" : "divider",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 2,
                cursor: "pointer",
                flexGrow: 1,
                fontSize: 0,
                m: 1,
                overflow: "hidden",
                p: 1,
              }}
            >
              <Icon color={settings.theme === value ? "primary" : "disabled"} />
            </Box>
            <Typography align="center" sx={{ mt: 1 }} variant="subtitle2">
              {label}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
};
