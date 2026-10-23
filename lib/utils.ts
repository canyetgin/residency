import "server-only";

// open-redirect protection: only site-wide and starts with the "/" will be accepted
export function safeRedirect(
  target: string | null | undefined,
  fallback = "/",
) {
  if (!target) return fallback;
  if (
    !target.startsWith("/") ||
    target.startsWith("//") ||
    target.includes("\\")
  )
    return fallback;
  return target;
}
