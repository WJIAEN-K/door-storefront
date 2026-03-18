"use client";

import { useRef, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export type ContactFormLabels = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  quantity: string;
  details: string;
  detailsPh: string;
  submit: string;
  hint: string;
  namePh: string;
  emailPh: string;
  companyPh: string;
  projectPh: string;
  qtyPh: string;
};

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const quantity = String(formData.get("quantity") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `${projectType || "Door inquiry"}${company ? ` - ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      `${labels.name}: ${name}\n${labels.email}: ${email}\n${labels.company}: ${company}\n${labels.projectType}: ${projectType}\n${labels.quantity}: ${quantity}\n\n${labels.details}:\n${message}`,
    );

    window.location.href = `mailto:info@doortodoorco.com?subject=${subject}&body=${body}`;
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.name} name="name" placeholder={labels.namePh} required />
        <Field
          label={labels.email}
          name="email"
          placeholder={labels.emailPh}
          required
          type="email"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.company} name="company" placeholder={labels.companyPh} />
        <Field
          label={labels.projectType}
          name="projectType"
          placeholder={labels.projectPh}
        />
      </div>
      <Field label={labels.quantity} name="quantity" placeholder={labels.qtyPh} />
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-stone-700">
          {labels.details}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={labels.detailsPh}
          className="w-full rounded-3xl border border-black/10 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a6a43] focus:ring-2 focus:ring-[#9a6a43]/15"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a6a43]"
      >
        {labels.submit}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-xs leading-5 text-stone-500">{labels.hint}</p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-3xl border border-black/10 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a6a43] focus:ring-2 focus:ring-[#9a6a43]/15"
      />
    </div>
  );
}
