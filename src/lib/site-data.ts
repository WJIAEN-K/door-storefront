export type Category = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  leadTime: string;
  count: string;
  accent: string;
  visual: "interior" | "exterior" | "bifold" | "louvered";
  coverFolder: string;
  coverFile: string;
};

export type Product = {
  slug: string;
  sku: string;
  /** Message key for zh.json `products.{msgKey}` */
  msgKey: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  priceRange: string;
  rating: number;
  reviews: number;
  leadTime: string;
  finish: string;
  size: string;
  material: string;
  installation: string;
  description: string;
  highlights: string[];
  specs: Array<{ label: string; value: string }>;
  visual: "shaker" | "glass" | "entry" | "panel" | "bifold" | "louvered";
  imageFolder: string;
  imageFile: string;
  galleryFiles: string[];
};

export const brand = {
  /** English market name */
  nameEn: "Honch",
  /** 中文品牌名 */
  nameZh: "恒诚",
  tagline: "Premium interior & exterior doors — direct to your site.",
  established: "2015",
  phone: "770-686-8446",
  salesEmail: "info@doortodoorco.com",
  freightEmail: "freight@doortodoorco.com",
  pickupEmail: "jesus@doortodoorco.com",
  hours: "Mon–Fri, 9a–5p EST",
  location: "Metro Atlanta — ships nationwide & international freight on quote",
};

export function brandDisplayName(locale: string): string {
  return locale === "zh" ? brand.nameZh : brand.nameEn;
}

export const categories: Category[] = [
  {
    slug: "interior",
    name: "Interior Doors",
    tag: "Shaker, panel & glass — slab or RapidHang™ prehung",
    description:
      "Same specialty-grade interior lines we show in our Atlanta warehouse: primed, paint-ready, and uncommon sizes when you need them.",
    leadTime: "6–8 business days processing",
    count: "6 live SKUs",
    accent: "from-amber-100 via-orange-50 to-stone-50",
    visual: "interior",
    coverFolder: "门1",
    coverFile: "微信图片_2026-03-04_113552_921.jpg",
  },
  {
    slug: "exterior",
    name: "Exterior Doors",
    tag: "Curb appeal + weather-ready entry systems",
    description:
      "Entry-focused SKUs built for remodels and new builds. Prehung options pair with our RapidHang™ jamb kits on request.",
    leadTime: "7–10 business days processing",
    count: "2 live SKUs",
    accent: "from-slate-100 via-zinc-50 to-stone-50",
    visual: "exterior",
    coverFolder: "门4",
    coverFile: "微信图片_2026-03-04_113855_075.jpg",
  },
  {
    slug: "bifold",
    name: "Bifold Doors",
    tag: "Closets, pantries & tight clearances",
    description:
      "Bifold sets that ship compact — easier for one person to stage on site before install.",
    leadTime: "6–8 business days processing",
    count: "2 live SKUs",
    accent: "from-emerald-100 via-lime-50 to-stone-50",
    visual: "bifold",
    coverFolder: "门9",
    coverFile: "微信图片_2026-03-04_114400_097.jpg",
  },
  {
    slug: "louvered",
    name: "Louvered Doors",
    tag: "Ventilation where you still want a finished look",
    description:
      "Louver profiles for laundry, storage and utility — airflow without a cheap hardware-store feel.",
    leadTime: "6–8 business days processing",
    count: "2 live SKUs",
    accent: "from-sky-100 via-cyan-50 to-stone-50",
    visual: "louvered",
    coverFolder: "门11",
    coverFile: "微信图片_2026-03-04_114506_506.jpg",
  },
];

export const heroHighlights = [
  "Standard orders: 6–8 business days processing (excl. shipping) — jamb kits 14–20 business days.",
  "Thousands of doors in stock incl. hard-to-find sizes; volume pricing for Professional Partners.",
  "RapidHang™ prehanging: compact freight, protected packaging, straightforward assembly.",
  "Cross-border friendly: US domestic freight + international shipping quoted per order.",
];

export const trustPills = [
  "4.7 / 5 · 3,000+ customers",
  "Atlanta fulfillment",
  "Nationwide + int’l quote",
  "Hand-inspected before ship",
];

export const stats = [
  { label: "Standard order processing", value: "6–8 days" },
  { label: "RapidHang™ jamb kits", value: "14–20 days" },
  { label: "Doors delivered", value: "~100k" },
  { label: "Since", value: brand.established },
];

