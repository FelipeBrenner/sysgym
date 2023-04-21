import { FirebaseLogin, GuestGuard, Logo } from "@components";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { NextPageWithLayout } from "pages/_app";
import { useTranslation } from "react-i18next";

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("login")} | SysGym</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Logo />
              <Typography variant="h4">{t("login")}</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                {t("loginDescription")}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <FirebaseLogin />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <Link
                component={NextLink}
                href={"/authentication/register"}
                passHref
                color="textSecondary"
                variant="body2"
              >
                {t("createNewAccount")}
              </Link>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
