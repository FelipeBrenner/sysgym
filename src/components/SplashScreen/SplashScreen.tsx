import { Logo } from "@components";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const bounce = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 20px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const SplashScreen = () => (
  <Box
    sx={{
      alignItems: "center",
      backgroundColor: "neutral.900",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      left: 0,
      p: 3,
      position: "fixed",
      top: 0,
      width: "100vw",
      zIndex: 2000,
    }}
  >
    <Logo
      sx={{
        height: 80,
        width: 80,
        animation: `${bounce} 1s ease-in-out infinite`,
      }}
    />
  </Box>
);
