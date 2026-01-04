import jwt from "jsonwebtoken";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const ADMIN_SECRET = process.env.ADMIN_SECRET!;

export type AdminPayload = {
  email: string;
};

export function getAdminUser(
  cookieStore: ReadonlyRequestCookies
): AdminPayload | null {
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, ADMIN_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}
