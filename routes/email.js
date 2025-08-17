import express from 'express';
import { sendSummaryEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let { summary, recipients } = req.body;
    if (!Array.isArray(recipients)) {
      recipients = recipients.split(/[,;\s]+/);
    }
    const subject = 'Your AI-Generated Summary';
    const htmlContent = `<pre>${summary}</pre>`; 
    await sendSummaryEmail(recipients, subject, htmlContent);
    return res.json({ status: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
