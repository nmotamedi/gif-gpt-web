import { FormEvent } from 'react';
import { GIFDataObject, GIFObject } from './types';

async function searchGifs(query: string): Promise<GIFObject> {
  const filteredQuery = query.split(' ').join('+');
  const resp = await fetch(`/api/giphy/search/${filteredQuery}`);
  if (!resp.ok) {
    throw new Error('Error fetching gifs');
  }
  const json = await resp.json();
  return json;
}

export async function onUpload(
  event: FormEvent<HTMLFormElement>,
  setFile: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setGifs: React.Dispatch<React.SetStateAction<GIFDataObject[] | undefined>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    event.preventDefault();
    setIsLoading(true);
    const eventTarget = event.target as HTMLFormElement;
    const formData = new FormData(eventTarget);
    const ops = { method: 'POST', body: formData };
    const resp = await fetch('/api/openAI/upload', ops);
    if (!resp.ok) throw new Error('Upload failed');
    const aiResponse = await resp.json();
    setFile(`/images/${aiResponse.fileName}`);
    const contextResponseArray = aiResponse.aiResponse
      .split('\n')
      .map((keywords) => {
        return keywords.split(': ')[1];
      });
    const responses: GIFDataObject[] = await Promise.all(
      contextResponseArray.map(async (keyword) => {
        const gifObj = await searchGifs(keyword);
        return gifObj.data;
      })
    );
    const flattenedResponses = responses.flat();
    setGifs(flattenedResponses);
    setIsLoading(false);
    eventTarget.reset();
  } catch (err) {
    console.error(err);
    setIsLoading(false);
    setError(true);
  }
}
