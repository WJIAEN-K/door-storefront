"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { AdminLanguageSwitcher } from "@/app/admin/admin-language-switcher";

export default function AdminLoginPage() {
  const t = useTranslations("Admin.login");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const password = fd.get("password") as string;
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) {
        const j = (await r.json()) as { error?: string };
        setError(j.error ?? t("failed"));
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <AdminLanguageSwitcher />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(154,106,67,0.12),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.9),transparent_35%)]"
        aria-hidden
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9a6a43] text-white shadow-lg shadow-[#9a6a43]/25">
            <Sparkles className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-stone-950">{t("title")}</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-600">{t("subtitle")}</p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-10">
          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-stone-800">
                {t("password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 min-h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a6a43]/35 focus:ring-2 focus:ring-[#9a6a43]/20"
                placeholder={t("passwordPlaceholder")}
              />
            </div>
            {error ? (
              <div
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:bg-[#9a6a43] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? t("signingIn") : t("signIn")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
