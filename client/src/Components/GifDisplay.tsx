import { GIFDataObject } from './Content';
import '../index.css';
import { useState } from 'react';

export function GifDisplay({ gifsArr }: { gifsArr: GIFDataObject[] }) {
  if (!gifsArr || gifsArr.length === 0) {
    return <div>No GIFs available</div>;
  }
  const gifsDisplay = gifsArr.map((gif) => GifCard(gif));

  return <>{gifsDisplay}</>;
}

function GifCard(gif: GIFDataObject) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(gif.images.original.mp4);
    setIsCopied(!isCopied);
  }

  return (
    <div
      className={`h-[200px] bg-black w-fit m-1 relative text-center text-white ${
        isCopied ? ' hover:cursor-default' : 'hover:cursor-pointer'
      }`}
      key={gif.url}>
      <video
        src={gif.images.fixed_height.mp4}
        className={`h-full ${isCopied ? 'opacity-60' : 'hover:opacity-60 '}`}
        onClick={handleCopy}
        autoPlay
        loop
        muted
      />
      {isCopied && (
        <h2 className="text-2xl text-stroke-3 absolute top-1/2 left-1/2 ">
          Copied!
        </h2>
      )}
    </div>
  );
}
