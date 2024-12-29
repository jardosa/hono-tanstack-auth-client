import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { authClient } from "../lib/auth-client";

const EXCLUDED_ROUTES = ["signin", "signout", "two-factor", "signup"];
export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();
    // CHECK IF user is authenticated before getting access to the routes
    if (!EXCLUDED_ROUTES.some((route) => location.href.includes(route))) {
      if (!session.data) {
        throw redirect({
          to: "/signin",
          search: {
            redirect: location.href,
          },
        });
      }
    }
    return session;
  },
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
