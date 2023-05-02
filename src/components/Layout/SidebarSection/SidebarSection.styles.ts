import { ListSubheader as MuiListSubheader, styled } from "@mui/material";

export const ListSubheader = styled(MuiListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  color: theme.palette.neutral?.[500],
  marginLeft: theme.spacing(4),
}));
