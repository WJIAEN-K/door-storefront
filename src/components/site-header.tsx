"use client";

import { ArrowRight, Menu, Phone, Sparkles } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type SiteHeaderClientProps = {
  brandDisplayName: string;
  brandSubtitle: string;
  links: readonly { href: string; label: string }[];
  navMenu: string;
  navGetQuote: string;
};

export function SiteHeaderClient({
  brandDisplayName,
  brandSubtitle,
  links,
  navMenu,
  navGetQuote,
}: SiteHeaderClientProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f3ee]/85 backdrop-blur-xl">
      <div className={cn("mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#9a6a43] text-white shadow-lg shadow-[#9a6a43]/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-stone-500">
                {brandDisplayName}
              </p>
              <p className="text-sm text-stone-600">{brandSubtitle}</p>
            </div>
          </Link>

          <nav
            className="hidden flex-wrap items-center gap-6 lg:flex lg:gap-8"
            aria-label="Main"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer text-sm font-medium text-stone-700 transition hover:text-stone-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <a
              href="tel:+17706868446"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-[#9a6a43]/30 hover:text-stone-950"
            >
              <Phone className="h-4 w-4 text-[#9a6a43]" />
              770-686-8446
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:bg-[#9a6a43]"
            >
              {navGetQuote}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
              <Menu className="h-4 w-4" />
              {navMenu}
            </summary>
            <div className="absolute right-0 top-14 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
              <div className="mb-3">
                <LanguageSwitcher />
              </div>
              <div className="grid gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-3 border-t border-black/5 pt-4">
                <a
                  href="tel:+17706868446"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-stone-700"
                >
                  <Phone className="h-4 w-4 text-[#9a6a43]" />
                  770-686-8446
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"
                >
                  {navGetQuote}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </details>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
