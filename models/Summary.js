import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  transcript: String,
  prompt: String,
  summary: String,
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Summary', summarySchema);
