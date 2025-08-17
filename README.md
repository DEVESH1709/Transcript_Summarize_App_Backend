# Transcript Summarize App Backend

## Overview
This backend powers an AI-driven meeting notes summarizer and sharer. It receives transcript files and custom prompts, generates structured summaries using Groq's LLM API, and enables users to share edited summaries via email.

## Approach & Process
1. **Transcript Upload:**
   - The frontend sends transcript text to the backend via a POST request.
   - Large transcripts are checked for size limits before processing to avoid API errors.

2. **Custom Prompt:**
   - Users provide a prompt (e.g., "Summarize in bullet points for executives").
   - The backend combines the transcript and prompt for the AI model.

3. **AI Summarization:**
   - The backend uses Groq's LLM API (`llama-3.3-70b-versatile`) to generate summaries.
   - If the transcript is too large, the backend returns a clear error message.

4. **Editable Summary:**
   - The summary is sent to the frontend, where users can edit it before sharing.

5. **Email Sharing:**
   - The backend uses Resend API to send the edited summary to recipient email addresses.
   - Only verified domains are used for sending emails.

## Tech Stack
- **Node.js & Express:** REST API server, routing, and middleware.
- **Groq SDK:** Connects to Groq's LLM for AI-powered summarization.
- **Resend SDK:** Handles transactional email delivery.
- **Mongoose:** (If used) For MongoDB data modeling and storage.
- **dotenv:** Manages environment variables securely.
- **CORS & Multer:** Handles cross-origin requests and file uploads.

## Key Features
- Transcript size validation to prevent API errors.
- Customizable summarization via user prompts.
- Editable summaries before sharing.
- Secure email sending with domain verification.

## How to Run Locally
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with:
   - `GROQ_API_KEY`
   - `RESEND_API_KEY`
   - `MONGO_URI` (if using MongoDB)
4. Start the server:
   ```
   npm run dev
   ```

## Deployment
- Deploy to Render, Railway, or similar Node.js hosting.
- Set environment variables in the hosting dashboard.
- Ensure your frontend points to the deployed backend API URL.

## Notes
- For large transcripts, split into smaller chunks before summarizing.
- Do not commit sensitive files like `.env` to version control.

---
For questions or improvements, open an issue or contact the maintainer.
