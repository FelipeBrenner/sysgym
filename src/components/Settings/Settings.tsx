import TuneIcon from "@mui/icons-material/Tune";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import * as Styles from "./Settings.styles";
import { SettingsDrawer } from "./SettingsDrawer/SettingsDrawer";

export const Settings = () => {
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
        <Styles.SettingsButton
          color="primary"
          onClick={handleOpen}
          size="medium"
        >
          <TuneIcon />
        </Styles.SettingsButton>
      </Tooltip>
      <SettingsDrawer onClose={handleClose} open={open} />
    </>
  );
};
