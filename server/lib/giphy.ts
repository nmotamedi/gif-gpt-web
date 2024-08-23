import fetch from 'node-fetch';

type GIFObject = {
  data: {
    url: string;
    images: {
      fixed_height: {
        mp4: string;
      };
      original: {
        mp4: string;
      };
    }[];
  }[];
};

export async function searchGif(query: string): Promise<string[] | unknown> {
  const GIPHY_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=5&lang=en`;
  const res = await fetch(GIPHY_ENDPOINT);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const gifObj = (await res.json()) as GIFObject;
  return gifObj;
}
