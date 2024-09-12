import fs from 'fs';
import OpenAI from 'openai';

type AIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export async function openAIImageMiddleware(
  filepath: string
): Promise<unknown> {
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
            text: `The input will either be a photo or a screenshot of a text conversation. If it is a photo, describe the photo in detail. If it is a screenshot, transcribe this screenshot of a conversation, with messages from others on the left side being tracked by individual users, and messages from the current user on the right side being listed as "me". If any pictures are being sent in the chatlog, please describe the images in detail as they appear in the conversation within the transcription`,
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

  const context = await openAIContext(text.choices[0].message.content);

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
              text: 'You are a highly skilled assistant tasked with analyzing a photo description or a chat conversation and extracting key elements. Your goal is to provide 5 targetted 1-word (can be 2 word if absolutely needed) keywords that best capture any key descriptors, humor, playful banter, or lighthearted context within the recent messages. Consider wordplay, sarcasm, or any light, funny moments that could inspire relevant and entertaining GIFs. Focus on extracting the comedic aspects of the conversation that stand out.',
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
              text: 'Please provide 5 targetted 1-word (can be 2 word if absolutely needed) keywords that represent any key descriptors, potential humor or lightheartedness in the conversation or photo, formatted as follows: 1: [keyword] 2: [keyword] 3: [keyword] 4: [keyword] 5: [keyword]',
            },
          ],
        },
      ],
    });
    return response.choices[0].message.content;
  }
  return await main();
}
