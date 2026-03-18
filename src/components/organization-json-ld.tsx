import { brand } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/seo";

/** Organization + WebSite structured data for rich results (server component). */
export function OrganizationJsonLd() {
  const base = getSiteUrl();
  const sameAs: string[] = [];

  const graph = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: brand.nameEn,
      alternateName: [brand.nameZh, "Honch", "恒诚"],
      url: base,
      description:
        "Honch (恒诚) — premium interior, exterior, bifold and louvered doors. Atlanta fulfillment, nationwide and international freight on quote.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: brand.salesEmail,
          telephone: `+1-${brand.phone.replace(/\D/g, "")}`,
          areaServed: ["US", "Worldwide"],
          availableLanguage: ["English", "Chinese"],
        },
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: brand.nameEn,
      alternateName: brand.nameZh,
      inLanguage: ["en-US", "zh-CN"],
      publisher: { "@id": `${base}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
