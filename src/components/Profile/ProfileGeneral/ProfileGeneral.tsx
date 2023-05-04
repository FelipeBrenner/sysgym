import { useAuth } from "@hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { useTranslation } from "react-i18next";

export const ProfileGeneral = ({ ...props }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

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
                  defaultValue={user?.name}
                  label="Full Name"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
                <Button>{t("save")}</Button>
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
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">{t("profile.deleteAccount")}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                {t("profile.deleteAccountDescription")}
              </Typography>
              <Button color="error" variant="outlined">
                {t("profile.deleteAccount")}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
