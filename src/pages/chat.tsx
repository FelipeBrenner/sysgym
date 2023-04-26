import { AuthGuard, Layout } from "@components";
import { Box, Card, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";

const Chat: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("chat")} | SysGym</title>
      </Head>
      <Box
        component="main"
        sx={{
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
            <Typography>{t("chat")}</Typography>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Chat.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default Chat;
