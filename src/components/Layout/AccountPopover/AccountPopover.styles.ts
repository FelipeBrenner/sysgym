import { Box, Avatar as MuiAvatar, styled } from "@mui/material";

export const AccountBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  padding: theme.spacing(2),
  display: "flex",
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  height: theme.spacing(5),
  width: theme.spacing(5),
}));

export const MenuBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
