import './App.css';

export default function App() {
  async function onClick(): Promise<void> {
    try {
      console.log('Client trying');
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

  return (
    <>
      <button onClick={onClick}>Search Gifs</button>
    </>
  );
}
