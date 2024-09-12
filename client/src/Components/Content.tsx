import { useEffect, useState } from 'react';
import '../index.css';
import { GifDisplay } from './GifDisplay';
import { onUpload } from '../data';
import { GIFDataObject } from '../types';

export function Content() {
  const [file, setFile] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [gifs, setGifs] = useState<GIFDataObject[]>();
  const [error, setError] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>();
  const fileSizeLimit = 2 * 1024 * 1024; //2 MB

  useEffect(() => {
    // Handle file input clearing before page reload
    const handleBeforeUnload = (event) => {
      // Clear the file input before page reload
      setFileUpload(null);
      event.preventDefault(); // For modern browsers, this is enough to trigger the event
    };

    // Add event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.size > fileSizeLimit) {
        setUploadError('File size exceeds 2MB');
        setFileUpload(null); // Clear the file
      } else {
        setFileUpload(selectedFile); // Set the selected file
        setUploadError(null);
      }
    }
  };

  useEffect(() => {
    const handleUnload = async () => {
      try {
        await fetch(`/api/image/${file}`, {
          method: 'DELETE',
          keepalive: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [file]);

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
        <div className="w-full flex md:flex-grow md:flex-wrap md:justify-between px-8 overflow-auto shadow-inner flex-col md:flex-row items-center">
          <GifDisplay gifsArr={gifs} />
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          onUpload(event, setFile, setIsLoading, setGifs, setError);
        }}
        className="bg-slate-100 rounded-lg border border-slate-200 pt-4 w-10/12 md:w-7/12 m-auto">
        <h2 className="w-10/12 m-auto text-justify my-5 font-suse text-base md:text-xl">
          It’s as easy as 1-2-3! Simply take a screenshot of your conversation,
          upload it, and let us do the rest. We’ll analyze your chat and provide
          you with the best GIFs that match the mood and context of your
          conversation.
        </h2>
        <h2 className="w-10/12 m-auto text-justify my-5 font-suse font-extralight text-base md:text-lg">
          Ready to make your chats more fun? Start by uploading your screenshot
          now!
        </h2>
        <div className="bg-slate-300 p-2 flex flex-col justify-center items-center">
          <input
            type="file"
            className="bg-slate-600 my-3 border border-black rounded-md p-2 font-suse hover:cursor-pointer text-white w-10/12"
            accept=".png, .jpeg, .jpg"
            name="image"
            onChange={handleFileChange}
            required
          />
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          <button
            disabled={!!uploadError || !fileUpload}
            className="bg-lime-600 text-slate-200 border-slate-900 border p-2 my-2 rounded-md drop-shadow-md font-new-amsterdam text-lg md:text-2xl hover:bg-lime-700 hover:drop-shadow-xl ">
            SEARCH
          </button>
        </div>
      </form>
    </>
  );
}
