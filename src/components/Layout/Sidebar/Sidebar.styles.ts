import { Logo as LogoComponent } from "@components";
import { Box, styled } from "@mui/material";
import { LinkProps } from "next/link";
import { SidebarSection as SidebarSectionComponent } from "../SidebarSection";

export const SidebarSection = styled(SidebarSectionComponent)(({ theme }) => ({
  marginTop: theme.spacing(2),
  "& + &": {
    marginTop: theme.spacing(2),
  },
}));

export const Logo = styled(LogoComponent)(({ theme }) => ({
  height: theme.spacing(6),
  width: theme.spacing(6),
}));

export const LogoBox = styled(Box)<LinkProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  paddingTop: theme.spacing(3),
}));
