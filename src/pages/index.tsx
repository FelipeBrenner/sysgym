import { AuthGuard, Home, Layout } from "@components";
import Head from "next/head";
import { NextPageWithLayout } from "pages/_app";
// The import order DOES MATTER here. If you change it, you'll get an error!

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
