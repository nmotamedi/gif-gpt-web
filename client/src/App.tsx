import './index.css';
import { Content } from './Components/Content';

export default function App() {
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
      <div className="m-auto w-fit flex-col content-center text-center pt-36">
        <Content />
      </div>
    </div>
  );
}
