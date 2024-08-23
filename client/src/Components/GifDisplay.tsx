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
      className={`h-[200px] w-fit hover:grayscale m-1 ${
        isCopied ? 'grayscale hover:cursor-default' : 'hover:cursor-pointer'
      }`}
      key={gif.url}>
      <video
        src={gif.images.fixed_height.mp4}
        className="h-full hover:cursor-pointer hover:grayscale"
        onClick={handleCopy}
        autoPlay
        loop
        muted
      />
    </div>
  );
}
