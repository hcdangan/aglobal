"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { contact } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 shadow-sm transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none";

const labelClass = "block text-sm font-semibold text-brand-800";

/**
 * Contact form.
 *
 * Statically exported, so there is no server runtime to post to. Two delivery
 * paths are supported:
 *   1. `NEXT_PUBLIC_CONTACT_ENDPOINT` — any form backend (Formspree, Basin, …)
 *      or a serverless function, called with `fetch` and JSON.
 *   2. No endpoint configured — the browser opens a prefilled mail draft, so the
 *      form still works out of the box on a pure static host.
 *
 * Validation relies on native constraint validation (no duplicated rules, no
 * schema library); `noValidate` stays off so the browser blocks bad submits and
 * reports errors in the user's own language.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formId = useId();
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        // Graceful fallback: hand the enquiry to the user's mail client.
        const body = [
          `Name: ${data.get("name") ?? ""}`,
          `Organization: ${data.get("organization") ?? ""}`,
          `Email: ${data.get("email") ?? ""}`,
          `Phone: ${data.get("phone") ?? ""}`,
          `Enquiry type: ${data.get("enquiryType") ?? ""}`,
          "",
          String(data.get("message") ?? ""),
        ].join("\n");

        const mailto = new URL(`mailto:${siteConfig.contact.email}`);
        mailto.searchParams.set(
          "subject",
          `Website enquiry — ${String(data.get("enquiryType") ?? "General")}`,
        );
        mailto.searchParams.set("body", body);
        window.location.href = mailto.toString();
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className={labelClass} htmlFor={`${formId}-name`}>
          Full name <span className="text-accent-500">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Juan Dela Cruz"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div className="sm:col-span-1">
        <label className={labelClass} htmlFor={`${formId}-organization`}>
          Company / organization
        </label>
        <input
          id={`${formId}-organization`}
          name="organization"
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div className="sm:col-span-1">
        <label className={labelClass} htmlFor={`${formId}-email`}>
          Email <span className="text-accent-500">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div className="sm:col-span-1">
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Contact number
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+63 900 000 0000"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`${formId}-enquiry`}>
          I am reaching out as <span className="text-accent-500">*</span>
        </label>
        <select
          id={`${formId}-enquiry`}
          name="enquiryType"
          required
          defaultValue=""
          className={cn(fieldClass, "field-select mt-2")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {contact.enquiryTypes.map((type) => (
            <option key={type.value} value={type.label}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`${formId}-message`}>
          Message <span className="text-accent-500">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help."
          className={cn(fieldClass, "mt-2 resize-y")}
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
          iconRight={
            status === "submitting" ? undefined : (
              <Icon name="arrow-right" className="size-5" />
            )
          }
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>

        {/* Live region: announced by screen readers without stealing focus. */}
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-4 text-sm font-medium",
            status === "success" && "text-brand-600",
            status === "error" && "text-accent-600",
            (status === "idle" || status === "submitting") && "sr-only",
          )}
        >
          {status === "success"
            ? "Thank you — your message is on its way. We will get back to you shortly."
            : null}
          {status === "error"
            ? `Something went wrong. Please email us directly at ${siteConfig.contact.email}.`
            : null}
        </p>
      </div>
    </form>
  );
}
