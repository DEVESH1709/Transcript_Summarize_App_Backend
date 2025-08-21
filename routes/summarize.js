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

router.get("/", authmiddleware, async(req,res)=>{
  try{
    const summarize = await Summary.find({userId:req.user.id}).sort({createdAt:-1});
    res.json(summarize);

  }catch(err){
    res.status(500).json({error:"Failed to fetch summaries"});
  }
});

// Pin/unpin a summary
router.post('/pin/:id', authmiddleware, async (req, res) => {
  try {
    const { pin } = req.body;
    const summary = await Summary.findOne({ _id: req.params.id, userId: req.user.id });
    if (!summary) return res.status(404).json({ error: 'Summary not found' });
    summary.pinned = !!pin;
    await summary.save();
    res.json({ pinned: summary.pinned });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pin status' });
  }
});

export default router;
