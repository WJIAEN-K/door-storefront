"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";

export type CarouselItem = {
  slug: string;
  titleEn: string;
  titleZh: string;
  coverImageUrl: string;
};

function coverSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

const INTERVAL_MS = 6000;

export function NewsCarousel({
  items,
  locale,
  sectionTitle,
}: {
  items: CarouselItem[];
  locale: string;
  sectionTitle: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const n = items.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (reduceMotion || paused || n <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => go(1), INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, paused, n, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (n === 0) return null;

  const current = items[index]!;
  const title = locale === "zh" ? current.titleZh : current.titleEn;
  const cover = coverSrc(current.coverImageUrl);
  const isExternal = cover.startsWith("http");

  return (
    <section
      aria-roledescription="carousel"
      aria-label={sectionTitle}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <h2 className="font-display text-2xl tracking-[-0.03em] text-stone-950 sm:text-3xl">
          {sectionTitle}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={locale === "zh" ? "上一张" : "Previous slide"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 text-stone-800 shadow-sm outline-offset-2 transition hover:border-[#9a6a43]/40 hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-[#9a6a43]"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={locale === "zh" ? "下一张" : "Next slide"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 text-stone-800 shadow-sm outline-offset-2 transition hover:border-[#9a6a43]/40 hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-[#9a6a43]"
            onClick={() => go(1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-stone-200 shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
        <Link
          href={`/news/${current.slug}`}
          className="group block cursor-pointer outline-offset-4 focus-visible:ring-2 focus-visible:ring-[#9a6a43] focus-visible:ring-offset-2"
          aria-current={true}
        >
          <div className="relative aspect-[21/9] min-h-[200px] max-h-[min(28rem,50vh)] w-full sm:min-h-[240px]">
            {isExternal ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <Image
                src={cover || "/doors/门1/微信图片_2026-03-04_113552_921.jpg"}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, min(80rem, 100vw)"
                priority={index === 0}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="max-w-3xl text-xl font-semibold leading-snug tracking-[-0.02em] text-white drop-shadow sm:text-2xl lg:text-3xl">
                {title}
              </p>
              <p className="mt-3 text-sm font-medium text-white/90 underline-offset-4 group-hover:underline">
                {locale === "zh" ? "阅读全文" : "Read article"}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="mt-4 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label={locale === "zh" ? "幻灯片指示" : "Slide indicators"}
      >
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${locale === "zh" ? "第" : "Slide"} ${i + 1}`}
            className={`h-11 min-w-11 rounded-full px-3 text-xs font-medium outline-offset-2 transition focus-visible:ring-2 focus-visible:ring-[#9a6a43] ${
              i === index
                ? "bg-stone-950 text-white"
                : "border border-black/10 bg-white/80 text-stone-600 hover:bg-stone-100"
            }`}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {locale === "zh" ? `第 ${index + 1} 张，共 ${n} 张` : `Slide ${index + 1} of ${n}`}
      </p>
    </section>
  );
}
