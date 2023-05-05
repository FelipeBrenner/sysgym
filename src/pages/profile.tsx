import { AuthGuard, Layout, Profile } from "@components";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";

const ProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("profile.title")} | SysGym</title>
      </Head>
      <Profile />
    </>
  );
};

ProfilePage.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ProfilePage;
