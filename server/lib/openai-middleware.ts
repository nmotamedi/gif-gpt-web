import fs from 'fs';
import OpenAI from 'openai';

type AIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export async function openAIMiddleware(filepath: string): Promise<unknown> {
  function encodeImage(imagePath: string): string {
    const image = fs.readFileSync(imagePath);
    return Buffer.from(image).toString('base64');
  }

  const imagePath = filepath;

  const base64Image = encodeImage(imagePath);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Transcribe this screenshot of a conversation, with messages from others on the left side being tracked by individual users, and messages from the current user on the right side being listed as "me". If any pictures are being sent in the chatlog, please describe the images in detail as they appear in the conversation within the transcription`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  const text: AIResponse = await resp.json();

  const context = openAIContext(text.choices[0].message.content);

  return context;
}

async function openAIContext(message: string): Promise<unknown> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async function main(): Promise<unknown> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: 'You are a highly skilled assistant tasked with analyzing a chat conversation and extracting key comedic elements. Your goal is to provide 5 keywords that best capture any humor, playful banter, or lighthearted context within the recent messages. Consider wordplay, sarcasm, or any light, funny moments that could inspire relevant and entertaining GIFs. Focus on extracting the comedic aspects of the conversation that stand out.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `${message}`,
            },
            {
              type: 'text',
              text: 'Please provide 5 keywords that represent any potential humor or lightheartedness in the conversation.',
            },
          ],
        },
      ],
    });
    return response.choices[0];
  }
  return await main();
}
