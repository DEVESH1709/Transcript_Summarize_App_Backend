import mongoose from 'mongoose';
import { uuidv4} from 'uuid';
const summarySchema = new mongoose.Schema({
  transcript: String,
  prompt: String,
  summary: String,
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  createdAt: { type: Date, default: Date.now },
  emailSent: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  shareId:{
    type:String,
    unique:true,
    default:uuidv4
  },
  comments:[
   { name:String,
    text: String,
    createdAt :{type:Date,default:Date.now}}
  ]
});

summarySchema.statics.markEmailSent = async function(summaryId) {
  return this.findByIdAndUpdate(summaryId, { emailSent: true }, { new: true });
};

export default mongoose.model('Summary', summarySchema);
