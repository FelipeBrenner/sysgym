import { useAuth } from "@hooks";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.isAuthenticated) {
      router.push("/").catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
};
