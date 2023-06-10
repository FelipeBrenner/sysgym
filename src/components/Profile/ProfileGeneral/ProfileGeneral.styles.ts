import {
  Avatar as MuiAvatar,
  Box as MuiBox,
  Card as MuiCard,
  TextField,
  styled,
} from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AvatarContainer = styled(MuiBox)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  marginBottom: theme.spacing(3),
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  height: theme.spacing(8),
  width: theme.spacing(8),
  marginRight: theme.spacing(2),
  fontSize: theme.typography.h5.fontSize,
}));

export const InputCpf = styled(TextField)(({ theme }) => ({
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textField",
  },
}));

export const InputEmail = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "dashed",
  },
}));

export const ButtonContainer = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "end",
  marginTop: theme.spacing(3),
}));
