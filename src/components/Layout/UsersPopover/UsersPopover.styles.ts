import {
  Box,
  Button,
  Avatar as MuiAvatar,
  List as MuiList,
  ListItem as MuiListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const List = styled(MuiList)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.5),
  padding: 0,
}));

export const UserButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  justifyContent: "flex-start",
  paddingRight: theme.spacing(2),
  textAlign: "left",
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  flexWrap: "nowrap",
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  fontSize: `${theme.typography.body2.fontSize} !important`,
  cursor: "pointer",
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  // marginLeft: theme.spacing(1),
}));
