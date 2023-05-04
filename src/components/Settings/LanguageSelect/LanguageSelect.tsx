import { LanguageType } from "@contexts";
import { useSettings } from "@hooks";
import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Styles from "./LanguageSelect.styles";

type LanguageOptions = {
  [key in LanguageType]: {
    icon: string;
    label: string;
  };
};

export const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const { settings, setSettings } = useSettings();

  const languageOptions: LanguageOptions = {
    en: {
      icon: "/static/icons/en.svg",
      label: t("english"),
    },
    br: {
      icon: "/static/icons/br.svg",
      label: t("portuguese"),
    },
  };

  const handleChange = async (language: LanguageType): Promise<void> => {
    await i18n.changeLanguage(language);
    setSettings({
      ...settings,
      language,
    });
    toast.success(t("languageChanged"));
  };

  return (
    <FormControl size="small" variant="outlined" sx={{ mt: 1 }}>
      <Select
        value={i18n.language}
        onChange={(event) => handleChange(event.target.value as LanguageType)}
      >
        {(Object.keys(languageOptions) as LanguageType[]).map((language) => (
          <MenuItem key={language} value={language}>
            <ListItemIcon>
              <Styles.FlagImage
                alt={languageOptions[language].label}
                src={languageOptions[language].icon}
              />
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
