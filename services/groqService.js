// backend/services/groqService.js
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Generate a summary from transcript and prompt using Groq.
 */
export async function generateSummary(transcript, prompt) {
  const MAX_CHARS = 400000;
  if (transcript.length > MAX_CHARS) {
    throw new Error('Transcript is too large to summarize. Please upload a smaller file or split it into parts.');
  }
  const messages = [
    { role: 'system', content: 'You are a helpful assistant for summarizing transcripts.' },
    { role: 'user', content: `Transcript:\n${transcript}\n\nInstruction: ${prompt}` }
  ];
  const params = {
    messages,
    model: 'llama-3.3-70b-versatile' 
  };
  const response = await client.chat.completions.create(params);
  return response.choices[0].message.content;
}
