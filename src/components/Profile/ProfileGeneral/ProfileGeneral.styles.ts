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

export const Box = styled(MuiBox)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  height: theme.spacing(8),
  width: theme.spacing(8),
  marginRight: theme.spacing(2),
  fontSize: theme.typography.h5.fontSize,
}));

export const InputName = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(3),
}));

export const InputEmail = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(3),
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "dashed",
  },
}));
