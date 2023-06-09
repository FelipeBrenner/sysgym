import { usersDatabase } from "@database";
import { Avatar, Popover, Typography } from "@mui/material";
import { IUser } from "@types";
import NextLink from "next/link";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Styles from "./UsersPopover.styles";

interface UsersPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const UsersPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: UsersPopoverProps) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<IUser[]>([]);

  useLayoutEffect(() => {
    const loadUsers = async () => {
      const users = await usersDatabase.getUsers();
      setUsers(users);
    };

    loadUsers();
  }, [open]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{
        sx: {
          p: 2,
          width: 300,
        },
      }}
      transitionDuration={0}
      {...other}
    >
      <Typography variant="h6">{t("users")}</Typography>
      <Styles.List disablePadding>
        {users.map((user) => (
          <Styles.ListItem disableGutters key={user.id}>
            <Styles.UserButton
              LinkComponent={NextLink}
              startIcon={
                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
              }
            >
              {user.name}
            </Styles.UserButton>
          </Styles.ListItem>
        ))}
      </Styles.List>
    </Popover>
  );
};
