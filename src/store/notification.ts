import { WSNotificationResponse } from "@/lib/api/others/notification/response";
import { create } from "zustand";

interface NotificationState {
  items: WSNotificationResponse[];
  addNotification: (item: WSNotificationResponse) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  addNotification: (item) =>
    set((state) => ({
      items: [item, ...state.items],
    })),
  clearNotifications: () =>
    set(() => ({
      items: [],
    })),
}));
