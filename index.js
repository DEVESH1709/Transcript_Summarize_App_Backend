import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import summaryRouter from './routes/summarize.js';
import emailRouter from './routes/email.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json({ limit: '10mb' }));


mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

app.use('/api/summarize', summaryRouter);
app.use('/api/email', emailRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
