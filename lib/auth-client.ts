import { createAuthClient } from "better-auth/react";
import { adminClient, anonymousClient, phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    anonymousClient(),
    phoneNumberClient()
  ]
});
