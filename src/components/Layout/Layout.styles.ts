import { styled } from "@mui/material";

export const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  maxWidth: "100%",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(35),
  },
}));
