import { Box, Typography, styled } from "@mui/material";

export const DrawerBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export const Text = styled(Typography)(({ theme }) => ({
  display: "block",
  color: theme.palette.text.secondary,
}));
