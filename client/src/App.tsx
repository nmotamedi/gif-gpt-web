import './index.css';
import { Content } from './Components/Content';
import { Landing } from './Components/Landing';
import { useState } from 'react';
import { CopiedProvider } from './useCopied';

export default function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [id, setId] = useState<string>('');
  const value = { id, setId };

  return (
    <div className="w-full">
      <div
        className="w-full mb-2 h-fit flex justify-center items-center bg-slate-200 fixed z-10 hover:cursor-pointer"
        onClick={() => window.location.reload()}>
        <div className="w-fit mx-2">
          <img className="w-28" src="/Giphy_GPT Logo.png" />
        </div>
        <div className="w-fit mx-2">
          <img className="w-28" src="/Giphy_GPT Title.png" />
        </div>
      </div>
      <CopiedProvider value={value}>
        <div className="m-auto w-fit flex-col content-center text-center pt-[7.5rem] pb-4">
          {isLanding ? (
            <Landing handleClick={() => setIsLanding(false)} />
          ) : (
            <Content />
          )}
        </div>
      </CopiedProvider>
    </div>
  );
}
