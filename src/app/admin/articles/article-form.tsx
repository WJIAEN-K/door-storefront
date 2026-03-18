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
  adminTextarea,
} from "../admin-form-classes";
import { deleteArticle, saveArticle } from "../actions";

function Submit({ savingLabel, label }: { savingLabel: string; label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={adminBtnPrimary}>
      {pending ? savingLabel : label}
    </button>
  );
}

export function ArticleForm({
  article,
}: {
  article: {
    id: string;
    slug: string;
    titleEn: string;
    titleZh: string;
    bodyMarkdown: string;
    coverImageUrl: string;
    published: boolean;
    publishedAt: Date | null;
    showInCarousel: boolean;
    carouselSort: number;
  } | null;
}) {
  const t = useTranslations("Admin.articleForm");
  const isNew = !article;
  const publishedAtLocal = article?.publishedAt
    ? new Date(article.publishedAt.getTime() - article.publishedAt.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
    : "";

  return (
    <div className="max-w-3xl">
      <form
        action={async (fd) => {
          await saveArticle(fd);
          window.location.href = "/admin/articles";
        }}
        className="space-y-8"
      >
        {!isNew ? <input type="hidden" name="id" value={article.id} /> : null}
        {!isNew ? <input type="hidden" name="slug" value={article.slug} /> : null}

        <fieldset className={adminFieldset}>
          <legend className={adminLegend}>{t("basics")}</legend>
          <div className="space-y-5">
            <div>
              <label htmlFor="slug" className={adminLabel}>
                {t("slug")}
              </label>
              {isNew ? (
                <input
                  id="slug"
                  name="slug"
                  required
                  className={`${adminInput} font-mono`}
                  placeholder={t("slugPlaceholder")}
                />
              ) : (
                <p className="mt-2 rounded-2xl border border-black/5 bg-stone-50/90 px-4 py-3 font-mono text-sm text-stone-700">
                  {article.slug}
                </p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="titleEn" className={adminLabel}>
                  {t("titleEn")}
                </label>
                <input
                  id="titleEn"
                  name="titleEn"
                  required
                  defaultValue={article?.titleEn ?? ""}
                  className={adminInput}
                />
              </div>
              <div>
                <label htmlFor="titleZh" className={adminLabel}>
                  {t("titleZh")}
                </label>
                <input
                  id="titleZh"
                  name="titleZh"
                  required
                  defaultValue={article?.titleZh ?? ""}
                  className={adminInput}
                />
              </div>
            </div>
            <div>
              <label htmlFor="coverImageUrl" className={adminLabel}>
                {t("coverUrl")}
              </label>
              <input
                id="coverImageUrl"
                name="coverImageUrl"
                defaultValue={article?.coverImageUrl ?? ""}
                className={`${adminInput} font-mono text-xs sm:text-sm`}
                placeholder={t("coverPlaceholder")}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={adminFieldset}>
          <legend className={adminLegend}>{t("content")}</legend>
          <div>
            <label htmlFor="bodyMarkdown" className={adminLabel}>
              {t("bodyMd")}
            </label>
            <textarea
              id="bodyMarkdown"
              name="bodyMarkdown"
              rows={16}
              defaultValue={article?.bodyMarkdown ?? ""}
              className={adminTextarea}
            />
          </div>
        </fieldset>

        <fieldset className={adminFieldset}>
          <legend className={adminLegend}>{t("publish")}</legend>
          <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-white/60 px-4 py-3 text-sm font-medium text-stone-800 transition hover:border-[#9a6a43]/20">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={article?.published ?? false}
                  className={adminCheckbox}
                />
                {t("published")}
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-white/60 px-4 py-3 text-sm font-medium text-stone-800 transition hover:border-[#9a6a43]/20">
                <input
                  type="checkbox"
                  name="showInCarousel"
                  defaultChecked={article?.showInCarousel ?? false}
                  className={adminCheckbox}
                />
                {t("showCarousel")}
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="carouselSort" className={adminLabel}>
                  {t("carouselOrder")}
                </label>
                <input
                  id="carouselSort"
                  name="carouselSort"
                  type="number"
                  defaultValue={article?.carouselSort ?? 0}
                  className={adminInput}
                />
              </div>
              <div>
                <label htmlFor="publishedAt" className={adminLabel}>
                  {t("publishedAt")}
                </label>
                <input
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  defaultValue={publishedAtLocal}
                  className={adminInput}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <Submit
            savingLabel={t("saving")}
            label={isNew ? t("create") : t("save")}
          />
        </div>
      </form>

      {!isNew ? (
        <div className="mt-10 rounded-[1.75rem] border border-red-200/80 bg-red-50/50 p-6">
          <p className="text-sm font-semibold text-red-900">{t("danger")}</p>
          <p className="mt-1 text-sm text-red-800/90">{t("dangerDesc")}</p>
          <button
            type="button"
            className="mt-4 min-h-10 cursor-pointer rounded-full border border-red-300 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            onClick={async () => {
              if (!confirm(t("deleteConfirm"))) return;
              await deleteArticle(article.id);
              window.location.href = "/admin/articles";
            }}
          >
            {t("delete")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
