import { LoadingButton } from "@mui/lab";
import { Box, Button, FormHelperText, Typography, styled } from "@mui/material";

export const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

export const GoogleIcon = styled("img")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const FlexGrowBox = styled(Box)(() => ({
  flexGrow: 1,
}));

export const DividerBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  marginTop: theme.spacing(2),
}));

export const DividerText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const SubmitError = styled(FormHelperText)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));
