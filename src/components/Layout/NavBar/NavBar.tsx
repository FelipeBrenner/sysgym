import { useAuth } from "@hooks";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import { AppBarProps, ButtonBase, IconButton, Tooltip } from "@mui/material";
import { getUserAcronym } from "@utils";
import { useRef, useState } from "react";
import { AccountPopover } from "../AccountPopover";
import { UsersPopover } from "../UsersPopover";
import * as Styles from "./NavBar.styles";

interface NavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const UsersButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title="Users">
        <Styles.IconButton onClick={handleOpenPopover} ref={anchorRef}>
          <PeopleIcon fontSize="small" />
        </Styles.IconButton>
      </Tooltip>
      <UsersPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { user } = useAuth();

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Styles.AvatarBox
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
      >
        <Styles.Avatar src={user?.avatar}>
          {getUserAcronym(user?.name, user?.email)}
        </Styles.Avatar>
      </Styles.AvatarBox>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const Navbar = ({ onOpenSidebar, ...other }: NavbarProps) => (
  <Styles.AppBar
    sx={{
      left: {
        lg: 280,
      },
      width: {
        lg: "calc(100% - 280px)",
      },
    }}
    {...other}
  >
    <Styles.Toolbar disableGutters>
      <IconButton
        onClick={onOpenSidebar}
        sx={{
          display: {
            xs: "inline-flex",
            lg: "none",
          },
        }}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Styles.FlexGrowBox />
      <UsersButton />
      <AccountButton />
    </Styles.Toolbar>
  </Styles.AppBar>
);
