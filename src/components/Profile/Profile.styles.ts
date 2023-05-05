import { Divider as MuiDivider, Typography, styled } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
