import { useAuth } from "@hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { getUserAcronym } from "@utils";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Styles from "./AccountPopover.styles";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose: () => void;
  open: boolean;
}

export const AccountPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: AccountPopoverProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { user } = useAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      await logout();
      router.push("/authentication/login").catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { minWidth: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Styles.AccountBox>
        <Styles.Avatar src={user?.avatar}>
          {getUserAcronym(user?.name, user?.email)}
        </Styles.Avatar>
        <Styles.DetailsBox>
          <Typography variant="body1">{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.email}
          </Typography>
        </Styles.DetailsBox>
      </Styles.AccountBox>
      <Divider />
      <Styles.MenuBox>
        <MenuItem component={NextLink} href="/profile">
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1">{t("profile.title")}</Typography>
            }
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">{t("logout")}</Typography>}
          />
        </MenuItem>
      </Styles.MenuBox>
    </Popover>
  );
};
