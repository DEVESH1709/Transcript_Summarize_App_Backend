import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  transcript: String,
  prompt: String,
  summary: String,
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  createdAt: { type: Date, default: Date.now },
  emailSent: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false }
});

summarySchema.statics.markEmailSent = async function(summaryId) {
  return this.findByIdAndUpdate(summaryId, { emailSent: true }, { new: true });
};

export default mongoose.model('Summary', summarySchema);
