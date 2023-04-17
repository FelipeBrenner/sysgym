import { useSettings } from "@hooks";
import { Box, Drawer, Typography } from "@mui/material";

interface SettingsDrawerProps {
  onClose?: () => void;
  open?: boolean;
}

const themes = [
  {
    label: "Light",
    value: "light",
    icon: "/static/icons/light-theme.svg",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "/static/icons/dark-theme.svg",
  },
];

export const SettingsDrawer = ({
  open,
  onClose,
  ...other
}: SettingsDrawerProps) => {
  const { settings, setSettings } = useSettings();

  const handleChange = (field: string, value: unknown) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      ModalProps={{ sx: { zIndex: 2000 } }}
      PaperProps={{ sx: { width: 320 } }}
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
          Color Scheme
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            m: -1,
          }}
        >
          {themes.map((theme) => {
            const { label, icon, value } = theme;

            return (
              <div key={value}>
                <Box
                  onClick={() => handleChange("theme", value)}
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
                    "& svg": {
                      height: "auto",
                      width: "100%",
                    },
                  }}
                >
                  <Box
                    alt={value}
                    component="img"
                    src={icon}
                    sx={{ mr: 1, width: 102 }}
                  />
                </Box>
                <Typography align="center" sx={{ mt: 1 }} variant="subtitle2">
                  {label}
                </Typography>
              </div>
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
};
