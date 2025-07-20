import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTravelPlan(finalPrompt) {
  const model = ai.getGenerativeModel({
    model: 'gemini-2.5-pro',
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
    ],
  });

  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('❌ Failed to parse Gemini JSON response:', error);
    return null;
  }
}