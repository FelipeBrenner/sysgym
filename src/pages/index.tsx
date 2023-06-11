import { AuthGuard, Calendar, Layout } from "@components";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import { useTranslation } from "react-i18next";

const SchedulePage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("schedule.title")} | SysGym</title>
      </Head>
      <Calendar />
    </>
  );
};

SchedulePage.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default SchedulePage;
