import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  marginLeft: theme.spacing(-1),
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(3),
}));

interface IconBoxProps {
  selected: boolean;
}

export const IconBox = styled(Box)<IconBoxProps>(({ theme, selected }) => ({
  borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  borderStyle: "solid",
  borderWidth: theme.spacing(0.25),
  cursor: "pointer",
  fontSize: 0,
  margin: theme.spacing(1),
  overflow: "hidden",
  padding: theme.spacing(1),
}));
