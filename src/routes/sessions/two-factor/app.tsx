import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "../../../lib/auth-client";

export const Route = createFileRoute("/sessions/two-factor/app")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect ?? "",
    };
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const clearError = () => setError(false);
  const verifyTotp = async () => {
    const { data, error } = await authClient.twoFactor.verifyTotp(
      { code },
      {
        onSuccess: () => {
          window.location.href = `http://localhost:3001/${searchParams["redirect"] ?? ""}`;
        },
        onError: () => {
          setError(true);
        },
      },
    );
  };
  return (
    <div>
      {error ? (
        <div>
          Two-factor authentication failed
          <button onClick={clearError}>Close</button>
        </div>
      ) : null}
      <div>Authentication Code</div>

      <div>
        <input placeholder="XXXXXX" onChange={(e) => setCode(e.target.value)} />
        <button onClick={verifyTotp}>Submit</button>
      </div>
    </div>
  );
}
