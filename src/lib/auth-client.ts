import { emailOTPClient } from "better-auth/client/plugins";
import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  emailAndPassword: {
    enabled: true,
  },
  plugins: [twoFactorClient({
    // onTwoFactorRedirect() {
    //   window.location.href = "sessions/two-factor/app"
    // }
  }),
    emailOTPClient()
  ],
});
