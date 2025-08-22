import nodemailer from 'nodemailer';

// Configure transporter (use your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'outlook', 'yahoo', or use 'host', 'port', 'auth' for custom
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

/**
 * Send an email with the summary via Nodemailer.
 * @param {string[]} recipients - array of email addresses
 * @param {string} subject - email subject
 * @param {string} htmlContent - HTML content of the email
 */
export async function sendSummaryEmail(recipients, subject, htmlContent) {
  const mailOptions = {
    from: `"Transcript App" <${process.env.EMAIL_USER}>`,
    to: recipients.join(','),
    subject,
    html: htmlContent
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
}
