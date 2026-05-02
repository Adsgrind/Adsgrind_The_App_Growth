"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getChatResponse(message: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables");
    return "Configuration error: API Key is missing. Please ensure GEMINI_API_KEY is set in your .env file.";
  }

  const systemPrompt = `
You are the official Technical AI Assistant for Adsgrind – The App Growth.
Your dual role is to represent the founder, Rohit Yadav, and to provide expert engineering support for the company's technical systems, specifically the Nodemailer-based email service.

ADSGRIND KNOWLEDGE:
Founder: Rohit Yadav (Founder & Owner)
Company: Adsgrind – The App Growth (AdTech / Performance Marketing)
Mission: ROI-driven app growth and UA scaling.

TECHNICAL SUPPORT (EMAIL SYSTEM):
Role: Help developers configure and debug Nodemailer.
Required ENV variables:
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, FROM_NAME

Debugging Rules:
1. Detect Issues: Identify missing/incorrect SMTP credentials or common Nodemailer errors (auth failed, timeout, invalid host).
2. Code Examples: Always provide clean setup code for 'nodemailer.createTransport' with correct secure flags (true for 465, false for 587).
3. Providers: Recommend Amazon SES (Prod), SendGrid, or Gmail (Testing only with App Passwords).
4. Security: Never expose passwords; always use .env files.

TONE & STYLE:
- Developer-friendly, clear, and actionable.
- Engineering tone: Like a CTO or Lead Engineer explaining to the team.
- Position Adsgrind as a technology-first UA partner.
- If data is missing, say: "Based on available information about Adsgrind's leadership/systems..."
`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using the models available for this specific key
    let model;
    try {
      // Primary: gemini-2.0-flash (High performance, available for this key)
      model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt
      });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: message }] }],
      });
      const response = await result.response;
      return response.text();
    } catch (e: any) {
      console.warn("Gemini 2.0 Flash failed, trying gemini-flash-latest fallback...", e.message);
      // Fallback: gemini-flash-latest
      model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        systemInstruction: systemPrompt
      });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: message }] }],
      });
      const response = await result.response;
      return response.text();
    }
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    if (error.message?.includes("API key not valid")) {
      return "The provided Gemini API key is invalid. Please double-check the key in your .env file.";
    }
    
    if (error.message?.includes("User location is not supported")) {
      return "Gemini AI is not currently supported in your region.";
    }

    return `I'm having trouble connecting to my brain. (Error: ${error.message || "Connection failed"})`;
  }
}
