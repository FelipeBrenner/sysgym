import type { ReactNode } from "react";
import { useState } from "react";
import * as Styles from "./Layout.styles";
import { Navbar } from "./NavBar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <Styles.Layout>{children}</Styles.Layout>
      <Navbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
      <Sidebar
        onClose={(): void => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
