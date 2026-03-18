import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export class AdminAuthError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "AdminAuthError";
  }
}

export async function requireAdmin() {
  const token = (await cookies()).get("admin_session")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) throw new AdminAuthError();
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
  } catch {
    throw new AdminAuthError();
  }
}
