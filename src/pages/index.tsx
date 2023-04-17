import { AuthGuard } from "@components";
import { useAuth } from "@hooks";
import { Box, Button, Card, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const Home: NextPageWithLayout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/authentication/login");
  };

  return (
    <>
      <Head>
        <title>SysGym</title>
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
            <Button
              fullWidth
              onClick={handleLogout}
              sx={{
                backgroundColor: "common.white",
                color: "common.black",
                "&:hover": {
                  backgroundColor: "common.white",
                  color: "common.black",
                },
              }}
              variant="contained"
            >
              Logout
            </Button>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Home.getLayout = (page) => <AuthGuard>{page}</AuthGuard>;

export default Home;
