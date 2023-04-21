import { AuthGuard, Layout } from "@components";
import { Box, Card, Container, Typography } from "@mui/material";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";

const Home: NextPageWithLayout = () => {
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
          minHeight: "100%",
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
          <Card
            elevation={16}
            sx={{ p: 4, display: "flex", justifyContent: "center" }}
          >
            <Typography>Home</Typography>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Home.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default Home;
