import { FormEvent, useState } from 'react';
import '../index.css';
import { searchGifs } from '../data';
import { GifDisplay } from './GifDisplay';

export type GIFDataObject = {
  url: string;
  images: {
    fixed_height: {
      mp4: string;
    };
    original: {
      mp4: string;
    };
  };
};

export type GIFObject = {
  data: GIFDataObject[];
};

export function Content() {
  async function onUpload(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const eventTarget = event.target as HTMLFormElement;
      const formData = new FormData(eventTarget);
      const ops = { method: 'POST', body: formData };
      const resp = await fetch('/api/openAI/upload', ops);
      if (!resp.ok) throw new Error('Upload failed');
      const aiResponse = await resp.json();
      setFile(`http://localhost:8080/images/${aiResponse.fileName}`);
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
      eventTarget.reset();
    } catch (err) {
      console.error(err);
    }
  }

  const [file, setFile] = useState<string>();
  const [gifs, setGifs] = useState<GIFDataObject[]>();

  return (
    <>
      {file && gifs ? (
        <>
          <div className="w-full self-center mb-8">
            <img src={file} className="w-1/2 m-auto drop-shadow-lg" />
          </div>
          <div className="w-full flex flex-wrap justify-between">
            <GifDisplay gifsArr={gifs} />
          </div>
        </>
      ) : (
        <form onSubmit={onUpload} className="w-full">
          <input
            className="bg-slate-100 p-2"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="image"
            required
          />
          <button className="bg-lime-600 text-slate-200 border-slate-900 border p-2 rounded-md drop-shadow-md">
            Submit
          </button>
        </form>
      )}
    </>
  );
}
