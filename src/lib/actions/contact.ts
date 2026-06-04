"use server";

export interface ContactFormInput {
  name: string;
  company: string;
  message: string;
  budget?: string | undefined;
  timeline?: string | undefined;
}

export async function submitContactForm(
  data: ContactFormInput,
): Promise<{ ok: boolean; error?: string }> {
  if (!data.name || !data.company || !data.message) {
    return { ok: false, error: "Missing required fields" };
  }

  // Resend integration: set RESEND_API_KEY and wire send() here.
  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      error: "Contact form is not configured. Set RESEND_API_KEY.",
    };
  }

  return { ok: true };
}
