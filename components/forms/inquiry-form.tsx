"use client";

import { FormEvent, useState } from "react";
import { company, services, whatsappUrl } from "@/lib/constants";

type Errors = Partial<Record<"name" | "email" | "phone" | "country" | "service" | "applicants" | "message", string>>;

export function InquiryForm() {
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
    const service = String(data.get("service") ?? "");
    const applicants = String(data.get("applicants") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
    if (country.length < 2) next.country = "Enter your country of residence.";
    if (!service) next.service = "Select a service.";
    if (!applicants || Number(applicants) < 1) next.applicants = "Enter at least one applicant.";
    if (message.length < 20) next.message = "Please share at least 20 characters so we can understand your inquiry.";
    setErrors(next);
    if (Object.keys(next).length) { setStatus("idle"); return; }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    form.reset();
  }

  const fieldError = (name: keyof Errors) => errors[name] ? <span id={`${name}-error`} className="field-error">{errors[name]}</span> : null;

  if (status === "success") return <div className="form-state" role="status"><p className="eyebrow text-brass">Validated locally</p><h2>Your details are ready.</h2><p>This Phase 1 website has not delivered or stored your inquiry. For immediate contact, continue with WhatsApp or email Apex Capital Partners directly.</p><div className="button-row"><a className="button brass" href={whatsappUrl()} target="_blank" rel="noreferrer">Continue on WhatsApp</a><a className="text-link text-ivory" href={`mailto:${company.email}`}>Send an email</a></div><button className="reset-button" onClick={() => setStatus("idle")}>Start another inquiry</button></div>;

  return <form className="inquiry-form" onSubmit={submit} noValidate><div className="form-heading"><p className="eyebrow text-brass">Inquiry details</p><h2>What would you like to explore?</h2><p>Required fields are marked with an asterisk.</p></div><div className="form-grid"><label>Full Name *<input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{fieldError("name")}</label><label>Email *<input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{fieldError("email")}</label><label>Phone Number *<input name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{fieldError("phone")}</label><label>Country of Residence *<input name="country" autoComplete="country-name" aria-invalid={!!errors.country} aria-describedby={errors.country ? "country-error" : undefined} />{fieldError("country")}</label><label>Service Interested In *<select name="service" defaultValue="" aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug}>{service.title}</option>)}<option>Other</option></select>{fieldError("service")}</label><label>Number of Applicants *<input name="applicants" type="number" min="1" inputMode="numeric" aria-invalid={!!errors.applicants} aria-describedby={errors.applicants ? "applicants-error" : undefined} />{fieldError("applicants")}</label><label className="full-field">Message *<textarea name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{fieldError("message")}</label></div>{status === "error" && <div className="submit-error" role="alert"><strong>Preview: local validation interruption</strong><p>This demonstration did not submit, send, or store anything. Review the form or reset this preview to continue.</p><button type="button" onClick={() => setStatus("idle")}>Reset error preview</button></div>}<div className="form-actions"><button className="button brass" type="submit" disabled={status === "loading"}>{status === "loading" ? "Validating details..." : "Validate inquiry"}</button><button className="demo-error" type="button" onClick={() => setStatus("error")}><span>Test state</span> Preview non-submitting error</button></div><p className="form-note">This form validates locally only. It does not send or store personal information in Phase 1.</p></form>;
}
