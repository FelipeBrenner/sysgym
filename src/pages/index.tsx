import { AuthGuard, Home, Layout } from "@components";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>SysGym</title>
      </Head>
      <Home />
    </>
  );
};

HomePage.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default HomePage;
