import { authClient } from "./auth-client"

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google"
  })
}

