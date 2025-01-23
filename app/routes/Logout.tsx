import {
  getSession,
  destroySession,
} from "../sessions.server";
import { redirect } from "react-router";
import type { Route } from "./+types/Logout";

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

