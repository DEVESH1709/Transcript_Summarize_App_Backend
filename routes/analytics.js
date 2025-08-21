import express from 'express';
import Summary from '../models/Summary.js';
import { authmiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/analytics - per user stats
router.get('/', authmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // Total summaries generated
    const totalSummaries = await Summary.countDocuments({ userId });
    // Most common prompt types (top 5)
    const promptAgg = await Summary.aggregate([
      { $match: { userId: { $eq: userId } } },
      { $group: { _id: '$prompt', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    // Email send counts (count summaries with email sent)
    // If you store email sent status, e.g., emailSent: true
    const emailSendCount = await Summary.countDocuments({ userId, emailSent: true });

    res.json({
      totalSummaries,
      topPrompts: promptAgg,
      emailSendCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
