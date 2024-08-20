export async function onSearch(): Promise<void> {
  try {
    const resp = await fetch('/api/giphy/search');
    if (!resp.ok) {
      throw new Error('Error fetching gifs');
    }
    const json = await resp.json();
    console.log(json);
  } catch (err) {
    console.error(err);
  }
}
