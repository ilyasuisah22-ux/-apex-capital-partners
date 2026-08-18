import { Resend } from "resend";
import { company } from "@/lib/constants";

export async function sendInquiryNotification(inquiry: { name: string; email: string; phone: string; country: string; service: string; applicants: number; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.NOTIFICATION_EMAIL ?? company.email;
  if (!apiKey || !from) return { sent: false as const, reason: "Email provider is not configured." };
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to, subject: "New Apex Capital Partners Inquiry", text: [`Name: ${inquiry.name}`, `Email: ${inquiry.email}`, `Phone: ${inquiry.phone}`, `Country: ${inquiry.country}`, `Service: ${inquiry.service}`, `Number of Applicants: ${inquiry.applicants}`, `Message: ${inquiry.message}`, `Date: ${new Date().toISOString()}`].join("\n") });
  if (result.error) throw new Error(result.error.message);
  return { sent: true as const };
}
