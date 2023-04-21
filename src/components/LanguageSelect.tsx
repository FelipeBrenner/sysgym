import { useSettings } from "@hooks";
import {
  Box,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export type Language = "en" | "br";

type LanguageOptions = {
  [key in Language]: {
    icon: string;
    label: string;
  };
};

export const languageOptions: LanguageOptions = {
  en: {
    icon: "/static/icons/en.svg",
    label: "English",
  },
  br: {
    icon: "/static/icons/br.svg",
    label: "Portuguese",
  },
};

export const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const { settings, setSettings } = useSettings();

  const handleChange = async (language: Language): Promise<void> => {
    await i18n.changeLanguage(language);
    setSettings({
      ...settings,
      language,
    });
    toast.success(t("languageChanged"));
  };

  return (
    <FormControl size="small" variant="outlined">
      <Select
        value={i18n.language}
        onChange={(event) => handleChange(event.target.value as Language)}
      >
        {(Object.keys(languageOptions) as Language[]).map((language) => (
          <MenuItem key={language} value={language}>
            <ListItemIcon>
              <Box
                sx={{
                  display: "flex",
                  height: 20,
                  width: 20,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img
                  alt={languageOptions[language].label}
                  src={languageOptions[language].icon}
                />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2">
                  {languageOptions[language].label}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
