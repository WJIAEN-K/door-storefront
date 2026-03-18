"use client";

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import {
  adminBtnPrimary,
  adminCheckbox,
  adminFieldset,
  adminInput,
  adminLabel,
  adminLegend,
  adminSelect,
  adminTextarea,
} from "../admin-form-classes";
import { saveProduct } from "../actions";

const visuals = ["shaker", "glass", "entry", "panel", "bifold", "louvered"] as const;

function ProductSubmit({ saving, label }: { saving: string; label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={adminBtnPrimary}>
      {pending ? saving : label}
    </button>
  );
}

export function ProductForm({
  product,
}: {
  product: {
    id: string;
    slug: string;
    sku: string;
    msgKey: string;
    name: string;
    nameZh: string | null;
    categorySlug: string;
    categoryName: string;
    categoryNameZh: string | null;
    priceRange: string;
    rating: number;
    reviews: number;
    leadTime: string;
    leadTimeZh: string | null;
    finish: string;
    finishZh: string | null;
    size: string;
    sizeZh: string | null;
    material: string;
    materialZh: string | null;
    installation: string;
    installationZh: string | null;
    description: string;
    descriptionZh: string | null;
    highlights: string;
    highlightsZh: string | null;
    specs: string;
    specsZh: string | null;
    visual: string;
    imageFolder: string;
    imageFile: string;
    galleryFiles: string;
    featured: boolean;
  };
}) {
  const t = useTranslations("Admin.productForm");

  return (
    <form
      action={async (fd) => {
        await saveProduct(fd);
        window.location.href = "/admin/skus";
      }}
      className="max-w-4xl space-y-8 pb-12"
    >
      <input type="hidden" name="id" value={product.id} />

      <fieldset className={adminFieldset}>
        <legend className={adminLegend}>{t("identity")}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={adminLabel}>{t("slug")}</label>
            <input
              name="slug"
              required
              defaultValue={product.slug}
              className={`${adminInput} font-mono text-xs`}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("sku")}</label>
            <input
              name="sku"
              required
              defaultValue={product.sku}
              className={`${adminInput} font-mono text-xs`}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("msgKey")}</label>
            <input name="msgKey" required defaultValue={product.msgKey} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("visual")}</label>
            <select name="visual" defaultValue={product.visual} className={adminSelect}>
              {visuals.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="mt-2 flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-white/50 px-4 py-3 text-sm font-medium text-stone-800">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product.featured}
            className={adminCheckbox}
          />
          {t("featuredHome")}
        </label>
      </fieldset>

      <fieldset className={adminFieldset}>
        <legend className={adminLegend}>{t("copy")}</legend>
        <div className="space-y-5">
          <div>
            <label className={adminLabel}>{t("nameEn")}</label>
            <input name="name" required defaultValue={product.name} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("nameZh")}</label>
            <input
              name="nameZh"
              defaultValue={product.nameZh ?? ""}
              className={adminInput}
              placeholder={t("nameZhPh")}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("descEn")}</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={product.description}
              className={adminTextarea}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("descZh")}</label>
            <textarea
              name="descriptionZh"
              rows={3}
              defaultValue={product.descriptionZh ?? ""}
              className={adminTextarea}
            />
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={adminLabel}>{t("catSlug")}</label>
            <input name="categorySlug" required defaultValue={product.categorySlug} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("catNameEn")}</label>
            <input name="categoryName" required defaultValue={product.categoryName} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("catNameZh")}</label>
            <input name="categoryNameZh" defaultValue={product.categoryNameZh ?? ""} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("priceRange")}</label>
            <input name="priceRange" required defaultValue={product.priceRange} className={adminInput} />
          </div>
          <div>
            <label className={adminLabel}>{t("rating")}</label>
            <input
              name="rating"
              type="number"
              min={0}
              max={5}
              defaultValue={product.rating}
              className={adminInput}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("reviews")}</label>
            <input
              name="reviews"
              type="number"
              min={0}
              defaultValue={product.reviews}
              className={adminInput}
            />
          </div>
        </div>
        {(
          [
            ["leadTime", "leadTimeZh", "leadTimeEn", "leadTimeZh"],
            ["finish", "finishZh", "finishEn", "finishZh"],
            ["size", "sizeZh", "sizeEn", "sizeZh"],
            ["material", "materialZh", "materialEn", "materialZh"],
            ["installation", "installationZh", "installEn", "installZh"],
          ] as const
        ).map(([en, zh, labelEnKey, labelZhKey]) => (
          <div key={en} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={adminLabel}>{t(labelEnKey)}</label>
              <input
                name={en}
                defaultValue={product[en as keyof typeof product] as string}
                className={adminInput}
              />
            </div>
            <div>
              <label className={adminLabel}>{t(labelZhKey)}</label>
              <input
                name={zh}
                defaultValue={(product[zh as keyof typeof product] as string | null) ?? ""}
                className={adminInput}
              />
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className={adminFieldset}>
        <legend className={adminLegend}>{t("jsonArrays")}</legend>
        <div className="space-y-5">
          <div>
            <label className={adminLabel}>{t("highlights")}</label>
            <textarea name="highlights" required rows={5} defaultValue={product.highlights} className={adminTextarea} />
          </div>
          <div>
            <label className={adminLabel}>{t("highlightsZh")}</label>
            <textarea name="highlightsZh" rows={4} defaultValue={product.highlightsZh ?? ""} className={adminTextarea} />
          </div>
          <div>
            <label className={adminLabel}>{t("specs")}</label>
            <textarea name="specs" required rows={6} defaultValue={product.specs} className={adminTextarea} />
          </div>
          <div>
            <label className={adminLabel}>{t("specsZh")}</label>
            <textarea name="specsZh" rows={5} defaultValue={product.specsZh ?? ""} className={adminTextarea} />
          </div>
          <div>
            <label className={adminLabel}>{t("gallery")}</label>
            <textarea
              name="galleryFiles"
              required
              rows={4}
              defaultValue={product.galleryFiles}
              className={adminTextarea}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={adminFieldset}>
        <legend className={adminLegend}>{t("images")}</legend>
        <div className="space-y-5">
          <div>
            <label className={adminLabel}>{t("imageFolder")}</label>
            <input
              name="imageFolder"
              required
              defaultValue={product.imageFolder}
              className={`${adminInput} font-mono text-xs`}
            />
          </div>
          <div>
            <label className={adminLabel}>{t("imageFile")}</label>
            <input
              name="imageFile"
              required
              defaultValue={product.imageFile}
              className={`${adminInput} font-mono text-xs`}
            />
          </div>
        </div>
      </fieldset>

      <ProductSubmit saving={t("saving")} label={t("saveSku")} />
    </form>
  );
}
