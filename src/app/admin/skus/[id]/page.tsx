import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminLocale } from "@/lib/admin-locale";
import { prisma } from "@/lib/prisma";
import adminEn from "@/messages/admin-ui-en.json";
import adminZh from "@/messages/admin-ui-zh.json";

import { AdminShell } from "../../admin-shell";
import { adminBackLink } from "../../admin-form-classes";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditSkuPage({ params }: Props) {
  const locale = await getAdminLocale();
  const b = (locale === "zh" ? adminZh : adminEn).Admin.skusEdit;

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const p = {
    ...product,
    highlights: product.highlights,
    specs: product.specs,
    galleryFiles: product.galleryFiles,
  };

  return (
    <AdminShell>
      <Link href="/admin/skus" className={adminBackLink}>
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {b.back}
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-stone-950">
        {product.sku}
      </h1>
      <p className="mt-2 line-clamp-2 text-sm text-stone-600">{product.name}</p>
      <div className="mt-10">
        <ProductForm product={p} />
      </div>
    </AdminShell>
  );
}
