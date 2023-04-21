import { AuthGuard, Layout } from "@components";
import { Box, Card, Container, Typography } from "@mui/material";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import { useTranslation } from "react-i18next";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("schedule")} | SysGym</title>
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
            <Typography>{t("schedule")}</Typography>
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
