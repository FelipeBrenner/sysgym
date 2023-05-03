import { Box, Drawer, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./LanguageSelect";
import { ThemeButtons } from "./ThemeButtons";

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
      <Box
        sx={{
          py: 4,
          px: 3,
        }}
      >
        <Typography
          color="textSecondary"
          sx={{
            display: "block",
            mb: 1,
          }}
          variant="overline"
        >
          {t("colorScheme")}
        </Typography>
        <ThemeButtons />
        <Typography
          color="textSecondary"
          sx={{
            display: "block",
            mb: 1,
            mt: 4,
          }}
          variant="overline"
        >
          {t("language")}
        </Typography>
        <LanguageSelect />
      </Box>
    </Drawer>
  );
};
