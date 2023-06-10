import { Box as MuiBox, Card as MuiCard, styled } from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ButtonContainer = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "end",
  marginTop: theme.spacing(3),
}));
