"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div
      className="inline-flex rounded-full border border-black/10 bg-white/90 p-0.5 shadow-sm"
      role="group"
      aria-label={t("label")}
    >
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: "en" })}
        className={cn(
          "min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition sm:px-4 sm:text-sm",
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
        onClick={() => router.replace(pathname, { locale: "zh" })}
        className={cn(
          "min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition sm:px-4 sm:text-sm",
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
