import {
  AppBar as MuiAppBar,
  Avatar as MuiAvatar,
  Box as MuiBox,
  IconButton as MuiIconButton,
  Toolbar as MuiToolbar,
  styled,
} from "@mui/material";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: 64,
  left: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const FlexGrowBox = styled(MuiBox)(() => ({
  flexGrow: 1,
}));

export const AvatarBox = styled(MuiBox)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  marginLeft: theme.spacing(2),
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  height: theme.spacing(5),
  width: theme.spacing(5),
}));

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
