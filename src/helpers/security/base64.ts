/**
 * Converts a Base64 URL-safe string to a Uint8Array, required for WebPush subscription.
 * This is necessary to convert the application server's public key from Base64URL format to binary.
 *
 * @param base64String Base64 URL-safe public key as defined by the Web Push protocol
 * @returns Uint8Array binary representation of the key
 *
 * @see https://web.dev/articles/push-notifications-web-push-protocol?hl=en#applicationserverkeys
 */
export function base64UrlToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export function base64ToUtf8(base64String: string): string {
  const bytes = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Converts an ArrayBuffer to a Base64 URL-safe string.
 * This is required to properly encode cryptographic keys (p256dh, auth) when sending
 * a Web Push subscription to the backend, as defined by the Web Push protocol.
 *
 * @param buffer The ArrayBuffer to convert (typically obtained from subscription.getKey()).
 * @returns Base64 URL-safe string representation of the buffer.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7515#section-2 (Base64URL Encoding Reference)
 */
export function arrayBufferToBase64Url(buffer?: ArrayBuffer): string {
  if (!buffer) return "";

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
