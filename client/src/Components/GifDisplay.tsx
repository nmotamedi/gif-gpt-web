import '../index.css';
import { useEffect, useState } from 'react';
import { GIFDataObject } from '../types';
import { useCopied } from '../useCopied';

export function GifDisplay({ gifsArr }: { gifsArr: GIFDataObject[] }) {
  const { id, setId } = useCopied();
  if (!gifsArr || gifsArr.length === 0) {
    return <div>No GIFs available</div>;
  }
  const gifsDisplay = gifsArr.map((gif) => GifCard(gif, id, setId));

  return <>{gifsDisplay}</>;
}

function GifCard(
  gif: GIFDataObject,
  id: string,
  setId: React.Dispatch<React.SetStateAction<string>>
) {
  const [isCopied, setIsCopied] = useState<boolean>();

  useEffect(() => {
    setIsCopied(id === gif.id);
  }, [gif.id, id]);

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gif.images.original.mp4);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = gif.images.original.mp4;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
      document.body.removeChild(textArea);
    }
    setId(gif.id);
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
        <h2 className="text-2xl text-stroke-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Copied!
        </h2>
      )}
    </div>
  );
}
