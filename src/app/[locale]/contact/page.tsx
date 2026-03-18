import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import { brandDisplayName } from "@/lib/site-data";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Container, DoorVisual, SectionHeading } from "@/components/site";
import { dict } from "@/content/dictionary";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const d = dict(locale);
  const cp = d.contactPage;
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: d.nav.contact,
    description: `${cp.subtitle} — ${brandDisplayName(locale)}.`,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const d = dict(locale);
  const cp = d.contactPage;
  const cards = [
    {
      title: cp.cards.sales,
      detail: "info@doortodoorco.com",
      href: "mailto:info@doortodoorco.com",
      icon: Mail,
    },
    {
      title: cp.cards.call,
      detail: "770-686-8446",
      href: "tel:+17706868446",
      icon: Phone,
    },
    {
      title: cp.cards.shipping,
      detail: "freight@doortodoorco.com",
      href: "mailto:freight@doortodoorco.com",
      icon: Truck,
    },
    {
      title: cp.cards.pro,
      detail: cp.cards.proDetail,
      href: "/contact",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <section className="pt-10 lg:pt-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                <BadgeCheck className="h-4 w-4 text-[#9a6a43]" />
                {cp.badge}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                  {cp.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600">{cp.subtitle}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {cp.bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-3xl border border-black/10 bg-white/75 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  >
                    <div className="mt-0.5 rounded-2xl bg-[#f5e8dc] p-2 text-[#9a6a43]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <DoorVisual variant="shaker" />
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={cp.formEyebrow}
                title={cp.formTitle}
                description={cp.formDesc}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <Link
                      key={card.title}
                      href={card.href}
                      className="rounded-[1.75rem] border border-black/10 bg-stone-50 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
                    >
                      <div className="inline-flex rounded-2xl bg-[#f5e8dc] p-3 text-[#9a6a43]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                        {card.title}
                      </p>
                      <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-stone-950">
                        {card.detail}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <ContactForm labels={d.contactForm} />
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow={cp.nextEyebrow}
            title={cp.nextTitle}
            description={cp.nextDesc}
            align="center"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {cp.nextSteps.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a6a43]">
                  {locale === "zh" ? `步骤 ${idx + 1}` : `Step ${idx + 1}`}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-20 lg:pt-28">
        <Container>
          <div className="rounded-[2.5rem] border border-black/10 bg-stone-950 p-8 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] lg:p-12">
            <div className="max-w-3xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                {cp.ctaBadge}
              </p>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.05em] sm:text-5xl">
                {cp.ctaTitle}
              </h2>
              <p className="text-base leading-7 text-white/70">{cp.ctaDesc}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/categories/interior"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#f5e8dc]"
                >
                  {cp.shopInterior}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories/exterior"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {cp.shopExterior}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
