import { useDatabase } from "@hooks";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Popover,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

interface UsersPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const UsersPopover = (props: UsersPopoverProps) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { users } = useDatabase();

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
      <Typography variant="h6">Users</Typography>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          {users.map((user) => (
            <ListItem
              disableGutters
              key={user.id}
              sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
              }}
            >
              <Button
                LinkComponent={NextLink}
                startIcon={
                  <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
                }
                sx={{
                  color: "text.primary",
                  borderRadius: 1,
                  justifyContent: "flex-start",
                  pr: 2,
                  textAlign: "left",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255, 0.08)",
                  },
                  flexWrap: "nowrap",
                }}
              >
                {user.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};
