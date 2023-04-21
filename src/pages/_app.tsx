import { SettingsButton, SplashScreen } from "@components";
import {
  AuthConsumer,
  AuthProvider,
  SettingsConsumer,
  SettingsProvider,
} from "@contexts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@theme";
import "i18n";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/logo.png" />
        <title>SysGym</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider
                theme={createTheme({
                  mode: settings.theme,
                })}
              >
                <CssBaseline />
                <Toaster position="top-center" />
                <SettingsButton />
                <AuthConsumer>
                  {(auth) =>
                    !auth.isInitialized ? (
                      <SplashScreen />
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )
                  }
                </AuthConsumer>
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
