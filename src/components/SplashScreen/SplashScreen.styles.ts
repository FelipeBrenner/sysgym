import { Logo as LogoComponent } from "@components";
import { keyframes } from "@emotion/react";
import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.neutral?.[900],
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  left: 0,
  padding: theme.spacing(3),
  position: "fixed",
  top: 0,
  width: "100vw",
  zIndex: 2000,
}));

const bounce = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 10px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const Logo = styled(LogoComponent)(({ theme }) => ({
  height: theme.spacing(10),
  width: theme.spacing(10),
  animation: `${bounce} 1s ease-in-out infinite`,
}));
