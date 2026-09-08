"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notification"; // on verra après le store
import { WSNotificationResponse } from "@/lib/api/others/notification/response";

interface NotificationProviderProps {
  token?: string;
  wsUrl?: string;
  children?: React.ReactNode;
}

export default function NotificationProvider({
  token,
  wsUrl,
  children,
}: NotificationProviderProps) {
  // Zustand hooks
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  useEffect(() => {
    if (!token || !wsUrl) return;

    const socket = new WebSocket(
      `${wsUrl}/notifications?token=${token}`
    );

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      try {
        const notif: WSNotificationResponse | undefined = JSON.parse(
          event.data
        );
        if (!notif) return;

        addNotification(notif);
      } catch {}
    };

    socket.onclose = () => {};

    return () => {
      socket.close();
    };
  }, [token, wsUrl, addNotification]);

  return <>{children}</>;
}
