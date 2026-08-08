"use client";

import useWebPush from "@/hooks/use-web-push";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function WebPushProvider() {
  const { subscribeToPush } = useWebPush();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          subscribeToPush();
        })
        .catch(() => {});
    }
  }, [status, subscribeToPush]);

  return undefined;
}
