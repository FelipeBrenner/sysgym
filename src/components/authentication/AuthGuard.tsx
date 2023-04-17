import { useAuth } from "@hooks";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (!auth.isAuthenticated) {
        router
          .push({
            pathname: "/authentication/login",
            query: { returnUrl: router.asPath },
          })
          .catch(console.error);
      } else {
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
