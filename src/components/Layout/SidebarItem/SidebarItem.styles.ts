import { Button, ListItem, styled } from "@mui/material";

interface ButtonProps {
  paddingLeft: number;
  active?: boolean;
}

export const ParentButton = styled(Button)<ButtonProps>(
  ({ paddingLeft, active, theme }) => ({
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.neutral?.[300],
    justifyContent: "flex-start",
    paddingLeft,
    paddingRight: theme.spacing(3),
    textAlign: "left",
    textTransform: "none",
    width: "100%",
    ...(active && {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.secondary.main,
      fontWeight: "fontWeightBold",
    }),
    "& .MuiButton-startIcon": {
      color: active
        ? theme.palette.secondary.main
        : theme.palette.neutral?.[400],
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  })
);

export const ChildrenButton = styled(Button)<ButtonProps>(
  ({ paddingLeft, active, theme }) => ({
    color: active ? theme.palette.secondary.main : theme.palette.neutral?.[300],
    justifyContent: "flex-start",
    paddingLeft,
    paddingRight: theme.spacing(3),
    textAlign: "left",
    textTransform: "none",
    width: "100%",
    "& .MuiButton-startIcon": {
      color: active
        ? theme.palette.secondary.main
        : theme.palette.neutral?.[400],
    },
    "& .MuiButton-endIcon": {
      color: theme.palette.neutral?.[400],
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  })
);

export const ParentListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.5),
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const ChildrentListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  marginBottom: theme.spacing(0.5),
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
