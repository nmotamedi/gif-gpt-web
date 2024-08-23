import { GIFObject } from './Components/Content';

export async function searchGifs(query: string): Promise<GIFObject> {
  const filteredQuery = query.split(' ').join('+');
  const resp = await fetch(`/api/giphy/search/${filteredQuery}`);
  if (!resp.ok) {
    throw new Error('Error fetching gifs');
  }
  const json = await resp.json();
  return json;
}
