import { useState } from 'react';
import '../index.css';
import { GifDisplay } from './GifDisplay';
import { onUpload } from '../data';
import { GIFDataObject } from '../types';

export function Content() {
  const [file, setFile] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [gifs, setGifs] = useState<GIFDataObject[]>();
  const [error, setError] = useState(false);

  if (isLoading) {
    return (
      <>
        <div className="h-[200px] relative bg-black text-white">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHloY3VnbG9wY29haGtoZnd3Mno2b2M5Zm44MnJ5NmMybzYzeHRjeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2H67VmB5UEBmU/giphy.webp"
            className="h-full opacity-70"
          />
          <h2 className="text-2xl text-stroke-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
            Loading...
          </h2>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <h2 className="w-full m-auto text-justify my-5 font-suse">
        Please refresh and reupload a clearer picture of your screenshot.
      </h2>
    );
  }

  if (file && gifs) {
    return (
      <div className="flex flex-col h-[80svh]">
        <div className="w-full self-center mb-8">
          <img src={file} className="h-64 m-auto drop-shadow-lg" />
        </div>
        <div className="w-full flex flex-grow flex-wrap justify-between px-8 overflow-auto shadow-inner">
          <GifDisplay gifsArr={gifs} />
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(event) =>
          onUpload(event, setFile, setIsLoading, setGifs, setError)
        }
        className="bg-slate-100 rounded-lg border border-slate-200 py-4 w-7/12 m-auto">
        <h2 className="w-10/12 m-auto text-justify my-5 font-suse">
          It’s as easy as 1-2-3! Simply take a screenshot of your conversation,
          upload it, and let us do the rest. We’ll analyze your chat and provide
          you with the best GIFs that match the mood and context of your
          conversation.
        </h2>
        <h2 className="w-10/12 m-auto text-justify my-5 font-suse font-extralight">
          Ready to make your chats more fun? Start by uploading your screenshot
          now!
        </h2>
        <input
          className="bg-slate-300 p-2"
          type="file"
          accept=".png, .jpeg, .jpg"
          name="image"
          required
        />
        <button className="bg-lime-600 text-slate-200 border-slate-900 border p-2 rounded-md drop-shadow-md font-new-amsterdam text-2xl">
          Find your GIF
        </button>
      </form>
    </>
  );
}
