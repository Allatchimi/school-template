"use client";

import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

interface LogoutHandlerProps {
  triggerLogout?: boolean;
  redirectTo?: string;
}

export default function LogoutHandler({
  triggerLogout,
  redirectTo = "/auth/invalidsession",
}: LogoutHandlerProps) {
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (triggerLogout === true && !hasLoggedOut.current) {
      hasLoggedOut.current = true;
      signOut({ redirect: true, callbackUrl: redirectTo });
    }
  }, [triggerLogout, redirectTo]);

  return null;
}
