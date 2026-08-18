import { Resend } from "resend";
import { company } from "@/lib/constants";
import { getServerEnv } from "@/lib/config";

export async function sendInquiryNotification(inquiry: { name: string; email: string; phone: string; country: string; service: string; applicants: number; message: string }) {
  const env = getServerEnv();
  if (!env?.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return { sent: false as const, reason: "Email provider is not configured." };
  const resend = new Resend(env.RESEND_API_KEY);
  const result = await resend.emails.send({ from: env.RESEND_FROM_EMAIL, to: company.email, subject: "New Apex Capital Partners Inquiry", text: [`Name: ${inquiry.name}`, `Email: ${inquiry.email}`, `Phone: ${inquiry.phone}`, `Country: ${inquiry.country}`, `Service: ${inquiry.service}`, `Number of Applicants: ${inquiry.applicants}`, `Message: ${inquiry.message}`, `Date: ${new Date().toISOString()}`].join("\n") });
  if (result.error) throw new Error(result.error.message);
  return { sent: true as const };
}
