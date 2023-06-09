import { useAuth } from "@hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ProfileGeneral = ({ ...props }) => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const [isLoadingSaveName, setIsLoadingSaveName] = useState(false);

  const handleSaveName = async () => {
    setIsLoadingSaveName(true);
    await updateUser({ name });
    setIsLoadingSaveName(false);
  };

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">{t("profile.basicDetails")}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  <AccountCircleIcon fontSize="small" />
                </Avatar>
                <Button>{t("change")}</Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  value={name}
                  label="Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                  onChange={(event) => setName(event.target.value)}
                />
                <LoadingButton
                  disabled={name === user?.name}
                  onClick={handleSaveName}
                  loading={isLoadingSaveName}
                >
                  {t("save")}
                </LoadingButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  defaultValue="dummy.account@gmail.com"
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderStyle: "dashed",
                    },
                  }}
                />
                <Button>{t("edit")}</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
