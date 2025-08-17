import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  transcript: String,
  prompt: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Summary', summarySchema);
