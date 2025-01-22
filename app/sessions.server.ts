import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
  userName: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.JWT_SECRET_KEY!],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
