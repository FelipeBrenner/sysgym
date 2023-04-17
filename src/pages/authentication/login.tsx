import { FirebaseLogin, GuestGuard, Logo } from "@components";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  return (
    <>
      <Head>
        <title>Login | SysGym</title>
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
              <Link component={NextLink} href="/" passHref>
                <Logo />
              </Link>
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform
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
                href={
                  disableGuard
                    ? `/authentication/register?disableGuard=${disableGuard}`
                    : "/authentication/register"
                }
                passHref
                color="textSecondary"
                variant="body2"
              >
                Create new account
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
