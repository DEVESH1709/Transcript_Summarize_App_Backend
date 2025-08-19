import express from 'express';
import Summary from '../models/Summary.js';
import { generateSummary } from '../services/groqService.js';
import { authmiddleware } from '../middleware/auth.js';


const router = express.Router();

router.post('/', authmiddleware,async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    const summary = await generateSummary(transcript, prompt);
    const doc = new Summary({ transcript, prompt, summary,userId:req.user.id }); 
    await doc.save();
    return res.json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
});

export default router;