const G = {
  m1: ["微信图片_2026-03-04_113552_921.jpg", "微信图片_2026-03-04_113612_457.jpg"],
  m2: [
    "微信图片_2026-03-04_113813_969.jpg",
    "微信图片_2026-03-04_113818_217.jpg",
    "微信图片_2026-03-04_113821_274.jpg",
  ],
  m3: [
    "微信图片_2026-03-04_113832_985.jpg",
    "微信图片_2026-03-04_113838_049.jpg",
    "微信图片_2026-03-04_113841_185.jpg",
  ],
  m4: [
    "微信图片_2026-03-04_113855_075.jpg",
    "微信图片_2026-03-04_113900_810.jpg",
    "微信图片_2026-03-04_113903_994.jpg",
  ],
  m5: [
    "微信图片_2026-03-04_113913_913.jpg",
    "微信图片_2026-03-04_113918_595.jpg",
    "微信图片_2026-03-04_113921_225.jpg",
  ],
  m6: [
    "微信图片_2026-03-04_114033_049.jpg",
    "微信图片_2026-03-04_114036_098.jpg",
    "微信图片_2026-03-04_114038_713.jpg",
  ],
  m7: [
    "微信图片_2026-03-04_114051_666.jpg",
    "微信图片_2026-03-04_114058_938.jpg",
    "微信图片_2026-03-04_114101_673.jpg",
  ],
  m8: ["微信图片_2026-03-04_114149_345.jpg", "微信图片_2026-03-04_114154_065.jpg"],
  m9: [
    "微信图片_2026-03-04_114400_097.jpg",
    "微信图片_2026-03-04_114404_786.jpg",
    "微信图片_2026-03-04_114407_074.jpg",
  ],
  m10: [
    "微信图片_2026-03-04_114421_233.jpg",
    "微信图片_2026-03-04_114433_483.jpg",
    "微信图片_2026-03-04_114435_531.jpg",
  ],
  m11: [
    "微信图片_2026-03-04_114506_506.jpg",
    "微信图片_2026-03-04_114519_474.jpg",
    "微信图片_2026-03-04_114521_978.jpg",
  ],
  m12: [
    "微信图片_2026-03-04_114538_795.jpg",
    "微信图片_2026-03-04_114548_250.jpg",
    "微信图片_2026-03-04_114550_281.jpg",
  ],
};

