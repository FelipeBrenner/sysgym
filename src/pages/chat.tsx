import { AuthGuard, Chat, Layout } from "@components";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";

const ChatPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("chat.title")} | SysGym</title>
      </Head>
      <Chat />
    </>
  );
};

ChatPage.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ChatPage;
