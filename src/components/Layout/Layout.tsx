import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useState } from "react";
import { Navbar } from "./NavBar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            color: "text.primary",
            backgroundColor: "background.default",
            py: 8,
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
      <Sidebar
        onClose={(): void => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
