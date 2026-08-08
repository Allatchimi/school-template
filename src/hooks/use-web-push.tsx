"use client";

import {
  arrayBufferToBase64Url,
  base64UrlToUint8Array,
} from "@/helpers/security/base64";
import {
  getProfileWebPushSubscriptionPublicKey,
  updateProfileWebPushSubscription,
} from "@/lib/api/user/profile/routes";

import { useCallback } from "react";

export default function useWebPush() {
  const subscribeToPush = useCallback(async () => {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    if (!("PushManager" in window)) {
      return;
    }

    try {
      // Check permissions
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        return;
      }

      // Get push manager
      const registration = await navigator.serviceWorker.ready;
      if (!registration?.pushManager) {
        return;
      }

      // Check if subscription already exists
      const tempSubscription = await registration.pushManager.getSubscription();
      if (tempSubscription) {
        return;
      }

      // Get public key from backend
      const { data } = await getProfileWebPushSubscriptionPublicKey();
      if (data?.publicKey) {
        // Convert public key to Uint8Array and subscribe to push
        const convertedKey = base64UrlToUint8Array(data.publicKey);

        // Subscribe client
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });

        // Subscribe backend
        if (subscription) {
          subscribeBackend(subscription);
        }
      }
    } catch {
      try {
        await cleanupSubscription();
      } catch {}
    }
  }, []);

  return { subscribeToPush };
}

const cleanupSubscription = async (forceCleanup?: boolean) => {
  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription) {
    await existingSubscription.unsubscribe();
  }
  if (existingSubscription || forceCleanup === true) {
    await updateProfileWebPushSubscription({
      endpoint: null,
      keys: null,
    });
  }
};

const subscribeBackend = (subscription: PushSubscription) => {
  // Get p256dh and auth keys from subscription
  const p256dh = subscription.getKey("p256dh");
  const auth = subscription.getKey("auth");
  if (!(p256dh && auth)) {
    return;
  }

  // Send subscription to backend
  updateProfileWebPushSubscription({
    endpoint: subscription.endpoint,
    keys: {
      p256dh: arrayBufferToBase64Url(p256dh),
      auth: arrayBufferToBase64Url(auth),
    },
  })
    .then(() => {})
    .catch(() => {});
};
