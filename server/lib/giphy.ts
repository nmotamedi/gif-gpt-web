import fetch from 'node-fetch';

type GIFObject = {
  data: {
    url: string;
  }[];
};

const GIPHY_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=search&limit=25&lang=en`;

export async function searchGif(): Promise<string[] | unknown> {
  const res = await fetch(GIPHY_ENDPOINT);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const gifObj = (await res.json()) as GIFObject;
  return gifObj.data.map((gif) => gif.url);
}
