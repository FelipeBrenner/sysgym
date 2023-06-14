import { usersDatabase } from "@database";
import { Popover, Typography } from "@mui/material";
import { IUser, typeOptions } from "@types";
import { getUserAcronym } from "@utils";
import NextLink from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
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
                <Styles.Avatar src={user.avatar}>
                  {getUserAcronym(user?.name, user?.email)}
                </Styles.Avatar>
              }
            >
              <Styles.DetailsBox>
                {user?.name}
                <Typography color="textSecondary" variant="body2">
                  {
                    typeOptions.find((option) => option.value === user.type)
                      ?.label
                  }
                </Typography>
              </Styles.DetailsBox>
            </Styles.UserButton>
          </Styles.ListItem>
        ))}
      </Styles.List>
    </Popover>
  );
};
