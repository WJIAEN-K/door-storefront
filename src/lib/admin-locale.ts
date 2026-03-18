import { cookies } from "next/headers";

import { ADMIN_LOCALE_COOKIE, type AdminLocale } from "@/lib/admin-locale-shared";

export type { AdminLocale };
export { ADMIN_LOCALE_COOKIE } from "@/lib/admin-locale-shared";

export async function getAdminLocale(): Promise<AdminLocale> {
  const jar = await cookies();
  const v = jar.get(ADMIN_LOCALE_COOKIE)?.value;
  return v === "zh" ? "zh" : "en";
}
