import { SettingsDrawer } from "@components";
import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";

export const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          onClick={handleOpen}
          size="medium"
          sx={{
            bottom: 0,
            margin: (theme) => theme.spacing(4),
            position: "fixed",
            right: 0,
            zIndex: 1900,
          }}
        >
          <HiAdjustments size={20} />
        </Fab>
      </Tooltip>
      <SettingsDrawer onClose={handleClose} open={open} />
    </>
  );
};
