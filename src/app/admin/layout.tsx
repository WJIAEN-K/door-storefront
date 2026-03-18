import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

import { AdminNav } from "@/app/admin/admin-nav";
import { AdminWorkspaceHeader } from "@/app/admin/admin-workspace-header";
import { getAdminLocale } from "@/lib/admin-locale";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAdminLocale();
  if (locale === "zh") {
    return {
      title: { default: "管理后台 · Honch", template: "%s · Honch 管理后台" },
      robots: { index: false, follow: false },
    };
  }
  return {
    title: { default: "Admin · Honch", template: "%s · Honch Admin" },
    robots: { index: false, follow: false },
  };
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getAdminLocale();
  const messages = locale === "zh" ? adminZh : adminEn;

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-[#f7f3ee] text-stone-950 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(154,106,67,0.08),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.75),transparent_22%)]" />
          <div className="relative flex min-h-screen">
            <AdminNav />
            <main className="min-h-screen flex-1 overflow-auto px-4 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-12 lg:pb-10 lg:pt-10">
              <AdminWorkspaceHeader>{children}</AdminWorkspaceHeader>
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
