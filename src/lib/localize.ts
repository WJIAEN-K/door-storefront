import { productsZh } from "@/content/products-zh";
import type { Category, Product } from "@/lib/site-data";

export type LocalizedProduct = Pick<
  Product,
  | "slug"
  | "sku"
  | "msgKey"
  | "categorySlug"
  | "priceRange"
  | "rating"
  | "reviews"
  | "visual"
  | "imageFolder"
  | "imageFile"
  | "galleryFiles"
> & {
  name: string;
  description: string;
  highlights: string[];
  leadTime: string;
  finish: string;
  size: string;
  material: string;
  installation: string;
  categoryName: string;
  specs: Array<{ label: string; value: string }>;
};

export function localizeProduct(product: Product, locale: string): LocalizedProduct {
  const zh = locale === "zh" ? productsZh[product.msgKey] : undefined;
  const base = {
    slug: product.slug,
    sku: product.sku,
    msgKey: product.msgKey,
    categorySlug: product.categorySlug,
    priceRange: product.priceRange,
    rating: product.rating,
    reviews: product.reviews,
    visual: product.visual,
    imageFolder: product.imageFolder,
    imageFile: product.imageFile,
    galleryFiles: product.galleryFiles,
  };
  if (!zh) {
    return {
      ...base,
      name: product.name,
      description: product.description,
      highlights: product.highlights,
      leadTime: product.leadTime,
      finish: product.finish,
      size: product.size,
      material: product.material,
      installation: product.installation,
      categoryName: product.categoryName,
      specs: product.specs,
    };
  }
  return {
    ...base,
    name: zh.name,
    description: zh.description,
    highlights: zh.highlights,
    leadTime: zh.leadTime,
    finish: zh.finish,
    size: zh.size,
    material: zh.material,
    installation: zh.installation,
    categoryName: zh.categoryName,
    specs: zh.specs,
  };
}

export type LocalizedCategory = Category & {
  displayName: string;
  displayTag: string;
  displayDescription: string;
  displayLeadTime: string;
  displayCount: string;
};

type CategoryZh = {
  name: string;
  tag: string;
  description: string;
  leadTime: string;
  count: string;
};

const categoriesZh: Record<string, CategoryZh> = {
  interior: {
    name: "室内门",
    tag: "Shaker、面板与玻璃 — 单板或 RapidHang™ 预挂",
    description:
      "与亚特兰大展厅同级室内门线：底漆、可涂刷，非常规尺寸可询价。",
    leadTime: "处理周期 6–8 个工作日",
    count: "6 个在售 SKU",
  },
  exterior: {
    name: "室外门（入户）",
    tag: "外立面气场 + 耐候入户系统",
    description: "面向翻新与新建项目的入户 SKU；预挂可选配 RapidHang™ 门框套件。",
    leadTime: "处理周期 7–10 个工作日",
    count: "2 个在售 SKU",
  },
  bifold: {
    name: "折叠门",
    tag: "衣帽间、食品柜与窄净深位置",
    description: "折叠套装运输紧凑，现场一人即可搬运 staging。",
    leadTime: "处理周期 6–8 个工作日",
    count: "2 个在售 SKU",
  },
  louvered: {
    name: "百叶门",
    tag: "要通风也要完成面",
    description: "洗衣、储物与设备区百叶造型 — 透气不廉价。",
    leadTime: "处理周期 6–8 个工作日",
    count: "2 个在售 SKU",
  },
};

export function localizeCategory(category: Category, locale: string): LocalizedCategory {
  const zh = locale === "zh" ? categoriesZh[category.slug] : undefined;
  if (!zh) {
    return {
      ...category,
      displayName: category.name,
      displayTag: category.tag,
      displayDescription: category.description,
      displayLeadTime: category.leadTime,
      displayCount: category.count,
    };
  }
  return {
    ...category,
    displayName: zh.name,
    displayTag: zh.tag,
    displayDescription: zh.description,
    displayLeadTime: zh.leadTime,
    displayCount: zh.count,
  };
}
