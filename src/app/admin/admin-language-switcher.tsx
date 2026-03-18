"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { ADMIN_LOCALE_COOKIE, type AdminLocale } from "@/lib/admin-locale-shared";
import { cn } from "@/lib/utils";

export function AdminLanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as AdminLocale;
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  function setLocale(next: AdminLocale) {
    if (next === locale) return;
    document.cookie = `${ADMIN_LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      className={cn(
        "inline-flex shrink-0 rounded-full border border-black/10 bg-white/90 p-0.5 shadow-sm",
        className,
      )}
      role="group"
      aria-label={t("label")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "min-h-8 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition sm:min-h-9 sm:px-3 sm:text-xs",
          locale === "en"
            ? "bg-stone-950 text-white shadow-sm"
            : "text-stone-600 hover:bg-black/[0.04] hover:text-stone-950",
        )}
        aria-pressed={locale === "en"}
      >
        {t("en")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={cn(
          "min-h-8 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition sm:min-h-9 sm:px-3 sm:text-xs",
          locale === "zh"
            ? "bg-stone-950 text-white shadow-sm"
            : "text-stone-600 hover:bg-black/[0.04] hover:text-stone-950",
        )}
        aria-pressed={locale === "zh"}
      >
        {t("zh")}
      </button>
    </div>
  );
}
