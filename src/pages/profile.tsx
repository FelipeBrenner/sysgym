import { AuthGuard, Layout, ProfileGeneral } from "@components";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { t } from "i18next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";

const tabs = [{ label: t("general"), value: "general" }];

const Profile: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>("general");

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>{t("profile.title")} | SysGym</title>
      </Head>
      <Box component="main">
        <Container maxWidth="md">
          <Typography variant="h4">{t("profile.title")}</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <ProfileGeneral />}
        </Container>
      </Box>
    </>
  );
};

Profile.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default Profile;