export const products: Product[] = [
  {
    slug: "dtd-int-m01-1lite-shaker-primed",
    sku: "DTD-INT-M01",
    msgKey: "m01",
    name: "Single Lite Clear Shaker — Primed (slab / RapidHang™)",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$198 – $348",
    rating: 5,
    reviews: 312,
    leadTime: "6–8 business days",
    finish: "Factory primed, paint-ready",
    size: "24″–36″ widths · custom quote above",
    material: "Solid-core engineered",
    installation: "Slab or RapidHang™ prehung",
    description:
      "Our #1 seller: shaker stile & rail with clear lite — matches the look customers expect from a specialty retailer, priced for direct fulfillment.",
    highlights: [
      "Borrowed light for halls & offices without losing room separation",
      "RapidHang™ ships compact vs. traditional prehung pallets",
      "Plastic-protected glass during finish work (peel when paint is cured)",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M01" },
      { label: "Style", value: "1-lite shaker" },
      { label: "Series folder", value: "门1" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "shaker",
    imageFolder: "门1",
    imageFile: G.m1[0],
    galleryFiles: G.m1,
  },
  {
    slug: "dtd-int-m02-2panel-traditional",
    sku: "DTD-INT-M02",
    msgKey: "m02",
    name: "2-Panel Traditional — Primed",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$168 – $278",
    rating: 5,
    reviews: 186,
    leadTime: "6–8 business days",
    finish: "Smooth primer",
    size: "Standard prehung & slab heights",
    material: "Solid core",
    installation: "Slab or RapidHang™",
    description:
      "Classic two-panel layout for bedrooms and secondary spaces — easy to paint house-wide for a unified refresh.",
    highlights: [
      "High-repeat SKU for whole-home swaps",
      "Pairs with standard bore for locksets",
      "Volume breaks for 6+ units",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M02" },
      { label: "Style", value: "2-panel" },
      { label: "Series folder", value: "门2" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "panel",
    imageFolder: "门2",
    imageFile: G.m2[0],
    galleryFiles: G.m2,
  },
  {
    slug: "dtd-int-m03-flush-modern",
    sku: "DTD-INT-M03",
    msgKey: "m03",
    name: "Flush Modern — Primed",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$158 – $248",
    rating: 5,
    reviews: 94,
    leadTime: "6–8 business days",
    finish: "Primed smooth",
    size: "28″–32″ common",
    material: "Engineered core",
    installation: "Slab",
    description:
      "Minimal face for contemporary plans — clean sight lines from trim to trim.",
    highlights: [
      "Ideal for condos & ADUs",
      "Lightweight for stairs and tight landings",
      "Works with concealed hinges (hardware separate)",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M03" },
      { label: "Style", value: "Flush" },
      { label: "Series folder", value: "门3" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "panel",
    imageFolder: "门3",
    imageFile: G.m3[0],
    galleryFiles: G.m3,
  },
  {
    slug: "dtd-ext-m04-craftsman-entry",
    sku: "DTD-EXT-M04",
    msgKey: "m04",
    name: "Craftsman Entry — Prehung system",
    categorySlug: "exterior",
    categoryName: "Exterior Doors",
    priceRange: "$428 – $899",
    rating: 5,
    reviews: 142,
    leadTime: "7–10 business days",
    finish: "Primed or stain-grade (specify)",
    size: "3′0″ x 6′8″ · other sizes quote",
    material: "Heavy-duty entry build",
    installation: "Prehung + weatherstrip options",
    description:
      "Street-facing presence with shadow lines that read custom — spec sidelite / transom on quote.",
    highlights: [
      "Weather-focused assembly for remodels",
      "Freight crating available for long haul",
      "Pro Partner pricing on multi-unit jobs",
    ],
    specs: [
      { label: "SKU", value: "DTD-EXT-M04" },
      { label: "Style", value: "Craftsman entry" },
      { label: "Series folder", value: "门4" },
      { label: "Processing", value: "7–10 business days" },
    ],
    visual: "entry",
    imageFolder: "门4",
    imageFile: G.m4[0],
    galleryFiles: G.m4,
  },
  {
    slug: "dtd-int-m05-5panel-colonial",
    sku: "DTD-INT-M05",
    msgKey: "m05",
    name: "5-Panel Colonial — Primed",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$178 – $298",
    rating: 5,
    reviews: 401,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Full range in stock",
    material: "Solid core",
    installation: "Slab or RapidHang™",
    description:
      "The whole-house hero: five equal panels, reads high-end once painted — same line customers compare to big-box “special order”.",
    highlights: [
      "Best value for 10-door bundles + freight",
      "Consistent grain simulation batch to batch",
      "Featured in contractor repeat orders",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M05" },
      { label: "Style", value: "5-panel" },
      { label: "Series folder", value: "门5" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "panel",
    imageFolder: "门5",
    imageFile: G.m5[0],
    galleryFiles: G.m5,
  },
  {
    slug: "dtd-int-m06-4panel-primed",
    sku: "DTD-INT-M06",
    msgKey: "m06",
    name: "4-Panel Primed — Standard bore",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$152 – $262",
    rating: 5,
    reviews: 267,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Bed & bath common sizes",
    material: "MDF face / solid core",
    installation: "Slab or RapidHang™",
    description:
      "Balanced four-panel for traditional plans — fastest path to a coordinated paint schedule.",
    highlights: [
      "Closet & bath workhorse SKU",
      "Matches many existing 1990s–2010s homes",
      "Quick ship when Atlanta warehouse has depth",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M06" },
      { label: "Style", value: "4-panel" },
      { label: "Series folder", value: "门6" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "panel",
    imageFolder: "门6",
    imageFile: G.m6[0],
    galleryFiles: G.m6,
  },
  {
    slug: "dtd-int-m07-wide-stile-shaker",
    sku: "DTD-INT-M07",
    msgKey: "m07",
    name: "Wide-Stile Shaker — Primed",
    categorySlug: "interior",
    categoryName: "Interior Doors",
    priceRange: "$188 – $318",
    rating: 5,
    reviews: 118,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "32″–36″ emphasis",
    material: "Solid core",
    installation: "Slab or RapidHang™",
    description:
      "Heavier stiles for open plans where the door reads as furniture from the living side.",
    highlights: [
      "Stronger sight lines in open floor plans",
      "Pairs with black lever hardware trends",
      "International orders: crate quote available",
    ],
    specs: [
      { label: "SKU", value: "DTD-INT-M07" },
      { label: "Style", value: "Wide shaker" },
      { label: "Series folder", value: "门7" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "shaker",
    imageFolder: "门7",
    imageFile: G.m7[0],
    galleryFiles: G.m7,
  },
  {
    slug: "dtd-ext-m08-fiberglass-entry",
    sku: "DTD-EXT-M08",
    msgKey: "m08",
    name: "Fiberglass-Look Entry — Prehung",
    categorySlug: "exterior",
    categoryName: "Exterior Doors",
    priceRange: "$498 – $959",
    rating: 5,
    reviews: 76,
    leadTime: "7–10 business days",
    finish: "Factory finish options on quote",
    size: "Single entry standard",
    material: "Composite entry system",
    installation: "Prehung",
    description:
      "Low-maintenance entry with wood-look grain — popular for coastal and high-UV markets (intl. freight quoted).",
    highlights: [
      "Reduced swell/shrink vs. solid wood entries",
      "Insulated core options on request",
      "Dedicated freight desk: freight@doortodoorco.com",
    ],
    specs: [
      { label: "SKU", value: "DTD-EXT-M08" },
      { label: "Style", value: "Fiberglass-style entry" },
      { label: "Series folder", value: "门8" },
      { label: "Processing", value: "7–10 business days" },
    ],
    visual: "entry",
    imageFolder: "门8",
    imageFile: G.m8[0],
    galleryFiles: G.m8,
  },
  {
    slug: "dtd-bif-m09-closet-pair",
    sku: "DTD-BIF-M09",
    msgKey: "m09",
    name: "Bifold Closet Pair — Primed",
    categorySlug: "bifold",
    categoryName: "Bifold Doors",
    priceRange: "$138 – $248",
    rating: 5,
    reviews: 89,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Up to 72″ opening (verify on quote)",
    material: "Hollow / solid options",
    installation: "Track kit included where noted",
    description:
      "Compact ship profile — one person can carry the bundle upstairs vs. a swing slab.",
    highlights: [
      "Saves swing arc in laundry & closets",
      "Hardware pack available",
      "Bundle with interior order for single freight",
    ],
    specs: [
      { label: "SKU", value: "DTD-BIF-M09" },
      { label: "Style", value: "2-leaf bifold" },
      { label: "Series folder", value: "门9" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "bifold",
    imageFolder: "门9",
    imageFile: G.m9[0],
    galleryFiles: G.m9,
  },
  {
    slug: "dtd-bif-m10-laundry-bifold",
    sku: "DTD-BIF-M10",
    msgKey: "m10",
    name: "Laundry Bifold — Slim profile",
    categorySlug: "bifold",
    categoryName: "Bifold Doors",
    priceRange: "$128 – $228",
    rating: 5,
    reviews: 54,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Narrow openings",
    material: "Lightweight frame",
    installation: "Bifold hardware",
    description:
      "Purpose-built for utility openings — keeps the face clean next to appliances.",
    highlights: [
      "Faster install than retrofitting swing",
      "Pairs with louvered SKU for matching utility zones",
      "Cross-border: HS code & docs on request",
    ],
    specs: [
      { label: "SKU", value: "DTD-BIF-M10" },
      { label: "Style", value: "Utility bifold" },
      { label: "Series folder", value: "门10" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "bifold",
    imageFolder: "门10",
    imageFile: G.m10[0],
    galleryFiles: G.m10,
  },
  {
    slug: "dtd-louv-m11-full-vent",
    sku: "DTD-LOU-M11",
    msgKey: "m11",
    name: "Full Louver — Primed",
    categorySlug: "louvered",
    categoryName: "Louvered Doors",
    priceRange: "$148 – $258",
    rating: 5,
    reviews: 63,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Closet / pantry standard",
    material: "Ventilated stile construction",
    installation: "Slab or bif adapt",
    description:
      "Maximum airflow for mechanical closets and pantries — still reads finished, not utilitarian.",
    highlights: [
      "Keeps HVAC closets breathing",
      "Paint to match interior trim",
      "Often ordered with DTD-BIF-M09 for same job",
    ],
    specs: [
      { label: "SKU", value: "DTD-LOU-M11" },
      { label: "Style", value: "Full louver" },
      { label: "Series folder", value: "门11" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "louvered",
    imageFolder: "门11",
    imageFile: G.m11[0],
    galleryFiles: G.m11,
  },
  {
    slug: "dtd-louv-m12-slim-vent",
    sku: "DTD-LOU-M12",
    msgKey: "m12",
    name: "Slim Louver Closet — Primed",
    categorySlug: "louvered",
    categoryName: "Louvered Doors",
    priceRange: "$142 – $242",
    rating: 5,
    reviews: 41,
    leadTime: "6–8 business days",
    finish: "Primed",
    size: "Standard closet",
    material: "Composite louver",
    installation: "Slab",
    description:
      "Tighter louver spacing for a more refined face — popular on spec home laundry packages.",
    highlights: [
      "Less visual noise than wide-slat louvers",
      "Stacks in freight with bifolds",
      "Local pickup Metro ATL: jesus@doortodoorco.com",
    ],
    specs: [
      { label: "SKU", value: "DTD-LOU-M12" },
      { label: "Style", value: "Slim louver" },
      { label: "Series folder", value: "门12" },
      { label: "Processing", value: "6–8 business days" },
    ],
    visual: "louvered",
    imageFolder: "门12",
    imageFile: G.m12[0],
    galleryFiles: G.m12,
  },
];

export const featuredProducts = products.filter((p) =>
  ["DTD-INT-M01", "DTD-INT-M05", "DTD-EXT-M04"].includes(p.sku),
);

export const processSteps = [
  {
    step: "01",
    title: "You configure online",
    description:
      "Pick style, size, slab vs. RapidHang™ prehung — see processing windows up front (6–8 days standard; 14–20 jamb kits).",
  },
  {
    step: "02",
    title: "We inspect & pack",
    description:
      "Every unit is hand-checked before it leaves our Atlanta warehouse — packaging tuned for freight, not just LTL luck.",
  },
  {
    step: "03",
    title: "Track to site",
    description:
      "Domestic freight tracking from partner carriers; international orders get commercial invoice support on quote.",
  },
];

export const proBenefits = [
  {
    title: "Bulk pricing",
    description: "Professional Partner Program: better line-item pricing on multi-door and repeat POs.",
  },
  {
    title: "Dedicated specs line",
    description: "Ext 1 sales / quotes — real humans for bore, handing, and rough-opening questions.",
  },
  {
    title: "Priority fulfillment",
    description: "Builders & designers: ask about schedule holds when your job date firms up.",
  },
];

export const testimonials = [
  {
    quote:
      "West Coast freight included, still beat every local quote — 5-panel doors look like solid wood.",
    name: "Chris P.",
    role: "Homeowner · CA",
  },
  {
    quote:
      "Only place that had our odd size in stock. They sent photos and drawings before we committed.",
    name: "Renee L.",
    role: "Remodeler · TX",
  },
  {
    quote:
      "Fifty years in trades — glass still had factory plastic for finishing. That attention matters.",
    name: "Mike D.",
    role: "GC · FL",
  },
];

export const blogPosts = [
  {
    title: "Painted vs. stained doors — care that lasts",
    description:
      "Humidity, UV and traffic: how to protect finishes whether you’re coastal US or shipping overseas.",
  },
  {
    title: "Why RapidHang™ changes prehung freight",
    description:
      "Smaller boxes, fewer dented jambs, faster staging on site — what contractors actually feel on day one.",
  },
  {
    title: "International door orders — what to prep",
    description:
      "Dims, HS codes, and crate vs. LCL — a short checklist before you request a quote.",
  },
];

export const faqs = [
  {
    question: "Slab or RapidHang™ prehung?",
    answer:
      "Most interior SKUs ship both ways. RapidHang™ is our compact prehung system — jamb kits typically run 14–20 business days processing.",
  },
  {
    question: "Do you ship outside the US?",
    answer:
      "Yes — we quote international freight case-by-case (commercial invoice, crate, and carrier coordination). Email sales with SKU list and delivery country.",
  },
  {
    question: "What are processing times?",
    answer:
      "Standard orders: 6–8 business days processing. Does not include transit. Times subject to change — confirm on your quote.",
  },
  {
    question: "Professional pricing?",
    answer:
      "Join the Professional Partner Program for volume breaks, dedicated support, and priority scheduling on large jobs.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
