"use client";

import { FormEvent, useState } from "react";
import { company, marriottOpportunity, whatsappUrl } from "@/lib/constants";

type Errors = Partial<Record<"name" | "email" | "phone" | "country" | "familySize" | "interest" | "message", string>>;

export function MarriottOpportunityForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const familySize = String(data.get("familySize") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid WhatsApp number.";
    if (country.length < 2) next.country = "Enter your country of residence.";
    if (!familySize) next.familySize = "Select a family size.";
    if (!interest) next.interest = "Select an investment interest.";
    if (message.length < 20) next.message = "Please share at least 20 characters so we can understand your inquiry.";
    setErrors(next);
    if (Object.keys(next).length) { setStatus("idle"); return; }
    setStatus("loading");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, country, service: interest, applicants: familySize.replace(/\D/g, "") || "1", message, category: "Marriott Opportunity", website: "" }) });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch { setStatus("error"); }
  }

  const fieldError = (name: keyof Errors) => errors[name] ? <span id={`${name}-error`} className="field-error">{errors[name]}</span> : null;

  if (status === "success") return <div className="marriott-form-state" role="status"><p className="eyebrow text-brass">Inquiry received</p><h2>Thank you for your interest.</h2><p>Your request for a private consultation has been recorded securely. Apex Capital Partners will review it and follow up using the details you provided.</p><div className="button-row"><a className="button brass" href={whatsappUrl(undefined, marriottOpportunity.hero.whatsappMessage)} target="_blank" rel="noreferrer">Continue on WhatsApp</a><a className="text-link text-ink" href={`mailto:${company.email}`}>Send an email</a></div><button type="button" className="reset-button" onClick={() => setStatus("idle")}>Start another inquiry</button></div>;

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-heading"><p className="eyebrow text-brass">Private consultation</p><h2>Request a private consultation</h2><p>Required fields are marked with an asterisk.</p></div>
      <div className="form-grid">
        <label>Full Name *
          <input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {fieldError("name")}
        </label>
        <label>Country of Residence *
          <input name="country" autoComplete="country-name" aria-invalid={!!errors.country} aria-describedby={errors.country ? "country-error" : undefined} />
          {fieldError("country")}
        </label>
        <label>Email Address *
          <input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {fieldError("email")}
        </label>
        <label>WhatsApp Number *
          <input name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {fieldError("phone")}
        </label>
        <label>Family Size *
          <select name="familySize" defaultValue="" aria-invalid={!!errors.familySize} aria-describedby={errors.familySize ? "familySize-error" : undefined}>
            <option value="" disabled>Select family size</option>
            {marriottOpportunity.familySizeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {fieldError("familySize")}
        </label>
        <label>Investment Interest *
          <select name="interest" defaultValue="" aria-invalid={!!errors.interest} aria-describedby={errors.interest ? "interest-error" : undefined}>
            <option value="" disabled>Select investment interest</option>
            {marriottOpportunity.investmentInterestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {fieldError("interest")}
        </label>
        <label className="full-field">Message *
          <textarea name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {fieldError("message")}
        </label>
      </div>
      {status === "error" && <div className="submit-error" role="alert"><strong>We could not send your inquiry.</strong><p>Please check your connection and try again, or contact Apex Capital Partners directly on WhatsApp.</p><button type="button" className="reset-button" onClick={() => setStatus("idle")}>Try again</button></div>}
      <div className="form-actions"><button type="submit" className="button brass" disabled={status === "loading"}>{status === "loading" ? "Submitting..." : "Request Private Consultation"}</button><span className="form-note">Your inquiry is recorded securely and kept confidential.</span></div>
    </form>
  );
}