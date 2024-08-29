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
      <div className="w-full mb-8 h-32 flex justify-center items-center bg-slate-200 fixed z-10">
        <div className="w-fit mx-2">
          <img className="w-28" src="/Giphy_GPT Logo.png" />
        </div>
        <div className="w-fit mx-2">
          <img className="w-28" src="/Giphy_GPT Title.png" />
        </div>
      </div>
      <CopiedProvider value={value}>
        <div className="m-auto w-fit flex-col content-center text-center pt-36">
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
