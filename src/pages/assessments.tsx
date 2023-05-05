import { Assessments, AuthGuard, Layout } from "@components";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
import { useTranslation } from "react-i18next";

const AssessmentsPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("assessments")} | SysGym</title>
      </Head>
      <Assessments />
    </>
  );
};

AssessmentsPage.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default AssessmentsPage;
