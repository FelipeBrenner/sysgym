import { Fab, styled } from "@mui/material";

export const SettingsButton = styled(Fab)(({ theme }) => ({
  bottom: 0,
  margin: theme.spacing(4),
  position: "fixed",
  right: 0,
  zIndex: 1900,
}));
