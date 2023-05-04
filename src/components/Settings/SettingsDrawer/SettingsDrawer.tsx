import { Drawer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../LanguageSelect";
import { ThemeButtons } from "../ThemeButtons";
import * as Styles from "./SettingsDrawer.styles";

interface SettingsDrawerProps {
  onClose?: () => void;
  open?: boolean;
}

export const SettingsDrawer = ({
  open,
  onClose,
  ...other
}: SettingsDrawerProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      ModalProps={{ sx: { zIndex: 2000 } }}
      PaperProps={{ sx: { width: 280 } }}
      {...other}
    >
      <Styles.DrawerBox>
        <Styles.Text variant="overline">{t("colorScheme")}</Styles.Text>
        <ThemeButtons />
        <Styles.Text variant="overline">{t("language")}</Styles.Text>
        <LanguageSelect />
      </Styles.DrawerBox>
    </Drawer>
  );
};
