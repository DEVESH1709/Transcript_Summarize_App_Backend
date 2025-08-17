import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email with the summary via Resend.
 * @param {string[]} recipients - array of email addresses
 * @param {string} subject - email subject
 * @param {string} htmlContent - HTML content of the email
 */
export async function sendSummaryEmail(recipients, subject, htmlContent) {
  const { data, error } = await resend.emails.send({
    from: '"Transcript App" <onboarding@resend.dev>',  // ✅ use default verified domain
    to: recipients,                                    // ✅ must be ["abc@gmail.com"]
    subject: subject,
    html: htmlContent
  });
  if (error) throw error;
  return data;
}
