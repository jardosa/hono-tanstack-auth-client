import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { signInWithGoogle } from "../lib/signInProviders";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect ?? "",
    };
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate()
  const signInWithEmail = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        rememberMe,
        callbackURL: `http://localhost:3001/${searchParams["redirect"] ?? ""}`,
      },
      {
        async onSuccess(context) {
          if (context.data.twoFactorRedirect) {
            // Handle the 2FA verification in place
            navigate({to: "/sessions/two-factor/app",search: searchParams})
          }
        },
      },
    );
  };

  return (
    <div>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <button onClick={signInWithEmail}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}
